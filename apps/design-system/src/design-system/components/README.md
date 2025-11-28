# Components System

## Overview

Components are organized using Atomic Design principles with functional categories for discoverability. All UI components follow a module structure with centralized exports.

## Structure

```
components/
├── atoms/              # Basic building blocks (Button, Input, Badge, etc.)
├── molecules/         # Composite components (Form, Modal, Select, etc.)
├── layout/            # Layout components (Card, Sidebar, Table, etc.)
├── primitives/        # Low-level primitives (Box, Flex, Text, etc.)
├── ui/                # Pure UI components (HomePage, DesignSystemPage)
│   └── index.ts       # Centralized exports
├── componentConfig.ts # Component configuration & showcase registry
└── componentUtils.ts  # Component utilities & category mapping
```

## Module Structure

Each component category follows this pattern:
- **Component files**: Individual component implementations with showcase functions
- **index.ts**: Centralized exports for the category
- **componentConfig.ts**: Showcase registry and component configuration
- **componentUtils.ts**: Category mapping and utility functions

## How to Add a Component

When contributing to this repository, follow these steps to add a new component while maintaining all existing features:

### Step 1: Create Component File
Place in appropriate folder (`atoms/`, `molecules/`, `layout/`, or `primitives/`):

```tsx
// atoms/NewComponent.tsx
"use client" // If using hooks

export function NewComponent({ ...props }) {
  // Implementation
}

export function NewComponentShowcase() {
  return (
    <div className="space-y-6">
      {/* Examples */}
    </div>
  )
}
```

### Step 2: Export from Category Index
```typescript
// atoms/index.ts
export { NewComponent, NewComponentShowcase } from "./NewComponent"
```

### Step 3: Register Showcase
```typescript
// componentConfig.ts
import { NewComponentShowcase } from "./atoms"

const showcaseRegistry = {
  // ... existing
  NewComponent: NewComponentShowcase,
}
```

### Step 4: Add Category Mapping
```typescript
// componentUtils.ts
const componentCategoryMap = {
  // ... existing
  NewComponent: "Appropriate Category",
}
```

## Categories

Components are organized by functional purpose:

- **Inputs & Forms**: Form controls, inputs, form wrappers
- **Actions & Buttons**: Buttons, toggles, action triggers
- **Navigation**: Tabs, breadcrumbs, pagination
- **Overlays & Dialogs**: Modals, popovers, tooltips, sheets
- **Feedback & Notifications**: Alerts, toasts, snackbars
- **Data Display**: Badges, tables, charts, avatars
- **Layout & Structure**: Cards, containers, grids, sidebars
- **Menus**: Dropdown menus, context menus, command palettes
- **Date & Time**: Calendar, date pickers
- **Typography**: Text components
- **Media**: Image, video components
- **Primitives**: Low-level building blocks
- **Utilities**: Error boundaries, helpers
- **Development**: Showcase tools, dev components

## Showcase System

Each component includes a `{ComponentName}Showcase` function that demonstrates usage:

```tsx
export function ButtonShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Variants</h4>
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  )
}
```

Showcases are automatically displayed in the design system page.

## Key Functions

- `getComponentShowcase(name)`: Get showcase component by name
- `getCategories()`: Get all component categories
- `getComponentsByCategory(category)`: Get components in a category
- `getComponentCategory(name)`: Get category for a component

## Best Practices

1. **Atomic Design**: Place components in correct folder (atoms/molecules/layout/primitives)
2. **Showcases**: Always include a showcase function
3. **Categories**: Assign appropriate functional category
4. **Exports**: Export from category index file
5. **Client Components**: Add `"use client"` if using hooks or browser APIs

