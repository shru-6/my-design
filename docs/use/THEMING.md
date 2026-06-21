# Theming

Apply and customize appearance in a host app. For how tokens are authored in this repo, see [reference/TOKENS.md](../reference/TOKENS.md).

---

## How it works

Theme JSON defines design tokens. At runtime they become **CSS variables** on `:root`, which Tailwind maps to semantic classes (`bg-primary`, `text-muted-foreground`, `border-border`, etc.).

You do not pass per-component color props — the active theme owns color.

---

## Six categories

| Category | What it changes | Examples |
|----------|-----------------|----------|
| **color** | Palette, surfaces, semantic feedback | white, dark, ocean, forest, rose, midnight, brand |
| **typography** | Font family stack | sans, serif |
| **shape** | Border radius scale | smooth, sharp |
| **density** | Spacing + control heights | comfortable, compact |
| **animation** | Motion timing | gentle, brisk |
| **custom** | Brand overlays | brand, minimal |

Color themes include semantic **success**, **warning**, **info**, and **destructive** tokens — tuned per palette so success does not read as primary on tinted themes.

**Density** sets `--control-height-*` and `--control-padding-*`. Inputs and buttons read these via shared field styles.

---

## React API

```tsx
import { useTheme, applyPreset, ThemeToggle } from "shru-design-system"

// Hook — persists selections to localStorage
const { selectedThemes, updateTheme, applyPreset, resetToDefaults } = useTheme()

// One-shot (e.g. after login) — works without wrapping the whole app
await applyPreset({ color: "ocean", density: "compact" })
```

`applyPreset` merges with defaults, applies CSS variables, and persists unless you pass `{ persist: false }` as the second argument.

**Categories:** `color`, `typography`, `shape`, `density`, `animation`, `custom`. Omitted keys keep defaults (`white`, `sans`, `smooth`, `comfortable`, `gentle`).

---

## Named presets

| Preset | Call |
|--------|------|
| Default | `applyPreset({})` or `resetToDefaults()` |
| Ocean compact | `applyPreset({ color: "ocean", density: "compact" })` |
| Dark minimal | `applyPreset({ color: "dark", shape: "sharp", density: "compact" })` |
| Brand dashboard | `applyPreset({ color: "brand", typography: "sans", animation: "brisk" })` |
| Forest serif | `applyPreset({ color: "forest", typography: "serif", shape: "smooth" })` |
| Rose gentle | `applyPreset({ color: "rose", animation: "gentle" })` |

---

## Theme UI

**Floating toggle** — portals panel to `document.body`:

```tsx
<ThemeToggle position="bottom-left" />
```

**Embedded panel** — same UI inside your layout (e.g. Settings page):

```tsx
import { ThemePanel, useThemeToggle } from "shru-design-system"

function AppearanceSettings() {
  const {
    selectedThemes,
    isLoading,
    activeCategory,
    categoryThemes,
    themesLoading,
    categories,
    setActiveCategory,
    handleThemeSelect,
    handleResetAll,
  } = useThemeToggle({ embedded: true })

  return (
    <ThemePanel
      categories={categories}
      selectedThemes={selectedThemes}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      categoryThemes={categoryThemes}
      themesLoading={themesLoading}
      isApplying={isLoading}
      onThemeSelect={handleThemeSelect}
      onResetAll={handleResetAll}
      showClose={false}
    />
  )
}
```

`embedded: true` loads theme lists without FAB open state. `showClose={false}` when the panel is not a popover.

---

## Custom themes in your app

1. Place JSON under your app's `public/tokens/themes/...`
2. Register at runtime: `registerTheme()` or `registerThemeFromFile()`
3. Select via `updateTheme({ color: "your-theme" })` or `applyPreset`

If tokens do not apply: confirm `npx shru-design-system-init` ran, files are served, and `useTheme` / `generateAndApplyTheme` ran on mount.

---

## Styling rules

Use semantic Tailwind classes only:

- `bg-primary`, `text-foreground`, `border-border`, `text-destructive`
- Not `bg-blue-500` — raw palette classes break theme switching

---

## Next

- [Features](./FEATURES.md) — semantic feedback on `Alert` / `Button` / `Pill`
- [Recipes](./RECIPES.md) — embedded theme panel in settings
