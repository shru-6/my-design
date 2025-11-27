# Theme System

## Overview

Token-based theming system with support for multiple theme categories (color, typography, shape, density, animation). Themes can be composed and customized dynamically.

**Note:** This is the single source of truth for the theme system. The library (`@shru/theme-toggle`) re-exports from this folder to maintain consistency.

## Module Structure

```
themes/
├── ui/
│   ├── ThemeToggle.tsx  # Pure UI component (uses design system Tooltip)
│   └── index.ts          # Centralized exports
├── useTheme.tsx          # Business logic & state management hook
├── themeConfig.js        # Configuration, constants, validation rules
└── themeUtils.js         # Pure utility functions (no side effects)
```

**Note:** The app's `ThemeToggle` uses the design system's `Tooltip` component. For external library use, see `@shru/theme-toggle` which re-exports from this folder.


## Usage

### Basic Theme Toggle

```tsx
import { ThemeToggle } from "@/src/design-system/themes/ui"

export function MyComponent() {
  return <ThemeToggle />
}
```

### Using Theme Hook

```tsx
import { useTheme } from "@/src/design-system/themes/useTheme"

export function MyComponent() {
  const { selectedThemes, updateTheme, isLoading } = useTheme()
  
  return (
    <button onClick={() => updateTheme('color', 'dark')}>
      Switch to Dark
    </button>
  )
}
```

## Theme Categories

- **Color**: Light/dark color schemes (`white`, `dark`)
- **Typography**: Font families (`sans`, `serif`)
- **Shape**: Border radius (`smooth`, `sharp`)
- **Density**: Spacing (`comfortable`, `compact`)
- **Animation**: Animation speed (`gentle`, `brisk`)
- **Custom**: Custom themes (`brand`, `minimal`)

## Theme Storage

Themes are stored in `localStorage` with key `'design-system-theme'`:

```typescript
{
  color: 'white',
  typography: 'sans',
  shape: 'smooth',
  density: 'comfortable',
  animation: 'gentle'
}
```

## Design Tokens

Tokens are defined in `public/tokens/`:

- `base.json`: Base design tokens
- `palettes.json`: Color palettes
- `themes/color/`: Color theme tokens
- `themes/typography/`: Typography theme tokens
- `themes/shape/`: Shape theme tokens
- `themes/density/`: Density theme tokens
- `themes/animation/`: Animation theme tokens
- `themes/custom/`: Custom theme tokens


## Adding a New Theme

### 1. Create Token File
```json
// public/tokens/themes/category/new-theme.json
{
  "color": {
    "primary": "{palette.blue.600}"
  }
}
```

### 2. Register in Config
```javascript
// themeConfig.js
export const themeCategories = {
  category: {
    themes: {
      // ... existing
      'new-theme': {
        name: 'New Theme',
        file: 'category/new-theme.json',
        icon: '🎨',
        description: 'Description'
      }
    }
  }
}
```

## CSS Variables

Themes generate CSS variables that are applied to `:root`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  --font-body: 'Inter', sans-serif;
  --radius-button: 0.375rem;
  /* ... */
}
```

Variables are automatically mapped to Tailwind-compatible names where needed.


