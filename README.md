# shru-design-system

React component library — **98 components**, multi-axis token themes, Tailwind + CVA.

```bash
npm install shru-design-system
npx shru-design-system-init
```

Published: `dist/` components, `styles.css`, Tailwind preset.

**Prop-level API:** TypeScript `XxxProps` · local dev: `npm run dev` → `/gallery`

---

## Documentation

| Audience | Start here |
|----------|------------|
| **Consumer** — install & use in your app | [docs/use/INSTALL.md](./docs/use/INSTALL.md) |
| **Contributor** — change this repo | [docs/build/CONTRIBUTING.md](./docs/build/CONTRIBUTING.md) |
| **Architecture** — system structure | [docs/reference/ARCHITECTURE.md](./docs/reference/ARCHITECTURE.md) |

### Consumers — `docs/use/`

| Doc | Covers |
|-----|--------|
| [Install](./docs/use/INSTALL.md) | Peers, init, styles, Tailwind, first component |
| [Theming](./docs/use/THEMING.md) | Presets, `useTheme`, `applyPreset`, ThemeToggle |
| [Recipes](./docs/use/RECIPES.md) | App shell, TreeView, forms, modals |
| [Features](./docs/use/FEATURES.md) | Overlays, toasts, forms, input API contracts |

### Contributors — `docs/build/`

| Doc | Covers |
|-----|--------|
| [Contributing](./docs/build/CONTRIBUTING.md) | Layout, conventions, tokens, checks |
| [Components](./docs/build/COMPONENTS.md) | Add / update component checklist |
| [Gallery](./docs/build/GALLERY.md) | Metadata pipeline, wrappers |
| [Release](./docs/build/RELEASE.md) | `npm run check`, build, publish |

### Architecture — `docs/reference/`

| Doc | Covers |
|-----|--------|
| [Architecture](./docs/reference/ARCHITECTURE.md) | Repo map, build pipeline, check gates |
| [Components](./docs/reference/COMPONENTS.md) | 98 shipped spec |
| [Component graph](./docs/reference/COMPONENT_GRAPH.md) | Composition flowcharts |
| [Tokens](./docs/reference/TOKENS.md) | Token JSON layout, pipeline |

---

## Local preview

```bash
npm run dev
```

| Route | Purpose |
|-------|---------|
| `/gallery` | Component catalog + props panel |
| `/showcase` | Mini admin app (composed patterns) |
