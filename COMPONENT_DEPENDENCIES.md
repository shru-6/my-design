# Component External Dependencies

This document lists all external dependencies (beyond React, Radix UI, and standard libraries) used by components.

## Summary

Most components are **self-contained** with only peer dependencies. Some components require additional libraries for specific functionality.

## Components with External Dependencies

### Atoms

**InputOTP** (`atoms/InputOTP.tsx`)
- `input-otp` - OTP input functionality
- **Required**: Yes, for OTP input feature

### Molecules

**Carousel** (`molecules/Carousel.tsx`)
- `embla-carousel-react` - Carousel/slider functionality
- **Required**: Yes, for carousel feature

**Command** (`molecules/Command.tsx`)
- `cmdk` - Command palette functionality
- **Required**: Yes, for command menu feature

**Calendar** (`molecules/Calendar.tsx`)
- `react-day-picker` - Date picker functionality
- **Required**: Yes, for calendar/date picker feature

**Form** (`molecules/Form.tsx`)
- `react-hook-form` - Form state management
- **Required**: Yes, for form handling

**Drawer** (`molecules/Drawer.tsx`)
- `vaul` - Drawer component primitive
- **Required**: Yes, for drawer functionality

**Chart** (`molecules/Chart.tsx`)
- `recharts` - Chart/visualization library
- **Required**: Yes, for chart components

**Toaster** (`molecules/Toaster.tsx`)
- `sonner` - Toast notification library
- **Required**: Yes, for toast notifications

### Layout

**Resizable** (`layout/Resizable.tsx`)
- `react-resizable-panels` - Resizable panel functionality
- **Required**: Yes, for resizable panels

## Components Without External Dependencies

All other components (60+ components) only require:
- **React** (>=18)
- **Radix UI primitives** (varies by component - see list below)
- **class-variance-authority** (CVA)
- **clsx** + **tailwind-merge** (for `cn` utility)
- **lucide-react** (for icons)

## Radix UI Primitives Used

Components use the following Radix UI packages (install as needed based on which components you use):

```bash
# Radix UI primitives (install based on components you use)
npm install @radix-ui/react-accordion          # Accordion
npm install @radix-ui/react-alert-dialog      # AlertDialog
npm install @radix-ui/react-aspect-ratio      # AspectRatio
npm install @radix-ui/react-avatar            # Avatar
npm install @radix-ui/react-checkbox          # Checkbox
npm install @radix-ui/react-collapsible       # Collapsible
npm install @radix-ui/react-context-menu      # ContextMenu
npm install @radix-ui/react-dialog            # Modal, Sheet
npm install @radix-ui/react-dropdown-menu     # DropdownMenu
npm install @radix-ui/react-hover-card        # HoverCard
npm install @radix-ui/react-label             # Label, Form
npm install @radix-ui/react-menubar           # Menubar
npm install @radix-ui/react-navigation-menu   # NavigationMenu
npm install @radix-ui/react-popover           # Popover
npm install @radix-ui/react-progress           # Progress
npm install @radix-ui/react-radio-group        # Radio
npm install @radix-ui/react-scroll-area       # ScrollArea
npm install @radix-ui/react-select            # Select
npm install @radix-ui/react-separator         # Separator
npm install @radix-ui/react-slider            # Slider
npm install @radix-ui/react-slot              # Button, Badge, Breadcrumb, Form
npm install @radix-ui/react-switch            # Switch
npm install @radix-ui/react-tabs              # Tabs
npm install @radix-ui/react-toggle            # Toggle
npm install @radix-ui/react-toggle-group     # ToggleGroup
npm install @radix-ui/react-tooltip           # Tooltip
```

## Dependency Installation

When using components as a library, install required dependencies:

```bash
# Core dependencies (required for all components)
npm install react react-dom
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# Radix UI primitives (install based on components you use - see list above)

# Optional - only if using specific components
npm install input-otp                    # For InputOTP
npm install embla-carousel-react         # For Carousel
npm install cmdk                         # For Command
npm install react-day-picker             # For Calendar
npm install react-hook-form              # For Form
npm install vaul                         # For Drawer
npm install recharts                     # For Chart
npm install sonner                       # For Toaster
npm install react-resizable-panels       # For Resizable
```

## Library Compatibility

✅ **60+ components** are library-compatible with only peer dependencies
⚠️ **9 components** require additional external libraries for their specific features

These external dependencies are **intentional** - they provide specialized functionality (carousels, charts, forms, etc.) that would be impractical to reimplement.

## Recommendation

When copying components to use as a library:
1. **Copy only what you need** - Don't copy components with dependencies you don't need
2. **Install dependencies** - Install the required libraries for components you use
3. **Document dependencies** - Note which components require which dependencies in your project

