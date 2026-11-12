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
 * Centralized theme category order.
 * Custom category is included but handled specially (optional, user-created files).
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
      },
      ocean: {
        name: 'Ocean',
        file: 'color/ocean.json',
        icon: '🌊',
        description: 'Teal accent on a light aqua surface'
      },
      forest: {
        name: 'Forest',
        file: 'color/forest.json',
        icon: '🌲',
        description: 'Green accent on a soft natural background'
      },
      rose: {
        name: 'Rose',
        file: 'color/rose.json',
        icon: '🌹',
        description: 'Rose accent with warm pink surfaces'
      },
      midnight: {
        name: 'Midnight',
        file: 'color/midnight.json',
        icon: '🌌',
        description: 'Deep indigo dark theme'
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
      },
      contrast: {
        name: 'Contrast',
        file: 'shape/contrast.json',
        icon: '🔘',
        description: 'Small controls fully round, large surfaces square'
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

/**
 * Returns the static base theme categories. Not "discovery" in any dynamic
 * sense — kept separate from baseThemeCategories only so a registry can treat
 * it as a swappable async source (see ThemeSource below).
 */
async function getBaseThemeCategories(): Promise<Record<string, ThemeCategory>> {
  return JSON.parse(JSON.stringify(baseThemeCategories))
}

/** A pluggable source a registry resolves its categories from. */
export type ThemeSource = () => Promise<Record<string, ThemeCategory>>

export type ThemeRegistry = {
  getThemeCategories(): Promise<Record<string, ThemeCategory>>
  registerTheme(category: string, themeId: string, metadata: ThemeMetadata): Promise<Record<string, ThemeCategory>>
  registerThemeFromFile(category: string, themeId: string, filePath?: string): Promise<{ success: boolean; themeId: string; category: string }>
  getThemeFilePath(category: string, themeId: string): string | null
  getThemesForCategory(category: string): Promise<Record<string, ThemeMetadata>>
  getTheme(category: string, themeId: string): Promise<ThemeMetadata | null>
}

/**
 * Creates an isolated theme registry with its own cache and registered themes.
 * The module-level default export below (a single shared registry) is fine for
 * a single-tenant app. Create a dedicated instance with a custom `source` when
 * isolation matters — e.g. a CMS backend serving a different theme set per
 * tenant/site, where a shared cache would leak one tenant's themes into another's.
 */
export function createThemeRegistry(source: ThemeSource = getBaseThemeCategories): ThemeRegistry {
  let cache: Record<string, ThemeCategory> | null = null

  async function getThemeCategories(): Promise<Record<string, ThemeCategory>> {
    if (!cache) cache = await source()
    return cache
  }

  async function registerTheme(category: string, themeId: string, metadata: ThemeMetadata): Promise<Record<string, ThemeCategory>> {
    // Async so it always seeds from the real `source` (base categories, or a
    // custom one) before adding to it — never silently falls back to the base
    // set just because nothing had resolved the cache yet.
    const current = await getThemeCategories()

    if (!current[category]) {
      let order = 99 // Default for new categories
      const index = (THEME_CATEGORY_ORDER as readonly string[]).indexOf(category)
      if (index !== -1) order = (index + 1) * 10

      current[category] = {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        order,
        themes: {}
      }
    }

    current[category].themes[themeId] = {
      name: metadata.name,
      file: metadata.file,
      icon: metadata.icon || '🎨',
      description: metadata.description || ''
    }

    return current
  }

  async function registerThemeFromFile(
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

      await registerTheme(category, themeId, {
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

  function getThemeFilePath(category: string, themeId: string): string | null {
    const categories = cache || baseThemeCategories
    const theme = categories[category]?.themes[themeId]
    if (!theme) return null
    return `/tokens/themes/${theme.file}`
  }

  async function getThemesForCategory(category: string): Promise<Record<string, ThemeMetadata>> {
    const categories = await getThemeCategories()
    return categories[category]?.themes || {}
  }

  async function getTheme(category: string, themeId: string): Promise<ThemeMetadata | null> {
    const categories = await getThemeCategories()
    return categories[category]?.themes[themeId] || null
  }

  return { getThemeCategories, registerTheme, registerThemeFromFile, getThemeFilePath, getThemesForCategory, getTheme }
}

// Default shared registry — used by useTheme()/useThemeToggle() and the
// top-level exports below. Fine for a single-tenant app; see createThemeRegistry
// for when a dedicated, isolated instance is needed instead. Exported so a
// consumer can build a custom registry (see createThemeRegistry) and pass it
// into useTheme()/useThemeToggle()/ThemeToggle as an alternative to this one.
export const defaultRegistry = createThemeRegistry()

// For backward compatibility, export baseThemeCategories as themeCategories
export const themeCategories = baseThemeCategories

export const getThemeCategories = defaultRegistry.getThemeCategories
export const registerTheme = defaultRegistry.registerTheme
export const registerThemeFromFile = defaultRegistry.registerThemeFromFile
export const getThemeFilePath = defaultRegistry.getThemeFilePath
export const getThemesForCategory = defaultRegistry.getThemesForCategory
export const getTheme = defaultRegistry.getTheme

