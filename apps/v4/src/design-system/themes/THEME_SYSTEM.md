# Theme System Documentation

## Overview

The theme system uses a token-based approach with CSS variables and JSON tokens. Themes can be composed from different aspects (color, typography, shape, density, animation).

## Two Theme Systems

### 1. Dark/Light Mode (next-themes)
- **Purpose:** Toggle between dark and light color schemes
- **Component:** `ModeSwitcher` (in site header)
- **Provider:** `ThemeProvider` (next-themes)
- **How it works:** Adds `dark` class to `<html>` element
- **Location:** `components/mode-switcher.tsx`

### 2. Design System Theme (Token-based)
- **Purpose:** Switch between design tokens (color, typography, shape, etc.)
- **Component:** `ThemeToggle` (in design system showcase)
- **Provider:** Custom hook `useThemeToggle`
- **How it works:** Generates CSS variables from JSON tokens
- **Location:** `src/design-system/themes/`

## Theme Storage

### localStorage
- **Key:** `'design-system-theme'`
- **Format:** JSON string
- **File:** `src/design-system/themes/hooks/useThemeToggle.tsx`

### Data Structure
```typescript
type ThemeSelection = {
  color?: string        // e.g., 'white', 'dark'
  typography?: string   // e.g., 'sans', 'serif'
  shape?: string        // e.g., 'smooth', 'sharp'
  density?: string      // e.g., 'comfortable', 'compact'
  animation?: string    // e.g., 'gentle', 'brisk'
  custom?: string       // e.g., 'brand', 'minimal'
}
```

## Theme Switching Flow

```
User clicks theme button
    ↓
ThemeToggle component
    ↓
useThemeToggle hook
    ↓
    ├──> Updates selectedThemes state
    ├──> Saves to localStorage
    └──> Calls generateAndApplyTheme()
         │
         ├──> Loads base.json
         ├──> Loads palettes.json
         ├──> Loads selected theme files
         │    ├──> color/white.json
         │    ├──> typography/sans.json
         │    └──> shape/smooth.json
         │
         ├──> Merges tokens (deep merge)
         ├──> Resolves references ({palette.blue.500})
         ├──> Flattens to CSS variables
         └──> Applies to <head> via <style> tag
```

## UI Selection Flow

1. Component mounts
2. `useThemeToggle()` hook initializes
3. Loads from `localStorage.getItem('design-system-theme')`
4. Sets `selectedThemes` state (or uses defaults)
5. `ThemeToggle` component receives `selectedThemes`
6. Reads `selectedThemes[category]` for each category
7. Compares with `themeId` to determine `isSelected`
8. Applies button styling (`variant="default"` if selected)

## Key Files

- **Hook:** `src/design-system/themes/hooks/useThemeToggle.tsx`
- **UI:** `src/design-system/themes/ui/ThemeToggle.tsx`
- **Generator:** `src/design-system/themes/themeGenerator.js`
- **Config:** `src/design-system/themes/themeConfig.js`
- **Tokens:** `public/tokens/`

## CSS Variable Mapping

- Semantic colors: `color.primary` → `--primary`
- Typography: `font.body` → `--font-body`
- Shape: `radius.button` → `--radius-button`
- Density: `spacing.component.md` → `--spacing-component-md`

## Style Tag Injection

- Dynamic style tag appended at end of `<head>`
- Overrides static CSS
- Updates on theme change

## Architecture

```
Theme System
├── CSS Variables (styles/globals.css)
│   ├── :root (light mode)
│   └── .dark (dark mode)
├── Design Tokens (public/tokens/)
│   ├── base.json (base tokens)
│   ├── palettes.json (color palettes)
│   └── themes/ (theme-specific tokens)
└── Theme Utilities (src/design-system/themes/)
    ├── themeConfig.js
    ├── themeGenerator.js
    └── themeUtils.js
```

## CSS Variables

### Location
`styles/globals.css`

### Structure

#### Root Variables (`:root`)
Defines light mode colors and base values:
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --skeleton: oklch(0.92 0 0);
  /* ... */
}
```

#### Dark Mode Variables (`.dark`)
Defines dark mode colors:
```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --skeleton: oklch(0.32 0 0);
  /* ... */
}
```

#### Theme Block (`@theme inline`)
Maps CSS variables to Tailwind colors:
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-skeleton: var(--skeleton);
  /* ... */
}
```

## Design Tokens

### Location
`public/tokens/`

### Structure

#### `base.json`
Base design tokens used across all themes:
```json
{
  "color": {
    "primary": "{palette.blue.500}",
    "skeleton": "{palette.gray.200}",
    /* ... */
  }
}
```

#### `palettes.json`
Color palette definitions:
```json
{
  "palette": {
    "gray": {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      /* ... */
    }
  }
}
```

#### Theme-Specific Tokens
`themes/color/white.json`, `themes/color/dark.json`, etc.

## Adding a New Color Token

### Step 1: Add CSS Variable

In `styles/globals.css`:

1. **Light Mode** (`:root`):
```css
:root {
  /* ... existing */
  --new-color: oklch(0.5 0 0);
}
```

2. **Dark Mode** (`.dark`):
```css
.dark {
  /* ... existing */
  --new-color: oklch(0.7 0 0);
}
```

### Step 2: Add to Theme Block

In `@theme inline` block:
```css
@theme inline {
  /* ... existing */
  --color-new-color: var(--new-color);
}
```

### Step 3: Add to Tokens (Optional)

1. **Base Token** (`public/tokens/base.json`):
```json
{
  "color": {
    "new-color": "{palette.gray.300}"
  }
}
```

2. **Theme-Specific** (`public/tokens/themes/color/white.json`):
```json
{
  "color": {
    "new-color": "{palette.gray.300}"
  }
}
```

3. **Dark Theme** (`public/tokens/themes/color/dark.json`):
```json
{
  "color": {
    "new-color": "{palette.gray.700}"
  }
}
```

### Step 4: Use in Components

```tsx
<div className="bg-new-color">
  {/* Content */}
</div>
```

## Removing a Color Token

1. Remove CSS variable from `:root` and `.dark`
2. Remove from `@theme inline` block
3. Remove from token files (`base.json`, theme files)
4. Update any components using the token

## Theme Composition

Themes can be composed from multiple aspects:

### Color Themes
- `white.json` - Light color theme
- `dark.json` - Dark color theme

### Typography Themes
- `sans.json` - Sans-serif fonts
- `serif.json` - Serif fonts

### Shape Themes
- `sharp.json` - Sharp corners
- `smooth.json` - Rounded corners

### Density Themes
- `comfortable.json` - Comfortable spacing
- `compact.json` - Compact spacing

### Animation Themes
- `brisk.json` - Fast animations
- `gentle.json` - Slow animations

## Theme Utilities

### `themeConfig.js`
Theme configuration and definitions

### `themeGenerator.js`
Generates theme CSS from tokens

### `themeUtils.js`
Utility functions for theme manipulation

## Best Practices

1. **Semantic Names**: Use semantic color names (e.g., `skeleton`, `primary`, not `gray-300`)
2. **Consistency**: Keep light/dark mode values consistent in contrast
3. **OKLCH**: Use OKLCH color space for better color manipulation
4. **Tokens**: Define in JSON tokens for programmatic access
5. **Documentation**: Document new tokens and their purpose

## Adding Theme Variants

### Step 1: Create Theme File

Create new file in `public/tokens/themes/{aspect}/{name}.json`:

```json
{
  "color": {
    "primary": "{palette.blue.600}",
    /* ... */
  }
}
```

### Step 2: Update Theme Config

Add theme to `src/design-system/themes/themeConfig.js` if needed

### Step 3: Apply Theme

Themes are applied via dynamically generated CSS variables injected into the DOM (not via static CSS classes)

## Color System

### Semantic Colors

- `background` - Main background
- `foreground` - Main text color
- `card` - Card background
- `primary` - Primary brand color
- `secondary` - Secondary color
- `muted` - Muted/subdued color
- `accent` - Accent color
- `destructive` - Error/destructive color
- `border` - Border color
- `input` - Input background
- `ring` - Focus ring color
- `skeleton` - Skeleton loader color

### Usage in Components

```tsx
// Use semantic colors
<div className="bg-background text-foreground">
<div className="bg-card border border-border">
<button className="bg-primary text-primary-foreground">
```

## Troubleshooting

### Color Not Working

1. Check CSS variable is defined in `:root` and `.dark`
2. Verify it's in `@theme inline` block
3. Check Tailwind is recognizing the color
4. Verify component is using correct class name

### Theme Not Applying

1. Check theme class is applied to container
2. Verify theme file exists in `public/tokens/themes/`
3. Check theme config includes the theme
4. Verify CSS specificity isn't overriding

