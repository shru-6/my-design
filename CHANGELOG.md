# Changelog

## 0.7.0

### Added
- **Testing** — vitest + React Testing Library + jsdom. A colocated smoke test (`renders without crashing`) for all 99 shipped components, plus dedicated behavior suites for `PillGroup.onRemove`, `Table.onRowClick` true-index behavior, `List` `stackProps`/`gridProps` wiring, and async `registerTheme()`. `npm run test` / `npm run test:watch`. See `docs/build/TESTING.md`.
- **Release** — `postversion` script pushes commits + tags to GitHub automatically on `npm version`, so the tagged release on GitHub never lags behind what's published to npm.
- **CI** — `.github/workflows/ci.yml` runs `lint` → `test` → `check` on every push to `main` and every PR.

## 0.6.3

### Fixed
- **ThemeToggle** — `useCallback` missing `triggerRef` dependency (lint-only, no behavior change)

### Note
- Breaking changes from the theme-engine refactor (batches tracked in `BREAKING-FOR-DESIGN-CMS.md`) ship in this release. Kept as a patch bump per project decision — treat 0.6.3 as breaking when upgrading.

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
