/**
 * Pure token-transform logic shared by the async path (themeUtils.ts, used by
 * useTheme()) and the blocking sync path (applyThemeSync.ts, used pre-hydration).
 * Both loaders differ (fetch vs. blocking XHR) but the merge → resolve →
 * flatten → map pipeline is identical — it used to be copied twice.
 */

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge objects. `source` wins on conflicting leaf values.
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target } as T

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] } as any)
        } else {
          (output as any)[key] = deepMerge(target[key], source[key] as any)
        }
      } else {
        Object.assign(output, { [key]: source[key] } as any)
      }
    })
  }

  return output
}

/**
 * Resolve token references: {palette.blue.500} → actual color value.
 */
export function resolveReferences(tokens: any, palette: any): any {
  const resolved = JSON.parse(JSON.stringify(tokens))

  function resolveValue(value: any): any {
    if (typeof value !== 'string') return value

    const match = value.match(/^\{([^}]+)\}$/)
    if (!match) return value

    const path = match[1].split('.')
    let current: any = { palette, ...resolved }

    for (const key of path) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        // Token reference not found - return original value
        if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
          console.warn(`Token reference not found: {${match[1]}}`)
        }
        return value
      }
    }

    return typeof current === 'string' ? current : value
  }

  function traverse(obj: any): void {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverse(obj[key])
      } else {
        obj[key] = resolveValue(obj[key])
      }
    }
  }

  traverse(resolved)
  return resolved
}

function isHexColor(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
}

/**
 * Convert hex color to HSL format (without hsl() wrapper) for hsl(var(--color)) usage.
 * Returns "h s% l%".
 */
function hexToHSL(hex: string): string {
  hex = hex.replace('#', '')

  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  h = Math.round(h * 360)
  s = Math.round(s * 100)
  const lPercent = Math.round(l * 100)

  return `${h} ${s}% ${lPercent}%`
}

/**
 * Flatten nested token object to CSS variables.
 * - color.primary → --primary (semantic colors are flat)
 * - font.body → --font-body
 * - radius.button → --radius-button
 * - spacing.component.md → --spacing-component-md
 */
export function flattenToCSS(
  tokens: any,
  prefix = '',
  result: Record<string, string> = {},
  isColorContext = false
): Record<string, string> {
  for (const key in tokens) {
    const value = tokens[key]

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const enteringColor = key === 'color' && prefix === ''
      const enteringTypography = key === 'typography' && prefix === ''
      const enteringShape = key === 'shape' && prefix === ''
      const enteringAnimation = key === 'animation' && prefix === ''
      const enteringDensity = key === 'spacing' && prefix === '' // Density uses spacing key
      const inColorContext = isColorContext || enteringColor

      if (enteringColor) {
        flattenToCSS(value, '', result, true)
      } else if (enteringTypography || enteringShape || enteringAnimation) {
        // Handles both old structure (typography.font.body) and new (font.body)
        flattenToCSS(value, '', result, false)
      } else if (enteringDensity) {
        // spacing.component.md → --spacing-component-md
        flattenToCSS(value, 'spacing', result, false)
      } else if (inColorContext) {
        flattenToCSS(value, '', result, true)
      } else {
        const newPrefix = prefix ? `${prefix}-${key}` : key
        flattenToCSS(value, newPrefix, result, false)
      }
    } else {
      let cssKey: string
      if (isColorContext || (prefix === '' && key === 'color')) {
        cssKey = `--${key}` // Semantic colors: --primary, --background (no "color-" prefix)
      } else if (prefix === '') {
        cssKey = `--${key}`
      } else {
        cssKey = `--${prefix}-${key}`
      }

      let finalValue = value
      if (isColorContext && typeof value === 'string' && isHexColor(value)) {
        finalValue = hexToHSL(value)
      }

      result[cssKey] = finalValue
    }
  }

  return result
}

/**
 * Map theme variables to Tailwind-compatible CSS variables.
 * Passes through everything, only adds convenience aliases Tailwind expects.
 */
export function mapToTailwindVars(cssVars: Record<string, string>): Record<string, string> {
  const mapped = { ...cssVars }

  if (cssVars['--font-body'] && !cssVars['--font-sans']) {
    mapped['--font-sans'] = cssVars['--font-body']
  }
  if (cssVars['--spacing-base'] && !cssVars['--spacing']) {
    mapped['--spacing'] = cssVars['--spacing-base']
  } else if (cssVars['--spacing-component-md'] && !cssVars['--spacing']) {
    mapped['--spacing'] = cssVars['--spacing-component-md']
  }

  return mapped
}

/**
 * Build the `:root { ... }` CSS string from mapped variables (sorted for
 * easier diffing/debugging).
 */
export function generateCSSString(cssVars: Record<string, string>): string {
  const mappedVars = mapToTailwindVars(cssVars)
  const vars = Object.entries(mappedVars)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  return `:root {\n${vars}\n}`
}

/**
 * Write the resolved CSS to the shared <style id="dynamic-theme"> tag,
 * always moving it to the end of <head> so it wins over earlier styles.
 */
export function writeThemeStyleTag(css: string): void {
  let styleTag = document.getElementById('dynamic-theme')
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'dynamic-theme'
  }
  document.head.appendChild(styleTag)
  styleTag.textContent = css
}
