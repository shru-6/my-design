/**
 * Theme Toggle Library
 * Main entry point for the reusable theme toggle component
 * 
 * CSS variables are generated dynamically at runtime from token files.
 * No static CSS file needed - the theme system generates CSS variables on the fly.
 * 
 * This library re-exports from the app's theme system to maintain a single source of truth.
 */

// Export the main component from app's theme system
export { ThemeToggle, type ThemeToggleProps } from "../apps/design-system/src/design-system/themes/ui/ThemeToggle"

// Export the hook for advanced usage from app's theme system
export { useTheme, type ThemeSelection, type ThemeMetadata } from "../apps/design-system/src/design-system/themes/useTheme"

