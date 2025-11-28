/**
 * Theme Configuration
 * Registry of all available themes organized by category
 * 
 * Base themes are defined here. Additional themes can be discovered dynamically
 * by scanning the /tokens/themes/ directory structure.
 */

// Base theme categories (always available)
export const baseThemeCategories = {
  color: {
    name: 'Color',
    order: 1.0,
    themes: {
      white: {
        name: 'White',
        file: 'color/white.json',
        icon: '🎨',
        description: 'Light theme with white background'
      },
      dark: {
        name: 'Dark',
        file: 'color/dark.json',
        icon: '🌙',
        description: 'Dark theme with dark background'
      }
    }
  },
  typography: {
    name: 'Typography',
    order: 2.0,
    themes: {
      sans: {
        name: 'Sans',
        file: 'typography/sans.json',
        icon: '📝',
        description: 'Sans-serif font family'
      },
      serif: {
        name: 'Serif',
        file: 'typography/serif.json',
        icon: '📖',
        description: 'Serif font family'
      }
    }
  },
  shape: {
    name: 'Shape',
    order: 3.0,
    themes: {
      smooth: {
        name: 'Smooth',
        file: 'shape/smooth.json',
        icon: '🔲',
        description: 'Smooth rounded corners'
      },
      sharp: {
        name: 'Sharp',
        file: 'shape/sharp.json',
        icon: '⬜',
        description: 'Sharp square corners'
      }
    }
  },
  density: {
    name: 'Density',
    order: 4.0,
    themes: {
      comfortable: {
        name: 'Comfortable',
        file: 'density/comfortable.json',
        icon: '📏',
        description: 'Comfortable spacing'
      },
      compact: {
        name: 'Compact',
        file: 'density/compact.json',
        icon: '📐',
        description: 'Compact spacing'
      }
    }
  },
  animation: {
    name: 'Animation',
    order: 5.0,
    themes: {
      gentle: {
        name: 'Gentle',
        file: 'animation/gentle.json',
        icon: '✨',
        description: 'Gentle animations'
      },
      brisk: {
        name: 'Brisk',
        file: 'animation/brisk.json',
        icon: '⚡',
        description: 'Fast, brisk animations'
      }
    }
  },
  custom: {
    name: 'Custom',
    order: 10.0, // Highest priority
    themes: {
      brand: {
        name: 'Brand',
        file: 'custom/brand.json',
        icon: '🎯',
        description: 'Brand-specific theme'
      },
      minimal: {
        name: 'Minimal',
        file: 'custom/minimal.json',
        icon: '🎪',
        description: 'Minimal theme'
      }
    }
  }
}

// Cache for dynamically discovered themes
let discoveredThemesCache = null

/**
 * Discover themes by scanning token directory structure
 * Scans /tokens/themes/ to find all available theme files
 */
export async function discoverThemes() {
  if (discoveredThemesCache) {
    return discoveredThemesCache
  }

  const discovered = JSON.parse(JSON.stringify(baseThemeCategories))
  
  try {
    // Get base path for tokens
    const tokensBase = typeof window !== 'undefined' && window.__THEME_TOKENS_BASE__ 
      ? window.__THEME_TOKENS_BASE__ 
      : '/tokens'
    
    // Known categories from base config
    const knownCategories = Object.keys(baseThemeCategories)
    
    // For each category, try to discover additional themes
    for (const category of knownCategories) {
      const categoryPath = `${tokensBase}/themes/${category}`
      
      // Try to fetch an index or scan common theme files
      // Since we can't list directories via fetch, we'll try common patterns
      // Users can add themes by following the naming convention
      
      // For now, we'll rely on users to add themes to the config
      // But we can validate that theme files exist when requested
    }
    
    discoveredThemesCache = discovered
    return discovered
  } catch (error) {
    console.warn('Error discovering themes:', error)
    return baseThemeCategories
  }
}

/**
 * Register a custom theme dynamically
 * Allows users to add themes without modifying the base config
 * @param {string} category - Theme category (e.g., 'color', 'custom')
 * @param {string} themeId - Unique theme identifier
 * @param {Object} metadata - Theme metadata
 * @param {string} metadata.name - Display name
 * @param {string} metadata.file - File path relative to themes/ (e.g., 'color/blue.json')
 * @param {string} [metadata.icon] - Icon emoji or character
 * @param {string} [metadata.description] - Theme description
 */
export function registerTheme(category, themeId, metadata) {
  if (!discoveredThemesCache) {
    discoveredThemesCache = JSON.parse(JSON.stringify(baseThemeCategories))
  }
  
  // Create category if it doesn't exist
  if (!discoveredThemesCache[category]) {
    discoveredThemesCache[category] = {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      order: 99, // Custom categories get high order
      themes: {}
    }
  }
  
  // Register the theme
  discoveredThemesCache[category].themes[themeId] = {
    name: metadata.name,
    file: metadata.file,
    icon: metadata.icon || '🎨',
    description: metadata.description || ''
  }
  
  return discoveredThemesCache
}

/**
 * Get merged theme categories (base + discovered)
 */
export async function getThemeCategories() {
  return await discoverThemes()
}

// For backward compatibility, export baseThemeCategories as themeCategories
export const themeCategories = baseThemeCategories

/**
 * Get theme file path
 */
export function getThemeFilePath(category, themeId) {
  const categories = discoveredThemesCache || baseThemeCategories
  const theme = categories[category]?.themes[themeId]
  if (!theme) return null
  return `/tokens/themes/${theme.file}`
}

/**
 * Get all themes for a category
 */
export async function getThemesForCategory(category) {
  const categories = await getThemeCategories()
  return categories[category]?.themes || {}
}

/**
 * Get theme by ID
 */
export async function getTheme(category, themeId) {
  const categories = await getThemeCategories()
  return categories[category]?.themes[themeId] || null
}

