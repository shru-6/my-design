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

/** Design CMS playground imports — metadata parity required for these only. */
const PLAYGROUND_COMPONENTS = new Set([
  "Alert",
  "Button",
  "Card",
  "Checkbox",
  "CodeBlock",
  "CollapsiblePanel",
  "ConfirmModal",
  "CopyButton",
  "DescriptionList",
  "EmptyState",
  "FormField",
  "FormModal",
  "HistoryControlButtons",
  "InlineEdit",
  "List",
  "PageHeader",
  "Pill",
  "ResizeContainer",
  "Select",
  "Skeleton",
  "Tabs",
  "Text",
  "Textarea",
  "TextInput",
  "TreeView",
  "Upload",
])

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

function findTypeDefinition(typeName) {
  const componentsDir = path.join(root, "src", "components")
  const patterns = [
    new RegExp(`export\\s+interface\\s+${typeName}\\b`),
    new RegExp(`export\\s+type\\s+${typeName}\\b`),
  ]
  let found = null
  function walk(dir) {
    if (found) return
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name)
      if (ent.isDirectory()) walk(p)
      else if (ent.name.endsWith(".tsx") || ent.name.endsWith(".ts")) {
        const content = fs.readFileSync(p, "utf8")
        if (patterns.some((re) => re.test(content))) found = p
      }
    }
  }
  walk(componentsDir)
  return found
}

function parsePropsFromBody(body) {
  const props = []
  const propRe = /^\s*(\w+)\??:/gm
  let m
  while ((m = propRe.exec(body)) !== null) props.push(m[1])
  return props
}

function resolveTypeProps(typeName, filePath, cache = new Map(), stack = new Set()) {
  const key = `${filePath}::${typeName}`
  if (cache.has(key)) return cache.get(key)
  if (stack.has(key)) return []

  const content = fs.readFileSync(filePath, "utf8")
  const fromInterface = parseInterfaceProps(content, typeName, cache, stack, filePath)
  if (fromInterface?.length) {
    cache.set(key, fromInterface)
    return fromInterface
  }

  stack.add(key)
  let props = []

  const aliasRe = new RegExp(`export\\s+type\\s+${typeName}\\s*=\\s*([^;]+);`, "m")
  const aliasMatch = aliasRe.exec(content)
  if (aliasMatch) {
    const rhs = aliasMatch[1].trim()
    const parts = rhs.split("&").map((p) => p.trim())
    for (const part of parts) {
      const omitMatch = part.match(/^Omit<\s*(\w+)\s*,/)
      if (omitMatch) {
        const innerFile = findTypeDefinition(omitMatch[1]) ?? filePath
        props.push(...resolveTypeProps(omitMatch[1], innerFile, cache, stack))
        continue
      }
      if (part.startsWith("{")) {
        props.push(...parsePropsFromBody(part.replace(/^\{|\}$/g, "")))
        continue
      }
      const ref = part.match(/^(\w+)$/)?.[1]
      if (ref) {
        const refFile = findTypeDefinition(ref) ?? filePath
        props.push(...resolveTypeProps(ref, refFile, cache, stack))
      }
    }
  }

  if (!props.length) {
    const altFile = findTypeDefinition(typeName)
    if (altFile && altFile !== filePath) {
      props = resolveTypeProps(typeName, altFile, cache, stack)
    }
  }

  stack.delete(key)
  const merged = [...new Set(props)]
  cache.set(key, merged)
  return merged
}

function parseExtendsParents(extendsClause) {
  if (!extendsClause) return []
  const parents = []
  const omitRe = /Omit<\s*(\w+)\s*,/g
  let omitMatch
  while ((omitMatch = omitRe.exec(extendsClause)) !== null) {
    parents.push(omitMatch[1])
  }
  const directRe = /\b([A-Z]\w*Props)\b/g
  let directMatch
  while ((directMatch = directRe.exec(extendsClause)) !== null) {
    if (!parents.includes(directMatch[1])) parents.push(directMatch[1])
  }
  return parents
}

function parseInterfaceBlock(fileContent, interfaceName) {
  const startRe = new RegExp(`export\\s+interface\\s+${interfaceName}\\b`)
  const start = fileContent.search(startRe)
  if (start === -1) return null

  const braceStart = fileContent.indexOf("{", start)
  if (braceStart === -1) return null

  let depth = 0
  let end = braceStart
  for (let i = braceStart; i < fileContent.length; i += 1) {
    if (fileContent[i] === "{") depth += 1
    else if (fileContent[i] === "}") {
      depth -= 1
      if (depth === 0) {
        end = i
        break
      }
    }
  }

  const header = fileContent.slice(start, braceStart)
  const body = fileContent.slice(braceStart + 1, end)
  const extendsMatch = header.match(/\bextends\s+([\s\S]+)$/)
  return { body, extendsClause: extendsMatch?.[1]?.trim() ?? null }
}

function parseInterfaceProps(fileContent, interfaceName, cache = new Map(), stack = new Set(), filePath = "") {
  const cacheKey = filePath ? `${filePath}::${interfaceName}` : interfaceName
  if (cache.has(cacheKey)) return cache.get(cacheKey)
  if (stack.has(cacheKey)) return []

  const block = parseInterfaceBlock(fileContent, interfaceName)
  if (!block) return null

  const props = parsePropsFromBody(block.body)

  stack.add(cacheKey)
  for (const parent of parseExtendsParents(block.extendsClause)) {
    const parentFile = findTypeDefinition(parent) ?? filePath
    const inherited = resolveTypeProps(parent, parentFile, cache, stack)
    if (inherited?.length) props.push(...inherited)
  }
  stack.delete(cacheKey)

  const merged = [...new Set(props)]
  cache.set(cacheKey, merged)
  return merged
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
    const resolved = resolveTypeProps(iface, filePath)
    if (resolved?.length) return { props: resolved, interface: iface, file: filePath }
  }

  const propsExport = content.match(new RegExp(`export\\s+(?:type|interface)\\s+(\\w*${componentName}\\w*Props)`))
  if (propsExport) {
    const name = propsExport[1]
    const parsed = resolveTypeProps(name, filePath)
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

  const playgroundGaps = gaps.filter((r) => PLAYGROUND_COMPONENTS.has(r.name))
  const playgroundFailed =
    playgroundGaps.filter((r) => r.missing.length > 0 || r.bindingIssues?.length).length
  console.log(`\nPlayground components: ${PLAYGROUND_COMPONENTS.size}`)
  console.log(`Playground with gaps:    ${playgroundFailed}`)
  console.log(
    `\n${playgroundFailed ? "✗" : "✓"} Metadata prop parity check (${playgroundFailed} playground components with issues)\n`
  )
  process.exit(playgroundFailed > 0 ? 1 : 0)
}

main()
