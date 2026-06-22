# Contributing

Onboard to the repository before changing code. For gallery internals see [GALLERY.md](./GALLERY.md). For add/update workflow see [COMPONENTS.md](./COMPONENTS.md).

---

## Repo layout

| Path | Purpose |
|------|---------|
| `src/components/{category}/` | Shipped React components (99) |
| `src/themes/` | Theme engine, `useTheme`, `ThemeToggle`, `tokenLoader` |
| `src/index.ts` | Public exports — must match [reference/COMPONENTS.md](../reference/COMPONENTS.md) |
| `scripts/tokens/` | **Source of truth** for theme JSON |
| `src/tokens/`, `public/tokens/` | Generated copies (`copy-tokens.js`) |
| `scripts/tailwind.preset.cjs` | Semantic Tailwind mapping |
| `scripts/check.js` | Pre-publish quality gate |
| `test/` | Vite app — `/gallery` + `/showcase` |
| `docs/` | Documentation |

**Categories:** `inputs`, `actions`, `navigation`, `data-display`, `feedback`, `overlays`, `layout`, `utilities`, `data-viz`, `patterns`.

No shared `primitives/` folder — `Button` lives in `actions`, `Text` in `data-display`, `Icon` in `utilities`, etc.

---

## Conventions

### Styling

- **CVA** (`class-variance-authority`) for variants
- **`cn()`** for class merging
- **Semantic tokens only** — `bg-primary`, `text-muted-foreground`; never `bg-blue-500` in components (`check.js` enforces)

### Props

| Kind | Examples | Rule |
|------|----------|------|
| **Props** | `value`, `onChange`, `open`, `items` | Data, state, behavior |
| **StyleProps** | `variant`, `size`, `placement`, `tone` | Visual controls on the component |
| **SlotProps** | `triggerProps`, `inputProps` | Grouped pass-through to children |

**Theme owns color** — do not add per-component color props.

### Shared internals

| Module | Used by |
|--------|---------|
| `fieldPieces.tsx` | TextInput, Select, field controls — unified heights |
| `floatingMenu.tsx` | Dropdown, ContextMenu, pickers |
| `useControllableOpen.ts` | Overlays with `open` / `onOpenChange` |
| `feedbackSurfaceVariants.ts` | Alert, Toast surfaces |

---

## Before you commit

```bash
npm run check          # required — see RELEASE.md
npm run check:metadata # optional — gallery vs XxxProps gaps (informational)
npm run dev            # manual pass on gallery + showcase
```

**Manual pass:**

1. `/gallery` — props panel, overlays contained in cards, theme toggle
2. `/showcase` — sidebar views, project CRUD, settings form, theme switch

---

## Z-index & overlays

| Token | Class | Use |
|-------|-------|-----|
| `--z-sticky` | `z-sticky` | In-page sticky chrome |
| `--z-dropdown` | `z-dropdown` | Menus, popovers, pickers |
| `--z-overlay` | `z-overlay` | Backdrops |
| `--z-modal` | `z-modal` | Modal / drawer surfaces |
| `--z-toast` | `z-toast` | Toaster |

- Prefer `OverlayPortalScope` + `container="parent"` in gallery cards — not viewport takeover
- Do not raise arbitrary z-index — use token classes
- Body portal (`container="body"`) for real app modals and `ThemeToggle`

---

## Tokens & themes (quick)

1. Edit `scripts/tokens/`
2. `node scripts/copy-tokens.js`
3. Register in `src/themes/themeConfig.ts` + `scripts/themeConfig.js`
4. Embed in `src/themes/tokenLoader.ts` if new theme file

Detail: [reference/TOKENS.md](../reference/TOKENS.md).

---

## Docs to update when you change…

| Change | Update |
|--------|--------|
| New / removed export | `reference/COMPONENTS.md`, `COMPONENT_GRAPH.md` if nesting changes |
| Consumer-facing behavior | `use/FEATURES.md` or `use/RECIPES.md` |
| Gallery / metadata | [GALLERY.md](./GALLERY.md) |
| Token / theme structure | `reference/TOKENS.md`, `use/THEMING.md` |
| Release process | [RELEASE.md](./RELEASE.md) |

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | `copy-tokens` → `tsup` → `copy-styles` |
| `npm run check` | Pre-publish gate |
| `npm run check:metadata` | Read-only gallery prop audit |
| `node scripts/copy-tokens.js` | Sync tokens to src/public |
| `node scripts/generate-metadata-stubs.js` | Add missing gallery stubs |
