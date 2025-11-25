# Design System Application

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/design-system` to see the component showcase.

## Documentation

- **[Architecture Overview](./ARCHITECTURE.md)** - Overall project structure and systems
- **[Component System](./src/design-system/components/COMPONENT_SYSTEM.md)** - How components are organized
- **[Showcase System](./src/design-system/components/SHOWCASE_SYSTEM.md)** - How showcases work
- **[Category System](./src/design-system/components/CATEGORY_SYSTEM.md)** - Component categorization
- **[Theme System](./src/design-system/themes/THEME_SYSTEM.md)** - Theming and tokens
- **[Design System Page](./app/DESIGN_SYSTEM_PAGE.md)** - Showcase page documentation

## Project Structure

```
apps/v4/
├── app/                    # Next.js pages
│   ├── layout.tsx         # Root layout
│   └── design-system/     # Component showcase
├── src/
│   └── design-system/    # Design system source
│       ├── components/    # Component library
│       └── themes/        # Theme system
├── styles/                # Global styles
├── public/                # Static assets
│   └── tokens/           # Design tokens
└── lib/                   # Utilities
```

## Key Features

- **72 Components** organized by category
- **Token-based Theming** with light/dark modes
- **Component Showcases** with live examples
- **Category Navigation** for easy discovery
- **Dynamic Variant Mapping** for showcases

## Common Tasks

### Adding a Component

See [Component System Documentation](./src/design-system/components/COMPONENT_SYSTEM.md)

### Changing Categories

See [Category System Documentation](./src/design-system/components/CATEGORY_SYSTEM.md)

### Adding Theme Colors

See [Theme System Documentation](./src/design-system/themes/THEME_SYSTEM.md)

### Updating Favicon/Title

See [Design System Page Documentation](./app/DESIGN_SYSTEM_PAGE.md)

## Configuration

- **Site Config**: `lib/config.ts` - Site name, description, etc.
- **Favicon**: `app/layout.tsx` - Metadata icons configuration
- **Theme Colors**: `styles/globals.css` - CSS variables
- **Design Tokens**: `public/tokens/` - JSON token files
