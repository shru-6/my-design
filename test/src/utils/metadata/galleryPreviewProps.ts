import type { PropDefinition } from "../componentMetadata"

function own(...props: PropDefinition[]): PropDefinition[] {
  return props.map((p) => ({ scope: "own" as const, ...p }))
}

/**
 * Preview-worthy props to add on top of propSchemas + extendedPropSchemas.
 * Callbacks and nested objects are omitted — wired via interactivePreview / wrappers.
 */
export const galleryPreviewProps: Record<string, PropDefinition[]> = {
  Accordion: own(
    { name: "type", type: "select", options: ["single", "multiple"], defaultValue: "single" },
    { name: "defaultValue", type: "string", defaultValue: "one" }
  ),

  Alert: own(
    { name: "dismissible", type: "boolean", defaultValue: false },
    { name: "tone", type: "select", options: ["neutral", "info", "success", "warning", "danger"], defaultValue: "neutral" },
    { name: "variant", type: "select", options: ["solid", "subtle", "outline"], defaultValue: "subtle" }
  ),

  AlertDialog: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "variant", type: "select", options: ["default", "destructive", "warning"], defaultValue: "default" }
  ),

  AppShell: own({ name: "footer", type: "reactNode", description: "Footer slot" }),

  AspectRatio: own(
    { name: "minWidth", type: "string" },
    { name: "maxWidth", type: "string" }
  ),

  AuthLayout: own(
    { name: "title", type: "string", defaultValue: "Sign in" },
    { name: "subtitle", type: "string", defaultValue: "Welcome back" },
    { name: "logo", type: "reactNode" }
  ),

  Avatar: own(
    { name: "src", type: "string" },
    { name: "status", type: "select", options: ["online", "offline", "away", "busy"] },
    { name: "fallback", type: "string" }
  ),

  BarChart: own(
    { name: "stacked", type: "boolean", defaultValue: false },
    { name: "horizontal", type: "boolean", defaultValue: false }
  ),

  Breadcrumb: own({ name: "maxItems", type: "number", defaultValue: 4 }),

  Button: own(
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "iconOnly", type: "boolean", defaultValue: false },
    { name: "type", type: "select", options: ["button", "submit", "reset"], defaultValue: "button" }
  ),

  Calendar: own(
    { name: "selectionMode", type: "select", options: ["single", "range"], defaultValue: "single" },
    { name: "showOutsideDays", type: "boolean", defaultValue: true },
    { name: "minDate", type: "string", description: "ISO date" },
    { name: "maxDate", type: "string", description: "ISO date" }
  ),

  Card: own(
    { name: "footer", type: "reactNode" },
    { name: "minHeight", type: "string" },
    { name: "maxHeight", type: "string" }
  ),

  Carousel: own(
    { name: "interval", type: "number", defaultValue: 0 },
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "showIndicators", type: "boolean", defaultValue: true }
  ),

  Chart: own(
    { name: "grid", type: "boolean", defaultValue: true },
    { name: "legend", type: "boolean", defaultValue: false },
    { name: "responsive", type: "boolean", defaultValue: true },
    { name: "tooltip", type: "boolean", defaultValue: false }
  ),

  Checkbox: own(
    { name: "description", type: "string" },
    { name: "errorMessage", type: "string" },
    { name: "default", type: "boolean", defaultValue: false }
  ),

  Collapsible: own(
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "open", type: "boolean", defaultValue: false },
    { name: "showContentDivider", type: "boolean", defaultValue: true }
  ),

  Command: own(
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "emptyState", type: "reactNode", defaultValue: "No results" },
    { name: "loop", type: "boolean", defaultValue: true }
  ),

  ConfirmModal: own(
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "defaultOpen", type: "boolean", defaultValue: false }
  ),

  ContextMenu: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "open", type: "boolean", defaultValue: false }
  ),

  CopyButton: own(
    { name: "copiedLabel", type: "string", defaultValue: "Copied" },
    { name: "timeout", type: "number", defaultValue: 2000 }
  ),

  DatePicker: own(
    { name: "clearable", type: "boolean", defaultValue: false },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "minDate", type: "string" },
    { name: "maxDate", type: "string" }
  ),

  DateRangePicker: own(
    { name: "clearable", type: "boolean", defaultValue: false },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "presets", type: "boolean", defaultValue: false }
  ),

  Drawer: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "showClose", type: "boolean", defaultValue: true }
  ),

  Dropdown: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "sideOffset", type: "number", defaultValue: 4 }
  ),

  EmptyState: own(
    { name: "icon", type: "reactNode", defaultValue: "inbox" },
    { name: "variant", type: "select", options: ["default", "minimal", "spacious", "error"], defaultValue: "default" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" }
  ),

  ErrorBoundary: own({ name: "fallback", type: "reactNode", defaultValue: "Something went wrong." }),

  FAB: own({ name: "loading", type: "boolean", defaultValue: false }),

  FixedScreenWidget: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "slideFrom", type: "select", options: ["left", "right", "top", "bottom"], defaultValue: "right" },
    { name: "closeOnOutsideClick", type: "boolean", defaultValue: true }
  ),

  Form: own(
    { name: "layout", type: "select", options: ["vertical", "horizontal", "grid"], defaultValue: "vertical" },
    { name: "submitLabel", type: "string", defaultValue: "Submit" },
    { name: "cancelLabel", type: "string" },
    { name: "loading", type: "boolean", defaultValue: false }
  ),

  FormField: own(
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "validate", type: "boolean", defaultValue: false },
    { name: "errorMessage", type: "string" }
  ),

  FormModal: own(
    { name: "mode", type: "select", options: ["create", "edit"], defaultValue: "create" },
    { name: "submitLabel", type: "string", defaultValue: "Save" },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "defaultOpen", type: "boolean", defaultValue: false }
  ),

  HelperText: own({ name: "tone", type: "select", options: ["default", "muted", "danger"], defaultValue: "default" }),

  Hero: own(
    { name: "badge", type: "reactNode" },
    { name: "image", type: "string", description: "Image URL" },
    { name: "variant", type: "select", options: ["default", "centered", "split"], defaultValue: "default" }
  ),

  HistoryControlButtons: own({ name: "showLabels", type: "boolean", defaultValue: false }),

  HoverCard: own(
    { name: "placement", type: "select", options: ["top", "bottom", "left", "right"], defaultValue: "bottom" },
    { name: "openDelay", type: "number", defaultValue: 200 },
    { name: "closeDelay", type: "number", defaultValue: 100 }
  ),

  Icon: own(
    { name: "status", type: "select", options: ["online", "offline", "away", "busy"] },
    { name: "alt", type: "string" }
  ),

  Image: own(
    { name: "fallback", type: "string" },
    { name: "loadingStrategy", type: "select", options: ["eager", "lazy"], defaultValue: "lazy" }
  ),

  InlineEdit: own(
    { name: "value", type: "string", defaultValue: "" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "validate", type: "boolean", defaultValue: false },
    { name: "editTrigger", type: "select", options: ["click", "doubleClick"], defaultValue: "click" },
    { name: "saveOnBlur", type: "boolean", defaultValue: false },
    { name: "saveOnEnter", type: "boolean", defaultValue: true }
  ),

  InputGroup: own(
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "invalid", type: "boolean", defaultValue: false },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" }
  ),

  InputOTP: own(
    { name: "mask", type: "boolean", defaultValue: false },
    { name: "label", type: "string" },
    { name: "defaultValue", type: "string" }
  ),

  Label: own({ name: "required", type: "boolean", defaultValue: false }),

  LineChart: own(
    { name: "area", type: "boolean", defaultValue: false },
    { name: "showPoints", type: "boolean", defaultValue: true }
  ),

  List: own(
    { name: "layout", type: "select", options: ["list", "grid"], defaultValue: "list" },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "divider", type: "boolean", defaultValue: false }
  ),

  LoadingOverlay: own(
    { name: "message", type: "string", defaultValue: "Loading…" },
    { name: "blur", type: "boolean", defaultValue: true },
    { name: "spinnerSize", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" }
  ),

  Menubar: own({ name: "defaultValue", type: "string" }),

  Modal: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "footer", type: "reactNode" }
  ),

  Navbar: own(
    { name: "sticky", type: "boolean", defaultValue: false },
    { name: "separator", type: "boolean", defaultValue: false }
  ),

  NavigationMenu: own(
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "defaultValue", type: "string" }
  ),

  Overlay: own(
    { name: "showCloseButton", type: "boolean", defaultValue: false },
    { name: "closeOnBackdropClick", type: "boolean", defaultValue: true }
  ),

  PageFooter: own(
    { name: "sticky", type: "boolean", defaultValue: false },
    { name: "separator", type: "boolean", defaultValue: false },
    { name: "left", type: "reactNode" },
    { name: "right", type: "reactNode" }
  ),

  PageHeader: own(
    { name: "subheading", type: "reactNode" },
    { name: "badge", type: "reactNode" },
    { name: "sticky", type: "boolean", defaultValue: false }
  ),

  Pagination: own(
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "showFirstLast", type: "boolean", defaultValue: false }
  ),

  PhoneInput: own(
    { name: "placeholder", type: "string", defaultValue: "Phone number" },
    { name: "validate", type: "boolean", defaultValue: false }
  ),

  PieChart: own({ name: "innerRadius", type: "number", defaultValue: 0 }),

  Pill: own(
    { name: "selected", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false }
  ),

  PillGroup: own(
    { name: "selectable", type: "boolean", defaultValue: false },
    { name: "removable", type: "boolean", defaultValue: false },
    { name: "multiple", type: "boolean", defaultValue: false },
    { name: "maxVisible", type: "number", defaultValue: 0 }
  ),

  Popover: own(
    { name: "openOnClick", type: "boolean", defaultValue: true },
    { name: "closeOnOutsideClick", type: "boolean", defaultValue: true }
  ),

  Progress: own({ name: "loading", type: "boolean", defaultValue: false }),

  Radio: own(
    { name: "description", type: "string" },
    { name: "errorMessage", type: "string" }
  ),

  RadioGroup: own(
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "heading", type: "string" }
  ),

  Rating: own(
    { name: "readOnly", type: "boolean", defaultValue: false },
    { name: "precision", type: "number", defaultValue: 1 },
    { name: "showValue", type: "boolean", defaultValue: false }
  ),

  ResizeContainer: own(
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "fit", type: "select", options: ["contain", "cover", "none"], defaultValue: "contain" }
  ),

  SearchInput: own(
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "clearable", type: "boolean", defaultValue: true },
    { name: "debounceMs", type: "number", defaultValue: 300 }
  ),

  Select: own({ name: "errorMessage", type: "string" }),

  Separator: own({ name: "decorative", type: "boolean", defaultValue: true }),

  Sidebar: own(
    { name: "value", type: "string" },
    { name: "collapsed", type: "boolean", defaultValue: false },
    { name: "defaultCollapsed", type: "boolean", defaultValue: false }
  ),

  Slider: own(
    { name: "range", type: "boolean", defaultValue: false },
    { name: "errorMessage", type: "string" }
  ),

  Spinner: own({ name: "label", type: "string", description: "Accessible label" }),

  Stepper: own(
    { name: "allowBack", type: "boolean", defaultValue: true },
    { name: "value", type: "number", defaultValue: 0 }
  ),

  Table: own(
    { name: "sortable", type: "boolean", defaultValue: false },
    { name: "loadingRows", type: "number", defaultValue: 3 }
  ),

  Tabs: own(
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "variant", type: "select", options: ["default", "pills", "underline"], defaultValue: "default" }
  ),

  TextInput: own({ name: "errorMessage", type: "string" }),

  Textarea: own(
    { name: "errorMessage", type: "string" },
    { name: "resize", type: "select", options: ["none", "vertical", "horizontal", "both"], defaultValue: "vertical" }
  ),

  TimePicker: own(
    { name: "clearable", type: "boolean", defaultValue: false },
    { name: "step", type: "number", defaultValue: 15 },
    { name: "required", type: "boolean", defaultValue: false }
  ),

  Toast: own(
    { name: "dismissible", type: "boolean", defaultValue: true },
    { name: "duration", type: "number", defaultValue: 5000 }
  ),

  Toggle: own(
    { name: "description", type: "string" },
    { name: "defaultChecked", type: "boolean", defaultValue: false }
  ),

  Tooltip: own(
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "showArrow", type: "boolean", defaultValue: true },
    { name: "variant", type: "select", options: ["default", "inverted"], defaultValue: "default" }
  ),

  TreeView: own(
    { name: "draggable", type: "boolean", defaultValue: true },
    { name: "allowAddSibling", type: "boolean", defaultValue: true },
    { name: "allowAddChild", type: "boolean", defaultValue: true },
    { name: "allowDelete", type: "boolean", defaultValue: true },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "showIndentGuides", type: "boolean", defaultValue: false }
  ),

  TriggerModal: own(
    { name: "defaultOpen", type: "boolean", defaultValue: false },
    { name: "showClose", type: "boolean", defaultValue: true }
  ),

  Badge: own(
    { name: "selected", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false }
  ),

  CodeBlock: own(
    { name: "filename", type: "string", defaultValue: "example.ts" },
    { name: "copyable", type: "boolean", defaultValue: true }
  ),

  DescriptionList: own({ name: "compact", type: "boolean", defaultValue: false }),

  Grid: own(
    { name: "gap", type: "select", options: ["none", "sm", "md", "lg"], defaultValue: "md" },
    { name: "columns", type: "number", defaultValue: 3 }
  ),

  Kbd: own({ name: "size", type: "size", options: ["sm", "md"], defaultValue: "sm" }),

  Link: own({ name: "underline", type: "select", options: ["none", "hover", "always"], defaultValue: "hover" }),

  ResizableHandle: own({ name: "disabled", type: "boolean", defaultValue: false }),

  ResizablePanel: own({ name: "defaultSize", type: "number", defaultValue: 50 }),

  ResizablePanelGroup: own(
    { name: "direction", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "autoSaveId", type: "string" }
  ),

  Skeleton: own(
    { name: "variant", type: "select", options: ["text", "circular", "rectangular"], defaultValue: "text" },
    { name: "animation", type: "select", options: ["pulse", "wave", "none"], defaultValue: "pulse" }
  ),

  SplitButton: own(
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false }
  ),

  Stack: own(
    { name: "gap", type: "select", options: ["none", "sm", "md", "lg"], defaultValue: "md" },
    { name: "align", type: "select", options: ["start", "center", "end", "stretch"], defaultValue: "stretch" }
  ),

  Tag: own({ name: "removable", type: "boolean", defaultValue: false }),

  Text: own(
    { name: "truncate", type: "boolean", defaultValue: false },
    { name: "as", type: "select", options: ["p", "span", "div", "label"], defaultValue: "p" }
  ),

  Toaster: own({ name: "maxVisible", type: "number", defaultValue: 5 }),

  Upload: own(
    { name: "variant", type: "select", options: ["default", "compact"], defaultValue: "default" },
    { name: "showFileList", type: "boolean", defaultValue: true },
    { name: "multiple", type: "boolean", defaultValue: false },
    { name: "maxFiles", type: "number", defaultValue: 1 },
    { name: "dragAndDrop", type: "boolean", defaultValue: true }
  ),

  Video: own(
    { name: "poster", type: "string" },
    { name: "autoPlay", type: "boolean", defaultValue: false },
    { name: "muted", type: "boolean", defaultValue: false }
  ),
}
