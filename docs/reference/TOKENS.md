# Tokens

Token system structure — how themes are defined and applied. Consumers: [use/THEMING.md](../use/THEMING.md). Contributors editing tokens: [build/CONTRIBUTING.md](../build/CONTRIBUTING.md).

---

## Source of truth

All theme JSON lives in **`scripts/tokens/`**.

```bash
node scripts/copy-tokens.js   # manual sync
npm run build                 # runs copy automatically
```

Copies to:

| Path | Used by |
|------|---------|
| `src/tokens/` | Bundled embed (`tokenLoader.ts`) |
| `public/tokens/` | Runtime fetch in host apps |

`npm run check` fails if `scripts/tokens` and `src/tokens` diverge.

---

## File layout

```
scripts/tokens/
├── base.json              shared primitives (z-index, radii, …)
├── palettes.json          color palette references
└── themes/
    ├── color/             white, dark, ocean, forest, rose, midnight, …
    ├── typography/        sans, serif
    ├── shape/             smooth, sharp
    ├── density/           comfortable, compact
    ├── animation/         gentle, brisk
    └── custom/            brand, minimal
```

---

## Reference syntax

Theme JSON values can reference palettes:

```json
"primary": "{palette.blue.600}"
```

Extend `palettes.json` when adding new palette stops.

---

## Semantic vs primitive

| Kind | Becomes | Example use |
|------|---------|-------------|
| **Semantic** | `--color-primary`, `--color-destructive` | `bg-primary`, `text-destructive` |
| **Component** | `--control-height-md`, `--spacing-component-md` | Input/button sizing |
| **Layout** | `--z-modal`, `--radius-md` | Overlays, corners |

Components and Tailwind preset consume **semantic** names — not raw hex or `blue-500` in component source.

---

## Categories → CSS variables

At runtime, selected themes per category merge into CSS variables on `:root`. Tailwind preset maps them to utilities (`bg-primary`, `border-border`, `text-muted-foreground`, …).

| Category | Key variables (examples) |
|----------|--------------------------|
| color | `--color-primary`, `--color-success`, `--color-destructive`, `--background` |
| density | `--control-height-sm|md|lg`, `--spacing-component-*` |
| shape | `--radius-sm|md|lg` |
| typography | `--font-sans`, `--font-serif` |
| animation | transition duration tokens |

### Semantic feedback

Color themes define **success**, **warning**, **info**, **destructive** separately from **primary** — tuned per palette (e.g. forest uses teal success so it does not read as brand green).

---

## Registration & embed

1. Add JSON under `scripts/tokens/themes/{category}/`
2. Register in `src/themes/themeConfig.ts` and `scripts/themeConfig.js`
3. Add to `EMBEDDED_TOKENS` in `src/themes/tokenLoader.ts` for bundle embed
4. `npm run build`

Host apps can also load JSON from `public/tokens/` via `registerThemeFromFile()`.

---

## Tailwind preset

`scripts/tailwind.preset.cjs` maps CSS variables to Tailwind theme extension — colors, spacing, z-index (`z-sticky`, `z-dropdown`, `z-overlay`, `z-modal`, `z-toast`), radii, fonts.

Host apps extend:

```js
presets: [require("shru-design-system/tailwind-preset")]
```

---

## Density & fields

Density themes set control heights. `fieldPieces.tsx` reads `--control-height-*` so `TextInput`, `Select`, `Button`, etc. resize together when switching comfortable ↔ compact.

---

## Adding a color theme (checklist)

```
[ ] scripts/tokens/themes/color/your-theme.json
[ ] palettes.json (if new palette refs)
[ ] src/themes/themeConfig.ts
[ ] scripts/themeConfig.js
[ ] src/themes/tokenLoader.ts EMBEDDED_TOKENS
[ ] node scripts/copy-tokens.js && npm run build
[ ] Verify in gallery: Alert tones, Button variants, Pill semantic colors
```
