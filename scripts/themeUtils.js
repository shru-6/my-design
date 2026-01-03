/**
 * Theme Utilities
 * Pure utility functions for theme management
 * Note: generateAndApplyTheme has side effects (modifies DOM) but is the main theme application utility
 */
import { getThemeCategories, THEME_CATEGORY_ORDER } from './themeConfig';
/**
 * Generate theme combination name
 */
export function getThemeName(selectedThemes) {
    const parts = [];
    if (selectedThemes.color)
        parts.push(selectedThemes.color);
    if (selectedThemes.typography)
        parts.push(selectedThemes.typography);
    if (selectedThemes.shape)
        parts.push(selectedThemes.shape);
    if (selectedThemes.density)
        parts.push(selectedThemes.density);
    if (selectedThemes.animation)
        parts.push(selectedThemes.animation);
    return parts.length > 0 ? parts.join('-') : 'default';
}
/**
 * Validate theme selection
 */
export function validateThemeSelection(selectedThemes, themeCategories) {
    const errors = [];
    for (const [category, themeId] of Object.entries(selectedThemes)) {
        if (!themeId)
            continue;
        const categoryConfig = themeCategories[category];
        if (!categoryConfig) {
            errors.push(`Unknown category: ${category}`);
            continue;
        }
        const theme = categoryConfig.themes[themeId];
        if (!theme) {
            errors.push(`Theme ${themeId} not found in category ${category}`);
        }
    }
    return {
        valid: errors.length === 0,
        errors
    };
}
/**
 * Get default theme selections
 * 
 * ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
 * 1. src/themes/themeUtils.ts - getDefaultThemes() function (TypeScript source)
 * 2. scripts/apply-theme-sync.js - DEFAULT_THEMES constant (standalone script, can't import)
 */
export function getDefaultThemes() {
    return {
        color: 'white',
        typography: 'sans',
        shape: 'smooth',
        density: 'comfortable',
        animation: 'gentle'
    };
}
/**
 * Deep clone object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * Check if value is an object
 */
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
/**
 * Deep merge objects
 */
export function deepMerge(target, source) {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                }
                else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
// Cache for loaded JSON files
const tokenCache = new Map();
/**
 * Load JSON file with caching
 */
export async function loadTokenFile(path) {
    if (tokenCache.has(path)) {
        return deepClone(tokenCache.get(path));
    }
    try {
        const response = await fetch(path);
        if (!response.ok) {
            // 404 means file doesn't exist - return null instead of throwing
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Failed to load ${path}: ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        // Check if response is actually JSON (not HTML error page)
        if (!contentType || !contentType.includes('application/json')) {
            // Likely got HTML error page instead of JSON
            return null;
        }
        const data = await response.json();
        tokenCache.set(path, data);
        return deepClone(data);
    }
    catch (error) {
        // Only log errors in debug mode
        if (typeof window !== 'undefined' && window.__DESIGN_SYSTEM_DEBUG__) {
            console.warn(`Error loading token file ${path}:`, error);
        }
        // Return null instead of throwing - allows theme to continue with other files
        return null;
    }
}
/**
 * Resolve token references
 * {palette.blue.500} → actual color value
 */
function resolveReferences(tokens, palette) {
    const resolved = JSON.parse(JSON.stringify(tokens));
    function resolveValue(value) {
        if (typeof value !== 'string')
            return value;
        // Match {path.to.token} pattern
        const match = value.match(/^\{([^}]+)\}$/);
        if (!match)
            return value;
        const path = match[1].split('.');
        let current = { palette, ...resolved };
        for (const key of path) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            }
            else {
                // Token reference not found - return original value
                // Only warn in debug mode
                if (typeof window !== 'undefined' && window.__DESIGN_SYSTEM_DEBUG__) {
                    console.warn(`Token reference not found: {${match[1]}}`);
                }
                return value; // Return original if not found
            }
        }
        return typeof current === 'string' ? current : value;
    }
    function traverse(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                traverse(obj[key]);
            }
            else {
                obj[key] = resolveValue(obj[key]);
            }
        }
    }
    traverse(resolved);
    return resolved;
}
/**
 * Convert hex color to HSL format (without hsl() wrapper)
 * Returns format: "h s% l%" for use with hsl(var(--color))
 */
function hexToHSL(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    // Parse RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    const lPercent = Math.round(l * 100);
    return `${h} ${s}% ${lPercent}%`;
}
/**
 * Check if a string is a hex color
 */
function isHexColor(value) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}
/**
 * Flatten nested object to CSS variables
 * Maps token structure to CSS variable naming:
 * - color.primary → --primary (semantic colors are flat)
 * - font.body → --font-body
 * - radius.button → --radius-button
 * - font.body → --font-body
 * - spacing.component.md → --spacing-component-md
 */
function flattenToCSS(tokens, prefix = '', result = {}, isColorContext = false) {
    for (const key in tokens) {
        const value = tokens[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Token files are already in correct structure (no nested typography/shape wrappers)
            const enteringColor = key === 'color' && prefix === '';
            const enteringTypography = key === 'typography' && prefix === '';
            const enteringShape = key === 'shape' && prefix === '';
            const enteringAnimation = key === 'animation' && prefix === '';
            const enteringDensity = key === 'spacing' && prefix === ''; // Density uses spacing key
            const inColorContext = isColorContext || enteringColor;
            if (enteringColor) {
                // When entering color object, flatten without "color-" prefix
                flattenToCSS(value, '', result, true);
            }
            else if (enteringTypography) {
                // When entering typography object, flatten without "typography-" prefix
                flattenToCSS(value, '', result, false);
            }
            else if (enteringShape) {
                // When entering shape object, flatten without "shape-" prefix
                flattenToCSS(value, '', result, false);
            }
            else if (enteringAnimation) {
                // When entering animation object, flatten without "animation-" prefix
                // animation.duration.fast → --duration-fast
                flattenToCSS(value, '', result, false);
            }
            else if (enteringDensity) {
                // When entering density/spacing object at root, we need to preserve "spacing-" prefix
                // spacing.component.md → --spacing-component-md
                flattenToCSS(value, 'spacing', result, false);
            }
            else if (inColorContext) {
                // Already in color context, continue with empty prefix
                flattenToCSS(value, '', result, true);
            }
            else {
                // For all other tokens, use simple prefix-based flattening
                // font.body → --font-body, radius.button → --radius-button, spacing.component.md → --spacing-component-md
                const newPrefix = prefix ? `${prefix}-${key}` : key;
                flattenToCSS(value, newPrefix, result, false);
            }
        }
        else {
            // Generate CSS variable name
            let cssKey;
            if (isColorContext || (prefix === '' && key === 'color')) {
                // Semantic colors: --primary, --background, etc. (no "color-" prefix)
                cssKey = `--${key}`;
            }
            else if (prefix === '') {
                // Top-level tokens (non-color)
                cssKey = `--${key}`;
            }
            else {
                // Nested tokens: --font-body, --radius-button, --spacing-component-md, etc.
                cssKey = `--${prefix}-${key}`;
            }
            // Convert hex colors to HSL format for Tailwind compatibility
            let finalValue = value;
            if (isColorContext && typeof value === 'string' && isHexColor(value)) {
                finalValue = hexToHSL(value);
            }
            result[cssKey] = finalValue;
        }
    }
    return result;
}
/**
 * Map theme variables to Tailwind-compatible CSS variables
 * This function automatically passes through ALL CSS variables
 * and only adds convenience mappings for Tailwind-specific needs
 */
function mapToTailwindVars(cssVars) {
    // Start with all generated variables - they're all valid CSS variables
    const mapped = { ...cssVars };
    // Only add convenience mappings for Tailwind's expected variable names
    // These are optional - the actual variables are already in the map
    // Map radius-button to --radius for Tailwind's rounded-* utilities
    if (cssVars['--radius-button'] && !cssVars['--radius']) {
        mapped['--radius'] = cssVars['--radius-button'];
    }
    // Map radius-card to --radius-lg for larger rounded corners
    if (cssVars['--radius-card'] && !cssVars['--radius-lg']) {
        mapped['--radius-lg'] = cssVars['--radius-card'];
    }
    // Map font-body to --font-sans for Tailwind's font-sans utility
    if (cssVars['--font-body'] && !cssVars['--font-sans']) {
        mapped['--font-sans'] = cssVars['--font-body'];
    }
    // Map spacing-base or spacing-component-md to --spacing for convenience
    if (cssVars['--spacing-base'] && !cssVars['--spacing']) {
        mapped['--spacing'] = cssVars['--spacing-base'];
    }
    else if (cssVars['--spacing-component-md'] && !cssVars['--spacing']) {
        mapped['--spacing'] = cssVars['--spacing-component-md'];
    }
    return mapped;
}
/**
 * Generate CSS string from CSS variables
 */
function generateCSSString(cssVars) {
    const mappedVars = mapToTailwindVars(cssVars);
    const vars = Object.entries(mappedVars)
        .sort(([a], [b]) => a.localeCompare(b)) // Sort alphabetically for easier debugging
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n');
    // Debug mode: log all CSS variables in development
    if (typeof window !== 'undefined' && window.__DESIGN_SYSTEM_DEBUG__) {
        console.group('🎨 Design System CSS Variables');
        console.table(mappedVars);
        console.log('Total variables:', Object.keys(mappedVars).length);
        console.groupEnd();
    }
    return `:root {\n${vars}\n}`;
}
/**
 * Apply CSS to DOM
 */
function applyThemeCSS(css) {
    let styleTag = document.getElementById('dynamic-theme');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-theme';
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
}
/**
 * Debug helper: Enable debug mode to see all CSS variables in console
 * Call this in browser console: window.__DESIGN_SYSTEM_DEBUG__ = true
 */
export function enableDebugMode() {
    if (typeof window !== 'undefined') {
        window.__DESIGN_SYSTEM_DEBUG__ = true;
        console.log('🔍 Design System debug mode enabled');
        console.log('CSS variables will be logged when themes change');
    }
}
/**
 * Debug helper: Get all current CSS variables
 */
export function getCurrentCSSVariables() {
    if (typeof window === 'undefined')
        return {};
    const styleTag = document.getElementById('dynamic-theme');
    if (!styleTag)
        return {};
    const cssText = styleTag.textContent || '';
    const vars = {};
    const matches = cssText.matchAll(/--([^:]+):\s*([^;]+);/g);
    for (const match of matches) {
        vars[`--${match[1].trim()}`] = match[2].trim();
    }
    return vars;
}
/**
 * Generate and apply theme
 * Main function that composes everything
 */
export async function generateAndApplyTheme(selectedThemes = {}) {
    try {
        // Get theme categories (with dynamic discovery)
        const themeCategories = await getThemeCategories();
        // Validate theme selection (but be lenient with custom themes - they might not exist yet)
        const validation = validateThemeSelection(selectedThemes, themeCategories);
        if (!validation.valid) {
            // Filter out custom theme errors - custom themes are optional
            const nonCustomErrors = validation.errors.filter(err => !err.includes('custom'));
            if (nonCustomErrors.length > 0) {
                // Only log in debug mode
                if (typeof window !== 'undefined' && window.__DESIGN_SYSTEM_DEBUG__) {
                    console.error('Invalid theme selection:', nonCustomErrors);
                }
                throw new Error(`Invalid theme selection: ${nonCustomErrors.join(', ')}`);
            }
            // If only custom theme errors, just warn and continue
            if (typeof window !== 'undefined' && window.__DESIGN_SYSTEM_DEBUG__) {
                console.warn('Custom theme files not found, continuing without them:', validation.errors);
            }
        }
        // 1. Load base tokens
        const base = await loadTokenFile('/tokens/base.json');
        if (!base) {
            throw new Error('Failed to load base tokens from /tokens/base.json');
        }
        // 2. Load palette
        const palettes = await loadTokenFile('/tokens/palettes.json');
        if (!palettes || !palettes.palette) {
            throw new Error('Failed to load palette from /tokens/palettes.json');
        }
        const palette = palettes.palette;
        // 3. Deep merge: base → palette
        let merged = deepMerge(base, { palette });
        // 4. Load and merge category themes in order (includes custom, use centralized order from themeConfig.js)
        for (const category of THEME_CATEGORY_ORDER) {
            const themeId = selectedThemes[category];
            if (!themeId)
                continue;
            const themePath = `/tokens/themes/${category}/${themeId}.json`;
            const themeData = await loadTokenFile(themePath);
            // Only merge if theme data was successfully loaded
            if (themeData) {
                merged = deepMerge(merged, themeData);
            }
            else {
                // For custom themes, silently skip if not found (user-created, optional)
                // For other categories, warn in debug mode
                if (category !== 'custom' && typeof window !== 'undefined' && window.__DESIGN_SYSTEM_DEBUG__) {
                    console.warn(`Theme file not found: ${themePath}`);
                }
                else if (category === 'custom' && typeof window !== 'undefined' && window.__DESIGN_SYSTEM_DEBUG__) {
                    console.warn(`Custom theme file not found: ${themePath} (this is normal if you haven't created it yet)`);
                }
            }
        }
        // 6. Resolve references
        const resolved = resolveReferences(merged, palette);
        // 7. Flatten to CSS variables
        const cssVars = flattenToCSS(resolved);
        // 8. Generate CSS string
        const css = generateCSSString(cssVars);
        // 9. Apply to DOM
        if (typeof document !== 'undefined') {
            applyThemeCSS(css);
            // Debug: expose CSS variables to window for inspection
            if (window.__DESIGN_SYSTEM_DEBUG__) {
                window.__DESIGN_SYSTEM_VARS__ = cssVars;
                console.log('💡 Access CSS variables via: window.__DESIGN_SYSTEM_VARS__');
            }
        }
        return {
            success: true,
            themeName: getThemeName(selectedThemes),
            cssVars
        };
    }
    catch (error) {
        // Only log in debug mode
        if (typeof window !== 'undefined' && window.__DESIGN_SYSTEM_DEBUG__) {
            console.error('Error generating theme:', error);
        }
        throw error;
    }
}
