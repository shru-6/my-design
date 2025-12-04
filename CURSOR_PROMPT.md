# Cursor Prompt: Integrate Theme Toggle Library

Copy and paste this prompt into Cursor in your other repository:

---

**I want to integrate the theme toggle component library `shru-design-system` into this Next.js project.**

## Task:
1. **Install the library** from npm:
   - Run `npm install shru-design-system` (or `pnpm add shru-design-system` / `yarn add shru-design-system`)
   - This automatically adds the dependency to your `package.json`
   - The package is pre-built, so no build step is needed

2. **Set up Tailwind v4 and CSS** (Required):
   - Install Tailwind v4: `npm install tailwindcss@next @tailwindcss/postcss@next`
   - Configure PostCSS: Create `postcss.config.mjs` with `@tailwindcss/postcss` plugin
   - **Import CSS from package** (Recommended): `import 'shru-design-system/styles'` in your root layout
   - **OR copy CSS manually**: Run `npx copy-globals` or copy `node_modules/shru-design-system/apps/design-system/styles/globals.css` to your project
   - **Why CSS is required**: The `globals.css` contains:
     - Tailwind CSS imports (`@import "tailwindcss"`)
     - `@theme inline` block that maps CSS variables to Tailwind colors
     - Base CSS variable definitions
   - The theme system dynamically overrides these variables at runtime, but the base CSS file is required for Tailwind to work.

3. **Set up token files**:
   - Run `npx copy-tokens` to automatically copy tokens from the package to your `public/tokens` folder
   - Alternatively, manually copy from `node_modules/shru-design-system/src/tokens` to `public/tokens`
   - Ensure the tokens are accessible at `/tokens/` path in your app
   - The folder structure should be: `public/tokens/base.json`, `public/tokens/palettes.json`, `public/tokens/themes/color/`, etc.

4. **Add the component** to my app:
   - Import `ThemeToggle` from `shru-design-system` in your layout or main page
   - Add `<ThemeToggle position="bottom-right" />` to your component
   - Make sure it's a client component (add `"use client"` if needed)

5. **Handle Next.js specifics**:
   - If you get SSR errors, wrap it in a dynamic import with `ssr: false`
   - The component is already marked as `"use client"` but Next.js might need dynamic import

6. **Verify it works**:
   - Check that CSS variables are being generated in the `<head>` (look for `<style id="dynamic-theme">`)
   - Test that theme switching works
   - Ensure tokens are loading correctly (check Network tab for `/tokens/` requests)

## Example Implementation:

```tsx
// In your layout.tsx or page.tsx
"use client"

import 'shru-design-system/styles' // Import CSS (required)
import dynamic from 'next/dynamic'

const ThemeToggle = dynamic(
  () => import('shru-design-system').then((mod) => mod.ThemeToggle),
  { ssr: false }
)

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ThemeToggle position="bottom-right" />
      </body>
    </html>
  )
}
```

## Requirements:
- **Tailwind CSS v4** must be installed and configured (`tailwindcss@next @tailwindcss/postcss@next`)
- **CSS must be imported** - Either `import 'shru-design-system/styles'` or copy `globals.css` manually
- **Why CSS is needed**: Contains Tailwind imports and `@theme inline` block that maps CSS variables to Tailwind. Theme system overrides variables at runtime.
- Token files should be accessible at runtime at `/tokens/` path
- React 18+ must be installed

## Expected Result:
- Theme toggle button appears in the corner
- Clicking it opens a radial menu with theme categories (Color, Typography, Shape, etc.)
- Selecting themes applies CSS variables automatically
- No manual CSS imports or additional setup needed

## Troubleshooting:
- **Module not found error**: Verify the package is installed: `npm list shru-design-system`
- **Token files not loading**: Verify `public/tokens/` exists and files are accessible at `/tokens/` path
- **SSR errors**: Use `dynamic` import with `ssr: false` as shown above
- **CSS variables not appearing**: 
  - Ensure CSS is imported: `import 'shru-design-system/styles'`
  - Check browser console for errors
  - Verify tokens are loading (check Network tab for `/tokens/` requests)
  - Look for `<style id="dynamic-theme">` in the DOM

---

