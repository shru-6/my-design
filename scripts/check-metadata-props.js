#!/usr/bin/env node

/**
 * Read-only: compare shipped component prop interfaces (src/) vs gallery metadata (test/).
 * Does not modify any files. Run: node scripts/check-metadata-props.js
 */

const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const indexPath = path.join(root, "src", "index.ts")
const specPath = path.join(root, "docs", "reference", "COMPONENTS.md")
const propSchemasPath = path.join(root, "test", "src", "utils", "metadata", "propSchemas.ts")
const extendedSchemasPath = path.join(root, "test", "src", "utils", "metadata", "extendedPropSchemas.ts")
const previewPropsPath = path.join(root, "test", "src", "utils", "metadata", "galleryPreviewProps.ts")
const interactivePreviewPath = path.join(root, "test", "src", "utils", "interactivePreview.ts")

const SPEC_EXPORT_MAP = {
  "FAB (Floating Action Button)": "FAB",
  "Dropdown (Menu)": "Dropdown",
  "FieldLayout(internal)": null,
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
}

const GALLERY_EXEMPT = new Set(["FieldLayout"])

/** Props inherited via extends — not listed individually in gallery. */
const INHERITED_SKIP = new Set([
  "children",
  "className",
  "style",
  "id",
  "role",
  "tabIndex",
  "title",
  "onClick",
  "onChange",
  "onFocus",
  "onBlur",
  "onKeyDown",
  "onKeyUp",
  "onMouseEnter",
  "onMouseLeave",
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "data-testid",
])

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
    names.push(raw)
  }
  return [...new Set(names)]
}

function parseExportMap(indexContent) {
  const map = new Map()
  const re = /export\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/g
  let match
  while ((match = re.exec(indexContent)) !== null) {
    const symbols = match[1].split(",").map((s) => s.trim())
    const rel = match[2]
    for (const sym of symbols) {
      const nameMatch = sym.match(/(?:type\s+)?(\w+)/)
      if (!nameMatch) continue
      const name = nameMatch[1]
      if (name.endsWith("Props") || name.endsWith("Variants")) continue
      if (!map.has(name)) {
        map.set(name, path.join(root, "src", `${rel}.tsx`).replace(/\.tsx$/, "") + ".tsx")
      }
    }
  }
  return map
}

function resolveSourceFile(componentName, exportMap) {
  const direct = exportMap.get(componentName)
  if (direct && fs.existsSync(direct)) return direct

  const componentsDir = path.join(root, "src", "components")
  const matches = []
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name)
      if (ent.isDirectory()) walk(p)
      else if (ent.name === `${componentName}.tsx`) matches.push(p)
    }
  }
  walk(componentsDir)
  return matches[0] ?? null
}

function parseInterfaceProps(fileContent, interfaceName) {
  const re = new RegExp(`export\\s+interface\\s+${interfaceName}\\s+extends[^{]*\\{([\\s\\S]*?)\\n\\}`, "m")
  const rePlain = new RegExp(`export\\s+interface\\s+${interfaceName}\\s*\\{([\\s\\S]*?)\\n\\}`, "m")
  const match = re.exec(fileContent) || rePlain.exec(fileContent)
  if (!match) return null

  const body = match[1]
  const props = []
  const propRe = /^\s*(\w+)\??:/gm
  let m
  while ((m = propRe.exec(body)) !== null) {
    props.push(m[1])
  }
  return [...new Set(props)]
}

function parseTypeAliasProps(fileContent, typeName) {
  const re = new RegExp(`export\\s+type\\s+${typeName}\\s*=\\s*[\\s\\S]*?\\{([\\s\\S]*?)\\}`, "m")
  const match = re.exec(fileContent)
  if (!match) return null
  const props = []
  const propRe = /^\s*(\w+)\??:/gm
  let m
  while ((m = propRe.exec(match[1])) !== null) props.push(m[1])
  return [...new Set(props)]
}

function extractSourceProps(componentName, filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const candidates = [
    `${componentName}Props`,
    `${componentName}Prop`, // unlikely
  ]

  for (const iface of candidates) {
    const fromInterface = parseInterfaceProps(content, iface)
    if (fromInterface?.length) return { props: fromInterface, interface: iface, file: filePath }
  }

  // ButtonProps pattern for forwardRef components exporting Props separately
  const propsExport = content.match(new RegExp(`export\\s+(?:type|interface)\\s+(\\w*${componentName}\\w*Props)`))
  if (propsExport) {
    const name = propsExport[1]
    const parsed = parseInterfaceProps(content, name) || parseTypeAliasProps(content, name)
    if (parsed?.length) return { props: parsed, interface: name, file: filePath }
  }

  return { props: [], interface: null, file: filePath }
}

function parseGallerySchemas(fileContent) {
  const schemas = {}
  const blockRe = /^\s{2}(\w+):\s*(?:own\(|\[)/gm
  let match
  const starts = []
  while ((match = blockRe.exec(fileContent)) !== null) {
    starts.push({ name: match[1], index: match.index })
  }

  for (let i = 0; i < starts.length; i += 1) {
    const { name, index } = starts[i]
    const end = i + 1 < starts.length ? starts[i + 1].index : fileContent.length
    const block = fileContent.slice(index, end)
    const propNames = [...block.matchAll(/\{\s*name:\s*"([^"]+)"/g)].map((m) => m[1])
    schemas[name] = [...new Set(propNames)]
  }
  return schemas
}

function parseInteractiveBindings(content) {
  const bindings = {}
  const blockMatch = content.match(/const BINDINGS[^=]*=\s*\{([\s\S]*?)\n\}/)
  if (!blockMatch) return bindings
  const block = blockMatch[1]
  const entryRe = /(\w+):\s*\{([^}]+)\}/g
  let m
  while ((m = entryRe.exec(block)) !== null) {
    const comp = m[1]
    const pairs = {}
    const pairRe = /(\w+):\s*"([^"]+)"/g
    let p
    while ((p = pairRe.exec(m[2])) !== null) pairs[p[1]] = p[2]
    bindings[comp] = pairs
  }
  return bindings
}

function main() {
  const shipped = parseShippedFromSpec(fs.readFileSync(specPath, "utf8")).filter(
    (n) => !GALLERY_EXEMPT.has(n)
  )
  const exportMap = parseExportMap(fs.readFileSync(indexPath, "utf8"))

  const mainSchemas = parseGallerySchemas(fs.readFileSync(propSchemasPath, "utf8"))
  const extendedSchemas = parseGallerySchemas(fs.readFileSync(extendedSchemasPath, "utf8"))
  const previewSchemas = parseGallerySchemas(fs.readFileSync(previewPropsPath, "utf8"))
  const gallery = {}
  for (const name of shipped) {
    gallery[name] = [
      ...new Set([
        ...(mainSchemas[name] ?? []),
        ...(extendedSchemas[name] ?? []),
        ...(previewSchemas[name] ?? []),
      ]),
    ]
  }

  const bindings = parseInteractiveBindings(fs.readFileSync(interactivePreviewPath, "utf8"))

  const results = []
  let totalMissing = 0
  let noGallery = 0
  let noSource = 0

  for (const name of shipped.sort()) {
    const file = resolveSourceFile(name, exportMap)
    const galleryProps = new Set(gallery[name] ?? [])
    const slotConsumed = new Set(
      (gallery[name] ?? []).filter((p) => {
        const schemas = `${fs.readFileSync(propSchemasPath, "utf8")}${fs.readFileSync(extendedSchemasPath, "utf8")}`
        return schemas.includes(`name: "${p}"`) && schemas.includes(`scope: "slot"`)
      })
    )

    if (!galleryProps.size) {
      noGallery += 1
      results.push({ name, status: "no_gallery_schema", gallery: [], source: [], missing: [], extra: [] })
      continue
    }

    if (!file) {
      noSource += 1
      results.push({ name, status: "no_source_file", gallery: [...galleryProps], source: [], missing: [], extra: [] })
      continue
    }

    const { props: sourceProps, interface: iface } = extractSourceProps(name, file)
    const sourceOwn = sourceProps.filter((p) => !INHERITED_SKIP.has(p))
    const sourceSet = new Set(sourceOwn)
    const missing = sourceOwn.filter((p) => !galleryProps.has(p))
    const extra = [...galleryProps].filter((p) => !sourceSet.has(p) && !sourceProps.includes(p))

    totalMissing += missing.length

    const bindingIssues = []
    const binding = bindings[name]
    if (binding) {
      for (const [prop, handler] of Object.entries(binding)) {
        if (!sourceSet.has(prop) && !sourceProps.includes(prop)) {
          bindingIssues.push(`${prop} → ${handler} (prop not in ${iface ?? "source"})`)
        }
        if (!sourceSet.has(handler) && !sourceProps.includes(handler)) {
          bindingIssues.push(`${prop} → ${handler} (handler not in source)`)
        }
      }
    }

    results.push({
      name,
      status: missing.length || extra.length || bindingIssues.length ? "gaps" : "ok",
      interface: iface,
      file: path.relative(root, file),
      gallery: [...galleryProps].sort(),
      source: sourceOwn.sort(),
      missing: missing.sort(),
      extra: extra.sort(),
      bindingIssues,
    })
  }

  console.log("\nGallery metadata ↔ source props (read-only)\n")
  console.log(`Shipped components: ${shipped.length}`)
  console.log(`No gallery schema:    ${noGallery}`)
  console.log(`No source file:       ${noSource}`)
  console.log(`Total missing props:  ${totalMissing}\n`)

  const gaps = results.filter((r) => r.status !== "ok" && r.status !== "no_gallery_schema")
  for (const r of gaps) {
    if (r.status === "no_source_file") {
      console.log(`✗ ${r.name} — source file not found`)
      continue
    }
    console.log(`— ${r.name} (${r.file}, ${r.interface ?? "?"})`)
    if (r.missing.length) console.log(`    missing in gallery: ${r.missing.join(", ")}`)
    if (r.extra.length) console.log(`    extra in gallery:   ${r.extra.join(", ")}`)
    if (r.bindingIssues?.length) console.log(`    interactivePreview: ${r.bindingIssues.join("; ")}`)
  }

  const noSchema = results.filter((r) => r.status === "no_gallery_schema")
  if (noSchema.length) {
    console.log("\nNo enriched schema (gallery shows stub only):")
    console.log(noSchema.map((r) => r.name).join(", "))
  }

  const inline = results.find((r) => r.name === "InlineEdit")
  if (inline) {
    console.log("\nInlineEdit detail:")
    console.log(`  Source (${inline.interface}): ${inline.source?.join(", ") || "—"}`)
    console.log(`  Gallery: ${inline.gallery?.join(", ") || "—"}`)
    console.log(`  Missing: ${inline.missing?.join(", ") || "none"}`)
    if (inline.bindingIssues?.length) console.log(`  Bindings: ${inline.bindingIssues.join("; ")}`)
  }

  const failed = noGallery + gaps.filter((r) => r.missing.length > 0 || r.bindingIssues?.length).length
  console.log(`\n${failed ? "✗" : "✓"} Metadata prop parity check (${failed} components with issues)\n`)
  process.exit(failed > 0 ? 1 : 0)
}

main()
