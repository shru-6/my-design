/**
 * Theme Configuration
 * Registry of all available themes organized by category
 *
 * Base themes are defined here. Additional themes can be discovered dynamically
 * by scanning the /tokens/themes/ directory structure.
 */

/**
 * Centralized theme category order
 * Used everywhere to ensure consistency
 * This is the SINGLE SOURCE OF TRUTH for category order
 * Custom category is included but handled specially (optional, user-created files)
 * 
 * ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
 * 1. src/themes/themeConfig.ts - THEME_CATEGORY_ORDER (TypeScript source)
 * 2. scripts/apply-theme-sync.js - THEME_CATEGORY_ORDER constant (standalone script, can't import)
 */
export const THEME_CATEGORY_ORDER = ['color', 'typography', 'shape', 'density', 'animation', 'custom'];

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
    // Custom themes are not included in base config
    // They should be discovered dynamically or registered by users
    // Users can add custom themes by creating files in /tokens/themes/custom/
    // and registering them using registerTheme()
};
// Cache for dynamically discovered themes
let discoveredThemesCache = null;
/**
 * Discover themes - returns base themes from config
 * For custom themes, use registerTheme() to add them manually
 */
export async function discoverThemes() {
    if (discoveredThemesCache) {
        return discoveredThemesCache;
    }
    // Return base themes - users can register custom themes with registerTheme()
    discoveredThemesCache = JSON.parse(JSON.stringify(baseThemeCategories));
    return discoveredThemesCache;
}
/**
 * Register a custom theme dynamically
 * Allows users to add themes without modifying the base config
 */
export function registerTheme(category, themeId, metadata) {
    if (!discoveredThemesCache) {
        discoveredThemesCache = JSON.parse(JSON.stringify(baseThemeCategories));
    }
    // TypeScript now knows discoveredThemesCache is not null after the check above
    const cache = discoveredThemesCache;
    // Create category if it doesn't exist
    if (!cache[category]) {
        cache[category] = {
            name: category.charAt(0).toUpperCase() + category.slice(1),
            order: 99, // Custom categories get high order
            themes: {}
        };
    }
    // Register the theme
    cache[category].themes[themeId] = {
        name: metadata.name,
        file: metadata.file,
        icon: metadata.icon || '🎨',
        description: metadata.description || ''
    };
    return cache;
}
/**
 * Get merged theme categories (base + discovered)
 */
export async function getThemeCategories() {
    return await discoverThemes();
}
// For backward compatibility, export baseThemeCategories as themeCategories
export const themeCategories = baseThemeCategories;
/**
 * Get theme file path
 */
export function getThemeFilePath(category, themeId) {
    const categories = discoveredThemesCache || baseThemeCategories;
    const theme = categories[category]?.themes[themeId];
    if (!theme)
        return null;
    return `/tokens/themes/${theme.file}`;
}
/**
 * Get all themes for a category
 */
export async function getThemesForCategory(category) {
    const categories = await getThemeCategories();
    return categories[category]?.themes || {};
}
/**
 * Get theme by ID
 */
export async function getTheme(category, themeId) {
    const categories = await getThemeCategories();
    return categories[category]?.themes[themeId] || null;
}
