# Contributing Guide

Thank you for contributing to the design system! This guide will help you get started.

## Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/design-system.git
   cd design-system
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Run Development Server**
   ```bash
   pnpm dev
   ```

## Project Structure

```
apps/design-system/
├── src/design-system/
│   ├── components/          # Component library
│   │   ├── atoms/           # Basic building blocks
│   │   ├── molecules/      # Composite components
│   │   ├── layout/          # Layout components
│   │   ├── primitives/      # Low-level primitives
│   │   └── ui/              # UI showcase components (modular)
│   └── themes/              # Theme system
│       ├── ui/              # Theme UI components (modular)
│       ├── useTheme.tsx     # Theme hook
│       ├── themeConfig.js   # Theme configuration
│       └── themeUtils.js    # Theme utilities
```

## Adding a Component

### Step 1: Create Component File

Place your component in the appropriate folder:

- **Atoms**: Basic building blocks (Button, Input, Badge)
- **Molecules**: Composite components (Form, Modal, Select)
- **Layout**: Layout components (Card, Sidebar, Table)
- **Primitives**: Low-level primitives (Box, Text, Flex)

Example for a new atom:

```tsx
// apps/design-system/src/design-system/components/atoms/NewComponent.tsx
"use client"

import { cn } from "../utils"

export interface NewComponentProps {
  className?: string
  children: React.ReactNode
}

export function NewComponent({ className, children }: NewComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
}

// Showcase for design system page
export function NewComponentShowcase() {
  return (
    <div className="space-y-6">
      <NewComponent>Example 1</NewComponent>
      <NewComponent className="custom-class">Example 2</NewComponent>
    </div>
  )
}
```

### Step 2: Export from Category Index

```tsx
// apps/design-system/src/design-system/components/atoms/index.ts
export { NewComponent, NewComponentShowcase } from "./NewComponent"
```

### Step 3: Register Showcase

```tsx
// apps/design-system/src/design-system/components/componentConfig.ts
import { NewComponentShowcase } from "./atoms"

const showcaseRegistry = {
  // ... existing
  NewComponent: NewComponentShowcase,
}
```

### Step 4: Add to Category Utils

```tsx
// apps/design-system/src/design-system/components/componentUtils.ts
const componentCategories = {
  // ... existing
  "Your Category": [
    // ... existing
    { name: "NewComponent", file: "atoms/NewComponent.tsx", description: "..." }
  ]
}
```

## Adding a Theme

### Step 1: Create Token File

```json
// apps/design-system/public/tokens/themes/category/new-theme.json
{
  "color": {
    "primary": "{palette.blue.600}"
  }
}
```

### Step 2: Register in Config

```javascript
// apps/design-system/src/design-system/themes/themeConfig.js
export const baseThemeCategories = {
  category: {
    themes: {
      // ... existing
      'new-theme': {
        name: 'New Theme',
        file: 'category/new-theme.json',
        icon: '🎨',
        description: 'Description'
      }
    }
  }
}
```

## Modular Components

Some components (ThemeToggle, DesignSystemPage, HomePage) use a modular structure:

```
ComponentName/
├── ComponentName.tsx    # UI component
├── useComponentName.ts  # Hooks
├── componentNameConfig.ts  # Configuration
├── componentNameUtils.ts   # Utilities
└── index.ts             # Exports
```

When adding logic to these components:
- **Hooks**: Extract to `useComponentName.ts`
- **Constants**: Extract to `componentNameConfig.ts`
- **Utilities**: Extract to `componentNameUtils.ts`
- **UI**: Keep in `ComponentName.tsx`

## Code Style

### Import Order

1. React/Next.js
2. Third-party modules
3. Design system imports (`@/src/design-system/`)
4. Local imports

### Component Structure

```tsx
"use client" // Only if needed

import { Component } from "@/src/design-system/components/..."

export interface ComponentProps {
  // Props
}

export function Component({ ...props }: ComponentProps) {
  // Implementation
}
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `ThemeToggle`)
- **Files**: Match component name (`Button.tsx`)
- **Hooks**: `use` prefix (`useTheme`, `useThemeToggle`)
- **Config files**: `[module]Config.js`
- **Utils files**: `[module]Utils.js`

## Testing

Before submitting:

1. **Build the package**
   ```bash
   pnpm build
   ```

2. **Type check**
   ```bash
   pnpm typecheck
   ```

3. **Lint**
   ```bash
   pnpm lint
   ```

4. **Test in development**
   ```bash
   pnpm dev
   ```

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit PR with clear description

## Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

Example: `feat: add NewComponent to atoms`

## Questions?

- Check existing issues
- Review code in similar components
- Ask in discussions

Thank you for contributing! 🎉
