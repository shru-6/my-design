# App Configuration

## Overview

Centralized app-level configuration including site settings, fonts, and metadata constants.

## Structure

```
config/
├── appConfig.ts    # All app configuration
└── index.ts        # Centralized exports
```

## Configuration Sections

### Font Configuration

Fonts are loaded using Next.js font optimization:

- **Geist Sans** (`--font-sans`): Primary sans-serif font
- **Geist Mono** (`--font-mono`): Monospace font
- **Inter** (`--font-inter`): Secondary sans-serif font

**Usage**:
```tsx
import { fontVariables } from "@/config"

// Apply to body element
<body className={fontVariables}>
```

### Site Configuration

Site metadata and navigation:

```typescript
export const siteConfig = {
  name: "design system",
  url: "https://www.designsystem.com",
  description: "...",
  links: {
    twitter: "...",
    github: "..."
  },
  navItems: [
    { href: "/", label: "Home" },
    { href: "/design-system", label: "Design System" }
  ]
}
```

**Usage**:
```tsx
import { siteConfig } from "@/config"

// In metadata
title: siteConfig.name
description: siteConfig.description

// In navigation
{siteConfig.navItems.map(item => ...)}
```

### Meta Theme Colors

Theme colors for browser UI:

```typescript
export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b"
}
```

**Usage**:
```tsx
import { META_THEME_COLORS } from "@/config"

// In meta tag
<meta name="theme-color" content={META_THEME_COLORS.light} />
```

## Adding Configuration

### Adding a New Font

1. Import font in `appConfig.ts`:
   ```typescript
   import { NewFont } from "next/font/google"
   
   const fontNew = NewFont({
     subsets: ["latin"],
     variable: "--font-new"
   })
   ```

2. Add to `fontVariables`:
   ```typescript
   export const fontVariables = cn(
     fontSans.variable,
     fontMono.variable,
     fontInter.variable,
     fontNew.variable  // Add new font
   )
   ```

### Adding Navigation Item

Update `navItems` in `siteConfig`:

```typescript
navItems: [
  // ... existing
  {
    href: "/new-route",
    label: "New Route"
  }
]
```

### Adding Site Setting

Add to `siteConfig` object:

```typescript
export const siteConfig = {
  // ... existing
  newSetting: "value"
}
```

## Exports

All configuration is exported from `index.ts`:

```typescript
export { siteConfig, META_THEME_COLORS, fontVariables } from "./appConfig"
```

**Import pattern**:
```tsx
import { siteConfig, fontVariables } from "@/config"
```

## Best Practices

1. **Centralized**: All app config in one file
2. **Type Safety**: Use TypeScript for configuration
3. **Constants**: Export as constants (not functions)
4. **Single Source**: One config file, multiple exports
5. **Documentation**: Document new configuration options

