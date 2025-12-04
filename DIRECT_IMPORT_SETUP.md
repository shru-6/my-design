# Direct Import Setup Guide

This guide helps you fix issues when using the direct import approach (cloning the repo and using TypeScript path aliases).

## Common Issues and Fixes

### Issue 1: Path Alias Not Resolving

**Problem**: TypeScript can't find `@shru/design-system/*` imports.

**Fix**: Ensure your `tsconfig.json` has the correct path mapping:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shru/design-system/*": [".design-system-source/apps/design-system/src/design-system/*"]
    }
  }
}
```

**Also configure Next.js** (if using Next.js):

```js
// next.config.mjs
import path from 'path'

export default {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shru/design-system': path.resolve(__dirname, '.design-system-source/apps/design-system/src/design-system'),
    }
    return config
  },
}
```

### Issue 2: Files Using App-Specific Path Aliases

**Problem**: Some files use `@/src/design-system/...` which won't work with your alias.

**Files to avoid importing:**
- `components/ui/DesignSystemPage.tsx` - Uses `@/src/design-system/...`
- `components/ui/HomePage.tsx` - Uses `@/src/design-system/...`
- `themes/ui/ThemeToggle.tsx` - Uses `@/lib/utils` (use package version instead)

**Solution**: 
- Don't import showcase pages (`DesignSystemPage`, `HomePage`)
- Use `shru-design-system` package for `ThemeToggle` instead of importing from source
- All other components use relative imports and work fine

### Issue 3: Missing Dependencies

**Problem**: Components fail with "Cannot find module" errors.

**Fix**: Install all required dependencies:

```bash
# Core dependencies
npm install react react-dom
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# Radix UI (install based on components you use)
npm install @radix-ui/react-slot @radix-ui/react-label
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
# ... see COMPONENT_DEPENDENCIES.md for full list
```

### Issue 4: ThemeToggle Import Error

**Problem**: `ThemeToggle` from source uses `@/lib/utils` which doesn't exist.

**Fix**: Use the package version instead:

```tsx
// ❌ Don't do this:
import { ThemeToggle } from '@shru/design-system/themes/ui/ThemeToggle'

// ✅ Do this:
import { ThemeToggle } from 'shru-design-system'
```

Make sure you have the package installed:
```bash
npm install github:shru-6/my-design#main
```

### Issue 5: Missing CSS Variables

**Problem**: Components render but styles are broken.

**Why CSS is required**: The `globals.css` file contains:
- Tailwind CSS imports (`@import "tailwindcss"`)
- `@theme inline` block that maps CSS variables to Tailwind colors
- Base CSS variable definitions

The theme system dynamically overrides variables at runtime, but the base CSS is required.

**Fix**: 
1. **Option 1: Import from package** (if using npm package):
   ```tsx
   import '@shru/design-system/styles'
   ```

2. **Option 2: Copy CSS file**:
   ```bash
   npx copy-globals
   # or manually copy apps/design-system/styles/globals.css
   ```
   Then import:
   ```tsx
   import './globals.css'
   ```

3. Ensure Tailwind v4 is installed:
   ```bash
   npm install tailwindcss@next @tailwindcss/postcss@next
   ```

### Issue 6: Token Files Not Loading

**Problem**: Theme toggle can't find token files.

**Fix**: Copy tokens to your public folder:
```bash
npx copy-tokens
   # or manually copy from node_modules/shru-design-system/src/tokens to public/tokens
```

## Complete Setup Checklist

- [ ] Clone repository: `git clone https://github.com/shru-6/my-design.git .design-system-source`
- [ ] Configure TypeScript path alias in `tsconfig.json`
- [ ] Configure Next.js webpack alias (if using Next.js)
- [ ] Install theme toggle package: `npm install github:shru-6/my-design#main`
- [ ] Install Tailwind v4: `npm install tailwindcss@next @tailwindcss/postcss@next`
- [ ] Copy globals.css: `npx copy-globals`
- [ ] Copy tokens: `npx copy-tokens`
- [ ] Install component dependencies (React, Radix UI, etc.)
- [ ] Don't import showcase pages (`DesignSystemPage`, `HomePage`)
- [ ] Use `ThemeToggle` from `shru-design-system` package, not from source

## Example Working Setup

```tsx
// ✅ Correct imports
import { Button } from '@shru/design-system/components/atoms/Button'
import { Card } from '@shru/design-system/components/layout/Card'
import { ThemeToggle } from 'shru-design-system' // From package, not source

// ❌ Don't do this
import { DesignSystemPage } from '@shru/design-system/components/ui/DesignSystemPage'
import { ThemeToggle } from '@shru/design-system/themes/ui/ThemeToggle'
```

## Still Having Issues?

1. Check that your path alias exactly matches the repository structure
2. Verify all dependencies are installed
3. Ensure `globals.css` is imported
4. Check browser console for specific error messages
5. Verify token files are accessible at `/tokens/` path

