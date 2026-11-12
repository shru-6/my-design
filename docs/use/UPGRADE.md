# Upgrade

Consumer-facing migration notes, by version. For the full line-by-line log of every addition/fix/removal, see [CHANGELOG.md](../../CHANGELOG.md) at the repo root — this file is the "what do I need to change in my app" distillation of the breaking entries only.

(`BREAKING-FOR-DESIGN-CMS.md` at the repo root tracks the same 0.6.3 changes against one specific consumer's code as that migration is being carried out, and is deleted once that pass finishes. This file is the durable, consumer-agnostic version of the same information — keep this one.)

---

## Upgrading to 0.6.3

Shipped as a patch for project-internal reasons, but this release is breaking. Check every section below that applies to components you use.

### Shape tokens

`radius.button` / `radius.card` / `radius.input` were replaced by `radius.control` / `radius.surface` / `radius.pill` (each split into `sm`/`md`/`lg`, except `pill`). If your app's own CSS uses the old Tailwind classes (`rounded-md`, `rounded-lg`) expecting them to track the theme, they now resolve to Tailwind's static default instead. Migrate to `rounded-control-*` / `rounded-surface-*` / `rounded-pill`.

### `registerTheme()` is now async

Was synchronous. `await` it (or `.then()`) — a call that doesn't will now get a `Promise` object instead of the registry.

### Data display

- **List** — flattened `Stack`/`Grid` props (`direction`, `gap`, `align`, `justify`, `wrap`, `columns`, `rows`, `minChildWidth`, `columnGap`, `rowGap`, `autoFlow`, `alignItems`, `justifyItems`) moved into `stackProps={{ … }}` / `gridProps={{ … }}`. `gridGap` is gone — use `gridProps.gap`.
- **Pill / Badge / Tag / Image** — `shape="rounded"` / `variant="rounded"` renamed to `"soft"`.
- **PillGroup** — `onRemove` is now `(value, next) => void` (was `(value) => void`) and the component never mutates its own `items`. **You must apply `next` yourself** (e.g. `setItems(next)`) or a `removable` group will look inert.
- **Table** — `onRowClick`'s second argument is always the row's true index in `data`, even when a sort has reordered the view. If you relied on the old sorted-view-index fallback, re-check any index math.
- **Table** — selecting one of several duplicate/primitive rows under the default `getRowId` no longer selects every duplicate. Remove any workaround you had for that.
- **Skeleton** — `count={1}` no longer renders a wrapper element; `count > 1` puts `{...props}`/`id` on the wrapper once instead of duplicating it per line.

### Inputs

- **Checkbox / Radio / Slider / Toggle** — controlled now strictly means `value`/`checked !== undefined`. Passing a value with no handler is genuinely stuck, not a "start checked" shortcut — use `default` / `defaultChecked` for that.
- **Command** — `onValueChange` renamed to `onChange`.
- **FormField** — `onValueChange` removed (use `onChange`); `labelProps`/`helperTextProps` removed (never worked).
- **PhoneInput** — now `forwardRef`, ref lands on the wrapper `div`.

### Navigation / overlays

- **Sidebar / NavigationMenu** — a nested item without an explicit `value` now derives its identity from the **full path from root**, not `depth-index`. If you read `onChange`'s value for such an item, expect a different string. Items with an explicit `value` are unaffected.
- **Dropdown** — controlled now strictly means `open !== undefined` — passing `open` without `onOpenChange` no longer silently falls back to uncontrolled.
- **Overlay / Modal / Drawer / AlertDialog** — now set `role="dialog"`/`"alertdialog"`, trap focus, and close on Escape by default. If you layered your own Escape/focus handling on top, it will now double-fire — remove it.
- **ContextMenu** — rows are real `<button role="menuitem">` elements now, not `<div>`. Any selector/style targeting the old markup breaks.

### Data-viz

- **Chart** — no longer extends `SVGAttributes<SVGSVGElement>`. Anything you passed for the `<svg>` (`stroke`, `preserveAspectRatio`, …) moves into the new `svgProps`.
- **BarChart** — `stacked` removed (it never worked — real stacking needs a different data shape, which isn't available yet).
- **LineChart** — `curve` now actually changes the line shape (`linear`/`monotone`/`step`). If you were already passing it expecting no effect, check your chart's appearance.
- **PieChart** — `padAngle`/`startAngle`/`endAngle` now actually render (previously ignored). Defaults reproduce the old look.

---

## Upgrading to 0.7.0

Additive only — no export or token shape changed, nothing above applies. Adds the automated test suite, `docs/build/TESTING.md`, CI, and `sideEffects: false` (better tree-shaking; flag it if your bundler surfaces anything unexpected, though it shouldn't).
