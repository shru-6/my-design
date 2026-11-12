# Changelog

## 0.7.0

Renamed from 0.6.3 — this is the "bump to 0.7.0 later if you want strict semver" the 0.6.2 entry below already flagged. `package.json` is at 0.7.0; this heading now matches it.

### Added
- **Testing** — vitest + React Testing Library + jsdom. A colocated smoke test (`renders without crashing`) for all 99 shipped components, plus dedicated behavior suites for `PillGroup.onRemove`, `Table.onRowClick` true-index behavior, `List` `stackProps`/`gridProps` wiring, and async `registerTheme()`. `npm run test` / `npm run test:watch`. See `docs/build/TESTING.md`.
- **A11y** — `src/components/overlays/accessibility.test.tsx` runs `axe-core` against the overlay family (`Overlay`, `Modal`, `Drawer`, `AlertDialog`, `Popover`, `HoverCard`, `Tooltip`) — the components that just gained real dialog/focus-trap semantics, now asserted automatically instead of relying on manual verification.
- **SSR** — `src/ssr.test.tsx` renders `Button`, `Modal`, `Tooltip`, `ThemeToggle`, and `useTheme` with `react-dom/server` under a real no-`window`/no-`document` environment, proving every `typeof window === "undefined"` guard actually holds.
- **check:unused-props** — informational script (`npm run check:unused-props`) that flags a component prop destructured but never read in the body — the bug class behind the pre-refactor `BarChart.stacked` / `Chart.tooltip` / `LineChart.curve` issues. Not a gate; a prompt to go look.
- **CI** — `.github/workflows/ci.yml` runs `lint` → `test` → `check` on every push to `main` and every PR.
- **Release** — `postversion` pushes commits + tags to GitHub automatically on `npm version`.
- **Packaging** — `sideEffects: false` in `package.json`, so bundlers can tree-shake per-component imports instead of pulling in all 99.
- **docs/use/UPGRADE.md** — durable, consumer-facing migration guide by version (the `BREAKING-FOR-DESIGN-CMS.md` content, generalized past one consumer).

### Fixed
- **ThemeToggle** — `useCallback` missing `triggerRef` dependency (lint-only, no behavior change)
- **Form** — context value object was rebuilt every render (not memoized), causing every field to re-render on every keystroke in any field
- **Tooltip, usePositionedPortal, Command, ThemeToggle** — `useLayoutEffect` swapped for a shared `useIsomorphicLayoutEffect` (falls back to `useEffect` when `window` is undefined). Found by the new SSR test: all four fired React's "useLayoutEffect does nothing on the server" warning on every SSR render, not just ones a consumer renders server-only on purpose.

### Note
- Breaking changes from the theme-engine refactor (batches tracked in `BREAKING-FOR-DESIGN-CMS.md`) ship in this release — see `docs/use/UPGRADE.md` for the consumer-facing version.

## 0.6.2

### Added
- **CollapsiblePanel** — layout shell with `closeDirection`, `collapsedSize`, `triggerPlacement`, `triggerVariant`, floater/header toggles
- **List** — `errorState`, `loadingState`, `filterChips`, `ListItem.custom`, `ListItem.filterKeys`, `renderItem`, `defaultListChipFilter`
- **Tabs** — `panelClassName`, `contentClassName` for flex editor layouts
- **PageHeader** — `left`, `right` slots (render as-is, no forced Icon wrap)
- **InlineEdit** — `loading`, async `onSave`, `saveButtonProps`, `cancelButtonProps`
- **HistoryControlButtons** — `showTooltips`, button `ariaLabel` passthrough
- **CopyButton** — icon-only default, `copyIcon` / `copiedIcon`
- **CodeBlock** — copy header, line numbers, filename slot

### Changed
- **Modal** — shell only (`Overlay` + `Card`); trigger moved to **TriggerModal**; removed default `"Open"` label, auto Spinner footer, hardcoded Card variant
- **Collapsible** — chevron via Button `right`; trigger truncates
- **Tabs** — only active panel mounted (flex-friendly)

### Breaking (still in 0.6.2 — bump to 0.7.0 later if you want strict semver)
- **Modal** — `triggerProps` removed; use **TriggerModal** for trigger + modal pairs
- **Modal** — `ModalTriggerProps` moved to **TriggerModal**

## 0.6.1

Prior baseline — see git history.
