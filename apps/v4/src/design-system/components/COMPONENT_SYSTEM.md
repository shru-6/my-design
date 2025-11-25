# Component System Documentation

## Overview

Components are organized using Atomic Design principles with functional categories for discoverability.

## Folder Structure

```
components/
├── atoms/          # Single-purpose, single-element components
├── molecules/      # Composed components with multiple parts
├── layout/         # Structure and container components
├── primitives/     # Low-level building blocks
├── showcases.ts    # Central showcase registry
├── showcaseUtils.ts # Category mapping and utilities
└── index.ts       # Main component exports
```

## Component Categories

### Atoms (`atoms/`)
**Purpose**: Single-purpose, single-element components

**Examples**: Button, TextInput, Badge, Avatar, Checkbox, Switch, Radio, Label, etc.

**Characteristics**:
- One element, one purpose
- No complex composition
- Reusable building blocks

**When to add here**:
- Simple form controls (input, checkbox, radio, switch)
- Basic display elements (badge, avatar, skeleton)
- Simple actions (button, toggle)
- Utility elements (separator, spinner, progress)

### Molecules (`molecules/`)
**Purpose**: Composed components with multiple parts

**Examples**: Select, Form, Modal, DropdownMenu, Accordion, Tabs, etc.

**Characteristics**:
- Multiple parts working together
- Complex interactions
- Often built on Radix UI primitives

**When to add here**:
- Forms with validation (Form, Field, FormInput)
- Navigation systems (Tabs, Breadcrumb, NavigationMenu)
- Overlays (Modal, Popover, Sheet, Tooltip)
- Menus (DropdownMenu, ContextMenu, Menubar)
- Interactive components (Accordion, Collapsible, Command)

### Layout (`layout/`)
**Purpose**: Structure and container components

**Examples**: Card, Container, Stack, Grid, Sidebar, Table, etc.

**Characteristics**:
- Structural/container components
- Layout and spacing
- Page structure

**When to add here**:
- Containers (Card, Container, Box)
- Layout systems (Stack, Grid)
- Structure (Table, List, Header, Footer)
- Layout helpers (ScrollArea, AspectRatio, Resizable)

### Primitives (`primitives/`)
**Purpose**: Low-level building blocks

**Examples**: PrimitiveBox, PrimitiveFlex, PrimitiveStack, PrimitiveText, Icon, VisuallyHidden

**Characteristics**:
- Base building blocks
- Minimal styling
- Foundation for other components

**When to add here**:
- Base layout primitives
- Utility primitives
- Accessibility helpers


## Component File Structure

Each component file should follow this structure:

```tsx
// 1. Imports
import * as React from "react"
import { cn } from "@/lib/utils"
// ... other imports

// 2. Component definition
export function ComponentName({ ...props }) {
  // Component implementation
}

// 3. Exports
export { ComponentName }

// 4. Showcase function (required)
export function ComponentNameShowcase() {
  return (
    <div className="space-y-6">
      {/* Showcase examples */}
    </div>
  )
}
```

## Adding a New Component

### Step 1: Create Component File

1. Choose the correct folder based on component type (atoms/molecules/layout/primitives)
2. Create `ComponentName.tsx` file
3. Implement the component following existing patterns
4. Add `"use client"` directive if component uses hooks or browser APIs

### Step 2: Create Showcase Function

See [SHOWCASE_SYSTEM.md](./SHOWCASE_SYSTEM.md) for detailed showcase creation steps.

### Step 3: Export from Index File

Update the category's `index.ts` file:

```typescript
// atoms/index.ts (example)
export { ComponentName, ComponentNameShowcase } from "./ComponentName"
```

### Step 4: Register Showcase

See [SHOWCASE_SYSTEM.md](./SHOWCASE_SYSTEM.md) for showcase registration steps.

### Step 5: Add Category Mapping

See [CATEGORY_SYSTEM.md](./CATEGORY_SYSTEM.md) for category assignment steps.

### Step 6: Update Main Index (if needed)

If the component should be exported from the main index:
```typescript
// components/index.ts
export { ComponentName } from "./atoms/ComponentName" // or appropriate path
```

## Removing a Component

### Step 1: Remove Component File
- Delete `ComponentName.tsx` from appropriate folder

### Step 2: Remove from Index
- Remove export from category `index.ts`
- Remove showcase export

### Step 3: Unregister Showcase
See [SHOWCASE_SYSTEM.md](./SHOWCASE_SYSTEM.md) for showcase removal steps.

### Step 4: Remove Category Mapping
See [CATEGORY_SYSTEM.md](./CATEGORY_SYSTEM.md) for category removal steps.

### Step 5: Remove from Main Index
- Remove export from `components/index.ts` if present

## Best Practices

1. **Client Components**: Add `"use client"` if component uses hooks, state, or browser APIs
2. **Accessibility**: Follow Radix UI patterns for accessibility
3. **Naming**: Use PascalCase for components, `{ComponentName}Showcase` for showcases
4. **Documentation**: Add JSDoc comments for complex components
5. **Showcases**: See [SHOWCASE_SYSTEM.md](./SHOWCASE_SYSTEM.md) for showcase best practices
6. **Categories**: See [CATEGORY_SYSTEM.md](./CATEGORY_SYSTEM.md) for category guidelines

## Common Patterns

### Using CVA for Variants
```tsx
import { cva, type VariantProps } from "class-variance-authority"

const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "md" },
})

function Component({ variant, size, ...props }: VariantProps<typeof componentVariants>) {
  return <div className={componentVariants({ variant, size })} {...props} />
}
```

### Dynamic Variant Mapping in Showcase

See [SHOWCASE_SYSTEM.md](./SHOWCASE_SYSTEM.md) for dynamic variant mapping examples.

## File Naming Conventions

- Component files: `PascalCase.tsx` (e.g., `Button.tsx`, `TextInput.tsx`)
- Showcase functions: `{ComponentName}Showcase`
- Index files: `index.ts`
- Utility files: `camelCase.ts` (e.g., `showcaseUtils.ts`)

