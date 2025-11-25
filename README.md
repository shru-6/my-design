# my-design

A comprehensive design system built with React, Next.js, and Tailwind CSS. This project provides a complete set of customizable UI components organized using atomic design principles.

> **Note**: Component code was initially sourced from [shadcn/ui](https://github.com/shadcn/ui) and has been restructured, extended, and customized for this design system.

## Features

- **72+ Components** organized by atomic design (atoms, molecules, layout components)
- **Token-based Theming** with support for color, typography, shape, density, and animation themes
- **Component Showcase** with live examples and documentation
- **Fully Customizable** - all components are in your codebase, modify as needed
- **TypeScript** - fully typed components and utilities
- **Accessible** - built on Radix UI primitives

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000/design-system` to explore the component showcase.

## Project Structure

```
apps/design-system/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home route
│   └── design-system/     # Component showcase route
├── src/
│   └── design-system/    # Design system source
│       ├── components/   # Component library
│       │   ├── atoms/    # Basic building blocks
│       │   ├── molecules/# Composite components
│       │   ├── layout/   # Layout components
│       │   └── primitives/# Low-level primitives
│       └── themes/        # Theme system
│           ├── ui/       # Theme UI components
│           ├── useTheme.tsx    # Theme hook
│           ├── themeConfig.js    # Theme configuration
│           └── themeUtils.js     # Theme utilities
├── config/               # App configuration
├── hooks/                # App hooks
├── lib/                  # Shared utilities
├── styles/               # Global styles
└── public/               # Static assets
    └── tokens/          # Design tokens (JSON)
```

## Documentation

- **[Main README](./apps/v4/README.md)** - Quick start and overview
- **[Architecture Overview](./apps/design-system/ARCHITECTURE.md)** - Overall project structure and systems
- **[Component System](./apps/design-system/src/design-system/components/README.md)** - Components organization and usage
- **[Theme System](./apps/design-system/src/design-system/themes/README.md)** - Theming system and tokens
- **[App Routes](./apps/design-system/app/README.md)** - Route structure and patterns
- **[App Configuration](./apps/design-system/config/README.md)** - Site configuration
- **[App Hooks](./apps/design-system/hooks/README.md)** - Application hooks
- **[Shared Utilities](./apps/design-system/lib/README.md)** - Utility functions

## Component Organization

Components are organized using atomic design principles:

- **Atoms**: Basic building blocks (Button, Input, Badge, etc.)
- **Molecules**: Composite components (Form, Modal, Dropdown, etc.)
- **Layout**: Layout components (Card, Sidebar, Table, etc.)
- **Primitives**: Low-level primitives (Box, Flex, Text, etc.)

## Theming

The design system supports token-based theming with multiple theme categories:

- **Color**: Light/dark color schemes
- **Typography**: Font family selection
- **Shape**: Border radius variations
- **Density**: Spacing variations
- **Animation**: Animation speed variations

Themes can be combined and customized through the theme toggle component.

