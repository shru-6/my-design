/**
 * Synchronous theme application for blocking script execution.
 * Runs before React hydrates to prevent a flash of unstyled content.
 * Loads tokens with blocking XHR (the one thing that has to be sync here);
 * the merge → resolve → flatten pipeline itself is shared with themeUtils.ts
 * via themeTransform.ts.
 */

import type { ThemeSelection } from './useTheme'
import { getDefaultThemes } from './themeUtils'
import { THEME_CATEGORY_ORDER } from './themeConfig'
import { EMBEDDED_TOKEN_BASE, getEmbeddedToken, normalizeTokenPath } from './tokenLoader'
import { deepClone, deepMerge, resolveReferences, flattenToCSS, generateCSSString, writeThemeStyleTag } from './themeTransform'
import { STORAGE_KEY } from './constants'

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
 * Load JSON file synchronously (blocking)
 */
function loadJSONSync(path: string, bases: string[]): any {
  const normalizedPath = normalizeTokenPath(path)

  for (const base of bases) {
    // Embedded fallback (no network)
    if (base === EMBEDDED_TOKEN_BASE) {
      const embedded = getEmbeddedToken(normalizedPath)
      if (embedded) {
        return deepClone(embedded)
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
    let merged = deepMerge(base, { palette })

    // Load theme files (includes custom category)
    for (const category of THEME_CATEGORY_ORDER) {
      const themeId = selectedThemes[category as keyof ThemeSelection] as string | undefined
      if (!themeId) continue

      const themeData = loadJSONSync(`/tokens/themes/${category}/${themeId}.json`, tokenBases)
      if (themeData) {
        merged = deepMerge(merged, themeData)
      }
      // If themeData is null, file doesn't exist - skip silently (custom themes are optional)
    }

    // Resolve references, flatten to CSS variables, apply
    const resolved = resolveReferences(merged, palette)
    const cssVars = flattenToCSS(resolved)
    const css = generateCSSString(cssVars)
    writeThemeStyleTag(css)
  } catch (error) {
    // Silently fail - theme will apply via React hook
    // Only log in debug mode
    if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
      console.warn('Sync theme application failed, will apply via React:', error)
    }
  }
}
