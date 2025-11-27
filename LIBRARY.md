# Theme Toggle Library Usage

This document explains how to use the `@shru/theme-toggle` library in your projects.

## Installation

```bash
npm install @shru/theme-toggle
# or
pnpm add @shru/theme-toggle
# or
yarn add @shru/theme-toggle
```

## Quick Start

```tsx
import { ThemeToggle } from "@shru/theme-toggle"

function App() {
  return (
    <div>
      <ThemeToggle />
    </div>
  )
}
```

**That's it!** The CSS variables are automatically generated and loaded when the component mounts.

CSS variables are automatically generated and injected when the component mounts. No manual CSS imports needed.

## Setting Up Tokens

The library needs access to token JSON files at runtime. You have two options:

### Option 1: Copy Tokens to Public Folder (Recommended)

Copy the tokens from the package to your `public/tokens` folder:

```bash
# After installing the package
cp -r node_modules/@shru/theme-toggle/src/tokens public/tokens
```

### Option 2: Configure Custom Path

If your tokens are in a different location:

```tsx
// In your app initialization (before using ThemeToggle)
if (typeof window !== 'undefined') {
  window.__THEME_TOKENS_BASE__ = '/custom/path/to/tokens'
}
```

## API Reference

### `ThemeToggle`

Main component for toggling themes. Renders a floating button that opens a radial menu for theme selection.

**Props:**
- `className?: string` - Additional CSS classes
- `position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"` - Position of the toggle button (default: `"bottom-right"`)

**Example:**
```tsx
<ThemeToggle 
  className="my-custom-class"
  position="top-right"
/>
```

### `useTheme()`

Hook for managing theme state programmatically.

**Returns:**
```typescript
{
  selectedThemes: ThemeSelection      // Current theme selection
  updateTheme: (category, themeId) => Promise<void>  // Update a theme
  resetToDefaults: () => Promise<void>  // Reset to defaults
  isLoading: boolean                  // Loading state
  error: string | null                // Error state
  getAvailableThemes: (category) => Record<string, ThemeMetadata>  // Get themes
}
```

**Example:**
```tsx
import { useTheme } from "@shru/theme-toggle"

function MyComponent() {
  const { selectedThemes, updateTheme, resetToDefaults, isLoading } = useTheme()
  
  return (
    <div>
      <p>Current color: {selectedThemes.color}</p>
      <button onClick={() => updateTheme('color', 'dark')}>
        Switch to Dark
      </button>
      <button onClick={resetToDefaults}>
        Reset
      </button>
      {isLoading && <p>Loading theme...</p>}
    </div>
  )
}
```

## Theme Categories

The library supports multiple theme categories:

- **Color**: `white`, `dark`
- **Typography**: `sans`, `serif`
- **Shape**: `smooth`, `sharp`
- **Density**: `comfortable`, `compact`
- **Animation**: `gentle`, `brisk`
- **Custom**: `brand`, `minimal`

## CSS Variables

Themes generate CSS variables (e.g., `--background`, `--primary`) that are automatically available in your Tailwind classes.

## Token Structure

The library expects tokens in this structure:

```
tokens/
  base.json              # Base design tokens
  palettes.json          # Color palettes
  themes/
    color/
      white.json
      dark.json
    typography/
      sans.json
      serif.json
    shape/
      smooth.json
      sharp.json
    density/
      comfortable.json
      compact.json
    animation/
      gentle.json
      brisk.json
    custom/
      brand.json
      minimal.json
```

## TypeScript Support

Full TypeScript definitions are included:

```tsx
import { 
  ThemeToggle, 
  type ThemeToggleProps,
  useTheme,
  type ThemeSelection,
  type ThemeMetadata 
} from "@shru/theme-toggle"
```

## Troubleshooting

### CSS Variables Not Appearing

1. **Check token files**: Ensure tokens are accessible at `/tokens/` or your custom path
2. **Check browser console**: Look for errors loading token files
3. **Verify component mounted**: The CSS is only generated when `ThemeToggle` is rendered

### Theme Not Applying

1. **Check network tab**: Verify token JSON files are loading (status 200)
2. **Check localStorage**: Themes are saved to `localStorage` - clear it if needed
3. **Check console**: Look for validation errors

### Custom Token Path Not Working

Make sure you set `window.__THEME_TOKENS_BASE__` **before** rendering `ThemeToggle`:

```tsx
// ✅ Correct - Set before component
if (typeof window !== 'undefined') {
  window.__THEME_TOKENS_BASE__ = '/my-tokens'
}

// Then render
<ThemeToggle />
```


