# Changelog

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
