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
| `scripts/init.js`, `scripts/copy-tokens.js`, `scripts/tokens/`, `scripts/lib/` | **Published** — part of the npm package |
| `scripts/dev/` | **Not published** — build/check/maintenance scripts, this repo only |
| `scripts/dev/check.js` | Pre-publish quality gate |
| `test/` | Vite app — `/gallery` + `/showcase` |
| `docs/` | Documentation |

`npm run lint` catches the same raw-color violations as `scripts/dev/check.js`'s
`checkRawColors`, but live in the editor — both read `scripts/lib/rawColorPattern.cjs`
so they can't drift apart.

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
| `fieldPieces.tsx` | TextInput, Select, field controls — unified heights. Also exports `controlHeightClass` / `controlPaddingClass` / `controlRadiusClass` (`Record<"sm"\|"md"\|"lg", string>`), the single source for the `--control-height-*` / `--control-padding-*` custom properties and the size-tiered `rounded-control-*`. Never hardcode `h-8`/`h-10`/`h-11` next to a field — density themes then move one and not the other |
| `floatingMenu.tsx` | Dropdown, ContextMenu, pickers |
| `useControllableOpen.ts` | Overlays with `open` / `onOpenChange` |
| `src/utils/useControllableValue.ts` | Anything holding a controllable **value** — the one controlled/uncontrolled pattern; never hand-roll `x !== undefined && onChange != null` |
| `feedbackSurfaceVariants.ts` | Alert, Toast surfaces |
| `actions/IconButton.tsx` | Internal — icon-only clickables (clear / dismiss / stepper). Composes `Button`; not exported from `src/index.ts` |
| `layout/shared.ts` | Internal — `hasNonEmptyChildren`, `sizeToCss`, `resolveSectionBorders`, the Stack/Grid gap scale |
| `data-display/shared.ts` | Internal — `avatarSizeScale`, `avatarShapeRadius`. Avatar + AvatarGroup's overflow chip |
| `feedback/feedbackBody.tsx` | Internal — `FeedbackBody`, the icon / title / description / dismiss body layout. Alert, Toast (surface styling stays in `feedbackSurfaceVariants.ts`) |
| `overlays/usePositionedPortal.ts` | Internal — `usePositionedPortal(open, updatePosition)` + `withPortalVisibility(style, positioned)`. **The** portal reveal cycle (measure → rAF → rAF → reveal, reposition on scroll/resize, everything cancelled on cleanup). Consumed by `useFloatingMenu`, `Popover`, `ContextMenu`. Pass a `useCallback`-stable `updatePosition` |
| `overlays/useDialogA11y.ts` | Internal — `useDialogA11y({ open, onClose, closeOnEscape, initialFocus, enabled })` returns the ref for the dialog **surface** (focus in on open, Tab cycles, Escape closes, focus restored on close), plus `useReturnFocusOnClose(open, { triggerRef })` on its own for menus. Overlay (so Modal / Drawer / AlertDialog), Dropdown |
| `utils/floatingPosition.ts` | Internal — `computeFloatingMenuStyle` plus `VIEWPORT_MARGIN` / `clampToViewport` / `fitsInViewport`. The single viewport-edge constant and clamp math: `useFloatingMenu`, `Popover`, `ContextMenu`, `Tooltip` |
| `navigation/shared.ts` | Internal — `itemIdentity(item, index, prefix)` and `firstEnabledValue(items, prefix)` (one copy for Sidebar / NavigationMenu / Tabs; identity is the **full path from the root**), plus `navigateToHref` / `handleNavLinkClick` / `NavigateHandler`, the one place the `onNavigate`-or-`location.assign` decision lives. Sidebar, Navbar, NavigationMenu, Tabs |
| `data-viz/chartUtils.ts` | Internal — the chart maths: `readKey` / `readNumber` / `maxOf` / `sumOf`, `CHART_COLORS`, `polarToCartesian` / `describeArc`, plus `buildLinePath(points, curve)` / `buildAreaPath(points, baselineY, curve)` and the `ChartPoint` / `LineCurve` types (`linear` \| `monotone` \| `step`; monotone uses Fritsch–Carlson tangents so a smoothed series never overshoots a data point). `Chart`'s renderers. Chart **renderer** prop types live in `Chart.tsx` and are per-type (`BarChartOptions`, `LineChartOptions`, `PieChartOptions`, `CartesianKeyProps` over `ChartBaseProps`) — never widen one shared type back across all four renderers |
| `navigation/menuItemRow.tsx` | Internal — `MenuItemSpec` (what `DropdownItem` aliases), `MenuItemRow`, `renderMenuItems(items, onSelect)`, `menuSeparatorClass`, `useMenuKeyboard(menuRef, open)`. One menu row renderer **with** its keyboard model, so Dropdown and ContextMenu cannot drift apart again |

---

## Before you commit

```bash
npm run check          # required — see RELEASE.md
npm run test           # required — vitest, see TESTING.md
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
3. Register in `src/themes/themeConfig.ts`
4. Embed in `src/themes/tokenLoader.ts` if new theme file

---

## Versioning

`shru-design-system` is published (npm), consumed today only by `design-cms` via
`file:../ui`. While that's the only consumer, be a little loose — but bump on
purpose, not by habit:

- **patch** — internal fix, no export or token shape changed (e.g. the registry
  cache fix, dead-script removal)
- **minor** — new component, new token, new export — additive, old code keeps working
- **major** — a component, hook, or token is removed or its shape changes in a
  way that breaks an existing import or CSS variable name

Once a second real consumer exists, treat every `major` as a signal to check
that consumer before publishing, not just after.

Detail: [reference/TOKENS.md](../reference/TOKENS.md).

---

## Docs to update when you change…

| Change | Update |
|--------|--------|
| New / removed export | `reference/COMPONENTS.md`, `COMPONENT_GRAPH.md` if nesting changes |
| Consumer-facing behavior | `use/FEATURES.md` or `use/RECIPES.md` |
| Gallery / metadata | [GALLERY.md](./GALLERY.md) |
| Token / theme structure | `reference/TOKENS.md`, `use/THEMING.md` |
| New component / behavior fix | Add a colocated `*.test.tsx` — see [TESTING.md](./TESTING.md) |
| Release process | [RELEASE.md](./RELEASE.md) |

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | `copy-tokens` → `tsup` → `copy-styles` |
| `npm run check` | Pre-publish gate |
| `npm run check:metadata` | Read-only gallery prop audit |
| `node scripts/copy-tokens.js` | Sync tokens to src/public |
| `node scripts/dev/generate-metadata-stubs.js` | Add missing gallery stubs |
