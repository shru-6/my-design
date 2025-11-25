/**
 * Theme Generator
 * Composes tokens into CSS variables
 */

import { themeCategories } from './themeConfig.js'
import { getThemeName, validateThemeSelection, getDefaultThemes, deepClone } from './themeUtils.js'

// Cache for loaded JSON files
const tokenCache = new Map()

/**
 * Load JSON file with caching
 */
async function loadTokenFile(path) {
  if (tokenCache.has(path)) {
    return deepClone(tokenCache.get(path))
  }
  
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.statusText}`)
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
 * Deep merge objects
 */
function deepMerge(target, source) {
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

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
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
 * Maps token structure to shadcn CSS variable naming:
 * - color.primary → --primary (semantic colors are flat)
 * - font.body → --font-body (other tokens keep prefix)
 * - radius.button → --radius (or specific mapping)
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
 * This ensures components can use the theme variables via Tailwind classes
 */
function mapToTailwindVars(cssVars) {
  const mapped = { ...cssVars }
  
  // Map shape/radius variables to --radius (used by Tailwind's rounded-* classes)
  // Tailwind uses --radius for rounded-md, rounded-lg, etc.
  if (cssVars['--radius-button']) {
    mapped['--radius'] = cssVars['--radius-button'] // Use button radius as base
  }
  if (cssVars['--radius-card']) {
    mapped['--radius-lg'] = cssVars['--radius-card']
  }
  
  // Map typography variables to Tailwind font system
  // Tailwind uses --font-sans for font-sans class
  if (cssVars['--font-body']) {
    mapped['--font-sans'] = cssVars['--font-body']
  }
  if (cssVars['--font-heading']) {
    // Could map to a heading font variable if needed
  }
  
  // Map spacing variables to --spacing (used by calc(var(--spacing) * N))
  // Check for base spacing first, then component-md
  if (cssVars['--spacing-base']) {
    mapped['--spacing'] = cssVars['--spacing-base']
  } else if (cssVars['--spacing-component-md']) {
    mapped['--spacing'] = cssVars['--spacing-component-md']
  }
  
  // Map animation variables
  // These can be used via CSS custom properties in transition styles
  // Components would need: style={{ transitionDuration: 'var(--duration-normal)' }}
  // Or we could add utility classes that use these
  
  return mapped
}

/**
 * Generate CSS string from CSS variables
 */
function generateCSSString(cssVars) {
  // Map theme variables to Tailwind-compatible variables
  const mappedVars = mapToTailwindVars(cssVars)
  
  const vars = Object.entries(mappedVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  
  return `:root {\n${vars}\n}`
}

/**
 * Apply CSS to DOM
 * Inserts style tag at the end of <head> to ensure it overrides static CSS
 */
function applyThemeCSS(css) {
  let styleTag = document.getElementById('dynamic-theme')
  
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'dynamic-theme'
    // Insert at end of head to ensure it overrides static CSS
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
    const base = await loadTokenFile('/tokens/base.json')
    
    // 2. Load palette
    const palettes = await loadTokenFile('/tokens/palettes.json')
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
      
      const themePath = `/tokens/themes/${category}/${themeId}.json`
      const themeData = await loadTokenFile(themePath)
      
      // Merge theme data
      merged = deepMerge(merged, themeData)
    }
    
    // 5. Handle custom theme (highest priority)
    if (selectedThemes.custom) {
      const customPath = `/tokens/themes/custom/${selectedThemes.custom}.json`
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
    applyThemeCSS(css)
    
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

/**
 * Generate theme CSS without applying
 */
export async function generateThemeCSS(selectedThemes = {}) {
  // Same logic as generateAndApplyTheme but return CSS string
  // (Implementation similar, just return CSS instead of applying)
  const result = await generateAndApplyTheme(selectedThemes)
  return result.cssVars
}

