# Contributing Guide

## Getting Started

1. **Read the Documentation**
   - Start with [README.md](./README.md) for overview
   - Review [ARCHITECTURE.md](./ARCHITECTURE.md) for structure
   - Check module-specific docs in each folder

2. **Understand the Structure**
   - Design system modules follow: `ui/`, `use[Module].tsx`, `[module]Config.js`, `[module]Utils.js`
   - Routes are minimal - only import from design-system
   - All UI code lives in `src/design-system`

3. **Set Up Development**
   ```bash
   npm install
   npm run dev
   ```

## Making Changes

### Adding a Component

1. Create component in appropriate folder (`atoms/`, `molecules/`, `layout/`, or `primitives/`)
2. Add showcase function
3. Export from category `index.ts`
4. Register in `componentConfig.ts`
5. Add category in `componentUtils.ts`

See [Component System Docs](./src/design-system/components/README.md) for details.

### Adding a Route

1. Create route file in `app/` folder
2. Create page component in `src/design-system/components/ui/`
3. Export from `ui/index.ts`
4. Import and render in route file

See [App Routes Docs](./app/README.md) for details.

### Updating Configuration

- **Site Config**: Edit `config/appConfig.ts`
- **Theme Tokens**: Edit `public/tokens/` JSON files
- **CSS Variables**: Edit `styles/globals.css`

See [Config Docs](./config/README.md) for details.

## Code Style

### Import Order

Imports are automatically sorted by Prettier. Order:
1. React/Next.js
2. Third-party modules
3. `@/config`
4. `@/hooks`
5. `@/lib/`
6. `@/src/design-system/`
7. Local imports

### Component Structure

```tsx
"use client" // Only if needed

import { Component } from "@/src/design-system/components/..."

export function MyComponent({ ...props }) {
  // Implementation
}
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `HomePage`)
- **Files**: Match component name (`Button.tsx`, `HomePage.tsx`)
- **Hooks**: `use` prefix (`useTheme`, `useIsMobile`)
- **Config files**: `[module]Config.js`
- **Utils files**: `[module]Utils.js`

## Testing Changes

1. **Run Development Server**
   ```bash
   npm run dev
   ```

2. **Check Routes**
   - Home: `http://localhost:3000`
   - Design System: `http://localhost:3000/design-system`

3. **Verify Imports**
   - Use centralized exports from `index.ts` files
   - Check for lint errors: `npm run lint`

## Commit Guidelines

- Use clear, descriptive commit messages
- Reference issue numbers if applicable
- Keep commits focused (one feature/fix per commit)

## Questions?

- Check the relevant module's README
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for structure
- Look at existing code for patterns

