# Design System Application

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/design-system` to see the component showcase.

## Documentation

- **[Architecture Overview](./ARCHITECTURE.md)** - Overall project structure and systems
- **[Component System](./src/design-system/components/README.md)** - Components organization and usage
- **[Theme System](./src/design-system/themes/README.md)** - Theming system and tokens
- **[App Routes](./app/README.md)** - Route structure and patterns
- **[App Configuration](./config/README.md)** - Site configuration
- **[App Hooks](./hooks/README.md)** - Application hooks
- **[Shared Utilities](./lib/README.md)** - Utility functions

## Project Structure

```
apps/design-system/
├── app/                    # Next.js routes (minimal)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home route
│   └── design-system/     # Component showcase route
├── src/
│   └── design-system/    # Design system source
│       ├── components/    # Component library
│       └── themes/        # Theme system
├── config/                # App configuration
├── hooks/                 # App hooks
├── lib/                   # Shared utilities
├── styles/                # Global styles
└── public/                # Static assets
    └── tokens/           # Design tokens
```

## Key Features

- **72 Components** organized by category
- **Token-based Theming** with light/dark modes
- **Component Showcases** with live examples
- **Category Navigation** for easy discovery
- **Dynamic Variant Mapping** for showcases

## Common Tasks

### Adding a Component

See [Component System Documentation](./src/design-system/components/README.md)

### Adding Theme Colors

See [Theme System Documentation](./src/design-system/themes/README.md)

### Updating Favicon/Title

See [Design System Page Documentation](./app/DESIGN_SYSTEM_PAGE.md)

## Configuration

- **Site Config**: `config/appConfig.ts` - Site name, description, fonts, etc.
- **Favicon**: `app/layout.tsx` - Metadata icons configuration
- **Theme Colors**: `styles/globals.css` - CSS variables
- **Design Tokens**: `public/tokens/` - JSON token files

## Getting Started for Contributors

### Understanding the Structure

This design system follows a **module-based architecture**:

1. **Design System Modules** (`src/design-system/`):
   - `components/` - UI component library
   - `themes/` - Theming system
   - Each module follows: `ui/`, `use[Module].tsx`, `[module]Config.js`, `[module]Utils.js`

2. **App-Level Modules** (root level):
   - `config/` - App configuration (site settings, fonts)
   - `hooks/` - App-level React hooks
   - `lib/` - Shared utilities (used by app and design-system)

3. **Routes** (`app/`):
   - Minimal route files that only import from design-system
   - All UI code lives in `src/design-system/components/ui/`

### Key Principles

- ✅ **Routes are minimal** - Only import and render components
- ✅ **UI in design-system** - All UI code belongs in `src/design-system`
- ✅ **Module structure** - Each module has: `ui/`, hooks, config, utils
- ✅ **Centralized exports** - Use `index.ts` files for clean imports
- ❌ **No business logic in routes** - Logic belongs in hooks or modules
- ❌ **No UI code in routes** - UI belongs in design-system

### Making Changes

1. **Adding a Component**: See [Component System Docs](./src/design-system/components/README.md)
2. **Adding a Theme**: See [Theme System Docs](./src/design-system/themes/README.md)
3. **Adding a Route**: See [App Routes Docs](./app/README.md)
4. **Updating Config**: See [Config Docs](./config/README.md)
