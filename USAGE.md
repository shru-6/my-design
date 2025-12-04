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

### 1. Import CSS (Required)

```tsx
// In your root layout or _app.tsx
import 'shru-design-system/styles'
```

### 2. Import Theme Toggle Component

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

### 3. Use Design Components

```tsx
import { Button, Card, Modal } from 'shru-design-system'

function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

### 4. Use Theme Hook

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

### 5. Setup Token Files (Optional)

If you want to use custom themes or the theme toggle needs to discover themes:

```bash
# Copy token files to your public folder
npx copy-tokens
# or manually copy from node_modules/shru-design-system/src/tokens to public/tokens
```

Ensure tokens are accessible at `/tokens/` path in your app.

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

1. **Make sure CSS is imported** - You must import `shru-design-system/styles` or copy `globals.css`
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

## Using Design System Components

The package includes 72+ reusable components organized by category:

### Atoms (Basic Components)
```tsx
import { Button, TextInput, Badge, Checkbox, Switch } from 'shru-design-system'

function MyComponent() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <TextInput placeholder="Enter text..." />
      <Badge>New</Badge>
    </div>
  )
}
```

### Molecules (Composite Components)
```tsx
import { Modal, Select, Form, Tabs, Accordion } from 'shru-design-system'

function MyComponent() {
  return (
    <Modal>
      <ModalTrigger>Open Modal</ModalTrigger>
      <ModalContent>
        <ModalTitle>Hello</ModalTitle>
        <ModalDescription>This is a modal</ModalDescription>
      </ModalContent>
    </Modal>
  )
}
```

### Layout Components
```tsx
import { Card, Table, Sidebar, ScrollArea } from 'shru-design-system'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  )
}
```

### Primitives
```tsx
import { PrimitiveBox, PrimitiveFlex, PrimitiveText } from 'shru-design-system'

function MyComponent() {
  return (
    <PrimitiveBox>
      <PrimitiveFlex>
        <PrimitiveText>Hello</PrimitiveText>
      </PrimitiveFlex>
    </PrimitiveBox>
  )
}
```

**Note:** Primitives are exported with `Primitive` prefix to avoid naming conflicts (e.g., `PrimitiveBox` instead of `Box`).

### Available Components

**Atoms (19):** Button, TextInput, Badge, Label, Textarea, Separator, Checkbox, Switch, Radio, Skeleton, Progress, Spinner, Avatar, Empty, Slider, Toggle, InputOTP, Kbd, Text, Image, Upload, ErrorBoundary, Alert

**Molecules (29):** Select, Tabs, Breadcrumb, Pagination, Modal, Popover, Sheet, Tooltip, Accordion, Collapsible, Command, Calendar, DropdownMenu, ContextMenu, Menubar, NavigationMenu, Form, HoverCard, AlertDialog, Drawer, Carousel, InputGroup, ToggleGroup, Toaster, Field, Chart, FormInput, InlineEdit, ConfirmModal, TriggerModal, FormModal, Toast, Snackbar, InfoBanner, StatusText, CopyButton, HistoryControlButtons, Stepper

**Layout (15):** Card, ScrollArea, AspectRatio, Table, Resizable, Sidebar, Container, Stack, Grid, Box, List, Header, Footer, CollapsiblePanel, ResizeContainer, EmptyScreen

## Next Steps

- See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute
- Check [README.md](./README.md) for project overview
- Review component examples in the design system showcase
