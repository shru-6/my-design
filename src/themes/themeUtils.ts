/**
 * Theme Utilities
 * Loads token JSON (async, with caching) and orchestrates the resolve → apply
 * pipeline for the runtime (React) path. The pure transform steps themselves
 * live in themeTransform.ts, shared with the blocking pre-hydration path in
 * applyThemeSync.ts.
 */

import { defaultRegistry, THEME_CATEGORY_ORDER, type ThemeRegistry } from './themeConfig'
import type { ThemeSelection } from './useTheme'
import { EMBEDDED_TOKEN_BASE, getEmbeddedToken, normalizeTokenPath } from './tokenLoader'
import { deepClone, deepMerge, resolveReferences, flattenToCSS, generateCSSString, writeThemeStyleTag } from './themeTransform'

/**
 * Generate theme combination name
 */
export function getThemeName(selectedThemes: ThemeSelection): string {
  const parts: string[] = []

  if (selectedThemes.color) parts.push(selectedThemes.color)
  if (selectedThemes.typography) parts.push(selectedThemes.typography)
  if (selectedThemes.shape) parts.push(selectedThemes.shape)
  if (selectedThemes.density) parts.push(selectedThemes.density)
  if (selectedThemes.animation) parts.push(selectedThemes.animation)

  return parts.length > 0 ? parts.join('-') : 'default'
}

/**
 * Validate theme selection
 */
export function validateThemeSelection(selectedThemes: ThemeSelection, themeCategories: any) {
  const errors: string[] = []

  for (const [category, themeId] of Object.entries(selectedThemes)) {
    if (!themeId) continue

    const categoryConfig = themeCategories[category]
    if (!categoryConfig) {
      errors.push(`Unknown category: ${category}`)
      continue
    }

    const theme = categoryConfig.themes[themeId]
    if (!theme) {
      errors.push(`Theme ${themeId} not found in category ${category}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Get default theme selections
 */
export function getDefaultThemes(): ThemeSelection {
  return {
    color: 'white',
    typography: 'sans',
    shape: 'smooth',
    density: 'comfortable',
    animation: 'gentle'
  }
}

// Cache for loaded JSON files (keyed by normalized path)
const tokenCache = new Map<string, any>()

/**
 * Resolve preferred token bases.
 * Order matters: consumer override → env override → embedded fallback → public fallback.
 * - embedded fallback keeps the library working even when /public/tokens is missing.
 * - public fallback keeps compatibility for apps that copy tokens to /public.
 */
function getTokenBaseCandidates(): string[] {
  const bases: Array<string> = []

  if (typeof window !== 'undefined' && (window as any).__THEME_TOKENS_BASE__) {
    bases.push((window as any).__THEME_TOKENS_BASE__)
  }

  const env = typeof globalThis !== 'undefined' ? (globalThis as any).process?.env : undefined
  if (env?.DESIGN_SYSTEM_TOKENS_BASE) {
    bases.push(env.DESIGN_SYSTEM_TOKENS_BASE)
  }

  // Embedded fallback ensures the theme system works out-of-the-box when tokens are bundled
  bases.push(EMBEDDED_TOKEN_BASE)

  // Legacy/public fallback for users who copy tokens to /public
  bases.push('/tokens')

  // Remove falsy/duplicate entries while preserving order
  return Array.from(new Set(bases.filter(Boolean)))
}

/**
 * Load JSON file with caching
 */
export async function loadTokenFile(path: string): Promise<any> {
  const normalizedPath = normalizeTokenPath(path)

  if (tokenCache.has(normalizedPath)) {
    return deepClone(tokenCache.get(normalizedPath))
  }

  const bases = getTokenBaseCandidates()

  for (const base of bases) {
    // Embedded fallback (no network call)
    if (base === EMBEDDED_TOKEN_BASE) {
      const embedded = getEmbeddedToken(normalizedPath)
      if (embedded) {
        tokenCache.set(normalizedPath, embedded)
        return deepClone(embedded)
      }
      continue
    }

    // Build URL from base + normalized path
    const url = base.endsWith('/') ? `${base}${normalizedPath}` : `${base}/${normalizedPath}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        // 404 means file doesn't exist - try next base
        if (response.status === 404) {
          continue
        }
        throw new Error(`Failed to load ${url}: ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      // Check if response is actually JSON (not HTML error page)
      if (!contentType || !contentType.includes('application/json')) {
        continue
      }

      const data = await response.json()
      tokenCache.set(normalizedPath, data)
      return deepClone(data)
    } catch (error) {
      // Only log errors in debug mode; try next base
      if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
        console.warn(`Error loading token file ${url}:`, error)
      }
    }
  }

  // No base succeeded
  return null
}

/**
 * Debug helper: Enable debug mode to see all CSS variables in console
 * Call this in browser console: window.__DESIGN_SYSTEM_DEBUG__ = true
 */
export function enableDebugMode(): void {
  if (typeof window !== 'undefined') {
    (window as any).__DESIGN_SYSTEM_DEBUG__ = true
    console.log('🔍 Design System debug mode enabled')
    console.log('CSS variables will be logged when themes change')
  }
}

/**
 * Debug helper: Get all current CSS variables
 */
export function getCurrentCSSVariables(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const styleTag = document.getElementById('dynamic-theme')
  if (!styleTag) return {}

  const cssText = styleTag.textContent || ''
  const vars: Record<string, string> = {}
  const matches = cssText.matchAll(/--([^:]+):\s*([^;]+);/g)

  for (const match of matches) {
    vars[`--${match[1].trim()}`] = match[2].trim()
  }

  return vars
}

/**
 * Generate and apply theme
 * Main function that composes everything. `registry` defaults to the shared
 * singleton — pass a custom one (see createThemeRegistry) so a consumer-defined
 * theme set is what gets validated and named here, not just the base set.
 */
export async function generateAndApplyTheme(
  selectedThemes: ThemeSelection = {},
  registry: Pick<ThemeRegistry, 'getThemeCategories'> = defaultRegistry
): Promise<{
  success: boolean
  themeName: string
  cssVars: Record<string, string>
}> {
  try {
    const themeCategories = await registry.getThemeCategories()

    // Validate theme selection (but be lenient with custom themes - they might not exist yet)
    const validation = validateThemeSelection(selectedThemes, themeCategories)
    if (!validation.valid) {
      // Filter out custom theme errors - custom themes are optional
      const nonCustomErrors = validation.errors.filter(err => !err.includes('custom'))
      if (nonCustomErrors.length > 0) {
        // Only log in debug mode
        if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
          console.error('Invalid theme selection:', nonCustomErrors)
        }
        throw new Error(`Invalid theme selection: ${nonCustomErrors.join(', ')}`)
      }
      // If only custom theme errors, just warn and continue
      if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
        console.warn('Custom theme files not found, continuing without them:', validation.errors)
      }
    }

    // 1. Load base tokens
    const base = await loadTokenFile('/tokens/base.json')
    if (!base) {
      throw new Error('Failed to load base tokens from /tokens/base.json')
    }

    // 2. Load palette
    const palettes = await loadTokenFile('/tokens/palettes.json')
    if (!palettes || !palettes.palette) {
      throw new Error('Failed to load palette from /tokens/palettes.json')
    }
    const palette = palettes.palette

    // 3. Deep merge: base → palette
    let merged = deepMerge(base, { palette })

    // 4. Load and merge category themes in order (use centralized order)
    for (const category of THEME_CATEGORY_ORDER) {
      const themeId = selectedThemes[category as keyof ThemeSelection] as string | undefined
      if (!themeId) continue

      const themePath = `/tokens/themes/${category}/${themeId}.json`
      const themeData = await loadTokenFile(themePath)

      // Only merge if theme data was successfully loaded
      if (themeData) {
        merged = deepMerge(merged, themeData)
      } else {
        // For custom themes, silently skip if not found (user-created, optional)
        // For other categories, warn in debug mode
        if (category !== 'custom' && typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
          console.warn(`Theme file not found: ${themePath}`)
        } else if (category === 'custom' && typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
          console.warn(`Custom theme file not found: ${themePath} (this is normal if you haven't created it yet)`)
        }
      }
    }

    // 5. Resolve references, flatten to CSS variables, apply
    const resolved = resolveReferences(merged, palette)
    const cssVars = flattenToCSS(resolved)
    const css = generateCSSString(cssVars)

    if (typeof document !== 'undefined') {
      writeThemeStyleTag(css)

      // Debug: expose CSS variables to window for inspection
      if ((window as any).__DESIGN_SYSTEM_DEBUG__) {
        console.group('🎨 Design System CSS Variables')
        console.table(cssVars)
        console.log('Total variables:', Object.keys(cssVars).length);
        (window as any).__DESIGN_SYSTEM_VARS__ = cssVars
        console.log('💡 Access CSS variables via: window.__DESIGN_SYSTEM_VARS__')
        console.groupEnd()
      }
    }

    return {
      success: true,
      themeName: getThemeName(selectedThemes),
      cssVars
    }
  } catch (error) {
    // Only log in debug mode
    if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
      console.error('Error generating theme:', error)
    }
    throw error
  }
}
