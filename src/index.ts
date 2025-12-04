/**
 * Design System Library
 * Main entry point for the reusable design system
 * 
 * This package provides:
 * - Theme toggle component with token-based theming
 * - Theme management hooks and utilities
 * - CSS variables generated dynamically from token files
 * 
 * All exports are re-exported from the app's design system to maintain a single source of truth.
 */

// Theme Toggle Component
export { ThemeToggle, type ThemeToggleProps } from "../apps/design-system/src/design-system/themes/ui/ThemeToggle"
export { useThemeToggle } from "../apps/design-system/src/design-system/themes/ui/ThemeToggle"

// Theme System Hooks
export { useTheme, type ThemeSelection, type ThemeMetadata } from "../apps/design-system/src/design-system/themes/useTheme"

// Theme Configuration and Utilities
export { 
  getThemeCategories,
  registerTheme,
  getThemeFilePath,
  getThemesForCategory,
  getTheme
} from "../apps/design-system/src/design-system/themes/themeConfig"

// Theme Discovery Utilities
export {
  discoverTokenFiles,
  scanCategory,
  registerThemeFromFile
} from "../apps/design-system/src/design-system/themes/themeDiscovery"

