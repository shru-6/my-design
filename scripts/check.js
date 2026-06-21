#!/usr/bin/env node

/**
 * Pre-publish checks: build, export parity, semantic token usage.
 */

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const root = path.join(__dirname, "..")
const specPath = path.join(root, "docs", "reference", "COMPONENTS.md")
const indexPath = path.join(root, "src", "index.ts")
const metadataDir = path.join(root, "test", "src", "utils", "metadata")
const metadataShimPath = path.join(root, "test", "src", "utils", "componentMetadata.ts")

function readGalleryMetadataContent() {
  if (fs.existsSync(metadataShimPath)) {
    return fs.readFileSync(metadataShimPath, "utf8")
  }
  const indexPath = path.join(metadataDir, "index.ts")
  if (fs.existsSync(indexPath)) {
    let content = ""
    for (const entry of fs.readdirSync(metadataDir)) {
      if (!entry.endsWith(".ts") || entry === "types.ts") continue
      content += fs.readFileSync(path.join(metadataDir, entry), "utf8")
    }
    return content
  }
  return ""
}
const componentsDir = path.join(root, "src", "components")

const SPEC_EXPORT_MAP = {
  "FAB (Floating Action Button)": "FAB",
  "Dropdown (Menu)": "Dropdown",
  "FieldLayout(internal)": "FieldLayout",
  "ResizablePanelGroup / ResizablePanel / ResizableHandle": [
    "ResizablePanelGroup",
    "ResizablePanel",
    "ResizableHandle",
  ],
  "Alert (inline contextual message)": "Alert",
  "Overlay (backdrop primitive)": "Overlay",
  "Card (surface container)": "Card",
  "Toaster (provider / container)": "Toaster",
  "Command (Combobox / Command Palette)": "Command",
  "FieldLayout(internal)": null,
}

const GALLERY_EXEMPT = new Set(["FieldLayout", "Badge", "Tag"])

function log(msg, ok) {
  const icon = ok ? "✓" : "✗"
  console.log(`${icon} ${msg}`)
}

function parseShippedFromSpec(content) {
  const names = []
  const re = /^- ✓ (.+)$/gm
  let match
  while ((match = re.exec(content)) !== null) {
    let raw = match[1].trim()
    if (raw.includes(" — ")) raw = raw.split(" — ")[0].trim()
    if (SPEC_EXPORT_MAP[raw] !== undefined) {
      const mapped = SPEC_EXPORT_MAP[raw]
      if (mapped === null) continue
      if (Array.isArray(mapped)) names.push(...mapped)
      else names.push(mapped)
      continue
    }
    // "Pill — unified chip..." → Pill
    if (raw.includes(" — ")) raw = raw.split(" — ")[0].trim()
    names.push(raw)
  }
  return [...new Set(names)]
}

function parseGalleryNames(content) {
  const names = []
  const re = /^\s+name: "([A-Z][^"]+)"/gm
  let match
  while ((match = re.exec(content)) !== null) names.push(match[1])
  return [...new Set(names)]
}

function parseExportsFromIndex(content) {
  const names = new Set()
  const re = /export\s+(?:\{[^}]*\b(\w+)\b[^}]*\}|(\w+))\s+from/g
  let match
  while ((match = re.exec(content)) !== null) {
    if (match[1]) names.add(match[1])
    if (match[2]) names.add(match[2])
  }
  // Named exports: export { Foo, Bar, type Baz }
  const blockRe = /export\s+\{([^}]+)\}/g
  while ((match = blockRe.exec(content)) !== null) {
    match[1].split(",").forEach((part) => {
      const name = part.replace(/type\s+/g, "").trim().split(/\s+as\s+/)[0].trim()
      if (name && /^[A-Z]/.test(name)) names.add(name)
    })
  }
  return names
}

function walkTokenFiles(dir, base = "") {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkTokenFiles(full, rel))
    else if (entry.name.endsWith(".json")) files.push(rel)
  }
  return files
}

function checkTokenSync() {
  const sourceDir = path.join(root, "scripts", "tokens")
  const targetDir = path.join(root, "src", "tokens")
  if (!fs.existsSync(sourceDir)) return ["scripts/tokens missing"]
  const sourceFiles = walkTokenFiles(sourceDir).sort()
  const mismatches = []
  for (const rel of sourceFiles) {
    const src = path.join(sourceDir, rel)
    const dest = path.join(targetDir, rel)
    if (!fs.existsSync(dest)) {
      mismatches.push(`missing in src/tokens: ${rel}`)
      continue
    }
    const a = fs.readFileSync(src, "utf8")
    const b = fs.readFileSync(dest, "utf8")
    if (a !== b) mismatches.push(`out of sync: ${rel}`)
  }
  return mismatches
}

function checkRawColors() {
  const violations = []
  const rawColorRe =
    /\b(?:bg|text|border|ring|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g
  const darkPrefixRe = /\bdark:/g

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
        const content = fs.readFileSync(full, "utf8")
        const rel = path.relative(root, full)
        let m
        while ((m = rawColorRe.exec(content)) !== null) {
          violations.push(`${rel}: raw color "${m[0]}"`)
        }
        while ((m = darkPrefixRe.exec(content)) !== null) {
          violations.push(`${rel}: dark: prefix (use theme tokens)`)
        }
      }
    }
  }

  walk(componentsDir)
  return violations
}

let failed = false

console.log("\nshru-design-system check\n")

// 1. Build
try {
  execSync("npm run build", { cwd: root, stdio: "pipe" })
  log("Build (tsup)", true)
} catch (e) {
  log("Build (tsup)", false)
  console.error(e.stdout?.toString() || e.message)
  failed = true
}

// 2. Copy styles
try {
  execSync("node scripts/copy-styles.js", { cwd: root, stdio: "pipe" })
  log("styles.css copied to dist/", true)
} catch (e) {
  log("styles.css copy", false)
  failed = true
}

// 3. Export parity
if (fs.existsSync(specPath) && fs.existsSync(indexPath)) {
  const specNames = parseShippedFromSpec(fs.readFileSync(specPath, "utf8"))
  const exports = parseExportsFromIndex(fs.readFileSync(indexPath, "utf8"))
  const missing = specNames.filter((n) => !exports.has(n))
  const extraNote = missing.length === 0
  if (missing.length) {
    log(`Export parity (${missing.length} missing from index.ts)`, false)
    missing.forEach((n) => console.log(`    - ${n}`))
    failed = true
  } else {
    log(`Export parity (${specNames.length} shipped components)`, true)
  }
} else {
  log("Export parity (spec or index missing)", false)
  failed = true
}

// 4. Gallery parity
const galleryMetadataContent = readGalleryMetadataContent()
if (galleryMetadataContent && fs.existsSync(indexPath)) {
  const galleryNames = parseGalleryNames(galleryMetadataContent)
  const exports = parseExportsFromIndex(fs.readFileSync(indexPath, "utf8"))
  const missingFromExports = galleryNames.filter((n) => !exports.has(n))
  if (missingFromExports.length) {
    log(`Gallery parity (${missingFromExports.length} missing from index.ts)`, false)
    missingFromExports.forEach((n) => console.log(`    - ${n}`))
    failed = true
  } else {
    log(`Gallery parity (${galleryNames.length} preview entries)`, true)
  }

  if (fs.existsSync(specPath)) {
    const specNames = parseShippedFromSpec(fs.readFileSync(specPath, "utf8"))
    const missingFromGallery = specNames.filter((n) => !galleryNames.includes(n) && !GALLERY_EXEMPT.has(n))
    if (missingFromGallery.length) {
      log(`Spec ↔ gallery (${missingFromGallery.length} shipped but not in gallery)`, false)
      missingFromGallery.forEach((n) => console.log(`    - ${n}`))
      failed = true
    } else {
      log(`Spec ↔ gallery (${specNames.length} shipped components)`, true)
    }
  }
} else {
  log("Gallery parity (metadata or index missing)", false)
  failed = true
}

// 5. Token sync (scripts/tokens → src/tokens)
const tokenMismatches = checkTokenSync()
if (tokenMismatches.length) {
  log(`Token sync (${tokenMismatches.length} issues — run node scripts/copy-tokens.js)`, false)
  tokenMismatches.slice(0, 15).forEach((v) => console.log(`    ${v}`))
  if (tokenMismatches.length > 15) {
    console.log(`    ... and ${tokenMismatches.length - 15} more`)
  }
  failed = true
} else {
  log("Token sync (scripts/tokens matches src/tokens)", true)
}

// 6. Raw colors
const colorViolations = checkRawColors()
if (colorViolations.length) {
  log(`Semantic tokens (${colorViolations.length} violations)`, false)
  colorViolations.slice(0, 15).forEach((v) => console.log(`    ${v}`))
  if (colorViolations.length > 15) {
    console.log(`    ... and ${colorViolations.length - 15} more`)
  }
  failed = true
} else {
  log("Semantic tokens (no raw Tailwind colors)", true)
}

console.log("")
if (failed) {
  console.log("Check failed.\n")
  process.exit(1)
}
console.log("All checks passed.\n")
