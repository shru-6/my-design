/**
 * Utility functions for component showcases and categories
 */

import { getShowcaseComponentNames } from "./componentConfig"

/**
 * Component category mapping
 * Maps component names to their categories based on component type and purpose
 * 
 * Categories are organized by functional purpose for better discoverability:
 * - Inputs & Forms: All form-related components
 * - Actions & Buttons: Interactive action components
 * - Navigation: Navigation and routing components
 * - Overlays & Dialogs: Modal, popover, and overlay components
 * - Feedback & Notifications: User feedback and notification components
 * - Data Display: Components for displaying data and content
 * - Layout & Structure: Layout and structural components
 * - Menus: Menu and command components
 * - Date & Time: Calendar and date-related components
 * - Typography: Text and typography components
 * - Media: Image and media components
 * - Primitives: Low-level primitive components
 * - Utilities: Utility and helper components
 * - Development: Development and showcase components
 */
const componentCategoryMap: Record<string, string> = {
  // Inputs & Forms
  TextInput: "Inputs & Forms",
  Textarea: "Inputs & Forms",
  Label: "Inputs & Forms",
  Checkbox: "Inputs & Forms",
  Switch: "Inputs & Forms",
  Radio: "Inputs & Forms",
  Slider: "Inputs & Forms",
  InputOTP: "Inputs & Forms",
  Upload: "Inputs & Forms",
  Select: "Inputs & Forms",
  Form: "Inputs & Forms",
  Field: "Inputs & Forms",
  FormInput: "Inputs & Forms",
  InlineEdit: "Inputs & Forms",
  InputGroup: "Inputs & Forms",
  
  // Actions & Buttons
  Button: "Actions & Buttons",
  Toggle: "Actions & Buttons",
  ToggleGroup: "Actions & Buttons",
  CopyButton: "Actions & Buttons",
  
  // Navigation
  Tabs: "Navigation",
  Breadcrumb: "Navigation",
  Pagination: "Navigation",
  NavigationMenu: "Navigation",
  HistoryControlButtons: "Navigation",
  Stepper: "Navigation",
  
  // Overlays & Dialogs
  Modal: "Overlays & Dialogs",
  Popover: "Overlays & Dialogs",
  Sheet: "Overlays & Dialogs",
  Tooltip: "Overlays & Dialogs",
  AlertDialog: "Overlays & Dialogs",
  Drawer: "Overlays & Dialogs",
  HoverCard: "Overlays & Dialogs",
  ConfirmModal: "Overlays & Dialogs",
  TriggerModal: "Overlays & Dialogs",
  FormModal: "Overlays & Dialogs",
  
  // Feedback & Notifications
  Alert: "Feedback & Notifications",
  Toast: "Feedback & Notifications",
  Snackbar: "Feedback & Notifications",
  InfoBanner: "Feedback & Notifications",
  StatusText: "Feedback & Notifications",
  Toaster: "Feedback & Notifications",
  
  // Data Display
  Badge: "Data Display",
  Separator: "Data Display",
  Skeleton: "Data Display",
  Progress: "Data Display",
  Spinner: "Data Display",
  Avatar: "Data Display",
  Empty: "Data Display",
  Kbd: "Data Display",
  Accordion: "Data Display",
  Collapsible: "Data Display",
  Carousel: "Data Display",
  Chart: "Data Display",
  Table: "Data Display",
  
  // Layout & Structure
  Card: "Layout & Structure",
  ScrollArea: "Layout & Structure",
  AspectRatio: "Layout & Structure",
  Resizable: "Layout & Structure",
  Sidebar: "Layout & Structure",
  Container: "Layout & Structure",
  Stack: "Layout & Structure",
  Grid: "Layout & Structure",
  Box: "Layout & Structure",
  List: "Layout & Structure",
  Header: "Layout & Structure",
  Footer: "Layout & Structure",
  CollapsiblePanel: "Layout & Structure",
  ResizeContainer: "Layout & Structure",
  EmptyScreen: "Layout & Structure",
  
  // Menus
  DropdownMenu: "Menus",
  ContextMenu: "Menus",
  Menubar: "Menus",
  Command: "Menus",
  
  // Date & Time
  Calendar: "Date & Time",
  
  // Typography
  Text: "Typography",
  
  // Media
  Image: "Media",
  
  // Primitives
  PrimitiveBox: "Primitives",
  PrimitiveFlex: "Primitives",
  PrimitiveStack: "Primitives",
  PrimitiveText: "Primitives",
  Icon: "Primitives",
  VisuallyHidden: "Primitives",
  
  // Utilities
  ErrorBoundary: "Utilities",
}

/**
 * Get category for a component
 */
export function getComponentCategory(componentName: string): string {
  return componentCategoryMap[componentName] || "Other"
}

/**
 * Get all categories
 */
export function getCategories(): string[] {
  const categories = new Set<string>()
  const componentNames = getShowcaseComponentNames()
  
  componentNames.forEach(name => {
    const category = getComponentCategory(name)
    if (category) {
      categories.add(category)
    }
  })
  
  return Array.from(categories).sort()
}

/**
 * Get all components in a category
 */
export function getComponentsByCategory(category: string) {
  const componentNames = getShowcaseComponentNames()
  
  return componentNames
    .filter(name => getComponentCategory(name) === category)
    .map(name => ({
      name,
      category: getComponentCategory(name),
      file: getComponentFile(name),
      description: getComponentDescription(name),
    }))
}

/**
 * Get all components
 */
export function getAllComponents() {
  const componentNames = getShowcaseComponentNames()
  
  return componentNames.map(name => ({
    name,
    category: getComponentCategory(name),
    file: getComponentFile(name),
    description: getComponentDescription(name),
  }))
}

/**
 * Get component file path based on category
 */
function getComponentFile(componentName: string): string {
  const category = getComponentCategory(componentName)
  
  if (componentName.startsWith("Primitive")) {
    return `./primitives/${componentName.replace("Primitive", "")}.tsx`
  }
  
  if (category === "Layout & Structure") {
    return `./layout/${componentName}.tsx`
  }
  
  if (["Inputs & Forms", "Actions & Buttons", "Navigation", "Overlays & Dialogs", "Feedback & Notifications", "Data Display", "Menus", "Date & Time", "Typography", "Media", "Utilities"].includes(category)) {
    // Check if it's an atom or molecule based on common patterns
    const atomComponents = ["Button", "TextInput", "Textarea", "Label", "Checkbox", "Switch", "Radio", "Badge", "Alert", "Separator", "Skeleton", "Progress", "Spinner", "Avatar", "Empty", "Slider", "Toggle", "InputOTP", "Kbd", "Text", "Image", "Upload", "ErrorBoundary", "StatusText", "CopyButton"]
    
    if (atomComponents.includes(componentName)) {
      return `./atoms/${componentName}.tsx`
    } else {
      return `./molecules/${componentName}.tsx`
    }
  }
  
  return `./${componentName}.tsx`
}

/**
 * Get component description
 */
function getComponentDescription(componentName: string): string {
  const descriptions: Record<string, string> = {
    Button: "A versatile button component with multiple variants and sizes",
    TextInput: "Text input component with focus states and validation",
    Card: "Card container component with header, content, and footer sections",
    Badge: "Badge component for labels, tags, and status indicators",
    Label: "Accessible label component for form inputs",
    Textarea: "Multi-line text input component",
    Select: "Dropdown selection component with Radix UI primitives",
    Checkbox: "Checkbox input component with Radix UI",
    Switch: "Toggle switch component with Radix UI",
    Radio: "Radio button group component with Radix UI",
    Alert: "Alert component for status messages and notifications",
    Separator: "Visual divider component with horizontal and vertical orientations",
    Skeleton: "Loading state placeholder component",
    Progress: "Progress bar component showing completion status",
    Spinner: "Loading spinner component",
    Tabs: "Tab navigation component with Radix UI",
    Breadcrumb: "Breadcrumb navigation component",
    Pagination: "Page navigation component",
    Modal: "Modal dialog component with Radix UI",
    Popover: "Popover overlay component with Radix UI",
    Sheet: "Side sheet component with Radix UI Dialog",
    Tooltip: "Tooltip component with Radix UI",
    Avatar: "Avatar component with image and fallback support",
    Table: "Table component for displaying structured data",
    Accordion: "Collapsible accordion component with Radix UI",
    Collapsible: "Collapsible component for showing/hiding content",
    Empty: "Empty state component for when there is no data to display",
    Command: "Command palette component for searchable commands",
    Calendar: "Calendar component for date selection",
    Slider: "Range slider component for selecting values",
    Toggle: "Toggle button component with pressed state",
    DropdownMenu: "Dropdown menu component with submenus and checkboxes",
    ContextMenu: "Context menu component for right-click menus",
    Menubar: "Menubar component for application menus",
    NavigationMenu: "Navigation menu component with viewport and indicators",
    Form: "Form component with react-hook-form integration",
    HoverCard: "Hover card component that appears on hover",
    ScrollArea: "Custom scrollable area component",
    AspectRatio: "Component for maintaining aspect ratio",
    AlertDialog: "Alert dialog component for confirmations and important messages",
    Drawer: "Drawer component for mobile-friendly side panels",
    Carousel: "Carousel component for image/content slideshows",
    Resizable: "Resizable panel component for adjustable layouts",
    InputGroup: "Input group component for combining inputs with addons and buttons",
    InputOTP: "One-time password input component",
    Kbd: "Keyboard key indicator component",
    ToggleGroup: "Toggle group component for multiple toggle buttons",
    Toaster: "Toast notification component using Sonner",
    Field: "Field component for form layouts with labels and descriptions",
    Chart: "Chart component using Recharts with theme support",
    Sidebar: "Sidebar component with collapsible functionality and mobile support",
    Text: "Typography component with variants",
    Image: "Next.js Image component with fallback",
    Upload: "File upload component with drag & drop",
    ErrorBoundary: "React error boundary component",
    FormInput: "Input component with label and error handling",
    InlineEdit: "Inline text editing component",
    ConfirmModal: "Confirmation dialog wrapper",
    TriggerModal: "Modal with trigger pattern",
    FormModal: "Modal with form inside",
    Toast: "Individual toast component",
    Snackbar: "Material UI snackbar component",
    InfoBanner: "Info banner with icon",
    StatusText: "Text with status icon",
    CopyButton: "Copy to clipboard button",
    HistoryControlButtons: "Back/Forward navigation buttons",
    Stepper: "Step indicator component",
    Container: "Max-width container component",
    Stack: "Flexbox stacking component",
    Grid: "CSS Grid layout component",
    Box: "Generic container component",
    List: "List container component",
    Header: "Page header component",
    Footer: "Page footer component",
    CollapsiblePanel: "Collapsible panel component",
    ResizeContainer: "Resize container component",
    EmptyScreen: "Empty screen layout component",
    PrimitiveBox: "Primitive box component",
    PrimitiveFlex: "Primitive flex component",
    PrimitiveStack: "Primitive stack component",
    PrimitiveText: "Primitive text component",
    Icon: "Icon component wrapper",
    VisuallyHidden: "Visually hidden component for screen readers",
  }
  
  return descriptions[componentName] || `${componentName} component`
}

/**
 * Extract variant keys from a CVA variants object
 * @param variants - The variants object from CVA config
 * @returns Array of variant keys
 */
export function getVariantKeys<T extends Record<string, Record<string, any>>>(
  variants: T | undefined
): Array<keyof T> {
  if (!variants) return []
  return Object.keys(variants) as Array<keyof T>
}

/**
 * Extract keys from a specific variant type (e.g., 'variant' or 'size')
 * @param variantType - The variant type object (e.g., { default: "...", sm: "..." })
 * @returns Array of variant keys
 */
export function getVariantTypeKeys<T extends Record<string, any>>(
  variantType: T | undefined
): Array<keyof T> {
  if (!variantType) return []
  return Object.keys(variantType) as Array<keyof T>
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
