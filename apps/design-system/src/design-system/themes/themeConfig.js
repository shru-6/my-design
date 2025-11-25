/**
 * Theme Configuration
 * Registry of all available themes organized by category
 */

export const themeCategories = {
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

/**
 * Get theme file path
 */
export function getThemeFilePath(category, themeId) {
  const theme = themeCategories[category]?.themes[themeId]
  if (!theme) return null
  return `/tokens/themes/${theme.file}`
}

/**
 * Get all themes for a category
 */
export function getThemesForCategory(category) {
  return themeCategories[category]?.themes || {}
}

/**
 * Get theme by ID
 */
export function getTheme(category, themeId) {
  return themeCategories[category]?.themes[themeId] || null
}

