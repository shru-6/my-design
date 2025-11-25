# Architecture Documentation

## Overview

This document describes the overall architecture of the design system application and how different systems interact.

## Project Structure

```
apps/v4/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── design-system/     # Design system showcase page
│   └── (app)/            # App routes
├── src/
│   └── design-system/    # Design system source code
│       ├── components/   # Component library
│       └── themes/       # Theme system
├── styles/               # Global styles and theme CSS
├── public/               # Static assets
│   └── tokens/          # Design tokens (JSON)
├── lib/                  # Shared utilities
└── hooks/               # React hooks
```

## Key Systems

### 1. Component System
- **Location**: `src/design-system/components/`
- **Organization**: Atomic Design (atoms, molecules, layout, primitives, ui)
- **Documentation**: See `src/design-system/components/COMPONENT_SYSTEM.md`

### 2. Showcase System
- **Location**: `src/design-system/components/showcases.ts`
- **Purpose**: Central registry for component showcases
- **Documentation**: See `src/design-system/components/SHOWCASE_SYSTEM.md`

### 3. Category System
- **Location**: `src/design-system/components/showcaseUtils.ts`
- **Purpose**: Organizes components by functional purpose
- **Documentation**: See `src/design-system/components/CATEGORY_SYSTEM.md`

### 4. Theme System
- **Location**: `styles/globals.css`, `public/tokens/`, `src/design-system/themes/`
- **Purpose**: Token-based theming with composition
- **Documentation**: See `src/design-system/themes/THEME_SYSTEM.md`

## Adding New Features

### Adding a New Component

1. **Create Component File**
   - Place in appropriate folder: `atoms/`, `molecules/`, `layout/`, or `primitives/`
   - Follow existing component patterns
   - Export component and showcase function

2. **Update Index Files**
   - Add export to category `index.ts` (e.g., `atoms/index.ts`)
   - Add showcase export to same `index.ts`

3. **Register Showcase**
   - Import showcase in `showcases.ts`
   - Add to `showcaseRegistry` map

4. **Add Category Mapping**
   - Add entry to `componentCategoryMap` in `showcaseUtils.ts`
   - Choose appropriate category

5. **Update Descriptions** (optional)
   - Add description to `getComponentDescription()` in `showcaseUtils.ts`

### Adding a New Category

1. **Update Category Map**
   - Add new category to `componentCategoryMap` in `showcaseUtils.ts`
   - Assign components to new category

2. **Update Icon Mapping**
   - Add icon mapping in `app/design-system/page.tsx`
   - Update `getCategoryIcon()` function

3. **Update File Path Logic** (if needed)
   - Update `getComponentFile()` in `showcaseUtils.ts` if category has special file paths

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

1. **Delete Component File**
   - Remove from appropriate folder

2. **Update Index Files**
   - Remove export from category `index.ts`
   - Remove showcase export

3. **Unregister Showcase**
   - Remove import from `showcases.ts`
   - Remove from `showcaseRegistry` map

4. **Remove Category Mapping**
   - Remove entry from `componentCategoryMap` in `showcaseUtils.ts`

5. **Remove Description** (optional)
   - Remove from `getComponentDescription()` in `showcaseUtils.ts`

### Removing a Category

1. **Reassign Components**
   - Move all components from removed category to other categories
   - Update `componentCategoryMap`

2. **Remove Icon Mapping**
   - Remove from `getCategoryIcon()` in `app/design-system/page.tsx`

3. **Update File Path Logic**
   - Remove category check from `getComponentFile()` if needed

## Important Files

- **`app/layout.tsx`**: Root layout, metadata, favicon configuration
- **`lib/config.ts`**: Site configuration (name, description, etc.)
- **`styles/globals.css`**: Global styles, CSS variables, theme definitions
- **`public/tokens/`**: Design tokens in JSON format
- **`next.config.mjs`**: Next.js configuration

## Repository Structure

### Essential Folders

1. **`app/`** - Next.js App Router
   - `layout.tsx` - Root layout with metadata
   - `design-system/page.tsx` - Component showcase page
   - `(app)/` - App routes

2. **`src/design-system/`** - Design System Source
   - `components/` - Component library (atoms, molecules, layout, primitives, ui)
   - `themes/` - Theme system utilities

3. **`public/tokens/`** - Design Tokens
   - `base.json` - Base tokens
   - `palettes.json` - Color palettes
   - `themes/` - Theme-specific tokens

4. **`styles/`** - Global Styles
   - `globals.css` - Tailwind v4 config + CSS variables

5. **`lib/`** - Shared Utilities (5 essential files)
   - `utils.ts` - `cn()` function (clsx + tailwind-merge)
   - `config.ts` - Site configuration
   - `fonts.ts` - Font loading
   - `events.ts` - Event tracking
   - `source.ts` - Page tree for navigation

6. **`hooks/`** - React Hooks (2 essential hooks)
   - `use-mobile.ts` - Used by Sidebar
   - `use-layout.tsx` - Layout context

### Removed/Unused

- `registry/` - Migrated to `src/design-system/`
- `app/api/`, `app/og/` - Not needed
- `mdx-components.tsx` - No MDX docs
- Unused `lib/` and `hooks/` files - Cleaned up

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

