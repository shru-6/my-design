#!/usr/bin/env node

/**
 * Read-only, informational: flags component props that are declared in a
 * component's own `XxxProps` interface but never actually read in the
 * component body — the exact bug class behind BarChart.stacked,
 * Chart.tooltip/config/responsive, LineChart.curve (as `_curve`), and
 * ResizeContainer.direction before the theme-engine refactor fixed them.
 *
 * Heuristic, not a proof:
 *   1. Only checks props declared directly in a component's own
 *      `export interface XxxProps extends ... { ... }` block — not props
 *      inherited from an extended type (HTMLAttributes, VariantProps, etc.),
 *      which this script has no way to resolve.
 *   2. A prop destructured with a leading underscore (`_curve`) is treated
 *      as intentionally-unused and skipped — that's the project's own
 *      convention for "accepted but deliberately discarded," not a bug.
 *   3. A prop never mentioned in the destructuring parameter list at all is
 *      assumed to be forwarded via `...rest`/`...props` and is skipped —
 *      this script can't tell forwarded-on-purpose from silently-dropped.
 *   4. A prop that IS destructured by name but whose binding never appears
 *      again in the rest of the function is flagged.
 *
 * Run: node scripts/dev/check-unused-props.js
 * Exit code is always 0 — this never blocks `npm run check` or CI. It's a
 * prompt to go look, same spirit as check-metadata-props.js.
 */

const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..", "..")
const componentsDir = path.join(root, "src", "components")

/** @returns {string[]} .tsx files under src/components/**, excluding tests/internals helpers */
function listComponentFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...listComponentFiles(full))
    } else if (entry.name.endsWith(".tsx") && !entry.name.includes(".test.")) {
      out.push(full)
    }
  }
  return out
}

/** Extract top-level prop names from one `export interface XxxProps ... { ... }` block. */
function extractOwnProps(body) {
  // `body` is already the interface's inner content (outer braces stripped
  // by findPropsInterfaces), so depth 1 here means "a top-level prop line."
  const names = []
  let depth = 1
  const lines = body.split("\n")
  for (const line of lines) {
    const opens = (line.match(/{/g) || []).length
    const closes = (line.match(/}/g) || []).length
    if (depth === 1) {
      const m = line.match(/^\s*(?:readonly\s+)?([a-zA-Z_$][\w$]*)\??\s*:/)
      if (m) names.push(m[1])
    }
    depth += opens - closes
  }
  return names
}

function findPropsInterfaces(content) {
  const interfaces = []
  const re = /export interface (\w+Props)\b[^{]*{/g
  let match
  while ((match = re.exec(content)) !== null) {
    let depth = 1
    let i = match.index + match[0].length
    const start = i
    while (depth > 0 && i < content.length) {
      if (content[i] === "{") depth++
      if (content[i] === "}") depth--
      i++
    }
    interfaces.push({ name: match[1], body: content.slice(start, i - 1) })
  }
  return interfaces
}

/**
 * Maps declared prop name -> the local binding it's read as, handling
 * `propName: localAlias` renames (e.g. `default: defaultState`) and default
 * values (`propName = x`). A `_`-prefixed binding (either the prop itself,
 * e.g. `_curve`, or its alias, e.g. `contentClassName: _contentClassName`)
 * is the project's own "accepted, deliberately unused" convention.
 */
function findDestructuredNames(content) {
  // First `{ ... }` destructuring parameter in a function/forwardRef body —
  // good enough for this codebase's consistent `function X({ a, b, ... }, ref)` shape.
  const match = content.match(/\(\s*{([\s\S]*?)}\s*(?::\s*\w+)?\s*,?\s*(?:ref\s*)?\)\s*(?:=>|{)/)
  if (!match) return new Map()
  const bindings = new Map()
  for (const part of match[1].split(",")) {
    const trimmed = part.trim()
    if (!trimmed || trimmed.startsWith("...")) continue
    const renamed = trimmed.match(/^([a-zA-Z_$][\w$]*)\s*:\s*([a-zA-Z_$][\w$]*)/)
    if (renamed) {
      bindings.set(renamed[1], { local: renamed[2], intentionallyUnused: renamed[2].startsWith("_") })
      continue
    }
    const plain = trimmed.match(/^([a-zA-Z_$][\w$]*)/)
    if (plain) {
      bindings.set(plain[1], { local: plain[1], intentionallyUnused: plain[1].startsWith("_") })
    }
  }
  return bindings
}

let flaggedCount = 0
const files = listComponentFiles(componentsDir)

for (const file of files) {
  const content = fs.readFileSync(file, "utf8")
  const interfaces = findPropsInterfaces(content)
  if (interfaces.length === 0) continue

  const destructured = findDestructuredNames(content)

  for (const iface of interfaces) {
    const ownProps = extractOwnProps(iface.body)
    for (const prop of ownProps) {
      const binding = destructured.get(prop)
      if (!binding) continue // forwarded via ...rest, assumed intentional
      if (binding.intentionallyUnused) continue // `_`-prefixed — project's own convention

      // Count occurrences of the LOCAL binding as a whole word, anywhere in the file.
      const occurrences = (content.match(new RegExp(`\\b${binding.local}\\b`, "g")) || []).length
      const expectedBaseline = binding.local === prop ? 2 : 1 // interface decl + destructure line, or just the rename target
      if (occurrences <= expectedBaseline) {
        console.log(`  ${path.relative(root, file)}: ${iface.name}.${prop} — destructured, never read`)
        flaggedCount++
      }
    }
  }
}

console.log("")
if (flaggedCount === 0) {
  console.log("✓ check-unused-props: no destructured-but-unread props found (heuristic, not exhaustive)")
} else {
  console.log(
    `⚠ check-unused-props: ${flaggedCount} candidate(s) above — verify by hand, this is a heuristic, not a gate`
  )
}
process.exit(0)
