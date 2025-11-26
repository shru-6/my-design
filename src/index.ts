/**
 * Theme Toggle Library
 * Main entry point for the reusable theme toggle component
 * 
 * CSS variables are generated dynamically at runtime from token files.
 * No static CSS file needed - the theme system generates CSS variables on the fly.
 */

// Export the main component
export { ThemeToggle, type ThemeToggleProps } from "./components/ThemeToggle"

// Export the hook for advanced usage
export { useTheme, type ThemeSelection, type ThemeMetadata } from "./components/useTheme"

