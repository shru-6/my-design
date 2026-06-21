# Install

First-time setup for using shru-design-system in your app.

---

## Install package + peers

```bash
npm install shru-design-system
```

**Peer dependencies** (install if missing):

| Package | Version |
|---------|---------|
| `react`, `react-dom` | ≥ 18 |
| `tailwindcss` | ≥ 3.4 |
| `lucide-react` | ^0.400 |
| `class-variance-authority` | ^0.7 |
| `clsx` | ^2 |
| `tailwind-merge` | ^2 |
| `input-otp` | ^1 |
| `@radix-ui/react-slider` | ^1 |
| `react-resizable-panels` | ^2 |

Run the init script (copies token assets and prints Tailwind setup):

```bash
npx shru-design-system-init
```

Re-run after upgrading the package if token paths or preset guidance changed.

---

## Styles

In your global CSS, import **before** `@tailwind` directives:

```css
@import "shru-design-system/styles.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Tailwind

```js
// tailwind.config.js
module.exports = {
  presets: [require("shru-design-system/tailwind-preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/shru-design-system/dist/**/*.{js,mjs}",
  ],
}
```

The `content` path for `node_modules/.../dist` is required — without it, component classes are purged and UI looks unstyled.

---

## First render

```tsx
import { Button, Card, Text } from "shru-design-system"

export function Example() {
  return (
    <Card>
      <Text>Hello</Text>
      <Button>Action</Button>
    </Card>
  )
}
```

---

## Theme toggle (optional)

```tsx
import { ThemeToggle } from "shru-design-system"

export function App() {
  return (
    <>
      {/* your app */}
      <ThemeToggle position="bottom-left" />
    </>
  )
}
```

See [Theming](./THEMING.md) for `useTheme`, `applyPreset`, and embedded `ThemePanel`.

---

## Local preview (this repo)

```bash
npm run dev
```

Opens `http://localhost:5173`:

| Route | Purpose |
|-------|---------|
| `/gallery` | Component catalog with live props panel |
| `/showcase` | Mini admin app — composed patterns |

---

## Common failures

| Symptom | Fix |
|---------|-----|
| Components look unstyled | Add dist to Tailwind `content`; import `styles.css` before `@tailwind` |
| Missing icons | Install `lucide-react` peer |
| Slider / OTP / resizable panels broken | Install matching peers from table above |
| Theme variables missing | Run `npx shru-design-system-init`; ensure tokens are served if using custom themes |

---

## Next

- [Theming](./THEMING.md) — presets and runtime switching
- [Recipes](./RECIPES.md) — app shell, forms, modals
- [Features](./FEATURES.md) — overlays, toasts, input API differences
