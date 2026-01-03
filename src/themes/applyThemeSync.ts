/**
 * Synchronous theme application for blocking script execution
 * This runs before React hydrates to prevent theme flash
 */

import type { ThemeSelection } from './useTheme'
import { getDefaultThemes } from './themeUtils'
import { THEME_CATEGORY_ORDER } from './themeConfig'
import { EMBEDDED_TOKEN_BASE, getEmbeddedToken, normalizeTokenPath } from './tokenLoader'

/**
 * LocalStorage key for storing theme selections
 * 
 * ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
 * 1. src/themes/useTheme.tsx - STORAGE_KEY constant (TypeScript source)
 * 2. scripts/apply-theme-sync.js - STORAGE_KEY constant (standalone script, can't import)
 * 3. scripts/applyThemeSync.js - STORAGE_KEY constant
 */
const STORAGE_KEY = 'design-system-theme'

/**
 * Resolve token base candidates for the blocking loader.
 * Order: consumer override → env override → embedded → public.
 * Embedded keeps things working even if /public/tokens is missing.
 */
function getTokenBaseCandidatesSync(): string[] {
  const bases: Array<string> = []

  if (typeof window !== 'undefined' && (window as any).__THEME_TOKENS_BASE__) {
    bases.push((window as any).__THEME_TOKENS_BASE__)
  }

  const env = typeof globalThis !== 'undefined' ? (globalThis as any).process?.env : undefined
  if (env?.DESIGN_SYSTEM_TOKENS_BASE) {
    bases.push(env.DESIGN_SYSTEM_TOKENS_BASE)
  }

  bases.push(EMBEDDED_TOKEN_BASE)
  bases.push('/tokens')

  return Array.from(new Set(bases.filter(Boolean)))
}

/**
 * Apply theme synchronously using blocking XMLHttpRequest
 * This prevents flash of unstyled content
 */
export function applyThemeSync(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  const tokenBases = getTokenBaseCandidatesSync()

  // Get theme from localStorage
  let selectedThemes: ThemeSelection = getDefaultThemes()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      selectedThemes = JSON.parse(stored)
    }
  } catch {
    // Use defaults if parse fails
  }

  // Load token files synchronously (blocking)
  try {
    const base = loadJSONSync('/tokens/base.json', tokenBases)
    if (!base) {
      // Base tokens are required - can't continue
      return
    }
    
    const palettes = loadJSONSync('/tokens/palettes.json', tokenBases)
    const palette = palettes?.palette || {}
    
    // Merge base with palette
    let merged = deepMergeSync(base, { palette })

    // Load theme files (includes custom category)
    for (const category of THEME_CATEGORY_ORDER) {
      const themeId = selectedThemes[category as keyof ThemeSelection] as string | undefined
      if (!themeId) continue

      const themeData = loadJSONSync(`/tokens/themes/${category}/${themeId}.json`, tokenBases)
      if (themeData) {
        merged = deepMergeSync(merged, themeData)
      }
      // If themeData is null, file doesn't exist - skip silently (custom themes are optional)
    }

    // Resolve references
    const resolved = resolveReferencesSync(merged, palette)

    // Flatten to CSS variables
    const cssVars = flattenToCSSSync(resolved)

    // Map to Tailwind-compatible variables
    const mappedVars = mapToTailwindVarsSync(cssVars)

    // Generate and apply CSS
    const css = `:root {\n${Object.entries(mappedVars).map(([key, value]) => `  ${key}: ${value};`).join('\n')}\n}`
    
    let styleTag = document.getElementById('dynamic-theme')
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'dynamic-theme'
    }
    // Always append (moves it to the end) so vars win over earlier styles
    document.head.appendChild(styleTag)
    styleTag.textContent = css
  } catch (error) {
    // Silently fail - theme will apply via React hook
    // Only log in debug mode
    if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
      console.warn('Sync theme application failed, will apply via React:', error)
    }
  }
}

/**
 * Load JSON file synchronously (blocking)
 */
function loadJSONSync(path: string, bases: string[]): any {
  const normalizedPath = normalizeTokenPath(path)

  for (const base of bases) {
    // Embedded fallback (no network)
    if (base === EMBEDDED_TOKEN_BASE) {
      const embedded = getEmbeddedToken(normalizedPath)
      if (embedded) {
        return deepCloneSync(embedded)
      }
      continue
    }

  try {
    const xhr = new XMLHttpRequest()
      const url = base.endsWith('/') ? `${base}${normalizedPath}` : `${base}/${normalizedPath}`
      xhr.open('GET', url, false) // false = synchronous
    xhr.send(null)
    
      // 404 means file doesn't exist - try next base
    if (xhr.status === 404) {
        continue
    }
    
    if (xhr.status === 200 || xhr.status === 0) {
      const contentType = xhr.getResponseHeader('content-type')
      // Check if response is actually JSON (not HTML error page)
      if (contentType && contentType.includes('application/json')) {
        return JSON.parse(xhr.responseText)
      }
        // If not JSON (likely HTML error page), try next base
        continue
    }
  } catch {
      // Try next base
    }
  }
  return null
}

/**
 * Deep merge objects (synchronous version)
 */
function deepMergeSync(target: any, source: any): any {
  const output = { ...target }
  
  if (isObjectSync(target) && isObjectSync(source)) {
    Object.keys(source).forEach(key => {
      if (isObjectSync(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMergeSync(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  
  return output
}

function deepCloneSync<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function isObjectSync(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Resolve token references synchronously
 */
function resolveReferencesSync(tokens: any, palette: any): any {
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

/**
 * Convert hex color to HSL format (without hsl() wrapper)
 * Returns format: "h s% l%" for use with hsl(var(--color))
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
 * Check if a string is a hex color
 */
function isHexColor(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
}

/**
 * Flatten nested object to CSS variables (synchronous version)
 * Handles both old structure (typography.font.body) and new (font.body)
 */
function flattenToCSSSync(tokens: any, prefix = '', result: Record<string, string> = {}, isColorContext = false): Record<string, string> {
  for (const key in tokens) {
    const value = tokens[key]
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Special handling: color, typography, shape, animation, and density objects flatten without their category prefix
      const enteringColor = key === 'color' && prefix === ''
      const enteringTypography = key === 'typography' && prefix === ''
      const enteringShape = key === 'shape' && prefix === ''
      const enteringAnimation = key === 'animation' && prefix === ''
      const enteringDensity = key === 'spacing' && prefix === '' // Density uses spacing key
      const inColorContext = isColorContext || enteringColor
      
      if (enteringColor) {
        // When entering color object, flatten without "color-" prefix
        flattenToCSSSync(value, '', result, true)
      } else if (enteringTypography) {
        // When entering typography object, flatten without "typography-" prefix
        // This handles both old structure (typography.font.body) and new (font.body)
        flattenToCSSSync(value, '', result, false)
      } else if (enteringShape) {
        // When entering shape object, flatten without "shape-" prefix
        // This handles both old structure (shape.radius.button) and new (radius.button)
        flattenToCSSSync(value, '', result, false)
      } else if (enteringAnimation) {
        // When entering animation object, flatten without "animation-" prefix
        // animation.duration.fast → --duration-fast
        flattenToCSSSync(value, '', result, false)
      } else if (enteringDensity) {
        // When entering density/spacing object at root, we need to preserve "spacing-" prefix
        // spacing.component.md → --spacing-component-md
        // Pass "spacing" as prefix so nested keys get "spacing-" prefix
        flattenToCSSSync(value, 'spacing', result, false)
      } else if (inColorContext) {
        // Already in color context, continue with empty prefix
        flattenToCSSSync(value, '', result, true)
      } else {
        // For all other tokens, use simple prefix-based flattening
        // font.body → --font-body, radius.button → --radius-button, spacing.component.md → --spacing-component-md
        const newPrefix = prefix ? `${prefix}-${key}` : key
        flattenToCSSSync(value, newPrefix, result, false)
      }
    } else {
      // Generate CSS variable name
      let cssKey: string
      if (isColorContext || (prefix === '' && key === 'color')) {
        // Semantic colors: --primary, --background, etc. (no "color-" prefix)
        cssKey = `--${key}`
      } else if (prefix === '') {
        // Top-level tokens (non-color)
        cssKey = `--${key}`
      } else {
        // Nested tokens: --font-body, --radius-button, --spacing-component-md, etc.
        cssKey = `--${prefix}-${key}`
      }
      
      // Convert hex colors to HSL format for Tailwind compatibility
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
 * Map theme variables to Tailwind-compatible CSS variables (synchronous version)
 * Automatically passes through ALL CSS variables, only adds convenience mappings
 */
function mapToTailwindVarsSync(cssVars: Record<string, string>): Record<string, string> {
  // Start with all generated variables - they're all valid CSS variables
  const mapped = { ...cssVars }
  
  // Only add convenience mappings for Tailwind's expected variable names
  if (cssVars['--radius-button'] && !cssVars['--radius']) {
    mapped['--radius'] = cssVars['--radius-button']
  }
  if (cssVars['--radius-card'] && !cssVars['--radius-lg']) {
    mapped['--radius-lg'] = cssVars['--radius-card']
  }
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

