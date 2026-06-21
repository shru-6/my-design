#!/usr/bin/env node

/**
 * Append minimal gallery metadata for exported components missing from componentMetadata.ts.
 * Does not remove or rewrite existing rich entries.
 */

const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const specPath = path.join(root, "docs", "reference", "COMPONENTS.md")
const indexPath = path.join(root, "src", "index.ts")
const metadataPath = path.join(root, "test", "src", "utils", "componentMetadata.ts")
const subMapPath = path.join(root, "test", "src", "utils", "metadata", "subComponentsMap.ts")
const componentsDir = path.join(root, "src", "components")

const SPEC_EXPORT_MAP = {
  "FAB (Floating Action Button)": "FAB",
  "Dropdown (Menu)": "Dropdown",
  FieldLayout: "FieldLayout",
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
    if (raw.includes(" — ")) raw = raw.split(" — ")[0].trim()
    names.push(raw)
  }
  return [...new Set(names)]
}

function parseExistingNames(content) {
  const names = new Set()
  const re = /^\s+name: "([A-Z][^"]+)"/gm
  let match
  while ((match = re.exec(content)) !== null) names.add(match[1])
  return names
}

function findCategory(name) {
  for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const cat = entry.name
    const file = path.join(componentsDir, cat, `${name}.tsx`)
    if (fs.existsSync(file)) return cat
    const patternsDir = path.join(componentsDir, "patterns")
    if (cat === "patterns" && fs.existsSync(path.join(patternsDir, `${name}.tsx`))) return "patterns"
  }
  return "utilities"
}

function loadSubComponentsMap() {
  if (!fs.existsSync(subMapPath)) return {}
  const src = fs.readFileSync(subMapPath, "utf8")
  const map = {}
  const re = /^\s+([A-Za-z][A-Za-z0-9]+):\s*\[([^\]]*)\]/gm
  let m
  while ((m = re.exec(src)) !== null) {
    const key = m[1]
    const subs = m[2]
      .split(",")
      .map((s) => s.replace(/["'\s]/g, ""))
      .filter(Boolean)
    map[key] = subs
  }
  return map
}

function defaultPropsFor(name) {
  const common = [
    `{ name: "className", type: "string" }`,
  ]
  const withChildren = [
    ...common,
    `{ name: "children", type: "reactNode", defaultValue: "Content" }`,
  ]
  const items = [
    ...common,
    `{ name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }`,
  ]

  if (["Stack", "Grid", "Card", "Separator", "Hero", "AuthLayout", "PageFooter"].includes(name)) {
    return withChildren
  }
  if (
    [
      "List",
      "Select",
      "Dropdown",
      "Tabs",
      "Breadcrumb",
      "Stepper",
      "RadioGroup",
      "PillGroup",
      "Table",
      "TreeView",
      "Command",
      "NavigationMenu",
      "Menubar",
      "ContextMenu",
    ].includes(name)
  ) {
    return items
  }
  if (name === "Button" || name === "FAB" || name === "CopyButton") {
    return [
      `{ name: "variant", type: "variant", options: ["primary", "outline", "ghost", "destructive"], defaultValue: "primary" }`,
      `{ name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" }`,
      `{ name: "children", type: "reactNode", defaultValue: "Button" }`,
      `{ name: "disabled", type: "boolean", defaultValue: false }`,
    ]
  }
  if (name.endsWith("Chart") || name === "Chart") {
    return [
      `{ name: "data", type: "array", defaultValue: [{ label: "A", value: 40 }, { label: "B", value: 65 }] }`,
      `{ name: "height", type: "number", defaultValue: 200 }`,
    ]
  }
  return common
}

function buildEntry(name, category, subMap) {
  const props = defaultPropsFor(name)
  const subs = subMap[name]
  const subLine = subs?.length
    ? `,\n    subComponents: ${JSON.stringify(subs)}`
    : ""
  return `  {
    name: "${name}",
    category: "${category}",
    props: [
      ${props.join(",\n      ")}
    ]${subLine}
  }`
}

const specNames = parseShippedFromSpec(fs.readFileSync(specPath, "utf8"))
const metadata = fs.readFileSync(metadataPath, "utf8")
const existing = parseExistingNames(metadata)
const subMap = loadSubComponentsMap()

const missing = specNames.filter((n) => !existing.has(n))
if (!missing.length) {
  console.log("generate-metadata-stubs: nothing to add")
  process.exit(0)
}

const stubs = missing.map((name) => buildEntry(name, findCategory(name), subMap))
const insertAt = metadata.lastIndexOf("]")
if (insertAt < 0) {
  console.error("Could not find componentMetadata array end")
  process.exit(1)
}

const before = metadata.slice(0, insertAt).trimEnd()
const needsComma = !before.endsWith("[") && !before.endsWith(",")
const updated = `${before}${needsComma ? "," : ""}\n${stubs.join(",\n")}\n]\n\n${metadata.slice(insertAt + 1).trimStart()}`

fs.writeFileSync(metadataPath, updated)
console.log(`generate-metadata-stubs: added ${missing.length} entries`)
