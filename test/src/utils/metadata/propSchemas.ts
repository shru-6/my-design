import type { ComponentMetadata, PropDefinition } from "../componentMetadata"
import { extendedPropSchemas } from "./extendedPropSchemas"
import { galleryPreviewProps } from "./galleryPreviewProps"

const MENU_ITEMS = [
  { label: "Option A", onClick: () => {} },
  { label: "Option B", onClick: () => {} },
]

const STEPS = [
  { label: "Step 1", description: "First step" },
  { label: "Step 2", description: "Second step" },
  { label: "Step 3", description: "Third step" },
]

function own(...props: PropDefinition[]): PropDefinition[] {
  return props.map((p) => ({ scope: "own" as const, ...p }))
}

function slot(target: string, ...props: PropDefinition[]): PropDefinition[] {
  return props.map((p) => ({ scope: "slot" as const, slotTarget: target, ...p }))
}

/** Gallery prop schemas — own vs slot (passthrough to sub-components). Overrides stub entries in componentMetadata. */
export const enrichedPropSchemas: Record<string, PropDefinition[]> = {
  PhoneInput: own(
    {
      name: "value",
      type: "object",
      defaultValue: { countryCode: "US", number: "" },
    },
    { name: "label", type: "string", defaultValue: "Phone" },
    { name: "defaultCountry", type: "string", defaultValue: "US" },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Dropdown: [
    ...own(
      { name: "items", type: "array", defaultValue: MENU_ITEMS },
      { name: "open", type: "boolean", defaultValue: false },
      { name: "defaultOpen", type: "boolean", defaultValue: false },
      { name: "align", type: "select", options: ["start", "center", "end"], defaultValue: "start" },
      { name: "className", type: "string" }
    ),
    ...slot("Button", { name: "label", type: "reactNode", defaultValue: "Menu", description: "triggerProps.label" }),
    ...slot(
      "Button",
      { name: "variant", type: "variant", options: ["primary", "outline", "ghost"], defaultValue: "outline", description: "triggerProps.variant" }
    ),
  ],

  Select: own(
    {
      name: "items",
      type: "array",
      defaultValue: [
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
      ],
    },
    { name: "value", type: "string", defaultValue: "a" },
    { name: "defaultValue", type: "string", defaultValue: "a" },
    { name: "onValueChange", type: "callback", description: "(value: string) => void" },
    { name: "placeholder", type: "string", defaultValue: "Select…" },
    { name: "label", type: "string", defaultValue: "Choose" },
    { name: "left", type: "reactNode" },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "variant", type: "variant", options: ["outline", "filled", "ghost", "underline"], defaultValue: "outline" },
    { name: "contentClassName", type: "string" },
    { name: "className", type: "string" }
  ),

  InputGroup: own(
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "attached", type: "boolean", defaultValue: true },
    { name: "placeholder", type: "string", defaultValue: "Search…" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Command: own(
    { name: "items", type: "array", defaultValue: [{ label: "Search files", value: "search" }] },
    { name: "placeholder", type: "string", defaultValue: "Type a command…" },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  RadioGroup: own(
    {
      name: "items",
      type: "array",
      defaultValue: [
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
      ],
    },
    { name: "defaultValue", type: "string", defaultValue: "a" },
    { name: "name", type: "string", defaultValue: "preview-radio" },
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "vertical" },
    { name: "className", type: "string" }
  ),

  Toggle: own(
    { name: "checked", type: "boolean", defaultValue: false },
    { name: "label", type: "string", defaultValue: "Enable feature" },
    { name: "description", type: "string" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  Calendar: own(
    { name: "defaultValue", type: "string" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  DatePicker: own(
    { name: "label", type: "string", defaultValue: "Date" },
    { name: "placeholder", type: "string", defaultValue: "Pick a date" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  TimePicker: own(
    { name: "label", type: "string", defaultValue: "Time" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  DateRangePicker: own(
    { name: "label", type: "string", defaultValue: "Date range" },
    { name: "minDate", type: "string", description: "ISO date string" },
    { name: "maxDate", type: "string", description: "ISO date string" },
    { name: "minRangeDays", type: "number", description: "Minimum inclusive span" },
    { name: "maxRangeDays", type: "number", description: "Maximum inclusive span" },
    { name: "showApplyButton", type: "boolean", defaultValue: false },
    { name: "applyLabel", type: "string", defaultValue: "Apply" },
    { name: "cancelLabel", type: "string", defaultValue: "Cancel" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Upload: own(
    { name: "onUpload", type: "callback", description: "(files: File[]) => void | Promise<void>" },
    { name: "onRemove", type: "callback" },
    { name: "value", type: "array" },
    { name: "defaultValue", type: "array" },
    { name: "onChange", type: "callback" },
    { name: "label", type: "string", defaultValue: "Upload file" },
    { name: "accept", type: "string" },
    { name: "multiple", type: "boolean", defaultValue: false },
    { name: "maxFiles", type: "number" },
    { name: "maxSize", type: "number" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "dragAndDrop", type: "boolean", defaultValue: false },
    { name: "preview", type: "boolean", defaultValue: false },
    { name: "errorMessage", type: "string" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "variant", type: "variant", options: ["outline", "filled", "ghost", "underline"], defaultValue: "outline" },
    { name: "className", type: "string" }
  ),

  FormField: own(
    { name: "name", type: "string", defaultValue: "email" },
    { name: "label", type: "string", defaultValue: "Email" },
    {
      name: "type",
      type: "select",
      options: ["text", "email", "password", "number", "url", "search", "textarea", "select", "checkbox", "upload"],
      defaultValue: "email",
    },
    { name: "placeholder", type: "string", defaultValue: "you@example.com" },
    { name: "required", type: "boolean", defaultValue: true },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "value", type: "string" },
    { name: "defaultValue", type: "string" },
    { name: "touched", type: "boolean", defaultValue: false },
    { name: "showError", type: "boolean", defaultValue: true },
    { name: "validate", type: "boolean", defaultValue: true },
    { name: "errorMessage", type: "string" },
    { name: "items", type: "array", description: "SelectOption[] when type=select" },
    { name: "onValueChange", type: "callback", description: "(value: string) => void" },
    { name: "rows", type: "number", description: "Textarea rows" },
    { name: "accept", type: "string", description: "Upload accept filter when type=upload" },
    { name: "dragAndDrop", type: "boolean", description: "Upload drag-and-drop when type=upload" },
    { name: "multiple", type: "boolean", description: "Upload multiple files when type=upload" },
    { name: "maxSize", type: "number", description: "Upload max file size (bytes)" },
    { name: "maxFiles", type: "number", description: "Upload max file count" },
    { name: "loading", type: "boolean", description: "Upload loading state" },
    { name: "onUpload", type: "callback", description: "(files: File[]) => void | Promise<void>" },
    { name: "render", type: "callback", description: "(field) => ReactNode" },
    { name: "inputProps", type: "object" },
    { name: "labelProps", type: "object" },
    { name: "helperTextProps", type: "object" },
    { name: "className", type: "string" }
  ),

  Form: own(
    { name: "initialValues", type: "object", defaultValue: { email: "" } },
    { name: "validateOn", type: "select", options: ["submit", "change", "blur"], defaultValue: "submit" },
    { name: "resetSubmittedAfterMs", type: "number" },
    { name: "submitLabel", type: "string", defaultValue: "Submit" },
    { name: "layout", type: "select", options: ["vertical", "horizontal", "grid"], defaultValue: "vertical" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  SplitButton: own(
    { name: "children", type: "reactNode", defaultValue: "Save" },
    { name: "menuItems", type: "array", defaultValue: MENU_ITEMS },
    { name: "variant", type: "variant", options: ["primary", "outline", "ghost"], defaultValue: "primary" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Sidebar: own(
    {
      name: "items",
      type: "array",
      defaultValue: [
        { label: "Home", value: "home" },
        { label: "Settings", value: "settings" },
      ],
    },
    { name: "defaultValue", type: "string", defaultValue: "home" },
    { name: "collapsible", type: "boolean", defaultValue: false },
    { name: "container", type: "select", options: ["parent", "screen"], defaultValue: "parent", galleryOnly: true },
    { name: "heightMode", type: "select", options: ["viewport", "parent", "content"], defaultValue: "parent" },
    { name: "className", type: "string" }
  ),

  Navbar: own(
    { name: "logo", type: "reactNode", defaultValue: "Jane" },
    { name: "items", type: "array", defaultValue: [{ label: "Home", href: "#" }] },
    { name: "sticky", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  NavigationMenu: own(
    { name: "items", type: "array", defaultValue: [{ label: "Docs", href: "#" }] },
    { name: "className", type: "string" }
  ),

  ContextMenu: own(
    { name: "items", type: "array", defaultValue: MENU_ITEMS },
    { name: "className", type: "string" }
  ),

  Menubar: own(
    { name: "menus", type: "array", defaultValue: [{ label: "File", items: MENU_ITEMS }] },
    { name: "className", type: "string" }
  ),

  Tabs: own(
    { name: "items", type: "array", defaultValue: [{ label: "Tab A", value: "a", content: "Panel A" }] },
    { name: "value", type: "string", defaultValue: "a" },
    { name: "defaultValue", type: "string", defaultValue: "a" },
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "variant", type: "variant", options: ["default", "underline", "pill"], defaultValue: "default" },
    { name: "className", type: "string" },
    { name: "listClassName", type: "string" },
    { name: "panelClassName", type: "string" },
    { name: "contentClassName", type: "string" },
    { name: "onValueChange", type: "callback", description: "(value: string) => void" }
  ),

  Breadcrumb: own(
    { name: "items", type: "array", defaultValue: [{ label: "Home", href: "#" }, { label: "Page" }] },
    { name: "className", type: "string" }
  ),

  Stepper: own(
    { name: "steps", type: "array", defaultValue: STEPS },
    { name: "defaultValue", type: "number", defaultValue: 0 },
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "className", type: "string" }
  ),

  Badge: own(
    { name: "children", type: "reactNode", defaultValue: "New" },
    { name: "variant", type: "variant", options: ["default", "outline", "secondary"], defaultValue: "default" },
    { name: "className", type: "string" }
  ),

  Tag: own(
    { name: "label", type: "reactNode", defaultValue: "Design system" },
    { name: "variant", type: "select", options: ["solid", "subtle", "outline"], defaultValue: "subtle" },
    { name: "className", type: "string" }
  ),

  Avatar: own(
    { name: "name", type: "string", defaultValue: "Alex Jane" },
    { name: "src", type: "string" },
    { name: "alt", type: "string", defaultValue: "Avatar" },
    {
      name: "color",
      type: "select",
      options: ["muted", "primary", "secondary", "accent", "success", "warning", "info", "destructive"],
      defaultValue: "primary",
    },
    { name: "status", type: "select", options: ["online", "offline", "away", "busy"] },
    { name: "size", type: "size", options: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
    { name: "shape", type: "select", options: ["circle", "square"], defaultValue: "circle" },
    { name: "className", type: "string" }
  ),

  AvatarGroup: own(
    {
      name: "items",
      type: "array",
      defaultValue: [
        { name: "Alex Jane", color: "primary" },
        { name: "Jordan Lee", color: "accent" },
      ],
    },
    { name: "max", type: "number", defaultValue: 3 },
    { name: "size", type: "size", options: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  Table: own(
    { name: "data", type: "array", defaultValue: [{ name: "Alex", role: "Admin" }] },
    {
      name: "columns",
      type: "array",
      defaultValue: [
        { key: "name", header: "Name" },
        { key: "role", header: "Role" },
      ],
    },
    { name: "selectable", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  TreeView: own(
    {
      name: "items",
      type: "array",
      defaultValue: [
        {
          id: "root",
          label: "Documents",
          kind: "folder",
          children: [{ id: "a", label: "Drafts", kind: "file" }],
        },
      ],
    },
    { name: "selectedId", type: "string" },
    { name: "defaultSelectedId", type: "string", defaultValue: "root" },
    { name: "onSelect", type: "callback", description: "(id: string) => void" },
    { name: "expandedIds", type: "array" },
    { name: "defaultExpandedIds", type: "array" },
    { name: "onExpandedChange", type: "callback", description: "(ids: string[]) => void" },
    { name: "showIndentGuides", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "emptyState", type: "reactNode" },
    { name: "indent", type: "number" },
    { name: "draggable", type: "boolean", defaultValue: false },
    { name: "onMove", type: "callback", description: "({ draggedId, targetId, position }) => void" },
    { name: "allowAddSibling", type: "boolean", defaultValue: false },
    { name: "allowAddChild", type: "boolean", defaultValue: false },
    { name: "allowDelete", type: "boolean", defaultValue: false },
    { name: "onAdd", type: "callback", description: "({ targetId, relation }) => void" },
    { name: "onDelete", type: "callback", description: "(id: string) => void" },
    { name: "className", type: "string" }
  ),

  CodeBlock: own(
    { name: "code", type: "string", defaultValue: 'const x = 1;\nconsole.log(x);' },
    { name: "language", type: "string", defaultValue: "typescript" },
    { name: "showLineNumbers", type: "boolean", defaultValue: false },
    { name: "showCopy", type: "boolean", defaultValue: true },
    { name: "filename", type: "string" },
    { name: "className", type: "string" }
  ),

  Carousel: own(
    { name: "items", type: "array", defaultValue: [{ image: "https://picsum.photos/480/200", imageAlt: "Slide 1" }] },
    { name: "autoPlay", type: "boolean", defaultValue: false },
    { name: "loop", type: "boolean", defaultValue: true },
    { name: "showArrows", type: "boolean", defaultValue: true },
    { name: "className", type: "string" }
  ),

  Alert: own(
    { name: "title", type: "string", defaultValue: "Heads up" },
    { name: "description", type: "string", defaultValue: "Something needs your attention." },
    { name: "tone", type: "select", options: ["neutral", "info", "success", "warning", "danger"], defaultValue: "neutral" },
    { name: "variant", type: "select", options: ["solid", "subtle", "outline"], defaultValue: "subtle" },
    { name: "left", type: "reactNode" },
    { name: "action", type: "reactNode" },
    { name: "dismissible", type: "boolean", defaultValue: false },
    { name: "onClose", type: "callback", description: "() => void" },
    { name: "className", type: "string" }
  ),

  Toast: own(
    { name: "title", type: "string", defaultValue: "Saved" },
    { name: "description", type: "string", defaultValue: "Your changes were saved." },
    { name: "tone", type: "select", options: ["neutral", "info", "success", "warning", "danger"], defaultValue: "neutral" },
    { name: "variant", type: "select", options: ["solid", "subtle", "outline"], defaultValue: "solid" },
    { name: "dismissible", type: "boolean", defaultValue: true },
    { name: "className", type: "string" }
  ),

  Toaster: own(
    {
      name: "position",
      type: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      defaultValue: "bottom-right",
    },
    { name: "className", type: "string" }
  ),

  LoadingOverlay: own(
    { name: "open", type: "boolean", defaultValue: false },
    { name: "container", type: "select", options: ["parent", "body"], defaultValue: "parent" },
    { name: "className", type: "string" }
  ),

  Modal: own(
    { name: "open", type: "boolean", defaultValue: true },
    { name: "header", type: "reactNode", defaultValue: "Dialog title" },
    { name: "children", type: "reactNode", defaultValue: "Dialog body." },
    { name: "container", type: "select", options: ["parent", "body"], defaultValue: "parent", galleryOnly: true },
    { name: "size", type: "size", options: ["sm", "md", "lg", "xl", "full"], defaultValue: "md" },
    { name: "align", type: "select", options: ["center", "top"], defaultValue: "center" },
    { name: "showClose", type: "boolean", defaultValue: true },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "overlayClassName", type: "string" },
    { name: "className", type: "string" }
  ),

  AlertDialog: own(
    { name: "open", type: "boolean", defaultValue: true },
    { name: "title", type: "string", defaultValue: "Delete item?" },
    { name: "description", type: "string", defaultValue: "This cannot be undone." },
    { name: "variant", type: "variant", options: ["default", "destructive", "warning"], defaultValue: "default" },
    { name: "container", type: "select", options: ["parent", "body"], defaultValue: "parent", galleryOnly: true },
    { name: "confirmProps", type: "object", defaultValue: { label: "Delete" } },
    { name: "cancelProps", type: "object", defaultValue: { label: "Cancel" } },
    { name: "className", type: "string" }
  ),

  Drawer: own(
    { name: "open", type: "boolean", defaultValue: true },
    { name: "header", type: "reactNode", defaultValue: "Drawer" },
    { name: "children", type: "reactNode", defaultValue: "Drawer content." },
    { name: "placement", type: "select", options: ["left", "right", "top", "bottom"], defaultValue: "right" },
    { name: "size", type: "size", options: ["sm", "md", "lg", "xl", "full"], defaultValue: "md" },
    { name: "container", type: "select", options: ["parent", "body"], defaultValue: "parent", galleryOnly: true },
    { name: "className", type: "string" }
  ),

  Popover: [
    ...own(
      { name: "defaultOpen", type: "boolean", defaultValue: false },
      { name: "placement", type: "select", options: ["top", "bottom", "left", "right"], defaultValue: "bottom" },
      { name: "children", type: "reactNode", defaultValue: "Popover content" },
      { name: "className", type: "string" }
    ),
    ...slot("Button", { name: "label", type: "reactNode", defaultValue: "Open", description: "triggerProps.label" }),
  ],

  HoverCard: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "children", type: "reactNode", defaultValue: "Hover card content" },
    { name: "className", type: "string", description: "Wraps Popover" }
  ),

  Collapsible: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "trigger", type: "reactNode", defaultValue: "Toggle section" },
    { name: "children", type: "reactNode", defaultValue: "Hidden content" },
    { name: "className", type: "string" }
  ),

  CollapsiblePanel: own(
    { name: "open", type: "boolean", defaultValue: true },
    { name: "defaultOpen", type: "boolean", defaultValue: true },
    { name: "onOpenChange", type: "callback", description: "(open: boolean) => void" },
    { name: "closeDirection", type: "select", options: ["left", "right", "top", "bottom"], defaultValue: "left" },
    { name: "size", type: "string", defaultValue: "12rem" },
    {
      name: "collapsedSize",
      type: "string",
      description: "Omit: 0 for none/floater; icon rail for header. Pass 0 to fully collapse.",
    },
    { name: "crossAxis", type: "select", options: ["full", "parent", "viewport"], defaultValue: "parent", galleryOnly: true },
    { name: "triggerPlacement", type: "select", options: ["none", "header", "floater"], defaultValue: "floater" },
    { name: "triggerVariant", type: "select", options: ["default", "pill"], defaultValue: "default" },
    { name: "trigger", type: "reactNode" },
    { name: "toggleButtonProps", type: "object" },
    { name: "header", type: "reactNode", defaultValue: "Panel" },
    { name: "footer", type: "reactNode" },
    { name: "children", type: "reactNode", defaultValue: "Scrollable panel body." },
    { name: "scrollable", type: "boolean", defaultValue: true },
    { name: "variant", type: "variant", options: ["default", "inset"], defaultValue: "default" },
    { name: "surfaceClassName", type: "string" },
    { name: "contentClassName", type: "string" },
    { name: "headerClassName", type: "string" },
    { name: "footerClassName", type: "string" },
    { name: "className", type: "string" }
  ),

  Accordion: own(
    { name: "items", type: "array", defaultValue: [{ value: "one", label: "Section one", content: "Content one" }] },
    { name: "type", type: "select", options: ["single", "multiple"], defaultValue: "single" },
    { name: "defaultValue", type: "string", defaultValue: "one" },
    { name: "className", type: "string" }
  ),

  TriggerModal: [
    ...own(
      { name: "open", type: "boolean", defaultValue: false },
      { name: "defaultOpen", type: "boolean", defaultValue: false },
      { name: "onOpenChange", type: "callback", description: "(open: boolean) => void" },
      { name: "trigger", type: "reactNode" },
      { name: "triggerProps", type: "object", description: "ModalTriggerProps" },
      { name: "header", type: "reactNode", defaultValue: "Modal title" },
      { name: "children", type: "reactNode", defaultValue: "Modal body." },
      { name: "container", type: "select", options: ["parent", "body"], defaultValue: "parent", galleryOnly: true },
      { name: "className", type: "string" }
    ),
    ...slot("Button", { name: "label", type: "reactNode", defaultValue: "Open modal", description: "triggerProps.label" }),
    ...slot("Button", {
      name: "variant",
      type: "variant",
      options: ["primary", "outline", "ghost"],
      defaultValue: "primary",
      description: "triggerProps.variant",
    }),
    ...slot("Button", { name: "disabled", type: "boolean", defaultValue: false, description: "triggerProps.disabled" }),
    ...slot("Button", { name: "iconOnly", type: "boolean", defaultValue: false, description: "triggerProps.iconOnly" }),
    ...slot("Button", { name: "ariaLabel", type: "string", description: "triggerProps.ariaLabel" }),
  ],

  FormModal: [
    ...own(
      { name: "open", type: "boolean", defaultValue: false },
      { name: "defaultOpen", type: "boolean", defaultValue: false },
      { name: "onOpenChange", type: "callback", description: "(open: boolean) => void" },
      { name: "onClose", type: "callback" },
      { name: "header", type: "reactNode" },
      { name: "footer", type: "reactNode" },
      { name: "showClose", type: "boolean", defaultValue: true },
      { name: "trigger", type: "reactNode" },
      { name: "cardProps", type: "object" },
      { name: "maxHeight", type: "string" },
      { name: "minHeight", type: "string" },
      { name: "overlayClassName", type: "string" },
      { name: "heading", type: "string", defaultValue: "Create item" },
      { name: "subheading", type: "reactNode" },
      { name: "left", type: "reactNode" },
      { name: "mode", type: "select", options: ["create", "edit"], defaultValue: "create" },
      { name: "fields", type: "array", description: "FormFieldSchema[] — showWhen, items, onValueChange, render, renderAfter, upload" },
      { name: "formProps", type: "object" },
      { name: "onSubmit", type: "callback", description: "(values) => void | Promise<void>" },
      { name: "onSubmitSuccess", type: "callback" },
      { name: "onSubmitError", type: "callback" },
      { name: "submitLabel", type: "string" },
      { name: "submittingLabel", type: "string" },
      { name: "cancelLabel", type: "string", defaultValue: "Cancel" },
      { name: "loading", type: "boolean", defaultValue: false },
      { name: "submitDisabled", type: "boolean", defaultValue: false },
      { name: "onCancel", type: "callback" },
      { name: "validateOnSubmit", type: "boolean", defaultValue: true },
      { name: "submitButtonProps", type: "object" },
      { name: "cancelButtonProps", type: "object" },
      { name: "triggerModalProps", type: "object" },
      { name: "triggerProps", type: "object", description: "ModalTriggerProps" },
      { name: "container", type: "select", options: ["parent", "body"], defaultValue: "parent", galleryOnly: true },
      { name: "className", type: "string" },
      { name: "children", type: "reactNode", description: "Extra custom UI below fields (prefer field.render / renderAfter)" }
    ),
    ...slot("Button", { name: "label", type: "reactNode", defaultValue: "Open", description: "triggerProps.label" }),
  ],

  ConfirmModal: [
    ...own(
      { name: "open", type: "boolean", defaultValue: true },
      { name: "defaultOpen", type: "boolean", defaultValue: false },
      { name: "onOpenChange", type: "callback", description: "(open: boolean) => void" },
      { name: "onClose", type: "callback" },
      { name: "header", type: "reactNode" },
      { name: "footer", type: "reactNode" },
      { name: "showClose", type: "boolean", defaultValue: false },
      { name: "trigger", type: "reactNode" },
      { name: "cardProps", type: "object" },
      { name: "maxHeight", type: "string" },
      { name: "minHeight", type: "string" },
      { name: "overlayClassName", type: "string" },
      { name: "heading", type: "string", defaultValue: "Confirm" },
      { name: "description", type: "string", defaultValue: "Are you sure?" },
      { name: "left", type: "reactNode" },
      { name: "intent", type: "select", options: ["default", "destructive", "delete", "save", "warning"], defaultValue: "default" },
      { name: "confirmProps", type: "object", defaultValue: { label: "Confirm" } },
      { name: "cancelProps", type: "object", defaultValue: { label: "Cancel" } },
      { name: "loading", type: "boolean", defaultValue: false },
      { name: "triggerModalProps", type: "object" },
      { name: "triggerProps", type: "object", description: "ModalTriggerProps" },
      { name: "container", type: "select", options: ["parent", "body"], defaultValue: "parent", galleryOnly: true },
      { name: "className", type: "string" }
    ),
    ...slot("Button", { name: "label", type: "reactNode", defaultValue: "Open", description: "triggerProps.label" }),
    ...slot("Button", { name: "disabled", type: "boolean", defaultValue: false, description: "triggerProps.disabled" }),
    ...slot("Button", { name: "iconOnly", type: "boolean", defaultValue: false, description: "triggerProps.iconOnly" }),
    ...slot("Button", { name: "ariaLabel", type: "string", description: "triggerProps.ariaLabel" }),
  ],

  AppShell: own(
    { name: "sidebar", type: "reactNode", description: "Sidebar slot" },
    { name: "header", type: "reactNode", description: "Header slot" },
    { name: "children", type: "reactNode", defaultValue: "Main content" },
    { name: "className", type: "string" }
  ),

  PageHeader: own(
    { name: "heading", type: "reactNode", defaultValue: "Page title" },
    { name: "subheading", type: "reactNode" },
    { name: "description", type: "reactNode", defaultValue: "Supporting text" },
    { name: "badge", type: "reactNode" },
    { name: "left", type: "reactNode" },
    { name: "right", type: "reactNode" },
    { name: "actions", type: "reactNode" },
    { name: "variant", type: "select", options: ["default", "bordered", "minimal"], defaultValue: "default" },
    { name: "sticky", type: "boolean", defaultValue: false },
    { name: "separator", type: "boolean", defaultValue: false },
    { name: "children", type: "reactNode" },
    { name: "className", type: "string" }
  ),

  PageFooter: own(
    { name: "children", type: "reactNode", defaultValue: "© 2026" },
    { name: "className", type: "string" }
  ),

  Hero: own(
    { name: "title", type: "reactNode", defaultValue: "Hero title" },
    { name: "description", type: "reactNode", defaultValue: "Supporting copy" },
    { name: "variant", type: "select", options: ["default", "centered", "split"], defaultValue: "default" },
    { name: "badge", type: "reactNode" },
    { name: "children", type: "reactNode" },
    { name: "className", type: "string" }
  ),

  AuthLayout: own(
    { name: "children", type: "reactNode", defaultValue: "Sign in form" },
    { name: "className", type: "string" }
  ),

  EmptyState: own(
    { name: "title", type: "string", defaultValue: "No results" },
    { name: "description", type: "string", defaultValue: "Try adjusting filters." },
    { name: "icon", type: "reactNode" },
    { name: "action", type: "object", description: "EmptyStateAction { label, onClick, ... }" },
    { name: "variant", type: "select", options: ["default", "minimal", "spacious", "error"], defaultValue: "default" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  InlineEdit: own(
    { name: "value", type: "string" },
    { name: "defaultValue", type: "string", defaultValue: "Editable text" },
    { name: "placeholder", type: "string", defaultValue: "Click to edit" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "editTrigger", type: "select", options: ["click", "doubleClick"], defaultValue: "click" },
    { name: "saveOnBlur", type: "boolean", defaultValue: true },
    { name: "saveOnEnter", type: "boolean", defaultValue: true },
    { name: "saveButtonProps", type: "object" },
    { name: "cancelButtonProps", type: "object" },
    { name: "onSave", type: "callback", description: "(value: string) => void | Promise<void>" },
    { name: "onCancel", type: "callback", description: "() => void" },
    { name: "className", type: "string" }
  ),

  HistoryControlButtons: own(
    { name: "canUndo", type: "boolean", defaultValue: true },
    { name: "canRedo", type: "boolean", defaultValue: false },
    { name: "canReset", type: "boolean", defaultValue: true },
    { name: "showUndo", type: "boolean", defaultValue: true },
    { name: "showRedo", type: "boolean", defaultValue: true },
    { name: "showLabels", type: "boolean", defaultValue: false },
    { name: "showTooltips", type: "boolean", defaultValue: true },
    { name: "undoButtonProps", type: "object" },
    { name: "redoButtonProps", type: "object" },
    { name: "resetButtonProps", type: "object" },
    { name: "onUndo", type: "callback", description: "() => void" },
    { name: "onRedo", type: "callback", description: "() => void" },
    { name: "onReset", type: "callback", description: "() => void" },
    { name: "className", type: "string" }
  ),

  FixedScreenWidget: [
    ...own(
      { name: "open", type: "boolean", defaultValue: false },
      { name: "defaultOpen", type: "boolean", defaultValue: false },
      {
        name: "position",
        type: "select",
        options: ["top-left", "top-right", "bottom-left", "bottom-right", "left-center", "right-center"],
        defaultValue: "bottom-right",
      },
      { name: "slideFrom", type: "select", options: ["left", "right", "top", "bottom"], defaultValue: "right" },
      { name: "closeOnOutsideClick", type: "boolean", defaultValue: true },
      { name: "closeOnEscape", type: "boolean", defaultValue: true },
      { name: "children", type: "reactNode", defaultValue: "Panel content" },
      { name: "className", type: "string" }
    ),
    ...slot("Button", { name: "label", type: "string", defaultValue: "Open", description: "triggerProps.label" }),
    ...slot(
      "Button",
      { name: "variant", type: "variant", options: ["primary", "outline", "ghost"], defaultValue: "primary", description: "triggerProps.variant" }
    ),
    ...slot("Card", { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md", description: "panelProps.size" }),
  ],

  ResizeContainer: own(
    { name: "defaultScale", type: "number", defaultValue: 1 },
    { name: "scale", type: "number" },
    { name: "onScaleChange", type: "callback", description: "(scale: number) => void" },
    { name: "minScale", type: "number", defaultValue: 0.5 },
    { name: "maxScale", type: "number", defaultValue: 2 },
    { name: "showControls", type: "boolean", defaultValue: true },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "fit", type: "select", options: ["contain", "cover", "fill"], defaultValue: "contain" },
    { name: "maxWidth", type: "string" },
    { name: "maxHeight", type: "string" },
    { name: "containerProps", type: "object" },
    { name: "contentProps", type: "object" },
    { name: "direction", type: "select", options: ["horizontal", "vertical", "both"], defaultValue: "both" },
    { name: "className", type: "string" }
  ),
}

function mergePropDefinitions(...layers: PropDefinition[][]): PropDefinition[] {
  const byName = new Map<string, PropDefinition>()
  for (const layer of layers) {
    for (const prop of layer) {
      if (!byName.has(prop.name)) byName.set(prop.name, prop)
    }
  }
  return [...byName.values()]
}

export function applyEnrichedPropSchemas(entries: ComponentMetadata[]): ComponentMetadata[] {
  return entries.map((entry) => {
    const props = mergePropDefinitions(
      enrichedPropSchemas[entry.name] ?? [],
      extendedPropSchemas[entry.name] ?? [],
      galleryPreviewProps[entry.name] ?? []
    )
    if (!props.length) return entry
    return { ...entry, props }
  })
}
