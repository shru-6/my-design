# Architecture Documentation

## Overview

This document describes the overall architecture of the design system application and how different systems interact.

## Project Structure

```
apps/design-system/
├── app/                    # Next.js app router pages (minimal routes)
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home route (/)
│   └── design-system/     # Design system showcase route (/design-system)
├── src/
│   └── design-system/    # Design system source code
│       ├── components/   # Component library
│       └── themes/       # Theme system
├── config/               # App-level configuration
│   ├── appConfig.ts      # Site config, fonts, meta colors
│   └── index.ts          # Centralized exports
├── hooks/                # App-level React hooks
│   ├── use-mobile.ts     # Mobile breakpoint detection
│   └── index.ts          # Centralized exports
├── lib/                  # Shared utilities
│   └── utils.ts          # cn()
├── styles/               # Global styles and theme CSS
└── public/               # Static assets
    └── tokens/          # Design tokens (JSON)
```

## Key Systems

### 1. Component System
- **Location**: `src/design-system/components/`
- **Organization**: Atomic Design (atoms, molecules, layout, primitives, ui)
- **Documentation**: See `src/design-system/components/README.md`

### 2. Theme System
- **Location**: `styles/globals.css`, `public/tokens/`, `src/design-system/themes/`
- **Purpose**: Token-based theming with composition
- **Documentation**: See `src/design-system/themes/README.md`

## Adding New Features

### Adding a New Component

See [Component System Documentation](./src/design-system/components/README.md) for complete workflow.

Quick steps:
1. Create component file in appropriate folder (`atoms/`, `molecules/`, `layout/`, or `primitives/`)
2. Export from category `index.ts`
3. Register showcase in `componentConfig.ts`
4. Add category mapping in `componentUtils.ts`

### Adding a New Theme Token

1. **Add CSS Variable**
   - Add to `:root` in `styles/globals.css` (light mode)
   - Add to `.dark` in `styles/globals.css` (dark mode)

2. **Add to Theme Block**
   - Add `--color-{name}: var(--{name})` to `@theme inline` block in `globals.css`

3. **Add to Tokens** (optional)
   - Add to `public/tokens/base.json`
   - Add to theme-specific files in `public/tokens/themes/color/`

## Removing Features

### Removing a Component

1. Delete component file from appropriate folder
2. Remove export from category `index.ts`
3. Remove from `componentConfig.ts` showcase registry
4. Remove from `componentUtils.ts` category mapping

## Important Files

- **`app/layout.tsx`**: Root layout, metadata, favicon configuration
- **`app/page.tsx`**: Home page (imports `HomePage` from `components/ui`)
- **`app/design-system/page.tsx`**: Design system showcase page (imports `DesignSystemPage` from `components/ui`)
- **`config/appConfig.ts`**: Site configuration (name, description, fonts, meta colors)
- **`styles/globals.css`**: Global styles, CSS variables, theme definitions
- **`public/tokens/`**: Design tokens in JSON format
- **`next.config.mjs`**: Next.js configuration

## Repository Structure

### Essential Folders

1. **`app/`** - Next.js App Router (minimal routes)
   - `layout.tsx` - Root layout with metadata, fonts, providers
   - `page.tsx` - Home route (imports `HomePage` from design-system)
   - `design-system/page.tsx` - Design system showcase route (imports `DesignSystemPage` from design-system)

2. **`src/design-system/`** - Design System Source
   - `components/` - Component library
     - `atoms/` - Basic building blocks
     - `molecules/` - Composite components
     - `layout/` - Layout components (Card, Sidebar, Table, etc.)
     - `primitives/` - Low-level primitives
     - `ui/` - Pure UI components (HomePage, DesignSystemPage)
     - `componentConfig.ts` - Component configuration and showcase registry
     - `componentUtils.ts` - Component utilities and category mapping
   - `themes/` - Theme system (follows module structure)
     - `ui/` - Pure UI components (ThemeToggle) with `index.ts` for exports
     - `useTheme.tsx` - Business logic and state management hook
     - `themeConfig.js` - Configuration, constants, and validation rules
     - `themeUtils.js` - Pure utility functions (no side effects)

3. **`config/`** - App-Level Configuration
   - `appConfig.ts` - Site configuration, fonts, meta theme colors
   - `index.ts` - Centralized exports

4. **`hooks/`** - App-Level React Hooks
   - `use-mobile.ts` - Mobile breakpoint detection (used by Sidebar)
   - `index.ts` - Centralized exports

5. **`lib/`** - Shared Utilities
   - `utils.ts` - `cn()` function (clsx + tailwind-merge)

6. **`public/tokens/`** - Design Tokens
   - `base.json` - Base tokens
   - `palettes.json` - Color palettes
   - `themes/` - Theme-specific tokens

7. **`styles/`** - Global Styles
   - `globals.css` - Tailwind v4 config + CSS variables

### Removed/Unused

- `registry/` - Migrated to `src/design-system/`
- `app/api/`, `app/og/` - Not needed
- `mdx-components.tsx` - No MDX docs
- `lib/source.ts` - Not used (no MDX/docs system)
- `lib/events.ts` - Not used (no analytics tracking)
- `lib/config.ts`, `lib/fonts.ts` - Moved to `config/appConfig.ts`
- `hooks/use-layout.tsx` - Removed (unused)
- `app/(app)/` - Removed route group structure

## App-Level Components

App-level components (in `app/` and root `components/`) should follow these patterns:

### Client/Server Boundaries

**Use `"use client"` when:**
- Component uses React hooks (`useState`, `useEffect`, etc.)
- Component handles user interactions
- Component uses browser APIs (`localStorage`, `window`, etc.)
- Component uses context providers

**Don't use `"use client"` when:**
- Component is purely presentational
- Component only renders static content

### TypeScript Patterns

1. **Extend React.ComponentProps**:
```tsx
export function Component({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("base", className)} {...props} />
}
```

2. **Extend Design System Component Props**:
```tsx
export function AppComponent({
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button variant="ghost" {...props} />
}
```

### Design System Integration

- **Always import from design system**: Use `@/src/design-system/components/...`
- **Use design system variants**: Don't create custom variants
- **Compose components**: Build complex UIs by composing simple components

### Styling Guidelines

1. **Use `cn()` for class merging**: Always use `cn()` utility
2. **Use Tailwind classes**: Prefer Tailwind utilities over custom CSS
3. **Use semantic colors**: `bg-background`, `text-foreground`, not hard-coded colors
4. **Responsive design**: Use Tailwind responsive prefixes

### Component Structure Template

```tsx
"use client" // Only if needed

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/src/design-system/components/atoms/Button"

interface ComponentProps extends React.ComponentProps<"div"> {
  // Custom props
}

export function Component({
  className,
  children,
  ...props
}: ComponentProps) {
  return (
    <div
      data-slot="component-name"
      className={cn("base-styles", className)}
      {...props}
    >
      {children}
    </div>
  )
}
```

## Dependencies

- **Next.js**: App router, React Server Components
- **Tailwind CSS v4**: Styling with CSS variables
- **Radix UI**: Accessible component primitives
- **Class Variance Authority (CVA)**: Variant management
- **Lucide React**: Icons

