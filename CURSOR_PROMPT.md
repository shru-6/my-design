# Cursor Prompt: Integrate Design System Library (Theme Toggle + 72+ Components)

Copy and paste this prompt into Cursor in your other repository:

---

**I want to integrate the `shru-design-system` library (theme toggle + 72+ components) into this Next.js project.**

## Task:
1. **Install the library** from npm:
   - Run `npm install shru-design-system` (or `pnpm add shru-design-system` / `yarn add shru-design-system`)
   - This automatically adds the dependency to your `package.json`
   - The package is pre-built, so no build step is needed

2. **Set up Tailwind v4 and CSS** (Required):
   - Install Tailwind v4: `npm install tailwindcss@next @tailwindcss/postcss@next`
   - Configure PostCSS: Create `postcss.config.mjs` with `@tailwindcss/postcss` plugin
   - **Import CSS from package** (Recommended): `import 'shru-design-system/styles'` in your root layout
   - **OR copy CSS manually**: Run `npx copy-globals` or copy `node_modules/shru-design-system/apps/design-system/styles/globals.css` to your project
   - **Why CSS is required**: The `globals.css` contains:
     - Tailwind CSS imports (`@import "tailwindcss"`)
     - `@theme inline` block that maps CSS variables to Tailwind colors
     - Base CSS variable definitions
   - The theme system dynamically overrides these variables at runtime, but the base CSS file is required for Tailwind to work.

3. **Set up token files** (Optional, needed for theme toggle):
   - Run `npx copy-tokens` to automatically copy tokens from the package to your `public/tokens` folder
   - Alternatively, manually copy from `node_modules/shru-design-system/src/tokens` to `public/tokens`
   - Ensure the tokens are accessible at `/tokens/` path in your app
   - The folder structure should be: `public/tokens/base.json`, `public/tokens/palettes.json`, `public/tokens/themes/color/`, etc.

4. **Add Theme Toggle** to your app:
   - Import `ThemeToggle` from `shru-design-system` in your layout or main page
   - Add `<ThemeToggle position="bottom-right" />` to your component
   - Make sure it's a client component (add `"use client"` if needed)

5. **Use Design System Components**:
   - Import any component from `shru-design-system`:
     - **Atoms**: `Button`, `TextInput`, `Badge`, `Checkbox`, `Switch`, `Radio`, `Skeleton`, `Progress`, `Spinner`, `Avatar`, `Empty`, `Slider`, `Toggle`, `Alert`, `InputOTP`, `Kbd`, `Text`, `Image`, `Upload`, `ErrorBoundary`, `Label`, `Textarea`, `Separator`
     - **Molecules**: `Modal`, `Select`, `Form`, `Tabs`, `Accordion`, `Popover`, `Sheet`, `Tooltip`, `Collapsible`, `Command`, `Calendar`, `DropdownMenu`, `ContextMenu`, `Menubar`, `NavigationMenu`, `HoverCard`, `AlertDialog`, `Drawer`, `Carousel`, `InputGroup`, `ToggleGroup`, `Toaster`, `Field`, `Chart`, `FormInput`, `InlineEdit`, `ConfirmModal`, `TriggerModal`, `FormModal`, `Toast`, `Snackbar`, `InfoBanner`, `StatusText`, `CopyButton`, `HistoryControlButtons`, `Stepper`, `Breadcrumb`, `Pagination`
     - **Layout**: `Card`, `Table`, `Sidebar`, `ScrollArea`, `AspectRatio`, `Resizable`, `Container`, `Stack`, `Grid`, `Box`, `List`, `Header`, `Footer`, `CollapsiblePanel`, `ResizeContainer`, `EmptyScreen`
     - **Primitives**: `PrimitiveBox`, `PrimitiveFlex`, `PrimitiveStack`, `PrimitiveText`, `Icon`, `VisuallyHidden` (note: primitives have `Primitive` prefix to avoid conflicts)

6. **Handle Next.js specifics**:
   - If you get SSR errors, wrap components in a dynamic import with `ssr: false`
   - Most components are already marked as `"use client"` but Next.js might need dynamic import for some

7. **Verify it works**:
   - Check that CSS variables are being generated in the `<head>` (look for `<style id="dynamic-theme">`)
   - Test that theme switching works
   - Ensure tokens are loading correctly (check Network tab for `/tokens/` requests)
   - Test that components render correctly with proper styling

## Example Implementation:

```tsx
// In your layout.tsx or page.tsx
"use client"

import 'shru-design-system/styles' // Import CSS (required)
import dynamic from 'next/dynamic'
import { Button, Card, Modal } from 'shru-design-system'

const ThemeToggle = dynamic(
  () => import('shru-design-system').then((mod) => mod.ThemeToggle),
  { ssr: false }
)

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ThemeToggle position="bottom-right" />
      </body>
    </html>
  )
}

// Example: Using components in a page
export default function HomePage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="primary">Get Started</Button>
          <Modal>
            <ModalTrigger>Open Modal</ModalTrigger>
            <ModalContent>
              <ModalTitle>Hello</ModalTitle>
              <ModalDescription>This is a modal</ModalDescription>
            </ModalContent>
          </Modal>
        </CardContent>
      </Card>
    </div>
  )
}
```

## Requirements:
- **Tailwind CSS v4** must be installed and configured (`tailwindcss@next @tailwindcss/postcss@next`)
- **CSS must be imported** - Either `import 'shru-design-system/styles'` or copy `globals.css` manually
- **Why CSS is needed**: Contains Tailwind imports and `@theme inline` block that maps CSS variables to Tailwind. Theme system overrides variables at runtime.
- Token files should be accessible at runtime at `/tokens/` path (optional, only needed for theme toggle)
- React 18+ must be installed
- **Peer dependencies**: The package uses Radix UI primitives, so ensure you have compatible versions installed if needed

## Expected Result:
- **Theme toggle**: Button appears in the corner, clicking opens radial menu with theme categories (Color, Typography, Shape, etc.), selecting themes applies CSS variables automatically
- **Components**: All 72+ components (Button, Card, Modal, Select, Form, etc.) work out of the box with proper styling
- **Theming**: Components automatically use CSS variables from the theme system
- **No manual CSS imports or additional setup needed** (except the one CSS import)

## Component Categories:

**Atoms (19 components):** Basic building blocks like Button, TextInput, Badge, Checkbox, Switch, Radio, Skeleton, Progress, Spinner, Avatar, Empty, Slider, Toggle, Alert, InputOTP, Kbd, Text, Image, Upload, ErrorBoundary, Label, Textarea, Separator

**Molecules (29 components):** Composite components like Modal, Select, Form, Tabs, Accordion, Popover, Sheet, Tooltip, Collapsible, Command, Calendar, DropdownMenu, ContextMenu, Menubar, NavigationMenu, HoverCard, AlertDialog, Drawer, Carousel, InputGroup, ToggleGroup, Toaster, Field, Chart, FormInput, InlineEdit, ConfirmModal, TriggerModal, FormModal, Toast, Snackbar, InfoBanner, StatusText, CopyButton, HistoryControlButtons, Stepper, Breadcrumb, Pagination

**Layout (15 components):** Layout components like Card, Table, Sidebar, ScrollArea, AspectRatio, Resizable, Container, Stack, Grid, Box, List, Header, Footer, CollapsiblePanel, ResizeContainer, EmptyScreen

**Primitives (6 components):** Low-level primitives exported with `Primitive` prefix: PrimitiveBox, PrimitiveFlex, PrimitiveStack, PrimitiveText, Icon, VisuallyHidden

## Troubleshooting:
- **Module not found error**: Verify the package is installed: `npm list shru-design-system`
- **Component not found**: All components are exported from the main package, use: `import { ComponentName } from 'shru-design-system'`
- **Token files not loading**: Verify `public/tokens/` exists and files are accessible at `/tokens/` path (only needed for theme toggle)
- **SSR errors**: Use `dynamic` import with `ssr: false` as shown above, especially for ThemeToggle
- **CSS variables not appearing**: 
  - Ensure CSS is imported: `import 'shru-design-system/styles'`
  - Check browser console for errors
  - Verify tokens are loading (check Network tab for `/tokens/` requests)
  - Look for `<style id="dynamic-theme">` in the DOM
- **Components not styled**: Make sure CSS is imported and Tailwind v4 is configured correctly
- **Type errors**: All components have full TypeScript support, ensure your TypeScript config is correct

---

