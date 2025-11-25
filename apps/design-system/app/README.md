# App Routes

## Overview

Next.js App Router routes. Routes are minimal and only import components from the design system.

## Structure

```
app/
├── layout.tsx              # Root layout (metadata, providers, global setup)
├── page.tsx                # Home route (/)
└── design-system/
    └── page.tsx            # Design system showcase route (/design-system)
```

## Routes

### Home Route (`/`)

**File**: `app/page.tsx`

- Imports `HomePage` from design system
- Defines page metadata (title, description, OpenGraph, Twitter)
- Static page (force-static, no revalidation)

### Design System Route (`/design-system`)

**File**: `app/design-system/page.tsx`

- Imports `DesignSystemPage` from design system
- Displays component showcase with categories

### Root Layout

**File**: `app/layout.tsx`

- Next.js root layout
- Configures metadata (title, description, icons, OpenGraph, Twitter)
- Sets up fonts from `@/config`
- Provides global providers (Toaster)
- Includes theme color script for dark mode

## Route Pattern

All routes follow this pattern:

```tsx
import { ComponentName } from "@/src/design-system/components/ui/ComponentName"

export default function Page() {
  return <ComponentName />
}
```

Routes should:
- ✅ Only import from `src/design-system`
- ✅ Be minimal (no business logic)
- ✅ Define route-specific metadata if needed
- ❌ Not contain UI code (UI is in design-system)
- ❌ Not contain business logic

## Adding a New Route

1. Create route file in `app/` folder:
   ```tsx
   // app/new-route/page.tsx
   import { NewPageComponent } from "@/src/design-system/components/ui/NewPageComponent"
   
   export default function Page() {
     return <NewPageComponent />
   }
   ```

2. Create page component in `src/design-system/components/ui/`:
   ```tsx
   // src/design-system/components/ui/NewPageComponent.tsx
   export function NewPageComponent() {
     return <div>Page content</div>
   }
   ```

3. Export from `src/design-system/components/ui/index.ts`

4. Add navigation link in `config/appConfig.ts` if needed:
   ```ts
   navItems: [
     // ... existing
     { href: "/new-route", label: "New Route" }
   ]
   ```

## Best Practices

1. **Keep Routes Minimal**: Routes should only import and render components
2. **UI in Design System**: All UI code belongs in `src/design-system`
3. **Metadata**: Define route-specific metadata in route files
4. **Static by Default**: Use `export const dynamic = "force-static"` for static pages
5. **No Business Logic**: Business logic belongs in hooks or design-system modules

