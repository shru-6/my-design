#!/usr/bin/env node

/**
 * Split test/src/utils/componentMetadata.ts into category modules.
 * Run after editing the monolith: node scripts/split-component-metadata.js
 */

const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const sourcePath = path.join(root, "test", "src", "utils", "componentMetadata.ts")
const outDir = path.join(root, "test", "src", "utils", "metadata")

const source = fs.readFileSync(sourcePath, "utf8")
const arrayStart = source.indexOf("export const componentMetadata")
if (arrayStart < 0) {
  console.log("split-component-metadata: already split (no monolith array found)")
  process.exit(0)
}

const arrayOpen = source.indexOf("[", arrayStart)
let depth = 0
let arrayEnd = -1
for (let i = arrayOpen; i < source.length; i++) {
  if (source[i] === "[") depth++
  else if (source[i] === "]") {
    depth--
    if (depth === 0) {
      arrayEnd = i
      break
    }
  }
}
if (arrayEnd < 0) {
  console.error("Could not parse componentMetadata array")
  process.exit(1)
}

const arrayBody = source.slice(arrayOpen + 1, arrayEnd).trim()
const entries = []
let buf = ""
let objDepth = 0
for (let i = 0; i < arrayBody.length; i++) {
  const ch = arrayBody[i]
  buf += ch
  if (ch === "{") objDepth++
  else if (ch === "}") {
    objDepth--
    if (objDepth === 0) {
      const chunk = buf.trim().replace(/^,\s*/, "")
      if (chunk) entries.push(chunk)
      buf = ""
    }
  }
}

const byCategory = {}
for (const entry of entries) {
  const m = entry.match(/category:\s*"([^"]+)"/)
  if (!m) continue
  const cat = m[1]
  if (!byCategory[cat]) byCategory[cat] = []
  byCategory[cat].push(entry)
}

if (!entries.length) {
  console.error("split-component-metadata: parsed zero entries — aborting")
  process.exit(1)
}

fs.mkdirSync(outDir, { recursive: true })

const subMapStart = source.indexOf("const subComponentsMap")
const subMapEnd = source.indexOf("export function getSubComponents")
const subMapBlock = source.slice(subMapStart, subMapEnd)

fs.writeFileSync(
  path.join(outDir, "subComponentsMap.ts"),
  `import type { ComponentMetadata } from "./types"

${subMapBlock.replace("const subComponentsMap", "const subComponentsMap")}

export function getSubComponents(componentName: string): string[] {
  return subComponentsMap[componentName] || []
}

export function getAllSubComponents(): string[] {
  const allSubComponents = new Set<string>()
  Object.values(subComponentsMap).forEach((subs) => {
    subs.forEach((sub) => allSubComponents.add(sub))
  })
  return Array.from(allSubComponents).sort()
}
`
)

for (const [category, items] of Object.entries(byCategory)) {
  const fileName = `${category.replace(/-/g, "_")}.ts`
  const content = `import type { ComponentMetadata } from "./types"

export const ${category.replace(/-/g, "_")}Metadata: ComponentMetadata[] = [
  ${items.join(",\n  ")}
]
`
  fs.writeFileSync(path.join(outDir, fileName), content)
}

const categories = Object.keys(byCategory).sort()
const indexContent = `import type { ComponentMetadata } from "./types"
${categories.map((c) => `import { ${c.replace(/-/g, "_")}Metadata } from "./${c.replace(/-/g, "_")}"`).join("\n")}

export * from "./types"
export * from "./subComponentsMap"

export const componentMetadata: ComponentMetadata[] = [
${categories.map((c) => `  ...${c.replace(/-/g, "_")}Metadata,`).join("\n")}
]

export function getComponentMetadata(name: string): ComponentMetadata | undefined {
  return componentMetadata.find((c) => c.name === name)
}
`

fs.writeFileSync(path.join(outDir, "index.ts"), indexContent)
fs.writeFileSync(sourcePath, `export * from "./metadata"\n`)

console.log(`split-component-metadata: wrote ${categories.length} category files`)
