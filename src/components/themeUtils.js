/**
 * Theme Utilities
 * Pure utility functions for theme management
 * Note: generateAndApplyTheme has side effects (modifies DOM) but is the main theme application utility
 */

import { themeCategories } from './themeConfig.js'

/**
 * Generate theme combination name
 */
export function getThemeName(selectedThemes) {
  const parts = []
  
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
export function validateThemeSelection(selectedThemes, themeCategories) {
  const errors = []
  
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
export function getDefaultThemes() {
  return {
    color: 'white',
    typography: 'sans',
    shape: 'smooth',
    density: 'comfortable',
    animation: 'gentle'
  }
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Check if value is an object
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge objects
 */
export function deepMerge(target, source) {
  const output = { ...target }
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  
  return output
}

// Cache for loaded JSON files
const tokenCache = new Map()

/**
 * Load JSON file with caching
 */
/**
 * Get token base URL (supports package usage)
 * Can be overridden by setting window.__THEME_TOKENS_BASE__
 */
function getTokenBaseUrl() {
  if (typeof window !== 'undefined' && window.__THEME_TOKENS_BASE__) {
    return window.__THEME_TOKENS_BASE__
  }
  // Default: assume tokens are in public/tokens when used as package
  return '/tokens'
}

export async function loadTokenFile(path) {
  if (tokenCache.has(path)) {
    return deepClone(tokenCache.get(path))
  }
  
  try {
    // Handle both absolute paths and relative paths
    const baseUrl = getTokenBaseUrl()
    const fullPath = path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
    
    const response = await fetch(fullPath)
    if (!response.ok) {
      throw new Error(`Failed to load ${fullPath}: ${response.statusText}`)
    }
    const data = await response.json()
    tokenCache.set(path, data)
    return deepClone(data)
  } catch (error) {
    console.error(`Error loading token file ${path}:`, error)
    throw error
  }
}

/**
 * Resolve token references
 * {palette.blue.500} → actual color value
 */
function resolveReferences(tokens, palette) {
  const resolved = JSON.parse(JSON.stringify(tokens))
  
  function resolveValue(value) {
    if (typeof value !== 'string') return value
    
    // Match {path.to.token} pattern
    const match = value.match(/^\{([^}]+)\}$/)
    if (!match) return value
    
    const path = match[1].split('.')
    let current = { palette, ...resolved }
    
    for (const key of path) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        console.warn(`Token reference not found: {${match[1]}}`)
        return value // Return original if not found
      }
    }
    
    return typeof current === 'string' ? current : value
  }
  
  function traverse(obj) {
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
 * Flatten nested object to CSS variables
 * Maps token structure to CSS variable naming:
 * - color.primary → --primary (semantic colors are flat)
 * - font.body → --font-body (other tokens keep prefix)
 * - radius.button → --radius-button
 */
function flattenToCSS(tokens, prefix = '', result = {}, isColorContext = false) {
  for (const key in tokens) {
    const value = tokens[key]
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Check if we're entering the color object
      const enteringColor = key === 'color' && prefix === ''
      const inColorContext = isColorContext || enteringColor
      
      if (enteringColor) {
        // When entering color object, flatten without "color-" prefix
        flattenToCSS(value, '', result, true)
      } else if (isColorContext) {
        // Already in color context, continue with empty prefix
        flattenToCSS(value, '', result, true)
      } else {
        // For other tokens, keep the prefix structure
        const newPrefix = prefix ? `${prefix}-${key}` : key
        flattenToCSS(value, newPrefix, result, false)
      }
    } else {
      // Generate CSS variable name
      let cssKey
      if (isColorContext || (prefix === '' && key === 'color')) {
        // Semantic colors: --primary, --background, etc. (no "color-" prefix)
        cssKey = `--${key}`
      } else if (prefix === '') {
        // Top-level tokens (non-color)
        cssKey = `--${key}`
      } else {
        // Nested tokens: --font-body, --radius-button, etc.
        cssKey = `--${prefix}-${key}`
      }
      
      result[cssKey] = value
    }
  }
  
  return result
}

/**
 * Map theme variables to Tailwind-compatible CSS variables
 */
function mapToTailwindVars(cssVars) {
  const mapped = { ...cssVars }
  
  // Map shape/radius variables to --radius (used by Tailwind's rounded-* classes)
  if (cssVars['--radius-button']) {
    mapped['--radius'] = cssVars['--radius-button']
  }
  if (cssVars['--radius-card']) {
    mapped['--radius-lg'] = cssVars['--radius-card']
  }
  
  // Map typography variables to Tailwind font system
  if (cssVars['--font-body']) {
    mapped['--font-sans'] = cssVars['--font-body']
  }
  
  // Map spacing variables to --spacing
  if (cssVars['--spacing-base']) {
    mapped['--spacing'] = cssVars['--spacing-base']
  } else if (cssVars['--spacing-component-md']) {
    mapped['--spacing'] = cssVars['--spacing-component-md']
  }
  
  return mapped
}

/**
 * Generate CSS string from CSS variables
 */
function generateCSSString(cssVars) {
  const mappedVars = mapToTailwindVars(cssVars)
  
  const vars = Object.entries(mappedVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  
  return `:root {\n${vars}\n}`
}

/**
 * Apply CSS to DOM
 */
function applyThemeCSS(css) {
  let styleTag = document.getElementById('dynamic-theme')
  
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'dynamic-theme'
    document.head.appendChild(styleTag)
  }
  
  styleTag.textContent = css
}

/**
 * Generate and apply theme
 * Main function that composes everything
 */
export async function generateAndApplyTheme(selectedThemes = {}) {
  try {
    // Validate theme selection
    const validation = validateThemeSelection(selectedThemes, themeCategories)
    if (!validation.valid) {
      console.error('Invalid theme selection:', validation.errors)
      throw new Error(`Invalid theme selection: ${validation.errors.join(', ')}`)
    }
    
    // 1. Load base tokens
    const base = await loadTokenFile('base.json')
    
    // 2. Load palette
    const palettes = await loadTokenFile('palettes.json')
    const palette = palettes.palette
    
    // 3. Deep merge: base → palette
    let merged = deepMerge(base, { palette })
    
    // 4. Load and merge category themes in order
    const categoryOrder = Object.values(themeCategories)
      .sort((a, b) => a.order - b.order)
      .map(cat => cat.name.toLowerCase())
    
    for (const category of categoryOrder) {
      if (category === 'custom') continue // Handle custom separately
      
      const themeId = selectedThemes[category]
      if (!themeId) continue
      
      const themePath = `themes/${category}/${themeId}.json`
      const themeData = await loadTokenFile(themePath)
      
      // Merge theme data
      merged = deepMerge(merged, themeData)
    }
    
    // 5. Handle custom theme (highest priority)
    if (selectedThemes.custom) {
      const customPath = `themes/custom/${selectedThemes.custom}.json`
      const customData = await loadTokenFile(customPath)
      merged = deepMerge(merged, customData)
    }
    
    // 6. Resolve references
    const resolved = resolveReferences(merged, palette)
    
    // 7. Flatten to CSS variables
    const cssVars = flattenToCSS(resolved)
    
    // 8. Generate CSS string
    const css = generateCSSString(cssVars)
    
    // 9. Apply to DOM
    if (typeof document !== 'undefined') {
      applyThemeCSS(css)
    }
    
    return {
      success: true,
      themeName: getThemeName(selectedThemes),
      cssVars
    }
  } catch (error) {
    console.error('Error generating theme:', error)
    throw error
  }
}
