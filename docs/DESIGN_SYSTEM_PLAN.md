# Design System Plan

## Project Structure

### 1. Component Hierarchy
- **Atoms** (`src/atoms/`) - Basic UI primitives (Button, Text, Input, etc.)
- **Molecules** (`src/molecules/`) - Composite components (Modal, Form, Dropdown, etc.)
- **Layout** (`src/layout/`) - Structural components (Card, Stack, Grid, etc.)

### 2. Styling System

#### Tailwind Configuration
- **Root Config** (`tailwind.config.js`): Processes library source files during build
- **Test Config** (`test/tailwind.config.js`): Processes test app files (separate Vite app)
- **Why two?**: Test app is separate application that imports built library; needs its own Tailwind to process test app classes
- **Colors**: Semantic tokens via CSS variables (`bg-primary`, `text-foreground`, `border-border`)
- **Safelist**: Ensures CVA-generated classes are included (`bg-skeleton`, `bg-card`)
- **Content paths**: 
  - Root: `src/**/*.{js,ts,jsx,tsx}` (library source)
  - Test: `src/**/*.{js,ts,jsx,tsx}` + `node_modules/shru-design-system/dist/**/*.{js,mjs}` (test app + library dist)

#### CSS Variables
- **Library CSS** (`src/index.css`): Source of truth for CSS variables
- **Test CSS** (`test/src/index.css`): Imports library CSS via `@import '../src/index.css'` (no duplication)
- **Variables**: `--background`, `--foreground`, `--primary`, `--skeleton`, `--card`, etc.
- **Usage**: `hsl(var(--variable-name))` in Tailwind config
- **Theme support**: Variables change per theme, classes stay the same
- **Note**: Library doesn't export CSS in build; test app imports source directly via CSS import

#### Class Utilities
- **File**: `src/utils.ts`
- **Function**: `cn()` - Merges classes using `clsx` + `tailwind-merge`
- **Purpose**: Resolves Tailwind class conflicts intelligently

### 3. Component Patterns

#### Variant System (CVA)
- **Library**: `class-variance-authority`
- **Pattern**: Base classes + variants (size, appearance, semantic)
- **Defaults**: Set in `defaultVariants` within CVA definition
- **Presets**: Optional preset mapping for common use cases

#### State Handling
- **Loading**: `isLoading` prop → shows `Spinner` inline
- **Skeleton**: `isSkeleton` prop → renders `Skeleton` component (no wrapper)
- **Disabled**: Standard `disabled` prop with semantic styling

#### Ref Forwarding
- **Pattern**: `React.forwardRef<ElementType, Props>`
- **Required**: All interactive elements
- **Type**: Match element type (HTMLButtonElement, HTMLInputElement, etc.)

### 4. Theme System

#### Token Files
- **Location**: `src/tokens/` and `public/tokens/`
- **Structure**: `base.json`, `palettes.json`, `themes/*.json`
- **Format**: JSON with token references (`{palette.gray.200}`)

#### Theme Utilities
- **Location**: `src/themes/`
- **Functions**: `generateAndApplyTheme()`, `applyThemeSync()`
- **Process**: Load tokens → merge → resolve references → generate CSS → apply to DOM

#### Theme Toggle
- **Component**: `ThemeToggle` in `src/themes/ui/ThemeToggle/`
- **Functionality**: Switches between theme combinations

### 5. Type System

#### Component Props
- **Base**: Extend `React.ComponentProps<ElementType>`
- **Variants**: Use `VariantProps<typeof componentVariants>`
- **Omit conflicts**: `Omit<..., "size" | "type">` when needed

#### Exported Types
- **Variant types**: `ComponentSize`, `ComponentVariant`
- **Props interfaces**: `ComponentProps`
- **CVA exports**: Export variants for composition

### 6. Build & Distribution

#### Build Config
- **Tool**: `tsup` (TypeScript bundler)
- **Config**: `tsup.config.ts`
- **Output**: ESM + CJS formats in `dist/`
- **Note**: Only bundles JS/TS, NOT CSS files

#### Entry Point
- **File**: `src/index.ts`
- **Exports**: All components, types, utilities
- **Structure**: Named exports for components, type exports
- **CSS**: Not exported; consumers must import `src/index.css` directly or copy variables

### 7. Testing/Showcase

#### Test App
- **Location**: `test/`
- **Purpose**: Component showcase and development
- **Structure**: Separate Vite app with its own config
- **Components**: `ComponentCard`, `ComponentPreview`, `PropsPanel`
- **CSS**: Imports library CSS (`@import '../src/index.css'`) - single source of truth

## Design Principles

### Consistency Rules
1. **Sizes**: `sm`, `md`, `lg` (atoms only; layout uses spacing primitives)
2. **Variants**: Semantic names (`primary`, `outline`, `ghost`, `destructive`)
3. **Tokens**: Always use semantic tokens, never raw colors
4. **Naming**: Props, variants, sizes match across components

### Implementation Rules
1. **Minimal props**: Only expose necessary props
2. **Flat DOM**: No unnecessary wrappers
3. **Semantic HTML**: Use appropriate elements (`<button>`, `<input>`, etc.)
4. **Accessibility**: ARIA attributes, focus states, keyboard navigation
5. **Type safety**: Strict TypeScript, no `any` types

### Styling Rules
1. **CVA for variants**: Use `class-variance-authority` for variant logic
2. **Semantic tokens**: `bg-primary`, `text-muted-foreground`, `border-border`
3. **No dark mode classes**: Tokens handle theme switching
4. **Consistent spacing**: Use Tailwind spacing scale
5. **Focus rings**: `focus-visible:ring-2 focus-visible:ring-ring`

## File Organization

```
src/
├── atoms/          # Basic UI primitives
├── molecules/      # Composite components
├── layout/         # Structural components
├── themes/         # Theme system utilities
├── tokens/         # Design tokens (JSON)
├── index.ts        # Main exports
├── index.css       # CSS variables (source of truth)
└── utils.ts        # Utility functions

test/               # Separate Vite app
├── src/
│   ├── index.css   # Imports ../src/index.css (no duplication)
│   └── ...
└── tailwind.config.js  # Test app Tailwind config (includes safelist)
```

## Common Patterns

### Component Structure
```typescript
// 1. CVA definition
export const componentVariants = cva("base-classes", { variants, defaultVariants })

// 2. Type exports
export type ComponentSize = VariantProps<typeof componentVariants>["size"]

// 3. Props interface
export interface ComponentProps extends React.ComponentProps<"div">, VariantProps<...> {}

// 4. Component implementation
export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(...)
Component.displayName = "Component"
```

### Preset Pattern
```typescript
const presetMapping: Record<Preset, Partial<{size, variant}>> = { ... }
const presetDefaults = preset ? presetMapping[preset] : {}
const finalSize = size ?? presetDefaults.size ?? defaultVariants.size
```

### Skeleton Pattern
```typescript
if (isSkeleton) {
  return <Skeleton preset="component" size={finalSize} className={className} />
}
```

## Key Decisions

1. **CVA over switch statements**: Consistent variant handling
2. **Preset-driven usage**: Common patterns via presets, override with props
3. **Semantic tokens**: Theme-agnostic styling
4. **Inline states**: `isLoading`/`isSkeleton` replace content, no wrappers
5. **Composition**: Molecules compose atoms, layout composes both
6. **Type safety**: Strict TypeScript throughout
7. **Safelist**: Ensures CVA classes are generated by Tailwind
8. **Two Tailwind configs**: Library build vs test app (separate processes)
9. **CSS not bundled**: Library CSS must be imported separately by consumers