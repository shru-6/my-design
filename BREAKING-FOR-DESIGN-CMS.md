# Breaking changes to apply in design-cms

Running log, filled in as ui's component-fix batches complete. Not for ui's
own docs/CHANGELOG — this is scoped specifically to what design-cms needs to
update once its own pass starts. Delete this file once that pass is done.

## Already true (from the theme-engine work earlier this session)

- Shape tokens: `radius.button/card/input` → `radius.control/surface/pill`
  (each split into sm/md/lg except pill). Tailwind classes changed from
  `rounded-md`/`rounded-lg` (var-linked) to explicit `rounded-control-*`/
  `rounded-surface-*`/`rounded-pill`. design-cms's own components using the
  old generic `rounded-md` etc. now get Tailwind's un-themed default, not a
  broken build — but they should migrate to the new classes to stay themed.
- `registerTheme()` is now async (was sync). Nothing in design-cms calls it
  directly today (`cmsThemeSource.js` already awaits it correctly).

## Component changes, batch by batch

All five batches are complete and every category is covered: Batch 1
`utilities`/`actions`/`layout`, Batch 2 `data-display`/`feedback`, Batch 3
`inputs`, Batch 4 `navigation`/`overlays`, Batch 5 `patterns`/`data-viz`.
Each entry names the component and what changed — prop renames, removed props,
behavior changes. Work through them in order; later batches assume the
primitives fixed in earlier ones.

### Batch 1 — utilities/, actions/, layout/

- `Card`: `CardColor` type removed (was `never`, dead — nothing to migrate).
- `SplitButton`: `variant` is now typed as `ButtonProps["variant"]` (was untyped) —
  only matters if design-cms passes an invalid variant today, which would now be a type error.
- `ResizeContainer`: `direction` prop now actually works (previously silently ignored) —
  if design-cms passes `direction` expecting no effect, behavior changes.
- `ErrorBoundary`: gained `resetKeys`/`onReset`/`reset()` — additive, not breaking.
- `Button`, `FAB`, `IconButton` (new, internal): radius/sizing now token-driven —
  visual only, no prop changes.
- If design-cms's own code uses raw `rounded-md`/`rounded-lg`/`rounded-full` classes
  expecting them to be theme-linked, they no longer are (falls back to Tailwind's
  static default). Needs migration to `rounded-control-*`/`rounded-surface-*`/`rounded-pill`.

### Batch 2 — data-display/, feedback/

- `List`: all flattened Stack props (`direction`, `gap`, `align`, `justify`, `wrap`) moved into
  `stackProps={{ … }}`; all flattened Grid props (`columns`, `rows`, `minChildWidth`, `columnGap`,
  `rowGap`, `autoFlow`, `alignItems`, `justifyItems`) moved into `gridProps={{ … }}`.
- `List`: `gridGap` removed — it only existed to dodge the `gap` name collision; use `gridProps.gap`.
- `Pill` / `Badge` / `Tag`: `shape="rounded"` renamed to `shape="soft"` (`shape="pill"` unchanged).
- `Image`: `variant="rounded"` renamed to `variant="soft"` (`default`/`circle`/`square` unchanged).
- `Image`: `placeholder="blur"` removed from the type — it was never implemented; use `"skeleton"`.
- `PillGroup`: `onRemove` signature is now `(value, next) => void` (was `(value) => void`), and the
  component no longer removes the pill from its own copy of `items` — the parent must apply `next`.
  A `removable` PillGroup that relied on the old self-removal will now look inert until wired up.
- `PillGroup`: new optional `PillItem.removeLabel` — set it when `label` is a ReactNode, otherwise the
  dismiss control is announced with `value` instead of the old "Remove [object Object]".
- `Pill`: new optional `removeLabel` prop for the same reason. Additive.
- `Table`: `onRowClick`'s second argument is now always the row's true index in `data`
  (it silently fell back to the sorted-view index for duplicate/primitive rows).
- `Table`: with duplicate or primitive rows and the default `getRowId`, selecting one row no longer
  selects every identical row. If design-cms worked around that, remove the workaround.
- `Skeleton`: `count={1}` (the default) no longer renders a wrapper element; `count > 1` puts
  `{...props}` (incl. `id`) on the wrapper once instead of duplicating it on every line.
  `className` still styles each line.
- `Toast`: `ToastProps` now extends `HTMLAttributes<HTMLDivElement>`, so `id` and other DOM props
  reach the element. `duration` is still read only by `Toaster` — documented, not changed.
- `Alert`: the content column now reserves a right gutter when `dismissible`, so long titles no
  longer run under the close control. Visual only.
- `Toaster`: adding a toast no longer restarts the dismiss timers of toasts already on screen.
  Toasts that used to linger while new ones arrived now expire on schedule.
- `TreeView`: the `loading` branch now spreads `{...props}` and takes `ref` like the other branches.
- `Video`: the letterbox is `bg-muted` (theme-aware) instead of a hardcoded black — visual change
  in light themes. See the TODO in `Video.tsx` about a fixed media-surface token.
- Radius/duration/z-index across both categories moved to the token classes — visual only.

### Batch 3 — inputs/

- `Checkbox`, `Radio`, `Slider`, `Toggle`: controlled now means `value`/`checked !== undefined`, full
  stop. Passing a value with no handler used to fall through to uncontrolled and stay user-togglable;
  it is now genuinely stuck at the passed value. Anything relying on `<Checkbox checked />` as a
  "start checked" shorthand must switch to `default` / `defaultChecked`.
- `Checkbox`: `default` is now the only uncontrolled seed — `checked` no longer doubles as one.
- `Toggle`: the derived `readOnly` behavior is gone; a controlled Toggle with no `onChange` simply
  never changes, instead of silently ignoring clicks by a different code path. No prop change.
- `Slider`: `orientation="vertical"` now reaches the Radix primitive, so keyboard and drag axes
  actually flip. Previously it only restyled. Vertical sliders will behave differently.
- `Command`: `onValueChange` renamed to `onChange`. Native `onChange` is omitted from the props type.
- `FormField`: `onValueChange` removed — use `onChange` (identical signature, both used to fire).
- `FormField`: `labelProps` and `helperTextProps` removed from the type; they were never read.
- `FormField`: `inputProps` is documented as text/textarea-only (unchanged behavior, narrowed contract).
- `Select`: a consumer-supplied `id` now wins and the label's `htmlFor` follows it. Previously the
  label detached from the control whenever `id` was passed.
- `Select`: the underlying `<select>` is always value-controlled internally; `defaultValue` still
  seeds it, but the DOM node no longer runs in uncontrolled mode.
- `PhoneInput`: the `variant` prop is now wired to the field shell (was declared and ignored).
  A `PhoneInput` with `variant="filled"|"ghost"|"underline"` changes appearance.
- `PhoneInput` is now a `forwardRef` component — `ref` lands on the wrapper div.
- `Calendar`, `Command`, `DatePicker`, `DateRangePicker`, `Form`, `InlineEdit`, `InputGroup`,
  `InputGroupAddon`, `TimePicker`, `Upload` are now `forwardRef` components. Additive.
- `DateRangePicker`: no longer re-renders forever when opened with a controlled non-null range.
  Any workaround (keeping the panel closed, memoizing the value) can go.
- `Form`: `setValue` uses the latest values, so two fields written in the same tick both land.
  Code that batched writes into one `setValue` call to dodge the loss can be simplified.
- `Upload`: previews come from object URLs minted in an effect and revoked on replacement. If
  design-cms held onto a preview `src` across a file-list change, that URL is now revoked.
- `Rating`, `InputOTP`: `useId()` is called unconditionally. Fixes a rules-of-hooks crash when
  `id` toggled between set and unset. No prop change.
- `InputGroupButton`: the hardcoded `h-8`/`h-10`/`h-11` overrides are gone; height comes from
  `Button`'s own `--control-height-*`. Sizes now match a bare `TextInput` at the same `size`.
- `InputGroupAddon` outside an attached shell now gets the same control height as a field.
- `Command`: the menu mounts with zero items, so `emptyState` can finally render. A Command with an
  empty `items` array now shows a popover where it previously showed nothing.
- Clear/dismiss/stepper buttons in `SearchInput`, `DatePicker`, `TimePicker`, `DateRangePicker`,
  `Calendar` and `Upload` are now the shared internal `IconButton` — same size, slightly different
  DOM (a `<button>` from `Button`). Selectors targeting the old hand-rolled markup will break.
- Radius/duration/z-index across the category moved to the token classes — visual only.

### Batch 4 — navigation/, overlays/

- `Sidebar`, `Navbar`, `NavigationMenu`: new `onNavigate?: (href, item) => void`. **Not a break** —
  omit it and the standalone behavior is exactly what it was (`location.assign` for button rows, the
  plain anchor for link rows). It is the addition design-cms wants if it runs a client router today
  and is currently getting a full page reload out of the design system's own nav chrome.
- `Sidebar`: nested item identity is now the **full path from the root** (`parentValue-item-N`),
  not `depth-item-N`. Any nested `SidebarItem` **without an explicit `value`** emits a different
  string from `onChange` than before, and same-index children under different parents no longer
  highlight each other. Items with explicit `value`s are unaffected.
- `NavigationMenu`: submenu children without an explicit `value` are likewise now parent-prefixed.
- `NavigationMenu`, `Sidebar`, `Tabs`: when **every** item is disabled, nothing is auto-selected.
  The old NavigationMenu/Tabs helpers fell back to `items[0]` even when it was disabled.
- `NavigationMenu`: an item with an `href` no longer navigates twice (anchor default *and* an
  explicit `location.assign`).
- `Dropdown`: controlled now means `open !== undefined`, matching the rest of the library. Passing
  `open` **without** `onOpenChange` used to fall through to uncontrolled; it is now genuinely
  controlled and will not move on its own.
- `Dropdown`: closing (Escape, outside click, or selecting) returns focus to the trigger.
- `ContextMenu`: rows are `<button role="menuitem">` from the shared renderer, not `<div>`. They are
  keyboard operable (Arrow/Home/End) and hover styling comes from the shared floating-menu classes
  rather than `bg-accent`. Selectors or styles targeting the old `<div>` markup will break.
- `ContextMenu`: an `onContextMenu` passed through props no longer replaces the internal handler —
  both fire, and the menu keeps opening. Also clamps into the viewport near screen edges.
- `ContextMenu`: new `size?: "sm" | "md"` StyleProp (`sm` = the previous 10rem min-width, default).
- `Menubar`: new `variant?: "default" | "ghost"` StyleProp. Default is the previous look.
- `Overlay`: new `dialog` / `dialogRole` / `dialogLabel` / `closeOnEscape` / `initialFocus` /
  `contentClassName`. `Modal`, `Drawer`, `AlertDialog` now pass `dialog`, so at viewport scope they
  get `role="dialog"` (`alertdialog` for AlertDialog), `aria-modal`, a focus trap and Escape-to-close.
  **If design-cms wired its own Escape or focus handling on top of these, it will now double-fire.**
  A `container="parent"` overlay deliberately keeps the role but does not trap focus or take Escape.
- `Overlay`: the corner close control is the shared internal `IconButton` (a `<button>` from
  `Button`) instead of hand-rolled markup — same size, different DOM.
- `Overlay`: the scoped (`container="parent"`) backdrop's z-index now comes from `zScoped.overlay`
  as an inline style rather than a `z-10` class; the viewport backdrop uses the `z-overlay` token
  class. Same numbers, but a consumer overriding it via className needs `!important` ordering.
- `Modal`, `Drawer`: new `ariaLabel?` and `initialFocus?`. `Popover`'s documented `initialFocus`
  never existed and has been removed from the docs — Popover is not a modal surface, so it gets
  `closeOnEscape?` instead (Escape now works even with `closeOnOutsideClick={false}`, i.e. HoverCard).
- `Drawer`: the header close button is the shared internal `IconButton`.
- `ContextMenu`, `Dropdown`, `Menubar`, `Navbar`, `NavigationMenu`, `Sidebar`, `AlertDialog`,
  `HoverCard`, `Overlay`, `Popover`, `Tooltip` are now `forwardRef` components. Additive.
  `Tooltip`'s ref lands on the **trigger** (the tooltip itself is portaled and transient).
- New exports: `menubarVariants`, `contextMenuVariants`, `tabsListVariants`, `tabsTriggerVariants`.
- `DropdownItem` is now an alias of the shared `MenuItemSpec` — identical shape, no change needed.
- `Tabs`: disabled triggers use the shared `disabledControl` (opacity 60, was 50). Visual only.
- `Stepper`: the connector rails derive their offset from a `--step-circle` custom property set on
  the Stepper root. A consumer restyling the circle size should now set `--step-circle` rather than
  overriding `h-9 w-9`, or the rails will misalign.
- Radius/duration/z-index across both categories moved to the token classes — visual only.

### Batch 5 — patterns/, data-viz/

- `Chart`: `ChartProps` no longer extends `SVGAttributes<SVGSVGElement>`. The root element is
  the wrapper `<div>`, so `...props` and `className` land there; anything for the `<svg>` now
  goes through the new `svgProps` SlotProp. Any SVG attribute passed as a top-level prop today
  (`stroke`, `preserveAspectRatio`, …) is now a type error and must move into `svgProps`.
- `Chart`: `tooltip`, `config` and `responsive` removed. All three were declared and never read —
  they fell through `...props` onto the `<svg>` and produced React unknown-attribute warnings for
  every consumer. Nothing to migrate; deleting the prop is the whole change.
- `BarChart`: `stacked` removed. The renderer ignored it, so `<BarChart stacked />` already drew
  an unstacked chart. Real stacking needs a multi-series data shape (one value column per row is
  all `data` + `yKey` can express), which is a feature, not a prop fix — so the prop is gone
  rather than left lying. `<BarChart stacked />` is now a type error; drop the prop.
- `LineChart`: `curve` now actually works (`linear` | `monotone` | `step`) — it was destructured
  as `_curve` and discarded. A LineChart passing `curve="monotone"` or `"step"` changes shape.
  `monotone` uses Fritsch–Carlson tangents, so it smooths without overshooting a data point.
- `PieChart`: `padAngle` / `startAngle` / `endAngle` are now implemented (they were declared,
  never destructured, and leaked onto the `<svg>`). A PieChart already passing them changes
  appearance. Defaults (`0` / `0` / `360`) reproduce the old full-circle, gapless rendering.
- `PieChart` / donut: the hole is drawn once over the slices instead of once per slice. Visual
  parity, fewer nodes.
- `Chart`, `BarChart`, `LineChart`, `PieChart` are now `forwardRef` components — the ref lands on
  the wrapper `<div>`. Additive.
- New exported types: `ChartBaseProps`, `CartesianKeyProps`, `BarChartOptions`, `LineChartOptions`,
  `PieChartOptions`, `ChartDatum`, `LineCurve`. `BarChartProps` / `LineChartProps` / `PieChartProps`
  are now each built from only the options that chart actually reads, instead of
  `Omit<ChartProps, "type" | "data">` — so e.g. `innerRadius` is no longer accepted by `BarChart`.
- `FixedScreenWidget`: z-index moved from `z-modal` to `z-dropdown`. It is persistent, non-modal
  page furniture and must sit **below** real dialogs and their backdrops. If design-cms raised
  something to sit above the old widget, that workaround can go.
- `FixedScreenWidget`: the panel now animates. It was conditionally mounted with a hardcoded
  `data-state="open"`, which made every `data-[state=closed]:` rule dead and `slideFrom` inert.
  The panel now mounts in the closed state, flips to open on the next frame, and stays mounted
  for the length of the exit transition before unmounting. Anything asserting on the panel being
  in the DOM strictly iff `open` will now see it for ~300ms after close.
- `FixedScreenWidget`: the panel header is `Card`'s own `header` region (was a hand-rolled bordered
  row inside the card body) and the close control is the shared internal `IconButton`. Same
  layout, different DOM — selectors targeting the old markup will break. `panelProps.className`
  now merges with the widget's own panel classes instead of replacing position in the cascade.
- `HistoryControlButtons`: `showTooltips` now defaults to **`true`**, matching the documented
  default (the code said `false`, the JSDoc and the gallery metadata both said `true`). Icon-only
  history toolbars gain hover tooltips. Pass `showTooltips={false}` to keep the old behavior.
- `HistoryControlButtons`: three hand-rolled button blocks collapsed into one render path. Icon-only
  controls are the shared internal `IconButton`; only `showLabels` controls render `Button` with
  text. Tooltips are now suppressed when `showLabels` is on (a labelled control names itself).
  The row is a `Stack`, so the gap moved from `gap-1` to the `sm` token gap (`gap-2`).
- `HistoryControlButtons`: `undoButtonProps` / `redoButtonProps` / `resetButtonProps` still accept
  `Partial<ButtonProps>`, but in icon-only mode `left` overrides the icon and `label` overrides the
  accessible name; `right` / `children` / `href` / `iconOnly` in those overrides are ignored.
- `ConfirmModal`: the five documented `intent` values are no longer two looks. `save` renders solid
  success tone and `warning` solid warning tone (both previously rendered identically to `default`).
  `destructive` and `delete` remain solid destructive and are now documented as aliases on purpose.
- `ConfirmModal`, `FormModal`, `TriggerModal`, `PageHeader`, `PageFooter`, `Hero`, `AppShell`,
  `AuthLayout`, `FixedScreenWidget`, `HistoryControlButtons` are now `forwardRef` components.
  Additive. Modal-family refs land on the modal `Card` surface.
- `ConfirmModal` / `FormModal` reach `Modal`'s dialog a11y props (`ariaLabel`, `initialFocus`)
  through `...rest` — verified reachable, no wrapper-level prop was needed. Escape-to-close is
  still derived from `loading` by `Modal` itself.
- `Hero` / `ConfirmModal`: the action rows are `Stack` (token gap scale) rather than raw
  `flex gap-2` divs. Visual parity.
- `AuthLayout`: the footer is a `Text` rather than a raw `div` with typography classes.
- `AppShell` keeps raw `div`s on purpose: `Stack`/`Grid` are list renderers (`items` +
  `renderItem`) and the shell's regions are named slots with individual sizing constraints.
- Radius/duration/z-index across both categories moved to the token classes — visual only.
