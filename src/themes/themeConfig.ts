/**
 * Theme Configuration
 * Registry of all available themes organized by category
 * 
 * Base themes are defined here. For custom themes, use registerTheme() to add them.
 * Create theme files in public/tokens/themes/{category}/{themeId}.json and register them.
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
 * Discover themes - returns base themes from config
 * For custom themes, use registerTheme() to add them manually
 */
export async function discoverThemes(): Promise<Record<string, ThemeCategory>> {
  if (discoveredThemesCache) {
    return discoveredThemesCache
  }

  // Return base themes - users can register custom themes with registerTheme()
  const themes: Record<string, ThemeCategory> = JSON.parse(JSON.stringify(baseThemeCategories))
  discoveredThemesCache = themes
  return themes
}

/**
 * Register a custom theme dynamically
 * Use this to add custom themes after creating theme files in public/tokens/themes/
 * 
 * Example:
 * ```ts
 * import { registerTheme } from 'shru-design-system'
 * 
 * // After creating public/tokens/themes/color/ocean.json
 * registerTheme('color', 'ocean', {
 *   name: 'Ocean',
 *   file: 'color/ocean.json',
 *   icon: '🌊',
 *   description: 'Ocean color theme'
 * })
 * ```
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
 * Helper function that loads the theme file and registers it automatically
 * 
 * Example:
 * ```ts
 * import { registerThemeFromFile } from 'shru-design-system'
 * 
 * // After creating public/tokens/themes/color/ocean.json
 * await registerThemeFromFile('color', 'ocean')
 * ```
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

