# Design System Repository

A comprehensive design system with 72+ reusable components and a theme management library. This monorepo contains both a Next.js showcase application and publishable npm libraries.

## Purpose

A design system with 72+ reusable components and a theme management library. Includes both a Next.js showcase application and publishable npm libraries.

## Key Features

### Design System Components
- **72+ Components** organized by category (atoms, molecules, layout, primitives)
- **Radix UI Based** - Accessible, unstyled primitives with custom styling
- **Tailwind CSS** - Utility-first styling with CSS variables
- **TypeScript** - Full type definitions for all components
- **Component Showcases** - Live, interactive examples for every component

### Theme System
- **Token-based Theming** with multi-category support (color, typography, shape, density, animation)
- **Reusable Library** - Theme toggle component published as `@shru/theme-toggle`
- **Zero CSS Imports** - CSS variables generated and injected automatically
- **Dynamic Theme Switching** - Runtime theme composition and application

### Architecture
- **Module-based Structure** - Clean separation of UI, hooks, config, and utils
- **Centralized Exports** - Clean import paths with `index.ts` files
- **Atomic Design** - Components organized by complexity and purpose

## Build Process

```bash
# Build the library
npm run build:lib
# Generates: dist/index.js (ESM), dist/index.cjs (CJS), dist/index.d.ts (types)

# Run the showcase app
npm run dev
# Visit: http://localhost:3000/design-system
```

## Project Structure

```
.
├── apps/
│   └── design-system/          # Next.js showcase application
│       ├── app/                # Routes (minimal)
│       ├── src/design-system/ # Component library & themes
│       ├── config/            # App configuration
│       ├── hooks/             # App-level hooks
│       ├── lib/               # Shared utilities
│       └── public/tokens/     # Design tokens (symlinked to src/tokens)
├── src/                        # Reusable library code
│   ├── tokens/                # Design tokens (JSON files)
│   └── index.ts               # Library entry point (re-exports from app's theme system)
├── dist/                       # Built library files (generated)
└── package.json                # Root package config
```

## Documentation

### Library Usage
- **[LIBRARY.md](./LIBRARY.md)** - Complete guide for using `@shru/theme-toggle` theme library
- **[CURSOR_PROMPT.md](./CURSOR_PROMPT.md)** - Ready-to-use Cursor prompt for GitHub integration
- **[DESIGN_SYSTEM_USAGE.md](./DESIGN_SYSTEM_USAGE.md)** - How to use design system components in your projects
- **[LIBRARY_COMPONENTS.md](./LIBRARY_COMPONENTS.md)** - Technical details for using components as a library

### Design System Application
- **[Design System App README](./apps/design-system/README.md)** - Quick start and overview
- **[Architecture Overview](./apps/design-system/ARCHITECTURE.md)** - Overall project structure and systems
- **[Component System](./apps/design-system/src/design-system/components/README.md)** - Components organization and usage
- **[Theme System](./apps/design-system/src/design-system/themes/README.md)** - Theming system and tokens
- **[App Routes](./apps/design-system/app/README.md)** - Route structure and patterns
- **[App Configuration](./apps/design-system/config/README.md)** - Site configuration
- **[App Hooks](./apps/design-system/hooks/README.md)** - Application hooks
- **[Shared Utilities](./apps/design-system/lib/README.md)** - Utility functions

## Contributing

### Getting Started

1. **Clone and install:**
   ```bash
   git clone <repo-url>
   npm install
   ```

2. **Run the showcase:**
   ```bash
   npm run dev
   ```

3. **Make changes:**
   - **Components**: See [Component System Docs](./apps/design-system/src/design-system/components/README.md)
   - **Themes**: See [Theme System Docs](./apps/design-system/src/design-system/themes/README.md)
   - **Library**: Edit `src/`, then run `npm run build:lib`

### Development Workflow

1. Make changes in appropriate module (`components/`, `themes/`, etc.)
2. Test in the showcase app (`npm run dev`)
3. If changing library code (`src/`), rebuild: `npm run build:lib`

## License

MIT
