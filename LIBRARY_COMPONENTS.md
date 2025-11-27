# Design System Components as Library

## Current Status

The design system components are **library-ready**. Components use relative imports and standard HTML elements (no Next.js dependencies).

## What's Already Library-Ready

✅ **Atoms (24 components)** - Self-contained, only depend on:
   - React
   - Radix UI primitives
   - `class-variance-authority`
   - `cn` utility (bundled in `components/utils.ts`, imported relatively)
   - Some atoms import other atoms (e.g., TextInput imports Label) - this is fine for a library

✅ **Molecules & Layout** - Import atoms, which is normal component composition
✅ **Radix UI primitives** - Already external dependencies
✅ **TypeScript** - Full type definitions included
✅ **Component structure** - Clean exports via `index.ts` files
✅ **Styling** - Uses Tailwind CSS classes (no CSS-in-JS)

## Dependencies Required

When using components as a library, users need:

```json
{
  "dependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "@radix-ui/*": "varies",
    "class-variance-authority": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "lucide-react": "^0.x"
  }
}
```

## Usage

Components can be copied/imported directly:
- Components use relative imports (no path alias configuration needed)
- `cn` utility is bundled in `components/utils.ts`
- Image component uses standard `<img>` (no Next.js dependency)
- Install peer dependencies (React, Radix UI, CVA, clsx, tailwind-merge, lucide-react)
- Copy the `components/` folder and `utils.ts` together

