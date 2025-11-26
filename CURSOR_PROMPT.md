# Cursor Prompt: Integrate Theme Toggle Library

Copy and paste this prompt into Cursor in your other repository:

---

**I want to integrate the theme toggle component library from `https://github.com/shru-6/my-design` into this Next.js project.**

## Task:
1. **Install the library** from GitHub:
   - Add `"@shru/theme-toggle": "github:shru-6/my-design#main"` to `package.json` dependencies
   - Run `npm install` (or `pnpm install` / `yarn install`)
   - The library has a `postinstall` script that will automatically build, but if you get module errors, run `cd node_modules/@shru/theme-toggle && npm run build:lib`

2. **Set up token files**:
   - Copy the token files from `node_modules/@shru/theme-toggle/src/tokens` to `public/tokens` (or your public assets folder)
   - Ensure the tokens are accessible at `/tokens/` path in your app
   - The folder structure should be: `public/tokens/base.json`, `public/tokens/palettes.json`, `public/tokens/themes/color/`, etc.

3. **Add the component** to my app:
   - Import `ThemeToggle` from `@shru/theme-toggle` in your layout or main page
   - Add `<ThemeToggle position="bottom-right" />` to your component
   - Make sure it's a client component (add `"use client"` if needed)

4. **Handle Next.js specifics**:
   - If you get SSR errors, wrap it in a dynamic import with `ssr: false`
   - The component is already marked as `"use client"` but Next.js might need dynamic import

5. **Verify it works**:
   - Check that CSS variables are being generated in the `<head>` (look for `<style id="dynamic-theme">`)
   - Test that theme switching works
   - Ensure tokens are loading correctly (check Network tab for `/tokens/` requests)

## Example Implementation:

```tsx
// In your layout.tsx or page.tsx
"use client"

import dynamic from 'next/dynamic'

const ThemeToggle = dynamic(
  () => import('@shru/theme-toggle').then((mod) => mod.ThemeToggle),
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
- The component should be self-contained (no external CSS imports needed)
- CSS variables should be automatically generated and injected
- The component should work with my existing Tailwind CSS setup
- Token files should be accessible at runtime at `/tokens/` path
- React 18+ must be installed

## Expected Result:
- Theme toggle button appears in the corner
- Clicking it opens a radial menu with theme categories (Color, Typography, Shape, etc.)
- Selecting themes applies CSS variables automatically
- No manual CSS imports or additional setup needed

## Troubleshooting:
- **Module not found error**: Run `cd node_modules/@shru/theme-toggle && npm run build:lib` to build the library
- **Token files not loading**: Verify `public/tokens/` exists and files are accessible
- **SSR errors**: Use `dynamic` import with `ssr: false` as shown above
- **CSS variables not appearing**: Check browser console for errors, verify tokens are loading

---

