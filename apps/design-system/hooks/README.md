# App Hooks

## Overview

App-level React hooks for application-wide functionality.

## Structure

```
hooks/
├── use-mobile.ts    # Mobile breakpoint detection
└── index.ts         # Centralized exports
```

## Hooks

### `useIsMobile`

Detects if the viewport is below a mobile breakpoint.

**Signature**:
```typescript
function useIsMobile(mobileBreakpoint?: number): boolean
```

**Parameters**:
- `mobileBreakpoint` (optional): Breakpoint in pixels (default: 768)

**Returns**: `boolean` - `true` if viewport width < breakpoint

**Usage**:
```tsx
import { useIsMobile } from "@/hooks"

function MyComponent() {
  const isMobile = useIsMobile()
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  )
}
```

**Implementation Details**:
- Uses `window.matchMedia` for responsive detection
- Listens to resize events
- Returns `undefined` initially (before hydration), then boolean
- Handles SSR (returns `false` on server)

## Adding a New Hook

1. Create hook file:
   ```tsx
   // hooks/use-new-hook.ts
   export function useNewHook() {
     // Implementation
   }
   ```

2. Export from `index.ts`:
   ```typescript
   export { useNewHook } from "./use-new-hook"
   ```

3. Import in components:
   ```tsx
   import { useNewHook } from "@/hooks"
   ```

## Best Practices

1. **App-Level Only**: Hooks here are for app-wide functionality
2. **Component Hooks**: Component-specific hooks belong in design-system modules
3. **SSR Safe**: Ensure hooks work with server-side rendering
4. **Type Safety**: Use TypeScript for all hooks
5. **Documentation**: Document hook parameters and return values

## Hook Guidelines

### When to Add Here

- ✅ App-wide functionality (mobile detection, layout, etc.)
- ✅ Used across multiple routes
- ✅ Application-level state/behavior

### When NOT to Add Here

- ❌ Component-specific hooks → Add to component's module
- ❌ Design system hooks → Add to `src/design-system`
- ❌ Business logic hooks → Add to appropriate module

