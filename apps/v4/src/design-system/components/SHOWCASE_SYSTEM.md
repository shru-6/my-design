# Showcase System Documentation

## Overview

The showcase system provides a centralized way to display component examples in the design system documentation page. Each component has a co-located showcase function that demonstrates its usage.

> **Related Documentation**: 
> - [COMPONENT_SYSTEM.md](./COMPONENT_SYSTEM.md) - Component creation and structure
> - [CATEGORY_SYSTEM.md](./CATEGORY_SYSTEM.md) - Component categorization

## Architecture

```
Component File (e.g., Button.tsx)
  └── ButtonShowcase() function
        │
        ├── Exported from atoms/index.ts
        │
        └── Imported in showcases.ts
              │
              └── Registered in showcaseRegistry
                    │
                    └── Used by app/design-system/page.tsx
```

## Key Files

### `showcases.ts`
**Purpose**: Central registry mapping component names to showcase functions

**Structure**:
```typescript
const showcaseRegistry: Record<string, ShowcaseComponent> = {
  Button: ButtonShowcase,
  TextInput: TextInputShowcase,
  // ... all components
}

export function getComponentShowcase(componentName: string): ShowcaseComponent | null
export function getShowcaseComponentNames(): string[]
```

**Responsibilities**:
- Import all showcase functions from category index files
- Map component names to showcase components
- Provide lookup functions

### Component Files
**Purpose**: Define component and its showcase

**Required Pattern**:
```tsx
export function ComponentName({ ...props }) {
  // Component implementation
}

export function ComponentNameShowcase() {
  return (
    <div className="space-y-6">
      {/* Showcase examples */}
    </div>
  )
}
```

### Category Index Files (`atoms/index.ts`, `molecules/index.ts`, etc.)
**Purpose**: Export components and showcases from category

**Required Pattern**:
```typescript
export { ComponentName, ComponentNameShowcase } from "./ComponentName"
```

## Adding a Showcase

> **Note**: When adding a new component, see [COMPONENT_SYSTEM.md](./COMPONENT_SYSTEM.md) for the complete workflow. This section focuses specifically on showcase creation.

### Step 1: Create Showcase Function

In your component file, add:

```tsx
export function ComponentNameShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Section Title</h4>
        {/* Examples */}
      </div>
    </div>
  )
}
```

### Step 2: Export from Category Index

```typescript
// atoms/index.ts (or molecules/layout/primitives/index.ts)
export { ComponentName, ComponentNameShowcase } from "./ComponentName"
```

### Step 3: Register in showcases.ts

1. **Import**:
```typescript
import { ComponentNameShowcase } from "./atoms" // or appropriate category
```

2. **Add to registry**:
```typescript
const showcaseRegistry: Record<string, ShowcaseComponent> = {
  // ... existing
  ComponentName: ComponentNameShowcase,
}
```

> **Note**: After registering the showcase, add the component to a category in `showcaseUtils.ts`. See [CATEGORY_SYSTEM.md](./CATEGORY_SYSTEM.md) for category assignment.

## Removing a Showcase

1. Remove showcase function from component file (or keep it if component still exists)
2. Remove showcase export from category `index.ts`
3. Remove import from `showcases.ts`
4. Remove from `showcaseRegistry` map

## Best Practices

### 1. Dynamic Variant Mapping

Use `getVariantKeys()` from `showcaseUtils.ts` to map variants dynamically:

```tsx
import { getVariantKeys } from "../showcaseUtils"

export function ButtonShowcase() {
  const variants = Object.keys(buttonVariantsConfig.variants.variant)
  const sizes = Object.keys(buttonVariantsConfig.variants.size)
  
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Variants</h4>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    </div>
  )
}
```

### 2. Showcase Structure

Organize showcases with clear sections:

```tsx
export function ComponentShowcase() {
  return (
    <div className="space-y-6">
      {/* Variants section */}
      <div>
        <h4 className="text-sm font-medium mb-3">Variants</h4>
        {/* Examples */}
      </div>
      
      {/* Sizes section */}
      <div>
        <h4 className="text-sm font-medium mb-3">Sizes</h4>
        {/* Examples */}
      </div>
      
      {/* States section */}
      <div>
        <h4 className="text-sm font-medium mb-3">States</h4>
        {/* Examples */}
      </div>
    </div>
  )
}
```

### 3. Fixed Positioning Components

For components with fixed positioning (like Snackbar, Toast), override positioning in showcase:

```tsx
export function SnackbarShowcase() {
  return (
    <div className="space-y-4 relative">
      <Snackbar 
        message="Example" 
        className="relative bottom-auto left-auto translate-x-0"
      />
    </div>
  )
}
```

### 4. Interactive Components

For components that need interaction (modals, dropdowns), show them in their natural state:

```tsx
export function ModalShowcase() {
  return (
    <div className="space-y-6">
      <Modal>
        <ModalTrigger>Open Modal</ModalTrigger>
        <ModalContent>
          {/* Content */}
        </ModalContent>
      </Modal>
    </div>
  )
}
```

**Note**: The design system page wraps each showcase with a title, description, and container. Showcase functions should only return the content (the wrapper is applied automatically).

## Showcase Utilities

### `showcaseUtils.ts` Functions

- `getVariantKeys()`: Extract variant keys from CVA config
- `getVariantTypeKeys()`: Extract keys from specific variant type
- `formatCodeString()`: Format code strings for display
- `capitalize()`: Capitalize first letter

## Troubleshooting

### Showcase Not Appearing

1. **Check Registration**: Verify component is in `showcaseRegistry` in `showcases.ts`
2. **Check Export**: Verify showcase is exported from category `index.ts`
3. **Check Function Name**: Must be `{ComponentName}Showcase`
4. **Check Import**: Verify import path in `showcases.ts` is correct

### Showcase Rendering Issues

1. **Client Component**: Add `"use client"` if showcase uses hooks
2. **Fixed Positioning**: Override with relative positioning for showcase context
3. **Missing Dependencies**: Ensure all component dependencies are imported

## Progress Tracking

The `showcases.ts` file includes progress tracking comments:
- Component counts per category
- Variant mapping progress
- Overall completion status

Update these when adding/removing components.

