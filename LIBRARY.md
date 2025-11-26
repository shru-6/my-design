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

## How It Works

1. **Component Mounts**: When you render `<ThemeToggle />`, it uses the `useTheme()` hook
2. **Hook Initializes**: The hook automatically loads default themes on mount
3. **CSS Generated**: Theme tokens are loaded from JSON files and converted to CSS variables
4. **CSS Injected**: CSS variables are automatically injected into the page's `<head>` as a `<style>` tag
5. **Theme Applied**: Your app immediately uses the generated CSS variables

No manual CSS imports needed - everything happens automatically!

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

Main component for toggling themes.

**Props:**
- `className?: string` - Additional CSS classes
- `showLabels?: boolean` - Show category labels (default: `true`)

**Example:**
```tsx
<ThemeToggle 
  className="my-custom-class"
  showLabels={false}
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

## Generated CSS Variables

When themes are applied, the library generates CSS variables like:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  /* ... and many more */
}
```

These variables are automatically available for use in your Tailwind classes:

```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

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

## Advanced Usage

### Programmatic Theme Control

```tsx
import { useTheme } from "@shru/theme-toggle"

function ThemeController() {
  const { updateTheme, selectedThemes } = useTheme()
  
  const switchToDark = () => {
    updateTheme('color', 'dark')
  }
  
  const switchToLight = () => {
    updateTheme('color', 'white')
  }
  
  return (
    <div>
      <button onClick={switchToDark}>Dark Mode</button>
      <button onClick={switchToLight}>Light Mode</button>
    </div>
  )
}
```

### Custom Theme Combinations

```tsx
import { useTheme } from "@shru/theme-toggle"

function CustomTheme() {
  const { updateTheme } = useTheme()
  
  useEffect(() => {
    // Apply custom combination
    updateTheme('color', 'dark')
    updateTheme('typography', 'serif')
    updateTheme('shape', 'sharp')
  }, [])
  
  return <div>My custom themed content</div>
}
```

## Next Steps

- See [apps/design-system/README.md](./apps/design-system/README.md) for the design system app documentation
- See [apps/design-system/ARCHITECTURE.md](./apps/design-system/ARCHITECTURE.md) for architecture details
- See [apps/design-system/src/design-system/themes/README.md](./apps/design-system/src/design-system/themes/README.md) for theme system internals

