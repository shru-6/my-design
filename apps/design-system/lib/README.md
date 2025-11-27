# Shared Utilities

## Overview

Shared utility functions used across the application and design system.

## Structure

```
lib/
└── utils.ts    # Utility functions
```

## Utilities

### `cn(...inputs: ClassValue[])`

Merges class names using `clsx` and `tailwind-merge`.

**Purpose**: Combines conditional classes and resolves Tailwind conflicts.

**Usage**:
```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-class",
  condition && "conditional-class",
  className  // from props
)} />
```

**Benefits**:
- Resolves Tailwind class conflicts (e.g., `p-4` + `p-2` → `p-2`)
- Handles conditional classes
- Merges arrays and objects

## Adding Utilities

### When to Add Here

- ✅ Used across app AND design-system
- ✅ Pure utility functions (no side effects)
- ✅ Generic helpers (not domain-specific)

### When NOT to Add Here

- ❌ App-specific → Add to `config/` or `hooks/`
- ❌ Design system specific → Add to design-system modules
- ❌ Component-specific → Add to component's module

### Adding a New Utility

1. Add function to `utils.ts`:
   ```typescript
   export function newUtility(param: string) {
     // Implementation
   }
   ```

2. Import where needed:
   ```tsx
   import { newUtility } from "@/lib/utils"
   ```

## Best Practices

1. **Pure Functions**: Keep utilities pure (no side effects)
2. **Type Safety**: Use TypeScript for all utilities
3. **Documentation**: Document function purpose and parameters
4. **Generic**: Utilities should be reusable, not domain-specific
5. **Testing**: Consider testing complex utilities

