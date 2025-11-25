# Design System Showcase Page Documentation

## Overview

The design system showcase page (`app/design-system/page.tsx`) displays all components organized by category with a sidebar navigation.

## File Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── design-system/
│   └── page.tsx           # Showcase page
└── (app)/
    └── layout.tsx         # App layout wrapper
```

## Page Architecture

### Main Components

1. **Sidebar** - Category navigation
2. **SidebarInset** - Main content area
3. **ComponentShowcase** - Individual component display

### Data Flow

```
page.tsx
  ├── getCategories() → Array of category names
  ├── getComponentsByCategory() → Components per category
  └── getComponentShowcase() → Showcase component function
```

## Key Functions

### `getCategories()`
Returns all unique categories sorted alphabetically.

**Source**: `showcaseUtils.ts`

### `getComponentsByCategory(category: string)`
Returns all components in a category with metadata (name, category, file, description).

**Source**: `showcaseUtils.ts`

### `getComponentShowcase(componentName: string)`
Returns the showcase component function for a component.

**Source**: `showcases.ts`

## Sidebar Navigation

### Category Icons

Icons are mapped in `getCategoryIcon()` function:

```typescript
const getCategoryIcon = (cat: string) => {
  const lowerCat = cat.toLowerCase()
  if (lowerCat.includes('action') || lowerCat.includes('button')) return ZapIcon
  if (lowerCat.includes('input') || lowerCat.includes('form')) return FileTextIcon
  // ... more mappings
}
```

### Adding Icon for New Category

1. Import icon from `lucide-react`
2. Add condition in `getCategoryIcon()`:
```typescript
if (lowerCat.includes('new category')) return NewIcon
```

## Component Display

### ComponentShowcase Component

```typescript
function ComponentShowcase({ component }: { component: any }) {
  const ShowcaseComponent = getComponentShowcase(component.name)
  
  return (
    <div className="space-y-4">
      <div>
        <h3>{component.name}</h3>
        <p>{component.description}</p>
      </div>
      <div className="rounded-lg border p-6 bg-card">
        {ShowcaseComponent ? (
          <ShowcaseComponent />
        ) : (
          <div>No showcase available</div>
        )}
      </div>
    </div>
  )
}
```

## Adding Features

### Adding a New Section

1. Add section in main render:
```tsx
<section id="new-section" className="mb-16">
  <h2>New Section</h2>
  {/* Content */}
</section>
```

2. Add to sidebar if needed:
```tsx
<SidebarMenuItem>
  <SidebarMenuButton asChild>
    <a href="#new-section">New Section</a>
  </SidebarMenuButton>
</SidebarMenuItem>
```

### Customizing Layout

The page uses:
- `SidebarProvider` - Manages sidebar state
- `Sidebar` - Left navigation
- `SidebarInset` - Main content area

Modify these components to change layout.

## Metadata Configuration

### Favicon

Set in `app/layout.tsx`:
```typescript
icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon-16x16.png",
  apple: "/apple-touch-icon.png",
}
```

**Files**: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`

### Page Title

Set in `app/layout.tsx`:
```typescript
title: {
  default: siteConfig.name,
  template: `%s - ${siteConfig.name}`,
}
```

**Configuration**: `lib/config.ts` - `siteConfig.name`

## Best Practices

1. **Keep Imports Minimal**: Only import what's needed for the page
2. **Use Utilities**: Use functions from `showcaseUtils.ts` for data
3. **Category Icons**: Keep icon mapping logic simple and maintainable
4. **Accessibility**: Ensure sidebar navigation is keyboard accessible
5. **Performance**: Categories are computed once, components are lazy-loaded

## Troubleshooting

### Components Not Showing

1. Check component is in `showcaseRegistry` in `showcases.ts`
2. Verify category mapping in `showcaseUtils.ts`
3. Check component has showcase function exported
4. Verify showcase is imported in `showcases.ts`

### Categories Not Appearing

1. Check `getCategories()` returns categories
2. Verify components have category mappings
3. Check category names match exactly

### Sidebar Not Working

1. Check `SidebarProvider` wraps the page
2. Verify sidebar components are imported
3. Check category links use correct IDs

