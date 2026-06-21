# shru-design-system

React component library — **98 components**, multi-axis token themes, Tailwind + CVA.

Published: `dist/` components, `styles.css`, Tailwind preset, `npx shru-design-system-init`.

**Prop-level API:** TypeScript `XxxProps` or run this repo locally → `/gallery`.

---

## Pick your path

| Audience | You are… | Start here |
|----------|----------|------------|
| **Consumer** | Installing the package in your app | [use/INSTALL.md](./use/INSTALL.md) |
| **Contributor** | Changing this repository | [build/CONTRIBUTING.md](./build/CONTRIBUTING.md) |
| **Architecture** | Understanding system structure | [reference/ARCHITECTURE.md](./reference/ARCHITECTURE.md) |

---

## Consumers — `use/`

| Doc | Covers |
|-----|--------|
| [Install](./use/INSTALL.md) | Peers, init, styles, Tailwind, first component |
| [Theming](./use/THEMING.md) | Presets, `useTheme`, `applyPreset`, ThemeToggle |
| [Recipes](./use/RECIPES.md) | App shell, TreeView, forms, modals — from showcase |
| [Features](./use/FEATURES.md) | Overlays, toasts, forms, input API contracts |

`npm run dev` → `/showcase` (composed demo) · `/gallery` (props panel)

---

## Contributors — `build/`

| Doc | Covers |
|-----|--------|
| [Contributing](./build/CONTRIBUTING.md) | Layout, conventions, tokens, checks |
| [Components](./build/COMPONENTS.md) | Add / update component checklist |
| [Gallery](./build/GALLERY.md) | Metadata pipeline, wrappers, interactive preview |
| [Release](./build/RELEASE.md) | `npm run check`, build, publish |

---

## Architecture — `reference/`

| Doc | Covers |
|-----|--------|
| [Architecture](./reference/ARCHITECTURE.md) | Repo map, build pipeline, test apps, check gates |
| [Components](./reference/COMPONENTS.md) | 98 shipped spec (`check.js` parses this) |
| [Component graph](./reference/COMPONENT_GRAPH.md) | ASCII composition flowcharts |
| [Tokens](./reference/TOKENS.md) | Token JSON layout, pipeline, semantic tokens |
