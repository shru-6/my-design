// Code generator for component usage
// Generates JSX code as user would write after importing
import type { PropDefinition } from "./componentMetadata"

const keywordIconMap: Record<string, string> = {
  search: "Search",
  plus: "Plus",
  check: "Check",
  x: "X",
  star: "Star",
  heart: "Heart",
  user: "User",
  settings: "Settings",
  info: "Info",
  warning: "AlertTriangle",
  loader: "Loader2",
  bell: "Bell",
}

function formatReactNodeLiteral(value: unknown): string {
  if (typeof value !== "string") {
    return `{${JSON.stringify(value)}}`
  }

  const trimmed = value.trim()
  const iconName = keywordIconMap[trimmed.toLowerCase()]
  if (iconName) {
    return `{<${iconName} className="h-4 w-4" />}`
  }

  // If user entered JSX-like content, keep it as JSX.
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return `{${trimmed}}`
  }

  return `{${JSON.stringify(trimmed)}}`
}

function formatChildren(children: string): string {
  const trimmed = children.trim()
  if (!trimmed) return ""

  // Keep JSX-like children as JSX.
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return trimmed
  }

  // Keep JS expression children as-is.
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed
  }

  // Default to plain text children.
  return trimmed
}

export function generateComponentCode(
  componentName: string,
  props: Record<string, any>,
  children?: string,
  propDefinitions: PropDefinition[] = []
): string {
  const propTypeMap = new Map(propDefinitions.map((prop) => [prop.name, prop.type]))
  const galleryOnlyKeys = new Set(
    propDefinitions.filter((p) => p.galleryOnly).map((p) => p.name)
  )

  const propEntries = Object.entries(props)
    .filter(([key, value]) => {
      if (galleryOnlyKeys.has(key)) return false
      if (value === undefined || value === null) return false
      if (value === "") return false
      if (typeof value === "function") return false
      if (key === "children") return false
      if (value === false && key.startsWith("is")) return false
      return true
    })
    .map(([key, value]) => {
      const propType = propTypeMap.get(key)
      if (propType === "expression" && typeof value === "string" && value.trim() !== "") {
        return `${key}={${value.trim()}}`
      }
      if (propType === "reactNode") {
        return `${key}=${formatReactNodeLiteral(value)}`
      }

      if (typeof value === "string") {
        // Escape quotes in strings
        const escaped = value.replace(/"/g, '&quot;')
        return `${key}="${escaped}"`
      }
      if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`
      }
      if (typeof value === 'number') {
        return `${key}={${value}}`
      }
      if (Array.isArray(value)) {
        return `${key}={${JSON.stringify(value)}}`
      }
      if (typeof value === 'object') {
        return `${key}={${JSON.stringify(value)}}`
      }
      return `${key}="${value}"`
    })

  const propsString = propEntries.length > 0 ? " " + propEntries.join(" ") : ""

  if (children) {
    return `<${componentName}${propsString}>\n  ${formatChildren(children)}\n</${componentName}>`
  }

  // Self-closing if no children
  if (propEntries.length === 0 && !children) {
    return `<${componentName} />`
  }

  return `<${componentName}${propsString} />`
}

// Format code with proper indentation
export function formatCode(code: string, indent: number = 0): string {
  const indentStr = '  '.repeat(indent)
  return code
    .split('\n')
    .map(line => indentStr + line.trim())
    .join('\n')
}

// Generate full component usage example
export function generateUsageCode(
  componentName: string,
  props: Record<string, any>,
  children?: string,
  propDefinitions: PropDefinition[] = []
): string {
  const code = generateComponentCode(componentName, props, children, propDefinitions)
  return formatCode(code)
}
