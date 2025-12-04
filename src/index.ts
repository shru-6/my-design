/**
 * Design System Library
 * Main entry point for the reusable design system
 * 
 * This package provides:
 * - 72+ Design system components (atoms, molecules, layout, primitives)
 * - Theme toggle component with token-based theming
 * - Theme management hooks and utilities
 * - CSS variables generated dynamically from token files
 * 
 * All exports are re-exported from the app's design system to maintain a single source of truth.
 */

// Design System Components
// Atoms (Button, Input, Badge, etc.)
export * from "../apps/design-system/src/design-system/components/atoms"

// Molecules (Modal, Select, Form, etc.)
export * from "../apps/design-system/src/design-system/components/molecules"

// Layout (Card, Table, Sidebar, etc.)
export * from "../apps/design-system/src/design-system/components/layout"

// Primitives (Box, Flex, Text, etc.)
export {
  Box as PrimitiveBox,
  type BoxProps as PrimitiveBoxProps,
  Flex as PrimitiveFlex,
  type FlexProps as PrimitiveFlexProps,
  Stack as PrimitiveStack,
  type StackProps as PrimitiveStackProps,
  Text as PrimitiveText,
  type TextProps as PrimitiveTextProps,
  Icon,
  type IconProps,
  VisuallyHidden,
  type VisuallyHiddenProps,
} from "../apps/design-system/src/design-system/components/primitives"

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

