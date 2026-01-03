/**
 * Theme Configuration
 * Registry of all available themes organized by category
 * 
 * Base themes are defined here. Additional themes can be discovered dynamically
 * by scanning the /tokens/themes/ directory structure.
 */

export type ThemeMetadata = {
  name: string
  file: string
  icon: string
  description: string
}

export type ThemeCategory = {
  name: string
  order: number
  themes: Record<string, ThemeMetadata>
}

/**
 * Centralized theme category order
 * Used everywhere to ensure consistency
 * Custom category is included but handled specially (optional, user-created files)
 * 
 * ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
 * 1. scripts/themeConfig.js - THEME_CATEGORY_ORDER (JavaScript version)
 * 2. scripts/apply-theme-sync.js - THEME_CATEGORY_ORDER constant (standalone script, can't import)
 */
export const THEME_CATEGORY_ORDER = ['color', 'typography', 'shape', 'density', 'animation', 'custom'] as const

// Base theme categories (always available)
export const baseThemeCategories: Record<string, ThemeCategory> = {
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
    order: 6.0,
    themes: {
      brand: {
        name: 'Brand',
        file: 'custom/brand.json',
        icon: '🎯',
        description: 'Brand colors with purple and pink accents'
      },
      minimal: {
        name: 'Minimal',
        file: 'custom/minimal.json',
        icon: '⚪',
        description: 'Minimal theme with reduced spacing'
      }
    }
  }
}

// Cache for dynamically discovered themes
let discoveredThemesCache: Record<string, ThemeCategory> | null = null

/**
 * Discover themes by scanning token directory structure
 * Scans /tokens/themes/ to find all available theme files
 * Also tries to auto-discover theme files by attempting to load them
 */
export async function discoverThemes(): Promise<Record<string, ThemeCategory>> {
  if (discoveredThemesCache) {
    return discoveredThemesCache
  }

  const discovered = JSON.parse(JSON.stringify(baseThemeCategories))
  
  try {
    // Get base path for tokens
    const tokensBase = typeof window !== 'undefined' && (window as any).__THEME_TOKENS_BASE__ 
      ? (window as any).__THEME_TOKENS_BASE__ 
      : '/tokens'
    
    // Known categories from base config
    const knownCategories = Object.keys(baseThemeCategories)
    
    // For each category, try to discover additional themes by attempting to load common theme files
    for (const category of knownCategories) {
      // Get existing themes for this category
      const existingThemes = discovered[category]?.themes || {}
      const themeIds = Object.keys(existingThemes)
      
      // Try to discover additional themes by attempting to load files
      // We'll try common theme names that might exist
      const commonThemeNames = ['ocean', 'forest', 'sunset', 'midnight', 'pastel', 'vibrant', 'muted', 'high-contrast']
      
      for (const themeName of commonThemeNames) {
        // Skip if theme already exists
        if (themeIds.includes(themeName)) continue
        
        const themePath = `${tokensBase}/themes/${category}/${themeName}.json`
        try {
          const response = await fetch(themePath)
          if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
            const themeData = await response.json()
            // Auto-register discovered theme (this modifies discoveredThemesCache)
            registerTheme(category, themeName, {
              name: themeData.name || themeName.charAt(0).toUpperCase() + themeName.slice(1),
              file: `${category}/${themeName}.json`,
              icon: themeData.icon || '🎨',
              description: themeData.description || `Custom ${category} theme: ${themeName}`
            })
            // Update discovered object to include the new theme
            if (!discovered[category]) {
              discovered[category] = {
                name: category.charAt(0).toUpperCase() + category.slice(1),
                order: baseThemeCategories[category]?.order || 99,
                themes: {}
              }
            }
            discovered[category].themes[themeName] = {
              name: themeData.name || themeName.charAt(0).toUpperCase() + themeName.slice(1),
              file: `${category}/${themeName}.json`,
              icon: themeData.icon || '🎨',
              description: themeData.description || `Custom ${category} theme: ${themeName}`
            }
          }
        } catch {
          // File doesn't exist, skip silently
        }
      }
    }
    
    // Update discovered cache with any newly registered themes
    discoveredThemesCache = discovered
    return discovered
  } catch (error) {
    // Only log in debug mode
    if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
      console.warn('Error discovering themes:', error)
    }
    return baseThemeCategories
  }
}

/**
 * Register a custom theme dynamically
 * Allows users to add themes without modifying the base config
 * Can be used for any category including custom
 */
export function registerTheme(category: string, themeId: string, metadata: ThemeMetadata): Record<string, ThemeCategory> {
  if (!discoveredThemesCache) {
    discoveredThemesCache = JSON.parse(JSON.stringify(baseThemeCategories))
  }
  
  // TypeScript now knows discoveredThemesCache is not null after the check above
  const cache: Record<string, ThemeCategory> = discoveredThemesCache!
  
  // Create category if it doesn't exist (for completely new categories)
  if (!cache[category]) {
    // Determine order based on category
    let order = 99 // Default for new categories
    if (THEME_CATEGORY_ORDER.includes(category as any)) {
      const index = THEME_CATEGORY_ORDER.indexOf(category as any)
      order = (index + 1) * 10 // Use order from THEME_CATEGORY_ORDER
    }
    
    cache[category] = {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      order,
      themes: {}
    }
  }
  
  // Register the theme
  cache[category].themes[themeId] = {
    name: metadata.name,
    file: metadata.file,
    icon: metadata.icon || '🎨',
    description: metadata.description || ''
  }
  
  return cache
}

/**
 * Register a theme from a token file
 * Helper function to automatically register a theme by loading its file
 * Users can call this after creating a theme file
 */
export async function registerThemeFromFile(
  category: string, 
  themeId: string, 
  filePath?: string
): Promise<{ success: boolean; themeId: string; category: string }> {
  const tokensBase = typeof window !== 'undefined' && (window as any).__THEME_TOKENS_BASE__ 
    ? (window as any).__THEME_TOKENS_BASE__ 
    : '/tokens'
  
  const path = filePath || `${tokensBase}/themes/${category}/${themeId}.json`
  
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to load theme file: ${response.statusText}`)
    }
    
    const themeData = await response.json()
    
    registerTheme(category, themeId, {
      name: themeData.name || themeId.charAt(0).toUpperCase() + themeId.slice(1),
      file: filePath || `${category}/${themeId}.json`,
      icon: themeData.icon || '🎨',
      description: themeData.description || `Custom ${category} theme: ${themeId}`
    })
    
    return { success: true, themeId, category }
  } catch (error) {
    if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
      console.error(`Failed to register theme from ${path}:`, error)
    }
    throw error
  }
}

/**
 * Get merged theme categories (base + discovered)
 */
export async function getThemeCategories(): Promise<Record<string, ThemeCategory>> {
  return await discoverThemes()
}

// For backward compatibility, export baseThemeCategories as themeCategories
export const themeCategories = baseThemeCategories

/**
 * Get theme file path
 */
export function getThemeFilePath(category: string, themeId: string): string | null {
  const categories: Record<string, ThemeCategory> = discoveredThemesCache || baseThemeCategories
  const theme = categories[category]?.themes[themeId]
  if (!theme) return null
  return `/tokens/themes/${theme.file}`
}

/**
 * Get all themes for a category
 */
export async function getThemesForCategory(category: string): Promise<Record<string, ThemeMetadata>> {
  const categories = await getThemeCategories()
  return categories[category]?.themes || {}
}

/**
 * Get theme by ID
 */
export async function getTheme(category: string, themeId: string): Promise<ThemeMetadata | null> {
  const categories = await getThemeCategories()
  return categories[category]?.themes[themeId] || null
}

