# shru-design-system

A React component library with atoms and molecules built on Radix UI and Tailwind CSS, featuring a dynamic theme system.

## Project Structure

### Root Files

- **`package.json`** - Package configuration, dependencies, and scripts
- **`tsconfig.json`** - TypeScript configuration
- **`tsup.config.ts`** - Build configuration for bundling (ESM/CJS)
- **`tailwind.config.js`** - Tailwind CSS configuration (for library development)
- **`postcss.config.js`** - PostCSS configuration (for library development)
- **`.gitignore`** - Git ignore rules

### Source Code (`src/`)

- **`src/index.ts`** - Main entry point, exports all components and utilities
- **`src/utils.ts`** - Utility functions (cn helper for class merging)

#### Atoms (`src/atoms/`)
Basic UI building blocks:
- **`Alert.tsx`** - Alert component for notifications
- **`Avatar.tsx`** - Avatar component with image and fallback
- **`Badge.tsx`** - Badge component for labels and tags
- **`Button.tsx`** - Button component with variants and sizes
- **`Checkbox.tsx`** - Checkbox input component
- **`Empty.tsx`** - Empty state component
- **`ErrorBoundary.tsx`** - Error boundary component
- **`Image.tsx`** - Image component with loading states
- **`InputOTP.tsx`** - OTP input component
- **`Kbd.tsx`** - Keyboard key display component
- **`Label.tsx`** - Form label component
- **`Progress.tsx`** - Progress bar component
- **`Radio.tsx`** - Radio button group component
- **`Separator.tsx`** - Horizontal/vertical divider component
- **`Skeleton.tsx`** - Skeleton loading component
- **`Slider.tsx`** - Slider input component
- **`Spinner.tsx`** - Loading spinner component
- **`Switch.tsx`** - Toggle switch component
- **`Text.tsx`** - Typography text component
- **`TextInput.tsx`** - Text input field component
- **`Textarea.tsx`** - Multi-line text input component
- **`Toggle.tsx`** - Toggle button component
- **`Upload.tsx`** - File upload component

#### Molecules (`src/molecules/`)
Composite components:
- **`Accordion.tsx`** - Collapsible accordion component
- **`AlertDialog.tsx`** - Alert dialog component
- **`Breadcrumb.tsx`** - Breadcrumb navigation component
- **`Calendar.tsx`** - Calendar date picker component
- **`Carousel.tsx`** - Image/content carousel component
- **`Chart.tsx`** - Chart component (Recharts wrapper)
- **`Collapsible.tsx`** - Collapsible content component
- **`Command.tsx`** - Command palette component
- **`ConfirmModal.tsx`** - Confirmation modal component
- **`ContextMenu.tsx`** - Right-click context menu
- **`CopyButton.tsx`** - Copy to clipboard button
- **`Drawer.tsx`** - Drawer/side panel component
- **`DropdownMenu.tsx`** - Dropdown menu component
- **`Field.tsx`** - Form field wrapper component
- **`Form.tsx`** - Form component (react-hook-form)
- **`FormInput.tsx`** - Form input with label and error
- **`FormModal.tsx`** - Modal with form integration
- **`HistoryControlButtons.tsx`** - Browser history controls
- **`HoverCard.tsx`** - Hover card component
- **`InfoBanner.tsx`** - Information banner component
- **`InlineEdit.tsx`** - Inline editing component
- **`InputGroup.tsx`** - Input with addons/buttons
- **`Menubar.tsx`** - Menu bar component
- **`Modal.tsx`** - Modal dialog component
- **`NavigationMenu.tsx`** - Navigation menu component
- **`Pagination.tsx`** - Pagination component
- **`Popover.tsx`** - Popover component
- **`Select.tsx`** - Dropdown select component
- **`Sheet.tsx`** - Sheet/side panel component
- **`Snackbar.tsx`** - Snackbar notification component
- **`StatusText.tsx`** - Status text with icons
- **`Stepper.tsx`** - Step indicator component
- **`Tabs.tsx`** - Tabs component
- **`Toast.tsx`** - Toast notification component
- **`Toaster.tsx`** - Toast provider component
- **`ToggleGroup.tsx`** - Toggle group component
- **`Tooltip.tsx`** - Tooltip component
- **`TriggerModal.tsx`** - Modal with trigger component

#### Layout (`src/layout/`)
Layout and container components:
- **`AspectRatio.tsx`** - Aspect ratio container
- **`Box.tsx`** - Generic box container
- **`Card.tsx`** - Card container component
- **`CollapsiblePanel.tsx`** - Collapsible panel component
- **`Container.tsx`** - Responsive container component
- **`EmptyScreen.tsx`** - Empty screen component
- **`Footer.tsx`** - Footer component
- **`Grid.tsx`** - Grid layout component
- **`Header.tsx`** - Header component
- **`List.tsx`** - List component
- **`Resizable.tsx`** - Resizable panels component
- **`ResizeContainer.tsx`** - Resizable container wrapper
- **`ScrollArea.tsx`** - Scrollable area component
- **`Sidebar.tsx`** - Sidebar navigation component
- **`Stack.tsx`** - Stack layout component
- **`Table.tsx`** - Table component

#### Theme System (`src/themes/`)
- **`themeConfig.ts`** - Theme configuration and category definitions
- **`themeUtils.ts`** - Theme utility functions (loading, merging, flattening)
- **`applyThemeSync.ts`** - Synchronous theme application (prevents FOUC)
- **`useTheme.tsx`** - React hook for theme management
- **`ui/ThemeToggle/`** - Theme toggle UI component and related files
  - **`ThemeToggle.tsx`** - Main theme toggle component
  - **`useThemeToggle.ts`** - Hook for theme toggle UI state
  - **`themeToggleConfig.ts`** - Theme toggle configuration
  - **`themeToggleUtils.ts`** - Theme toggle utility functions
  - **`index.ts`** - Theme toggle exports

### Build Output (`dist/`)

- **`index.js`** - CommonJS bundle
- **`index.mjs`** - ESM bundle
- **`index.d.ts`** - TypeScript declarations (CJS)
- **`index.d.mts`** - TypeScript declarations (ESM)

### Scripts (`scripts/`)

Setup and runtime scripts:
- **`init.js`** - Postinstall script that sets up Tailwind, PostCSS, and token files in consuming apps
- **`apply-theme-sync.js`** - Standalone synchronous theme script (injected into HTML)
- **`applyThemeSync.js`** - Synchronous theme application module
- **`themeConfig.js`** - Theme configuration (JavaScript version)
- **`themeUtils.js`** - Theme utilities (JavaScript version)
- **`tokens/`** - Default token files (copied to consuming apps)
  - **`base.json`** - Base design tokens
  - **`palettes.json`** - Color palette definitions
  - **`themes/`** - Theme category files
    - **`color/`** - Color theme variants (white, dark)
    - **`typography/`** - Typography themes (sans, serif)
    - **`shape/`** - Shape themes (smooth, sharp)
    - **`density/`** - Density themes (comfortable, compact)
    - **`animation/`** - Animation themes (gentle, brisk)
    - **`custom/`** - Custom theme examples (brand, minimal)

### Test Application (`test/`)

Local test environment for developing and testing the library:
- **`package.json`** - Test app dependencies
- **`vite.config.ts`** - Vite configuration for test app
- **`index.html`** - Test app HTML entry point
- **`src/App.tsx`** - Test app component showcasing all library components
- **`src/main.tsx`** - Test app entry point
- **`src/index.css`** - Test app global styles
- **`tailwind.config.js`** - Tailwind config for test app
- **`postcss.config.js`** - PostCSS config for test app
- **`public/tokens/`** - Token files for testing (generated by init script)
- **`dist/`** - Vite build output (ignored in git)

## Usage

Install:
```bash
npm install shru-design-system
```

### Theme setup (new flow)
- Tokens are embedded in the bundle, so the theme system works out-of-the-box (no `/public/tokens` required).
- If you want to self-host tokens (for custom themes or CDN):
  - Set `window.__THEME_TOKENS_BASE__ = "/tokens"` (or your URL) before the app renders, or set `DESIGN_SYSTEM_TOKENS_BASE` env at build/runtime.
  - Serve token JSONs at `<base>/base.json`, `<base>/palettes.json`, `<base>/themes/<category>/<theme>.json`.
- Blocking HTML injection is removed; the runtime/applyThemeSync appends `#dynamic-theme` at the end of `<head>` so its CSS vars override compiled CSS.

Optional token copy:
```bash
npx shru-design-system-init   # copies tokens into public/tokens if you want static hosting
```

Import components:
```tsx
import { 
  Button, 
  Modal, 
  ThemeToggle, 
  Alert,
  Avatar,
  Accordion,
  Calendar,
  Carousel,
  Form,
  Field,
  // ... and many more
  registerThemeFromFile 
} from 'shru-design-system'
```

### Available Components

The library includes 67+ components organized into:
- **Atoms** (23): Basic UI elements like Button, Input, Badge, etc.
- **Molecules** (35): Composite components like Modal, Form, Calendar, etc.
- **Layout** (16): Layout components like Grid, Stack, Sidebar, etc.

Registering themes:
- Add a custom theme file at your token base, e.g. `/tokens/themes/custom/my-brand.json`.
- Call at runtime (after page load):
```ts
registerThemeFromFile('custom', 'my-brand', '/tokens/themes/custom/my-brand.json')
```
The theme toggle will pick it up automatically.

## Development

Build the library:
```bash
npm run build
```

Test locally:
```bash
cd test && npm run dev
```
