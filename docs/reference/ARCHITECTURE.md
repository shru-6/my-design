# Architecture

Repository structure and how the pieces connect. For composition nesting see [COMPONENT_GRAPH.md](./COMPONENT_GRAPH.md).

---

## Published package (`dist/`)

```
npm install shru-design-system
        ↓
dist/
  ├── index.js / index.mjs / index.d.ts   ← 99 components + themes + utilities
  ├── styles.css                          ← CSS variables + base styles
scripts/ (via package)
  ├── init.js                             ← npx shru-design-system-init
  └── tailwind.preset.cjs                 ← require("shru-design-system/tailwind-preset")
```

**Exports** (`package.json`): `.`, `./styles.css`, `./tailwind-preset`.

---

## Source layout

```
src/
├── components/
│   ├── inputs/          Form, FormField, TextInput, pickers, …
│   ├── actions/         Button, FAB, CopyButton, SplitButton
│   ├── navigation/      Sidebar, Navbar, Tabs, Dropdown, …
│   ├── data-display/    Table, TreeView, Pill, Text, …
│   ├── feedback/        Alert, Toast, Toaster, LoadingOverlay
│   ├── overlays/        Modal, Drawer, Overlay, Tooltip, …
│   ├── layout/          Card, Stack, Grid, Accordion, Resizable*
│   ├── utilities/       Icon, VisuallyHidden, ErrorBoundary
│   ├── data-viz/        Chart, BarChart, LineChart, PieChart
│   └── patterns/        AppShell, FormModal, Hero, PageHeader, …
├── themes/              useTheme, applyPreset, ThemeToggle, tokenLoader
├── tokens/              generated JSON copy (do not edit by hand)
├── utils/               cn, zIndex helpers
└── index.ts             public export surface

scripts/
├── tokens/              SOURCE OF TRUTH for theme JSON
├── copy-tokens.js
├── copy-styles.js
├── check.js             pre-publish gate
├── check-metadata-props.js
├── init.js
└── tailwind.preset.cjs

test/                    NOT published
├── src/pages/           GalleryPage, ShowcasePage
├── src/components/      ComponentPreview, PropsPanel, PreviewStage
└── src/utils/           componentMetadata, previewDefaults, previewRenderers
```

---

## Build pipeline

```
scripts/tokens/*.json
        ↓ copy-tokens.js
src/tokens/ + public/tokens/
        ↓
src/index.ts + components
        ↓ tsup
dist/index.{js,mjs} + index.d.ts
        ↓ copy-styles.js
dist/styles.css
```

`npm run build` runs the full chain. `npm run check` fails if tokens diverge.

---

## Test apps

| Route | Code | Purpose |
|-------|------|---------|
| `/gallery` | `test/src/pages/GalleryPage.tsx` | Metadata-driven catalog; props panel |
| `/showcase` | `test/src/pages/ShowcasePage.tsx` | Admin demo; shared state in `useShowcaseApp` |

**Gallery** proves each component renders with documented props.  
**Showcase** proves composition patterns (shell, CRUD, TreeView, forms).

Both are development references — not shipped to npm consumers.

---

## Quality gate (`check.js`)

Parses three sources and compares:

| Source | Path | Role |
|--------|------|------|
| Spec | `reference/COMPONENTS.md` | Shipped inventory (✓ lines) |
| Exports | `src/index.ts` | Public API |
| Gallery | `componentMetadata.ts` | Preview entries |

Also: token sync, raw color lint on `src/components/`.

---

## Theme runtime

```
Theme JSON (embedded + optional fetch)
        ↓ tokenLoader / registerTheme
CSS variables on :root
        ↓ tailwind.preset.cjs
Semantic Tailwind classes (bg-primary, …)
        ↓
Components (CVA + fieldPieces)
```

Detail: [TOKENS.md](./TOKENS.md). Consumer usage: [use/THEMING.md](../use/THEMING.md).

---

## Key shared modules

| Module | Role |
|--------|------|
| `fieldPieces.tsx` | Unified input heights, variants across TextInput family |
| `floatingMenu.tsx` | Shared menu surface for Dropdown, ContextMenu |
| `useControllableOpen.ts` | Controlled `open` / `onOpenChange` pattern |
| `feedbackSurfaceVariants.ts` | Alert / Toast tone surfaces |
| `treeUtils.ts` | TreeView move/add/remove helpers |
| `chartUtils.ts` | Shared chart layout |

---

## Internal-only

| Symbol | Notes |
|--------|-------|
| `FieldLayout` | Inside inputs — not exported |
| `Badge`, `Tag` | Legacy aliases — `Pill` preferred |

---

## Related

- [COMPONENT_GRAPH.md](./COMPONENT_GRAPH.md) — nesting flowcharts
- [COMPONENTS.md](./COMPONENTS.md) — full 99-component spec
- [build/GALLERY.md](../build/GALLERY.md) — preview pipeline
- [build/RELEASE.md](../build/RELEASE.md) — publish checklist
