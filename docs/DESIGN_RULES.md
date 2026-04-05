Design System Rules & Component Reference
Core Principles

Minimal, expressive props – Expose only what’s necessary. Avoid any or passthroughs unless required.

better consistent beautiful ui for each.

Variants define appearance – Explicitly outline allowed variants and map to semantic Tailwind tokens. keep consistancy beteween all componenets for variant name, prop name, sizes, etc.

Layout and spacing external – Atoms provide size variants (sm, md, lg) only; spacing/layout should use primitives like Stack or Box.

Loading & skeleton states – Support isLoading / isSkeleton inline; no extra wrapper elements.

Polymorphic components + ref forwarding – Use generics/ref forwarding (as prop) where needed. Keep APIs strictly typed.

Semantic Tailwind only – Use tokens (bg-primary, text-muted-foreground, border-border, shadow-*). Avoid raw colors or custom utilities for theme toggle.

CVAs + cn – Use class-variance-authority or clear switch statements for variant logic; merge classes via cn.

Composition over complexity – Keep atoms simple; build molecules/organisms via composition.

Flat DOM & performance – Avoid unnecessary wrappers, fragments, or empty elements. Render children only if needed.

Document allowed CSS & tokens – Include props, variants, and semantic classes per atom for future consistency and theme toggle. all bases of tailwind css for a com poenent should be convered.

Iterate in pairs – Update, document, and approve two-three atoms at a time for maintainable progress.

add /remove/move compoenents to categaries better, after reaserching, if it seems appropriate,

check if each prop handles its functioLITY.

- make sure compoenents with fucnitonal handlings and impleemntationa are correct. like fields handling in modal related compoenents, or search handling, etc. decide on what all are its funtionalities and handle for are cases.

Shortcut for Cursor:
"Always generate components that render the minimum HTML required, keep DOM flat, inline placeholders for loading states, and use semantic Tailwind tokens."

## Component Update Checklist

When updating each component, verify:

### ✅ Core Requirements
- [ ] **Minimal props** - Only expose necessary props, avoid `any` or unnecessary passthroughs
- [ ] **Ref forwarding** - Use `React.forwardRef` for all interactive elements
- [ ] **Polymorphic support** - If component has `as` prop, properly type with union types
- [ ] **isSkeleton/isLoading** - Support inline skeleton/loading states (no wrapper elements)
- [ ] **Semantic tokens only** - Use `bg-primary`, `text-muted-foreground`, `border-border`, `shadow-*` (NO raw colors like `green-500`, NO `dark:` prefixes)
- [ ] **CVA or clear logic** - Use `class-variance-authority` for variants, or clear switch statements
- [ ] **Flat DOM** - No unnecessary wrappers, fragments, or empty elements
- [ ] **Consistent naming** - Variant names, prop names, sizes match across components

### ✅ Variant & Size Consistency
- [ ] **Variants** - Explicitly defined, mapped to semantic Tailwind tokens
- [ ] **Sizes** - Use `sm`, `md`, `lg` consistently (atoms only; layout uses Stack/Box)
- [ ] **Default variants** - Set appropriate defaults in CVA

### ✅ Type Safety
- [ ] **Strict typing** - No `any` types, proper TypeScript interfaces
- [ ] **Export types** - Export variant/size types for reuse
- [ ] **Export variants** - Export CVA variants if used by other components

### ✅ Styling & Design
- [ ] **Beautiful UI** - Consistent spacing, shadows, borders, transitions
- [ ] **Hover states** - Proper hover effects with semantic tokens
- [ ] **Focus states** - Accessible focus rings using `focus-visible:ring-ring`
- [ ] **Border tokens** - Use `border-border` consistently
- [ ] **Background tokens** - Use `bg-surface`, `bg-popover`, `bg-background` appropriately

### ✅ Functionality
- [ ] **Children rendering** - Only render children when needed
- [ ] **Event handlers** - Properly typed and handled
- [ ] **Disabled states** - Proper disabled styling and behavior
- [ ] **Error states** - Support `aria-invalid` with destructive styling

### ✅ Documentation
- [ ] **Props match DESIGN_RULES** - Component props align with spec
- [ ] **data-slot attributes** - All elements have proper `data-slot` for styling
- [ ] **displayName** - Set for all components

Atoms

Box: as, className, children, ...props, isSkeleton (polymorphic T, ref forwarding, themeable)
Text: as, variant, size, leftIcon, rightIcon, iconSize, isSkeleton, className, children
Heading: as, variant, size, className, children
Button: variant, size, leftIcon, rightIcon, iconSize, isLoading, isSkeleton, disabled, onClick, className, children
IconButton: variant, size, icon, iconSize, isLoading, disabled, onClick, className
Badge: variant, isSkeleton, onClick, className, children
Spinner: size, className
Skeleton: className, children
SkeletonText: lines, className
SkeletonGrid: rows, cols, gap, className
TextInput: type, value, onChange, placeholder, disabled, required, isLoading, className, showIcon, icon, iconPosition
Textarea: value, onChange, placeholder, rows, disabled, required, isLoading, className
Checkbox: checked, onCheckedChange, disabled, className
Radio: value, onValueChange, disabled, className
Switch: checked, onCheckedChange, disabled, className
Slider: value, onValueChange, min, max, step, disabled, className
InputOTP: maxLength, value, onChange, className
Toggle: variant, size, pressed, onPressedChange, disabled, className, children
Upload: accept, multiple, onChange, disabled, isLoading, className
Avatar: src, alt, fallback, isSkeleton, className, children
Image: src, alt, width, height, loading, fallback, isSkeleton, className
Alert: variant, className, children
Empty: className, children
ErrorBoundary: children, fallback
Separator: orientation, className
Kbd: className, children
Label: htmlFor, className, children
HelperText: variant, className, children

Molecules

Accordion: type, value, onValueChange, collapsible, isSkeleton, className, children
AlertDialog: open, onOpenChange, isLoading, isSkeleton, className, children
Breadcrumb: className, children
Calendar: mode, selected, onSelect, defaultMonth, disabled, isSkeleton, className
Carousel: opts, orientation, plugins, setApi, isSkeleton, className, children
Chart: config, isSkeleton, className, children
CheckboxItem: label, description, checked, onChange, disabled, className ()
Collapsible: open, onOpenChange, defaultOpen, disabled, isSkeleton, className, children
Command: className, isSkeleton, children
ConfirmModal: open, onOpenChange, triggerLabel, triggerProps, stopPropagation, icon, title, description, message, onConfirm, confirmLabel, cancelLabel, variant, isLoading, error, showModal, className, children
ContextMenu: className, isSkeleton, children
CopyButton: text, getText, size, variant, stopPropagation, onCopy, isLoading, className
Drawer: open, onOpenChange, direction, isSkeleton, className, children
DropdownMenu: open, onOpenChange, isSkeleton, className, children
Field: className, isSkeleton, children
Form: className, children
FormInput: type, label, description, error, variant, id, value, onChange, onValueChange, placeholder, required, options, isSkeleton, className
FormModal: open, onOpenChange, triggerLabel, triggerProps, icon, title, description, message, variant, itemType, onSubmit, submitLabel, submittingLabel, cancelLabel, isLoading, isSubmitDisabled, onCreated, fields, children, beforeFields, afterFields, className
HistoryControlButtons: canUndo, canRedo, isDirty, onUndo, onRedo, onReset, showLabels, isSkeleton, className
HoverCard: open, onOpenChange, openDelay, closeDelay, isSkeleton, className, children
InfoBanner: message, variant, tooltip, isSkeleton, className, children
InlineEdit: value, onSave, placeholder, isLoading, className
InputGroup: className, isSkeleton, children
Menubar: className, isSkeleton, children
Modal: open, onOpenChange, showCloseButton, variant, size, header, footer, isSkeleton, className, onClick, children
NavigationMenu: className, isSkeleton, children
Pagination: className, isSkeleton, children
Popover: open, onOpenChange, isSkeleton, className, children
SearchInput: value, onChange, onSearch, debounceMs, placeholder, clearable, isLoading, className
Select: value, onValueChange, disabled, size, isSkeleton, className, children
Sheet: open, onOpenChange, isSkeleton, className, children
Snackbar: message, variant, duration, onClose, action, isSkeleton, className
StatusText: text, status, count, label, variant, as, isSkeleton, className
Stepper: steps, currentStep, onStepClick, isSkeleton, className
Tabs: value, onValueChange, defaultValue, orientation, isSkeleton, className, children
Toast: title, description, variant, duration, action, onDismiss, isSkeleton, className
Toaster: isSkeleton, className
ToggleGroup: type, value, onValueChange, disabled, isSkeleton, className, children
Tooltip: open, onOpenChange, delayDuration, isSkeleton, className, children
TriggerModal: open, onOpenChange, triggerLabel, trigger, triggerProps, stopPropagation, icon, title, description, message, footer, showCloseButton, isLoading, isSkeleton, className, children

Layout

AspectRatio: ratio, isSkeleton, className, children
Box: as, isSkeleton, className, children
Card: variant, size, header, footer, maxHeight, maxWidth, contentHeight, interactive, onClick, isSkeleton, className, children
CollapsiblePanel: direction, position, defaultOpen, open, onOpenChange, minWidth, minHeight, keyword, onToggle, isSkeleton, className, triggerClassName, children
Container: maxWidth, isSkeleton, className, children
EmptyScreen: title, description, icon, variant, size, action, isSkeleton, className
Footer: isSkeleton, className, children
Grid: cols, gap, isSkeleton, className, children
Header: variant, sticky, heading, caption, description, badge, actions, left, right, isSkeleton, className, children
List: items, renderItem, variant, view, searchable, searchPlaceholder, onSearch, loading, emptyMessage, error, header, footer, isSkeleton, className
Resizable: isSkeleton, className, children
ResizeContainer: maxWidth, maxHeight, containerClassName, contentClassName, padding, minScale, maxScale, fit, showControls, isSkeleton, children
ScrollArea: orientation, isSkeleton, className, children
Sidebar: isSkeleton, className, children
Stack: direction, gap, align, justify, wrap, isSkeleton, className, children
Table: isSkeleton, className, children

ThemeToggle

ThemeToggle: position, className


----
Sub-components

Atoms using sub-components

TextInput – can render an icon (leftIcon / rightIcon)

Textarea – none

Button – can include leftIcon / rightIcon

IconButton – icon inside button

Checkbox / Radio / Switch – often wrapped with Label + HelperText

InputOTP – multiple input boxes internally

Toggle – toggle button + optional label

Upload – optional progress/status display inside

Molecules that use smaller atoms/components

Accordion – uses Box, Stack, Button (header + panel content)

AlertDialog – uses Modal, Button, Text

Calendar – uses Button, Text, Stack internally

Carousel – uses Stack, Box, ScrollArea, Button internally

Chart – may render Tooltip, Legend atoms

CheckboxItem – Checkbox, Text, optional HelperText

Collapsible – Box, Button, Stack

ConfirmModal – Modal, Button, Text, optional Icon

CopyButton – Button, optional Tooltip

Drawer – Box, ScrollArea, Button

DropdownMenu – Popover, Button, List / MenuItem

Field / FormInput – uses Label, HelperText, TextInput, Textarea, Select

FormModal – Modal, FormInput, Button, Text

HoverCard – Popover, Box, Text

InfoBanner – Box, Text, optional Icon / Button

InlineEdit – TextInput, Button

InputGroup – Box, multiple Input or TextInput atoms

Menubar / NavigationMenu – Button, Popover, MenuItem

Modal – Box, Button, Text

Pagination – Button, optional Text / Icon

Popover – Box, Trigger, Content

SearchInput – TextInput, optional Button / Icon

Select – TextInput, List, optional Icon

Sheet – Box, ScrollArea, Button

Snackbar – Box, Text, optional Button / Icon

Stepper – Button, Text, optional Icon

Tabs – Button, Box, Text

Toast / Toaster – Box, Text, Button, optional Icon

ToggleGroup – multiple Toggle atoms inside

Tooltip – Popover, Box, Text

TriggerModal – Modal, Button, optional Icon

Layout components using smaller atoms/layout primitives

AspectRatio – wraps Box or content directly

Box – may wrap Text, Icon, or other content

Card – uses CardHeader, CardContent, CardFooter, CardTitle, CardDescription

CollapsiblePanel – uses Box, Button / Trigger

Container – uses Box internally

EmptyScreen – Text, Icon, optional Button (action)

Footer / Header – Box, Stack, optional Text, Badge, Button

Grid – Box or Stack per item

List – Box, Text, optional Icon, can use renderItem

Resizable / ResizeContainer – Box, ScrollArea

ScrollArea – Box, ScrollBar

Sidebar – SidebarProvider, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarTrigger

Stack – wraps children, may include Box or Text

Table – TableRow, TableCell, TableHeader, TableBody, TableFooter

ThemeToggle

Uses Button / Icon internally