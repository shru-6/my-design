# Usage Guide

Complete guide for using this design system in your projects. Answers questions like:
- How can I set up this in my repo?
- How is this theme system working?
- How can I add a component while contributing?
- What are the key features?

## Table of Contents

1. [Quick Setup](#quick-setup)
2. [Using Theme Toggle Library](#using-theme-toggle-library)
3. [Using Design System Components](#using-design-system-components)
4. [How the Theme System Works](#how-the-theme-system-works)
5. [Key Features](#key-features)
6. [Dependencies Reference](#dependencies-reference)
7. [Troubleshooting](#troubleshooting)

---

## Quick Setup

### Option 1: Using Theme Toggle Only

```bash
# 1. Install from GitHub
npm install github:shru-6/my-design#main

# 2. Set up Tailwind v4 (if not already installed)
npm install tailwindcss@next @tailwindcss/postcss@next

# 3. Copy globals.css from the repository
# Run: npx copy-globals
# Or manually copy apps/design-system/styles/globals.css to your project (e.g., app/globals.css)
# This contains base CSS variables and @theme inline block

# 4. Configure PostCSS (create postcss.config.mjs)
# See "Setting Up Tailwind v4 and CSS" section below for details

# 5. Copy tokens to your public folder
npm run copy:tokens
# or
npx copy-tokens

# 6. Import CSS in your root layout
# import './globals.css'

# 7. Use in your app
import { ThemeToggle } from '@shru/theme-toggle'

function App() {
  return <ThemeToggle position="bottom-right" />
}
```

### Option 2: Using Components Only

```bash
# 1. Set up Tailwind v4 (if not already installed)
npm install tailwindcss@next @tailwindcss/postcss@next

# 2. Copy globals.css from the repository
# Run: npx copy-globals
# Or manually copy apps/design-system/styles/globals.css to your project (e.g., app/globals.css)
# This contains base CSS variables and @theme inline block

# 3. Configure PostCSS (create postcss.config.mjs)
# See "Styling Setup" section below for details

# 4. Copy components folder
cp -r apps/design-system/src/design-system/components /path/to/your/project/src/

# 5. Install dependencies (see Dependencies Reference section)
npm install react react-dom class-variance-authority clsx tailwind-merge lucide-react
# Plus Radix UI packages for components you use

# 6. Import CSS in your root layout
# import './globals.css'

# 7. Use components
import { Button } from '@/components/atoms/Button'
```

### Option 3: Using Both

Follow both setup processes above. Components work with theme system automatically via CSS variables.

---

## Using Theme Toggle Library

### Installation

```bash
npm install github:shru-6/my-design#main
# or
pnpm add github:shru-6/my-design#main
# or
yarn add github:shru-6/my-design#main
```

The library automatically builds on install via `postinstall` script.

### Setting Up Tailwind v4 and CSS

**Important**: Before using the theme toggle, you need Tailwind v4 and the base CSS configuration.

1. **Install Tailwind v4**:
   ```bash
   npm install tailwindcss@next @tailwindcss/postcss@next
   ```

2. **Configure PostCSS** (`postcss.config.mjs`):
   ```js
   const config = {
     plugins: {
       "@tailwindcss/postcss": {},
     },
   }
   export default config
   ```

3. **Copy `globals.css`**:
   - Run `npx copy-globals` to automatically copy `globals.css` to your project
   - Alternatively, manually copy `apps/design-system/styles/globals.css` from this repository to your project (e.g., `app/globals.css` or `styles/globals.css`)
   - Import it in your root layout: `import './globals.css'`

**Why this is needed**: The `globals.css` file contains:
- Base CSS variable definitions (`:root` and `.dark`) that serve as defaults
- `@theme inline` block that maps CSS variables to Tailwind color tokens
- Base layer styles and custom utilities

The theme system will override these variables at runtime, but the base definitions are required for Tailwind to recognize color tokens like `bg-background` and `text-foreground`.

### Setting Up Tokens

Tokens must be accessible at runtime. Copy them to your public folder:

```bash
npm run copy:tokens
# or
npx copy-tokens
```

This copies tokens from `node_modules/@shru/theme-toggle/src/tokens` to `public/tokens/`.

**Alternative**: Set custom token path:

```tsx
// Before using ThemeToggle
if (typeof window !== 'undefined') {
  window.__THEME_TOKENS_BASE__ = '/custom/path/to/tokens'
}
```

### Basic Usage

```tsx
import { ThemeToggle } from '@shru/theme-toggle'

function App() {
  return (
    <div>
      <ThemeToggle position="bottom-right" />
    </div>
  )
}
```

**That's it!** CSS variables are automatically generated and injected.

### Programmatic Control

```tsx
import { useTheme } from '@shru/theme-toggle'

function MyComponent() {
  const { selectedThemes, updateTheme, resetToDefaults } = useTheme()
  
  return (
    <div>
      <p>Current color: {selectedThemes.color}</p>
      <button onClick={() => updateTheme('color', 'dark')}>
        Switch to Dark
      </button>
      <button onClick={resetToDefaults}>Reset</button>
    </div>
  )
}
```

### Extending Themes

Add custom token files that automatically appear in ThemeToggle:

1. **Add theme file**: `public/tokens/themes/color/ocean.json`
2. **Register it**:
   ```tsx
   import { registerThemeFromFile } from '@shru/theme-toggle'
   
   registerThemeFromFile('color', 'ocean', 'color/ocean.json')
   ```
3. **Theme appears in UI automatically!**

See [TOKEN_EXTENSION.md](./TOKEN_EXTENSION.md) for advanced usage.

### API Reference

**`ThemeToggle` Props:**
- `className?: string` - Additional CSS classes
- `position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"` - Button position

**`useTheme()` Returns:**
- `selectedThemes` - Current theme selection
- `updateTheme(category, themeId)` - Update a theme
- `resetToDefaults()` - Reset to defaults
- `isLoading` - Loading state
- `error` - Error state
- `getAvailableThemes(category)` - Get available themes for category

---

## Using Design System Components

### Installation

Components are not packaged yet - copy them directly:

```bash
cp -r apps/design-system/src/design-system/components /path/to/your/project/src/
```

**Important**: Also copy `utils.ts` from the components folder (contains `cn` utility).

### Required Dependencies

**Core dependencies** (required for all components):
```bash
npm install react react-dom
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
```

**Radix UI primitives** (install based on components you use):
```bash
# Common ones
npm install @radix-ui/react-slot @radix-ui/react-label
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-popover @radix-ui/react-tooltip
# See Dependencies Reference for complete list
```

**Optional dependencies** (only if using specific components):
- `input-otp` - For InputOTP component
- `embla-carousel-react` - For Carousel component
- `cmdk` - For Command component
- `react-day-picker` - For Calendar component
- `react-hook-form` - For Form component
- `vaul` - For Drawer component
- `recharts` - For Chart component
- `sonner` - For Toaster component
- `react-resizable-panels` - For Resizable component

### Usage Example

```tsx
import { Button } from '@/components/atoms/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/layout/Card'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### Component Organization

Components are organized by Atomic Design:

- **Atoms** (`atoms/`) - Basic building blocks (Button, Input, Badge, etc.)
- **Molecules** (`molecules/`) - Composite components (Form, Modal, Select, etc.)
- **Layout** (`layout/`) - Layout components (Card, Sidebar, Table, etc.)
- **Primitives** (`primitives/`) - Low-level primitives (Box, Flex, Text, etc.)

### Styling Setup

Components use **Tailwind CSS v4** with CSS variables. You need to set up Tailwind v4 and copy the base CSS configuration.

#### 1. Install Tailwind v4

```bash
npm install tailwindcss@next @tailwindcss/postcss@next
```

#### 2. Configure PostCSS

Create or update `postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

#### 3. Copy Global CSS

**Important**: Copy the `globals.css` file from this repository to your project. This file contains:

- Tailwind v4 imports
- Base CSS variable definitions (`:root` and `.dark`)
- `@theme inline` block that maps CSS variables to Tailwind color tokens
- Base layer styles and custom utilities

**Easy way**: Run `npx copy-globals` to automatically copy `globals.css` to your project.

**Manual way**: Copy from `apps/design-system/styles/globals.css` to your project (e.g., `app/globals.css` or `styles/globals.css`)

**Why this is needed**: 
- The base CSS variables (like `--background`, `--primary`) are defaults that the theme system will override
- The `@theme inline` block maps these variables to Tailwind's color system (e.g., `--background` → `--color-background`)
- Without this, Tailwind classes like `bg-background` and `text-foreground` won't work

#### 4. Import CSS in Your App

Import the CSS file in your root layout:

```tsx
// app/layout.tsx or _app.tsx
import './globals.css' // or your CSS file path
```

**Note**: The theme system will override the base CSS variables at runtime, but the base definitions are required for Tailwind to recognize the color tokens.

---

## How the Theme System Works

### Overview

The theme system uses **token-based theming** with **multi-category support**. Themes are composed from JSON token files and converted to CSS variables at runtime.

### Architecture

```
Token Files (JSON) → Theme Composition → CSS Variables → Applied to DOM
```

1. **Token Files**: JSON files in `public/tokens/` define design tokens
2. **Theme Composition**: Multiple themes are merged (base → category themes → custom)
3. **CSS Generation**: Tokens are flattened to CSS variables
4. **DOM Application**: CSS variables are injected into `<head>` as `<style>` tag

### Theme Categories

Themes are organized by category:

- **Color** - Color schemes (white, dark)
- **Typography** - Font families (sans, serif)
- **Shape** - Border radius (smooth, sharp)
- **Density** - Spacing (comfortable, compact)
- **Animation** - Animation speed (gentle, brisk)
- **Custom** - Custom themes (brand, minimal) - applied last with highest priority

### Token File Structure

```json
{
  "name": "Ocean",
  "icon": "🌊",
  "description": "Ocean color theme",
  "color": {
    "primary": "{palette.blue.600}",
    "background": "{palette.cyan.50}"
  }
}
```

**Token References**: Use `{palette.color.shade}` syntax to reference palette colors.

### Theme Composition Order

1. Base tokens (`base.json`)
2. Palette (`palettes.json`)
3. Category themes (color, typography, shape, density, animation) - in order
4. Custom theme - applied last (highest priority)

### CSS Variables

Themes generate CSS variables automatically:

```css
:root {
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  --font-body: 'Inter', sans-serif;
  /* ... */
}
```

These are automatically available in Tailwind classes: `bg-primary`, `text-foreground`, etc.

### Storage

Theme selections are stored in `localStorage` with key `'design-system-theme'`:

```json
{
  "color": "white",
  "typography": "sans",
  "shape": "smooth",
  "density": "comfortable",
  "animation": "gentle"
}
```

---

## Key Features

### Design System Components

- **72+ Components** organized by Atomic Design
- **Radix UI Based** - Accessible, unstyled primitives with custom styling
- **Tailwind CSS** - Utility-first styling with CSS variables
- **TypeScript** - Full type definitions
- **Self-contained** - Components use relative imports, no path aliases needed
- **Library-ready** - Can be copied directly into projects

### Theme System

- **Token-based** - JSON token files define themes
- **Multi-category** - Compose themes from multiple categories
- **Dynamic** - CSS variables generated at runtime
- **Extensible** - Add custom themes that appear in UI automatically
- **Zero CSS imports** - No manual CSS files needed
- **Persistent** - Theme selections saved to localStorage

### Architecture

- **Module-based** - Clean separation: `ui/`, hooks, config, utils
- **Centralized exports** - Clean import paths with `index.ts` files
- **Atomic Design** - Components organized by complexity
- **Single source of truth** - Library re-exports from app's theme system

---

## Dependencies Reference

### Core Dependencies (All Components)

```bash
npm install react react-dom
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
```

### Radix UI Primitives

Install based on components you use:

```bash
npm install @radix-ui/react-accordion          # Accordion
npm install @radix-ui/react-alert-dialog      # AlertDialog
npm install @radix-ui/react-aspect-ratio      # AspectRatio
npm install @radix-ui/react-avatar            # Avatar
npm install @radix-ui/react-checkbox          # Checkbox
npm install @radix-ui/react-collapsible       # Collapsible
npm install @radix-ui/react-context-menu      # ContextMenu
npm install @radix-ui/react-dialog            # Modal, Sheet
npm install @radix-ui/react-dropdown-menu     # DropdownMenu
npm install @radix-ui/react-hover-card         # HoverCard
npm install @radix-ui/react-label             # Label, Form
npm install @radix-ui/react-menubar           # Menubar
npm install @radix-ui/react-navigation-menu   # NavigationMenu
npm install @radix-ui/react-popover           # Popover
npm install @radix-ui/react-progress           # Progress
npm install @radix-ui/react-radio-group       # Radio
npm install @radix-ui/react-scroll-area       # ScrollArea
npm install @radix-ui/react-select            # Select
npm install @radix-ui/react-separator         # Separator
npm install @radix-ui/react-slider            # Slider
npm install @radix-ui/react-slot              # Button, Badge, Breadcrumb, Form
npm install @radix-ui/react-switch            # Switch
npm install @radix-ui/react-tabs              # Tabs
npm install @radix-ui/react-toggle            # Toggle
npm install @radix-ui/react-toggle-group     # ToggleGroup
npm install @radix-ui/react-tooltip           # Tooltip
```

### Component-Specific Dependencies

Only install if using these components:

```bash
npm install input-otp                    # InputOTP
npm install embla-carousel-react         # Carousel
npm install cmdk                         # Command
npm install react-day-picker             # Calendar
npm install react-hook-form              # Form
npm install vaul                         # Drawer
npm install recharts                     # Chart
npm install sonner                       # Toaster
npm install react-resizable-panels       # Resizable
```

**Summary**: 60+ components only need core dependencies. 9 components require additional libraries.

**Detailed breakdown**: See [COMPONENT_DEPENDENCIES.md](./COMPONENT_DEPENDENCIES.md) for a complete list of which components need which specific dependencies.

See [COMPONENT_DEPENDENCIES.md](./COMPONENT_DEPENDENCIES.md) for detailed breakdown.

---

## Troubleshooting

### Theme Toggle Issues

**CSS variables not appearing:**
- Check token files are accessible at `/tokens/`
- Check browser console for errors loading token files
- Verify `ThemeToggle` component is mounted

**Theme not applying:**
- Check Network tab - verify token JSON files load (status 200)
- Check localStorage - themes saved to `'design-system-theme'`
- Check console for validation errors

**Module not found:**
- Run `cd node_modules/@shru/theme-toggle && npm run build:lib`
- Ensure `postinstall` script ran successfully

### Component Issues

**Import errors:**
- Components use relative imports - ensure folder structure is maintained
- Copy `utils.ts` along with components folder

**Missing styles:**
- Ensure Tailwind CSS is configured
- Check CSS variables are defined (use theme toggle or define manually)
- Verify Tailwind content paths include component files

**Type errors:**
- Install all peer dependencies
- Ensure TypeScript types are imported correctly

**Component-specific errors:**
- Check if component requires additional dependencies (see Dependencies Reference)
- Install missing Radix UI packages

---

## Next Steps

- **Extending themes**: See [TOKEN_EXTENSION.md](./TOKEN_EXTENSION.md) for advanced theme extension
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- **Adding components**: See [Component System Docs](./apps/design-system/src/design-system/components/README.md#how-to-add-a-component) for detailed component addition guide
- **Theme system internals**: See [Theme System Docs](./apps/design-system/src/design-system/themes/README.md) for theme system architecture

