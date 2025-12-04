# Usage Guide

## Installation

```bash
npm install shru-design-system
# or
pnpm add shru-design-system
# or
yarn add shru-design-system
```

## Important: CSS Setup Required

**Yes, you need to import CSS.** Even though components are importable, the CSS file is required because it contains:
- Tailwind CSS imports
- `@theme inline` block that maps CSS variables to Tailwind
- Base CSS variable definitions

The theme system dynamically overrides CSS variables at runtime, but the base CSS file is essential.

```tsx
// Import CSS first (required)
import 'shru-design-system/styles'

// Then use components
import { ThemeToggle } from 'shru-design-system'
```

## Quick Start

### 1. Import Theme Toggle Component

```tsx
import { ThemeToggle } from 'shru-design-system'

function App() {
  return (
    <div>
      <ThemeToggle position="bottom-right" />
      {/* Your app content */}
    </div>
  )
}
```

### 2. Use Theme Hook

```tsx
import { useTheme } from 'shru-design-system'

function MyComponent() {
  const { selectedThemes, updateTheme, isLoading } = useTheme()
  
  return (
    <button onClick={() => updateTheme('color', 'dark')}>
      Switch to Dark Mode
    </button>
  )
}
```

### 3. Setup CSS (Required)

**Yes, you need to import the CSS file.** The `globals.css` file contains:
- Tailwind CSS imports
- `@theme inline` block that maps CSS variables to Tailwind colors
- Base CSS variable definitions

The theme system will dynamically override these variables at runtime, but the base CSS is required.

**Option 1: Import from package (Recommended)**
```tsx
// In your app's root layout or _app.tsx
import 'shru-design-system/styles'
```

**Option 2: Copy and import locally**
```bash
# Copy the CSS file
npx copy-globals
# or manually copy from node_modules/@shru/design-system/apps/design-system/styles/globals.css
```

Then import in your layout:
```tsx
import './globals.css'
```

## API Reference

### ThemeToggle Component

```tsx
import { ThemeToggle } from 'shru-design-system'

<ThemeToggle 
  position="bottom-right" // or "bottom-left" | "top-right" | "top-left"
  className="custom-class" // optional
/>
```

**Props:**
- `position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"` - Position of the toggle button
- `className?: string` - Additional CSS classes

### useTheme Hook

```tsx
import { useTheme } from 'shru-design-system'

const {
  selectedThemes,      // Current theme selection
  updateTheme,         // Function to update theme
  resetToDefaults,     // Reset to default themes
  isLoading,           // Loading state
  error,               // Error message if any
  getAvailableThemes  // Get available themes for a category
} = useTheme()
```

**Theme Selection:**
```typescript
type ThemeSelection = {
  color?: string        // e.g., 'white', 'dark'
  typography?: string   // e.g., 'sans', 'serif'
  shape?: string        // e.g., 'smooth', 'sharp'
  density?: string      // e.g., 'comfortable', 'compact'
  animation?: string    // e.g., 'gentle', 'brisk'
  custom?: string       // Custom theme
}
```

### useThemeToggle Hook

```tsx
import { useThemeToggle } from '@shru/design-system'

const {
  isOpen,
  selectedCategory,
  categories,
  handleCategoryClick,
  handleThemeSelect,
  handleBack,
  toggleMenu
} = useThemeToggle()
```

## Theme Configuration

### Available Theme Categories

- **Color**: `white`, `dark`
- **Typography**: `sans`, `serif`
- **Shape**: `smooth`, `sharp`
- **Density**: `comfortable`, `compact`
- **Animation**: `gentle`, `brisk`
- **Custom**: User-defined themes

### Custom Themes

You can register custom themes:

```tsx
import { registerTheme } from '@shru/design-system'

registerTheme('custom', 'my-theme', {
  name: 'My Theme',
  file: 'custom/my-theme.json',
  icon: '🎨',
  description: 'My custom theme'
})
```

## CSS Variables

The theme system generates CSS variables that are applied to `:root`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  --font-body: 'Inter', sans-serif;
  --radius-button: 0.375rem;
  /* ... more variables */
}
```

## Examples

### Basic Usage

```tsx
import { ThemeToggle } from 'shru-design-system'

export default function Layout({ children }) {
  return (
    <div>
      <ThemeToggle />
      {children}
    </div>
  )
}
```

### Programmatic Theme Control

```tsx
import { useTheme } from 'shru-design-system'

function ThemeSwitcher() {
  const { selectedThemes, updateTheme } = useTheme()
  
  return (
    <div>
      <button onClick={() => updateTheme('color', 'dark')}>
        Dark Mode
      </button>
      <button onClick={() => updateTheme('color', 'white')}>
        Light Mode
      </button>
    </div>
  )
}
```

### Custom Theme Toggle

```tsx
import { useThemeToggle } from '@shru/design-system'

function CustomToggle() {
  const { toggleMenu, isOpen } = useThemeToggle()
  
  return (
    <button onClick={toggleMenu}>
      {isOpen ? 'Close' : 'Open'} Theme Menu
    </button>
  )
}
```

## Storage

Themes are automatically stored in `localStorage` with the key `'design-system-theme'`. The theme selection persists across page reloads.

## TypeScript Support

Full TypeScript support is included. Import types as needed:

```tsx
import type { ThemeToggleProps, ThemeSelection, ThemeMetadata } from 'shru-design-system'
```

## Troubleshooting

### Theme not applying?

1. **Make sure CSS is imported** - You must import `@shru/design-system/styles` or copy `globals.css`
2. **Check Tailwind v4 is installed** - Required for `@theme inline` to work
3. Check browser console for errors
4. Verify token files are accessible at `/tokens/` path
5. Look for `<style id="dynamic-theme">` in the DOM (theme system injects CSS here)

### Toggle not appearing?

1. Check z-index conflicts
2. Verify position prop is valid
3. Ensure component is rendered client-side (`"use client"`)

### Import errors?

1. Ensure you're using the correct import path
2. Check that the package is installed
3. Verify TypeScript configuration

## Next Steps

- See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute
- Check [README.md](./README.md) for project overview
- Review component examples in the design system showcase
