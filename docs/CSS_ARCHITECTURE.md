# CSS ownership & layers

This is the intentional split for **where styles live** and **what imports what**. Goal: change a use case in one place, not hunt duplicate strings.

## 1. Typography (copy only)

**Owner: `Text` + `textVariants` (`src/components/data-display/Text.tsx`)**

- All **readable text**: body, labels (via `Label` → `Text`), helper/error line styling (via `HelperText` → `textVariants`), muted captions, inline danger copy.
- **Do not** put `text-sm`, `text-muted-foreground`, etc. on random wrappers if the job is “show words”—use `Text` or `textVariants()`.

**Not owned here:** borders, focus rings, or heights of inputs/buttons.

## 2–4. Field system (one module)

**Owner: `src/components/inputs/fieldPieces.tsx`**

Everything below lives in this file—no separate `styles/` or `FieldLayout.tsx`.

| Concern | What |
|--------|------|
| **Interaction** | `focusRing`, `focusRingOffset`, `focusRingDestructive`, `peerFocusRing`, `disabledControl`, `ringOffsetBackground` |
| **Text control chrome** | `fieldSurfaceVariants` — shared **TextInput** + **Textarea** border, variants, invalid, sizes (`control: "input" \| "textarea"`) |
| **Layout stack** | `FieldLayout` — optional label → children → error (`ControlErrorMessage`) |
| **Validation** | `getStringFieldValidationError`, `StringFieldValidateOpts`, `useSyncStringFieldValidation`, `fieldControlBlurHandler` (wired **TextInput** / **Textarea**; not re-exported from package entry by default) |
| **Other** | `ControlLabelStack`, `ControlErrorMessage`, `InputAdornmentSlot` for composed controls |

**Button / FAB / Checkbox / Radio / Switch / Slider** import interaction tokens from `fieldPieces` when the pattern matches (acceptable coupling so actions and fields share one token source).

**Do not** use `fieldPieces` for typography except via existing helpers (`ControlLabelStack` uses `Text`).

## 5. Selection controls

**Owner: each component (`Checkbox`, `Radio`, `Switch`, `Slider` track/thumb)**

- Geometry and state styling differ by control; local `cva` stays in the component file.
- Pull shared **disabled / peer focus** strings from `fieldPieces` only.

## 6. Actions

**Owner: `Button`, `FAB`**

- Touch target, padding, variants; use `disabledControl` + `focusRing` (+ `focusRingOffset` on `Button`) from `fieldPieces`.

## 7. Everything else

- **Card, Badge, Progress, Spinner, …** own their surface; use `Text` / `textVariants` for copy, and `fieldPieces` interaction tokens only when the same pattern applies.

## Dependency direction (allowed)

```
Text / textVariants   ←——  Label, HelperText, ControlLabelStack, …
fieldPieces.tsx       ←——  TextInput, Textarea, Checkbox, …, Button, FAB (tokens only)
```

Avoid **circular** imports: nothing in `fieldPieces` should import `Button` or `TextInput`.
