# Component Props Design Principles

> **Purpose:** This document defines how to plan and design props for all components in the design system. Use it as a reference when creating or updating component APIs.

## Quick Planning Workflow

When planning props for a new component, follow this order:

1. **Identify Component Category** → Apply relevant base contracts
2. **Define Core Functionality** → Determine required props
3. **Apply Naming Conventions** → Use standardized handler names
4. **Plan Visual Variants** → Separate variant, tone, size, appearance
5. **Add Common Use Cases** → Optional props with defaults
6. **Consider Composition** → Use slots vs props
7. **Check Consistency** → Follow all consistency rules
8. **Document** → List required vs optional clearly

---

## Styling Prop Consistency Contract

Use this section as the default styling contract for all components unless there is a documented exception.

### 1) Universal Styling Hook
- `className?` is the only styling prop expected on every public component.

### 2) Styling Prop Ownership by Layer

- **Primitives (`Box`, `Stack`)**
  - Own structural style props: spacing, dimensions, positioning, alignment.
  - May expose broader layout/CSS-like controls.

- **Composable controls (`InputGroup`, `Card`)**
  - Expose only composition-level styling knobs: `size?`, `variant?`, attached/state flags, surface bounds.
  - Do not expose full primitive layout surface.

- **Behavioral compounds (`Header`, `Footer`, `Collapsible`, `Tooltip`, `Banner`, etc.)**
  - Expose intent-driven styling props only (`variant?`, `sticky?`, `separator?`).
  - Avoid raw spacing/dimension props unless critical to behavior.

### 3) Standard Styling Vocabulary

- `variant` = visual style mode (`outline`, `ghost`, `filled`, etc.)
- `color`/`tone`/`intent` = semantic meaning (`success`, `danger`, etc.)
- `size` = scale/density (`sm`, `md`, `lg`, etc.)
- `shape` = geometry (`pill`, `rounded`, `square`, etc.)

Rule: avoid synonyms for the same concept in the same layer (`orientation` and `direction` should not coexist for one component API).

### 4) State Styling Naming

Use boolean prefixes consistently for state-driven styling:
- `isLoading?`
- `isInvalid?`
- `disabled?`

For validation trigger/report patterns:
- trigger: `validate?`
- callback: `onValidate?`

### 5) Composition and Styling Boundary

- If a child component already owns a styling concern, parent compounds should pass through semantically rather than duplicate low-level props.
- Example: `Badge` can accept `icon?` and `rightIcon?` because those are rendered by `Text`; `Badge` itself should not introduce separate icon styling APIs.

---

## Global Base Contracts (Applied Everywhere)

These base prop contracts should be inherited across all components for consistency:

### 1️⃣ BaseComponentProps (All Components)
**Optional:**
- `className?` - Style override
- `style?` - Inline style override
- `id?` - Element identifier
- `as?` - Polymorphic rendering (render as different element)
- `ref` - Forwarded ref

### 2️⃣ BaseInteractiveProps (All Interactive Components)
**Optional:**
- `disabled?` - Disabled state
- `loading?` or `isLoading?` - Loading state
- `active?` - Active state
- `onClick?` - Click handler
- `tabIndex?` - Tab order
- `autoFocus?` - Auto focus on mount

### 3️⃣ BaseFieldProps (All Form Controls)
**Optional:**
- `value?` - Controlled value
- `defaultValue?` - Uncontrolled default value
- `onChange?` or `onValueChange?` - Change handler (see naming rules below)
- `name?` - Form field name
- `required?` - Required validation
- `readOnly?` - Read-only state
- `invalid?` - Invalid/error state
- `size?` - Size variant
- `variant?` - Visual variant

**Rule:** These base props are inherited implicitly - don't repeat them in every component's prop list. Only document component-specific additions.

---

## Naming Conventions (Critical for Consistency)

### State Change Handlers

**Standardized Naming:**
- `onValueChange` - For value-based components (Input, Select, Slider)
- `onOpenChange` - For open/visibility state (Modal, Popover, Dropdown)
- `onCheckedChange` - For boolean toggles (Checkbox, Switch, Toggle)
- `onPressedChange` - For pressed/toggle state (ToggleButton)
- `onActiveChange` - For active item selection (Tabs, RadioGroup)

**Controlled/Uncontrolled Pattern:**
- Controlled: `value` + `onValueChange`
- Uncontrolled: `defaultValue` (no change handler needed for initial value)

**Rule:** Never mix naming conventions. Don't use `onChange` in one component and `onValueChange` in another for the same purpose.

### State Props

**Boolean State:**
- `checked` / `defaultChecked` + `onCheckedChange`
- `pressed` / `defaultPressed` + `onPressedChange`
- `open` / `defaultOpen` + `onOpenChange`

**Value State:**
- `value` / `defaultValue` + `onValueChange`
- `active` / `defaultActive` + `onActiveChange`

**Rule:** Always pair controlled/uncontrolled versions consistently.

---

## Visual Variant Planning

**Clear Separation:**
- `variant` - Visual style/appearance (primary, outline, ghost, filled)
- `tone` or `intent` - Semantic meaning (success, danger, warning, info, neutral)
- `size` - Size scaling (xs, sm, md, lg, xl)
- `appearance` - Visual treatment (solid, subtle, outline)
- `shape` or `radius` - Border radius/shape (square, rounded, circle)
- `orientation` - Layout direction (horizontal, vertical)

**Rule:** Variants = appearance, Tone/Intent = meaning. Don't mix them.

**Anti-Pattern:** ❌ `primary={true}`, `danger={true}` (boolean style props)
**Correct:** ✅ `variant="primary"`, `tone="danger"`

---

## Required vs Optional Props - Decision Framework

### 1. Core Functionality (Usually Required)

**Required if:**
- Component cannot function without it
- No sensible default exists
- Missing prop would cause runtime errors

**Examples:**
- `Button`: `children` or `icon` (needs content)
- `TextInput`: None (can have empty value)
- `Modal`: `open` (needs to know if visible)
- `Select`: `value` or `defaultValue` (needs selection state)

**Rule of Thumb:** If the component is useless without it, make it required.

---

### 2. Common Use Cases (Usually Optional with Smart Defaults)

**Optional if:**
- Has a sensible default that works for 80% of cases
- Can be inferred from context
- Has a preset that covers common scenarios

**Examples:**
- `Button`: `size` (default: "md"), `variant` (default: "primary")
- `TextInput`: `size` (default: "md"), `appearance` (default: "outline")
- `Icon`: `size` (default: "md"), `shape` (default: "square")
- `Text`: `size` (default: "md"), `appearance` (default: "default")

**Rule of Thumb:** If 80% of users will use the same value, make it optional with a default.

---

### 3. Accessibility (Context-Dependent)

**Required if:**
- Component is interactive and needs ARIA labels
- Missing prop would cause accessibility violations
- Screen readers need the information

**Optional if:**
- Can be inferred from content (e.g., button text)
- Component is decorative only
- Can be provided via wrapper component

**Examples:**
- `Icon`: `aria-label` (optional if decorative, required if meaningful)
- `Button`: `aria-label` (optional if has text, required if icon-only)
- `Modal`: `aria-label` or `aria-labelledby` (usually required)
- `Checkbox`: `aria-label` (optional if has visible label)

**Rule of Thumb:** Required for accessibility only if component cannot be accessible without it.

---

### 4. Visual Customization (Usually Optional)

**Optional if:**
- Styling can be overridden via `className`
- Multiple variants exist via CVA
- Preset system covers common needs

**Examples:**
- `className`: Always optional (override mechanism)
- `size`, `appearance`, `variant`: Optional (has defaults)
- `preset`: Optional (convenience, not required)
- Color props: Optional (use semantic variants instead)

**Rule of Thumb:** Visual props should be optional unless they're core to the component's identity.

---

### 5. Behavioral Props (Context-Dependent)

**Required if:**
- Component needs it to function correctly
- No default behavior makes sense

**Optional if:**
- Has sensible default behavior
- Can be inferred from other props

**Examples:**
- `onClick`: Optional (button can be disabled)
- `onChange`: Required for controlled inputs, optional for uncontrolled
- `disabled`: Optional (default: false)
- `isLoading`: Optional (default: false)
- `isSkeleton`: Optional (default: false)

**Rule of Thumb:** Event handlers are optional; state props have boolean defaults.

---

### 6. Content Props (Context-Dependent)

**Required if:**
- Component is meaningless without content
- No fallback content exists

**Optional if:**
- Component can be empty
- Has fallback/placeholder content
- Content can come from children

**Examples:**
- `Button`: `children` (required if no icon-only mode)
- `Text`: `children` (required - component is for text)
- `Icon`: `icon` (required - component is for icons)
- `Avatar`: `src` or `alt` (optional - can have fallback)
- `Badge`: `children` (required - needs content)

**Rule of Thumb:** If component's purpose is to display content, content prop is required.

---

### 7. Composition Props (Usually Optional)

**Optional if:**
- Can be handled by wrapper components
- Not core to component's functionality
- Adds complexity without clear benefit

**Examples:**
- `leftIcon`, `rightIcon`: Optional (can use children composition)
- `iconPosition`: Optional (has default: "left")
- `label`: Optional (can use separate Label component)
- `error`: Optional (can use separate error component)

**Rule of Thumb:** Composition props are optional; prefer composition over props when possible.

---

## Decision Matrix

| Prop Type | Usually Required? | Reasoning |
|-----------|-------------------|-----------|
| **Core Functionality** | ✅ Yes | Component can't work without it |
| **Common Use Cases** | ❌ No (with defaults) | 80% use same value |
| **Accessibility** | ⚠️ Context-dependent | Required if cannot be accessible without it |
| **Visual Customization** | ❌ No | Use className or variants |
| **Behavioral Props** | ⚠️ Context-dependent | Required if no default makes sense |
| **Content Props** | ✅ Yes (if no fallback) | Component's purpose is content |
| **Composition Props** | ❌ No | Prefer composition |

---

## Component-Specific Guidelines

### Input Components (TextInput, Textarea, Select)

**Required:**
- None (can have empty/default values)

**Optional with Defaults:**
- `size` → "md"
- `appearance` → "outline"
- `disabled` → false
- `placeholder` → undefined

**Optional:**
- `icon`, `iconPosition`
- `label`, `error`, `description`
- `className`
- `onChange` (for uncontrolled)
- `value` (for uncontrolled)

---

### Button Components

**Required:**
- `children` OR `icon` (if icon-only mode)

**Optional with Defaults:**
- `size` → "md"
- `variant` → "primary"
- `disabled` → false
- `isLoading` → false

**Optional:**
- `leftIcon`, `rightIcon`
- `preset`
- `className`
- `onClick`, `onFocus`, etc.

---

### Icon Components

**Required:**
- `icon` (ReactNode)

**Optional with Defaults:**
- `size` → "md"
- `shape` → "square"
- `padding` → "none"

**Optional:**
- `preset`
- `aria-label` (required if meaningful, optional if decorative)
- `status`, `statusPosition`
- `className`

---

### Form Components

**Required:**
- `Form`: None (wrapper)
- `FormField`: `name` (field identifier)
- `FormInput`: None (can be empty)

**Optional with Defaults:**
- `FormInput`: `type` → "text", `variant` → "default"

**Optional:**
- `label`, `error`, `description`
- `className`
- `disabled`, `required`

---

### Layout Components

**Required:**
- None (layout is structural)

**Optional with Defaults:**
- `direction` → "row" (for Stack)
- `columns` → 1 (for Grid)
- `gap` → varies by component

**Optional:**
- `className`
- `spacing`, `padding`
- `align`, `justify`

---

## Best Practices

### 1. Minimize Required Props
- Only require what's absolutely necessary
- Use defaults for common cases
- Use presets for complex combinations

### 2. Provide Sensible Defaults
- Defaults should work for 80% of use cases
- Document defaults clearly
- Make defaults discoverable (TypeScript types, JSDoc)

### 3. Use Presets for Complex Combinations
- Instead of requiring multiple props, offer presets
- Presets can be overridden by explicit props
- Example: `preset="form"` instead of `size="md" appearance="outline"`

### 4. Prefer Composition Over Props
- Use `children` for flexible content
- Use wrapper components for complex layouts
- Keep props focused on component's core purpose

### 5. Make Overrides Easy
- Always provide `className` for styling overrides
- Allow prop overrides even when using presets
- Document override patterns

### 6. Consider Developer Experience
- Required props should be obvious from component name
- Optional props should have clear defaults
- Complex props should have presets

### 7. Accessibility First
- If component can't be accessible without a prop, make it required
- Provide ARIA props even if optional
- Document accessibility requirements

---

## Examples

### ✅ Good: Minimal Required Props

```tsx
// Button - only requires content
<Button>Click me</Button>
<Button icon={<Icon />} /> // icon-only mode

// TextInput - no required props
<TextInput />
<TextInput value={value} onChange={onChange} /> // controlled
<TextInput defaultValue="hello" /> // uncontrolled

// Icon - requires icon content
<Icon icon={<UserIcon />} />
```

### ❌ Bad: Too Many Required Props

```tsx
// Don't require common props with defaults
<Button size="md" variant="primary" disabled={false}>Click</Button>

// Don't require visual props
<TextInput size="md" appearance="outline" className="" />
```

### ✅ Good: Smart Defaults

```tsx
// Defaults handle common case
<Button>Click</Button> // size="md", variant="primary" by default

// Preset handles complex case
<TextInput preset="form" /> // size="md", appearance="outline", etc.

// Can override defaults
<Button size="sm" variant="outline">Click</Button>
```

### ✅ Good: Optional Composition Props

```tsx
// Label can be separate or prop
<TextInput label="Email" />
// OR
<Label>Email</Label>
<TextInput />

// Icons can be props or children
<Button leftIcon={<Icon />}>Click</Button>
// OR
<Button>
  <Icon />
  Click
</Button>
```

---

## Checklist for New Components

When designing props for a new component, ask:

1. **Can the component function without this prop?**
   - Yes → Optional
   - No → Required

2. **Do 80% of users need the same value?**
   - Yes → Optional with default
   - No → Optional, no default (or preset)

3. **Is this for visual customization?**
   - Yes → Optional (use className or variants)
   - No → Continue evaluation

4. **Is this for accessibility?**
   - Yes → Required if component can't be accessible without it
   - No → Optional

5. **Can this be handled by composition?**
   - Yes → Optional (prefer composition)
   - No → Continue evaluation

6. **Is this content the component displays?**
   - Yes → Required (if no fallback)
   - No → Optional

---

## Composition & Slot Patterns

### Slot Props (Composition)
**Pattern:**
- `children` - Main content slot
- `startSlot` / `endSlot` or `leftSlot` / `rightSlot` - Leading/trailing slots
- `icon` / `iconPosition` - Icon injection
- `as` or `asChild` - Polymorphic rendering

**Rule:** Avoid hardcoded structure. Use slots for flexible composition.

**Example:**
```tsx
// Good: Flexible slots
<Button>
  <Icon /> {/* children */}
  Click me
</Button>

// Good: Named slots
<InputGroup>
  <InputGroupAddon>@</InputGroupAddon> {/* startSlot */}
  <TextInput />
  <InputGroupButton>Submit</InputGroupButton> {/* endSlot */}
</InputGroup>
```

---

## Data Model Planning

**Data Props:**
- `options` - Options list (for Select, Combobox)
- `items` - Items array (for List, Menu, Tabs)
- `data` + `columns` - Structured data (for Table)
- `config` - Configuration object (for Chart)
- `valueKey` / `labelKey` - Identifier keys for data

**Rule:** Data components must accept data, not JSX-only. Prefer data props over render props when possible.

---

## Internal vs Public Props

**Internal Props (Don't Expose):**
- `forceMount` - Internal mounting control
- `trapFocus` - Internal focus management
- `presence` - Internal animation state
- Primitive-specific props (Radix internals)

**Public Props (Expose):**
- Semantic props (variant, tone, size)
- Behavior props (disabled, loading, required)
- Data props (value, options, items)
- Event handlers (onValueChange, onClick)

**Rule:** Don't leak internal primitives into public API. Wrap and abstract them.

---

## Consistency Rules (Most Important)

### 1. One Naming Convention Everywhere
- Use `onValueChange` consistently, not `onChange` or `onSelect`
- Use `onOpenChange` for all open/close states
- Use `onCheckedChange` for all boolean toggles

### 2. No Prop Synonyms
- Don't have both `size` and `scale`
- Don't have both `variant` and `appearance` (unless they mean different things)
- Don't have both `disabled` and `isDisabled`

### 3. No Boolean Style Props
- ❌ `primary={true}`, `danger={true}`
- ✅ `variant="primary"`, `tone="danger"`

### 4. Controlled/Uncontrolled Always Paired
- If you have `value`, also support `defaultValue`
- If you have `checked`, also support `defaultChecked`
- If you have `open`, also support `defaultOpen`

### 5. Never Invent New Prop Patterns Per Component
- Reuse base contracts
- Follow established patterns
- Document deviations clearly

### 6. Size Scale Consistency
- Use same size scale across components: `xs`, `sm`, `md`, `lg`, `xl`
- Or: `sm`, `md`, `lg` (if only 3 sizes)
- Don't mix `small`, `medium`, `large` with `sm`, `md`, `lg`

---

## Summary

**Required Props:**
- Core functionality (component can't work without it)
- Content props (if no fallback exists)
- Accessibility props (if component can't be accessible without it)

**Optional Props:**
- Visual customization (use defaults or className)
- Common use cases (provide defaults)
- Composition props (prefer composition)
- Behavioral props (use boolean defaults)

**Key Principles:**
1. **Minimize required props** - Only require what's absolutely necessary
2. **Maximize flexibility** - Use defaults and presets
3. **Consistency first** - Follow naming conventions and base contracts
4. **Composition over configuration** - Use slots and children
5. **Don't leak internals** - Keep public API clean and semantic

---

## Prop Planning Template

Use this template when planning props for a new component:

### Component: `[ComponentName]`

**Category:** `[Inputs/Actions/Navigation/Data Display/Feedback/Overlays/Layout/Utilities]`

**Base Contracts Applied:**
- [ ] BaseComponentProps (className, style, id, as, ref)
- [ ] BaseInteractiveProps (disabled, loading, active, onClick, etc.)
- [ ] BaseFieldProps (value, defaultValue, onChange, name, etc.)

**Required Props:**
- `[prop]` - [reason why required]

**Optional Props with Defaults:**
- `[prop]` → `[default]` - [common use case]

**Optional Props:**
- `[prop]` - [purpose]

**State Management:**
- Controlled: `[value]` + `[onValueChange]`
- Uncontrolled: `[defaultValue]`

**Visual Variants:**
- `variant` - [options]
- `tone`/`intent` - [options]
- `size` - [options]
- `appearance` - [options]

**Composition:**
- `children` - [purpose]
- `[slot]` - [purpose]

**Accessibility:**
- `aria-label` - [required/optional and when]

**Example Usage:**
```tsx
// Basic usage
<[ComponentName] />

// With common props
<[ComponentName] [prop]="[value]" />

// Controlled
<[ComponentName] [value]={value} [onValueChange]={handleChange} />
```

---

## Quick Reference: Prop Naming Cheat Sheet

| Purpose | Prop Name | Example |
|---------|-----------|---------|
| **Value change** | `onValueChange` | Input, Select, Slider |
| **Open/close** | `onOpenChange` | Modal, Popover, Dropdown |
| **Boolean toggle** | `onCheckedChange` | Checkbox, Switch |
| **Pressed state** | `onPressedChange` | ToggleButton |
| **Active selection** | `onActiveChange` | Tabs, RadioGroup |
| **Controlled value** | `value` | Input, Select |
| **Uncontrolled default** | `defaultValue` | Input, Select |
| **Controlled boolean** | `checked` | Checkbox, Switch |
| **Uncontrolled boolean** | `defaultChecked` | Checkbox, Switch |
| **Controlled open** | `open` | Modal, Popover |
| **Uncontrolled open** | `defaultOpen` | Modal, Popover |
| **Visual style** | `variant` | primary, outline, ghost |
| **Semantic meaning** | `tone` or `intent` | success, danger, warning |
| **Size scaling** | `size` | xs, sm, md, lg, xl |
| **Visual treatment** | `appearance` | solid, subtle, outline |
| **Shape/radius** | `shape` or `radius` | square, rounded, circle |
| **Layout direction** | `orientation` | horizontal, vertical |

---

## Decision Tree: Is This Prop Required?

```
Start: New prop idea
│
├─ Can component function without it?
│  ├─ No → Required ✅
│  └─ Yes → Continue
│
├─ Is it core functionality?
│  ├─ Yes → Required ✅
│  └─ No → Continue
│
├─ Do 80% of users need the same value?
│  ├─ Yes → Optional with default
│  └─ No → Continue
│
├─ Is it for visual customization?
│  ├─ Yes → Optional (use className/variants)
│  └─ No → Continue
│
├─ Is it for accessibility?
│  ├─ Yes → Required if component can't be accessible without it
│  └─ No → Optional
│
├─ Can it be handled by composition?
│  ├─ Yes → Optional (prefer composition)
│  └─ No → Continue
│
└─ Is it content the component displays?
   ├─ Yes → Required (if no fallback)
   └─ No → Optional
```
