# Theme System

## Overview

Token-based theming system with support for multiple theme categories (color, typography, shape, density, animation). Themes can be composed and customized dynamically.

## Module Structure

```
themes/
├── ui/
│   ├── ThemeToggle.tsx  # Pure UI component
│   └── index.ts          # Centralized exports
├── useTheme.tsx          # Business logic & state management hook
├── themeConfig.js        # Configuration, constants, validation rules
└── themeUtils.js         # Pure utility functions (no side effects)
```

## Data Flow

```
UI Components  →      Hooks     →  Global State →      Utils    →   Config

     ↓                  ↓               ↓                ↓            ↓

  User Actions → Business Logic → State Updates → Pure Functions → Constants
```

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

## Key Functions

### From `useTheme.tsx`
- `useTheme()`: Hook for theme management
- Returns: `{ selectedThemes, updateTheme, resetToDefaults, isLoading, error, getAvailableThemes }`

### From `themeUtils.js`
- `generateAndApplyTheme(selectedThemes)`: Generate and apply theme to DOM
- `getDefaultThemes()`: Get default theme selections
- `validateThemeSelection(selectedThemes, themeCategories)`: Validate theme selection
- `getThemeName(selectedThemes)`: Generate theme combination name

### From `themeConfig.js`
- `themeCategories`: Theme category registry
- `getThemeFilePath(category, themeId)`: Get theme file path
- `getThemesForCategory(category)`: Get all themes for a category

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

## Best Practices

1. **Pure Functions**: Keep `themeUtils.js` functions pure (no side effects except `generateAndApplyTheme`)
2. **Configuration**: All constants and validation in `themeConfig.js`
3. **UI Components**: Pure UI in `ui/` folder with centralized exports
4. **Hooks**: Business logic and state in `useTheme.tsx`
5. **Token References**: Use `{palette.color.shade}` syntax for token references

