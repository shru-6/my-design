/**
 * Theme Utilities
 * Helper functions for theme management
 */

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

