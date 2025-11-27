# Using Design System Components

This guide explains how to use the design system components from this repository in your projects.

## Overview

The design system contains **72+ reusable components** organized by category:
- **Atoms** - Basic building blocks (Button, Input, Badge, etc.)
- **Molecules** - Composite components (Form, Modal, Select, etc.)
- **Layout** - Layout components (Card, Sidebar, Table, etc.)
- **Primitives** - Low-level primitives (Box, Flex, Text, etc.)

## Installation

Copy the components folder into your project:

```bash
cp -r apps/design-system/src/design-system/components /path/to/your/project/src/
```

**Install peer dependencies:**
```bash
npm install react react-dom
npm install @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-dialog # etc.
npm install class-variance-authority clsx tailwind-merge lucide-react
```

**Note:** Components use relative imports, so no path alias configuration is needed. Just copy the `components/` folder and `utils.ts` together.


## Usage Example

```tsx
import { Button } from "@/src/design-system/components/atoms/Button"
import { Card, CardHeader, CardTitle, CardContent } from "@/src/design-system/components/layout/Card"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Required Dependencies

All components require these peer dependencies:

```json
{
  "dependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.400.0"
  }
}
```

**Radix UI primitives** (varies by component):
- `@radix-ui/react-slot`
- `@radix-ui/react-label`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- ... and more (see component imports)

## Styling

Components use **Tailwind CSS** with CSS variables. You need:

1. **Tailwind CSS configured** in your project
2. **CSS variables** for theming (see theme system docs)
3. **Component styles** - Components use utility classes, no additional CSS needed

### Example Tailwind Config

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./design-system/**/*.{js,ts,jsx,tsx}" // if using submodule
  ],
  theme: {
    extend: {
      // Your theme config
    }
  }
}
```

## Special Components

### Image Component

The `Image` component uses a standard HTML `<img>` tag for library compatibility:

- **Library-compatible**: Works in any React environment (no Next.js dependency)
- **Fallback support**: Supports error fallback UI
- **For Next.js optimization**: Use `next/image` directly in your Next.js app if you need image optimization

```tsx
import { Image } from "@/components/atoms/Image"

<Image 
  src="/photo.jpg" 
  alt="Photo" 
  width={400} 
  height={300}
  loading="lazy"
  fallback={<div>Loading...</div>}
/>
```


## TypeScript Support

All components include full TypeScript definitions:

```tsx
import { Button, type ButtonProps } from "@/components/atoms/Button"

const props: ButtonProps = {
  variant: "default",
  size: "lg"
}
```


## Troubleshooting

- **Import errors**: Components use relative imports, no path aliases needed
- **Missing styles**: Ensure Tailwind CSS is configured and CSS variables are defined
- **Type errors**: Install all peer dependencies

