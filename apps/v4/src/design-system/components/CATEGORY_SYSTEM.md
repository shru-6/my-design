# Category System Documentation

## Overview

The category system organizes components by functional purpose for better discoverability in the design system showcase. Categories are defined in `showcaseUtils.ts` and used throughout the application.

## Category Definitions

### Current Categories

1. **Inputs & Forms** - All form-related components
2. **Actions & Buttons** - Interactive action components
3. **Navigation** - Navigation and routing components
4. **Overlays & Dialogs** - Modal, popover, and overlay components
5. **Feedback & Notifications** - User feedback and notification components
6. **Data Display** - Components for displaying data and content
7. **Layout & Structure** - Layout and structural components
8. **Menus** - Menu and command components
9. **Date & Time** - Calendar and date-related components
10. **Typography** - Text and typography components
11. **Media** - Image and media components
12. **Primitives** - Low-level primitive components
13. **Utilities** - Utility and helper components
14. **Development** - Development and showcase components

## Category Mapping

### Location
`src/design-system/components/showcaseUtils.ts`

### Structure
```typescript
const componentCategoryMap: Record<string, string> = {
  ComponentName: "Category Name",
  // ... all components
}
```

## Adding a Component to a Category

> **Note**: When adding a new component, see [COMPONENT_SYSTEM.md](./COMPONENT_SYSTEM.md) for the complete workflow. This section focuses specifically on category assignment.

### Step 1: Add to Category Map

In `showcaseUtils.ts`, add entry to `componentCategoryMap`:

```typescript
const componentCategoryMap: Record<string, string> = {
  // ... existing
  NewComponent: "Appropriate Category",
}
```

### Step 2: Choose Appropriate Category

Consider the component's primary purpose:
- **Inputs & Forms**: Form controls, inputs, form wrappers
- **Actions & Buttons**: Buttons, toggles, action triggers
- **Navigation**: Tabs, breadcrumbs, pagination, navigation menus
- **Overlays & Dialogs**: Modals, popovers, tooltips, sheets
- **Feedback & Notifications**: Alerts, toasts, snackbars, status messages
- **Data Display**: Badges, tables, charts, avatars, skeletons
- **Layout & Structure**: Cards, containers, grids, sidebars
- **Menus**: Dropdown menus, context menus, command palettes
- **Date & Time**: Calendar, date pickers
- **Typography**: Text components
- **Media**: Image, video components
- **Primitives**: Base building blocks
- **Utilities**: Error boundaries, helpers
- **Development**: Showcase tools, dev components

## Creating a New Category

### Step 1: Add Category to Map

Add new category name to `componentCategoryMap`:

```typescript
const componentCategoryMap: Record<string, string> = {
  // ... existing
  NewComponent: "New Category Name",
}
```

### Step 2: Update Icon Mapping

In `app/design-system/page.tsx`, update `getCategoryIcon()`:

```typescript
const getCategoryIcon = (cat: string) => {
  const lowerCat = cat.toLowerCase()
  // ... existing checks
  if (lowerCat.includes('new category')) return NewIcon
  return ComponentIcon
}
```

### Step 3: Update File Path Logic (if needed)

If the category has special file path requirements, update `getComponentFile()` in `showcaseUtils.ts`:

```typescript
function getComponentFile(componentName: string): string {
  const category = getComponentCategory(componentName)
  
  // ... existing checks
  if (category === "New Category") {
    return `./special-folder/${componentName}.tsx`
  }
  
  // ... rest of logic
}
```

### Step 4: Add to Category List (if needed)

If the category needs special handling in `getComponentFile()`, add it to the array:

```typescript
if (["Inputs & Forms", "Actions & Buttons", ..., "New Category"].includes(category)) {
  // ... logic
}
```

## Removing a Category

### Step 1: Reassign Components

Move all components from the removed category to other categories:

```typescript
// Before
OldComponent: "Category to Remove",

// After
OldComponent: "New Appropriate Category",
```

### Step 2: Remove Icon Mapping

Remove category check from `getCategoryIcon()` in `app/design-system/page.tsx`

### Step 3: Remove from File Path Logic

Remove category check from `getComponentFile()` if it had special handling

## Category Functions

### `getComponentCategory(componentName: string): string`
Returns the category for a given component name.

**Usage**:
```typescript
const category = getComponentCategory("Button") // Returns "Actions & Buttons"
```

### `getCategories(): string[]`
Returns all unique categories, sorted alphabetically.

**Usage**:
```typescript
const categories = getCategories() // Returns ["Actions & Buttons", "Data Display", ...]
```

### `getComponentsByCategory(category: string)`
Returns all components in a specific category with metadata.

**Usage**:
```typescript
const formComponents = getComponentsByCategory("Inputs & Forms")
```

### `getAllComponents()`
Returns all components with their category and metadata.

**Usage**:
```typescript
const allComponents = getAllComponents()
```

## Category Guidelines

### When to Create a New Category

Create a new category when:
- You have 3+ components that don't fit existing categories
- The new category represents a distinct functional purpose
- It improves discoverability

### When to Use Existing Category

Use existing category when:
- Component fits the category's purpose
- Category already has similar components
- It maintains consistency

### Category Naming

- Use clear, descriptive names
- Use "&" to combine related concepts (e.g., "Overlays & Dialogs")
- Keep names concise but specific
- Use title case

## Integration Points

### Showcase Page
- Uses `getCategories()` to display category list
- Uses `getComponentsByCategory()` to group components
- Maps categories to icons via `getCategoryIcon()`

### Component System
- Categories are assigned when adding new components (see [COMPONENT_SYSTEM.md](./COMPONENT_SYSTEM.md))
- Categories help organize component documentation
- Categories determine file paths in some cases

## Best Practices

1. **Consistency**: Keep similar components in the same category
2. **Discoverability**: Choose categories that make components easy to find
3. **Balance**: Don't create too many categories (aim for 10-15)
4. **Documentation**: Update this file when adding/removing categories
5. **Review**: Periodically review categories for better organization

