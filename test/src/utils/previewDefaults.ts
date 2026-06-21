/** Gallery-safe default props — merged before user props in ComponentPreview. */

const SAMPLE_MENU = [
  { label: "Option A", onClick: () => {} },
  { label: "Option B", onClick: () => {} },
]

const SAMPLE_SIDEBAR_ITEMS = [
  { label: "Home", value: "home" },
  { label: "Projects", value: "projects" },
  { label: "Settings", value: "settings" },
]

const SAMPLE_TABLE_DATA = [
  { name: "Alex Jane", role: "Admin" },
  { name: "Jordan Lee", role: "Editor" },
]

const SAMPLE_TABLE_COLUMNS = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
]

const PREVIEW_DEFAULTS: Record<string, Record<string, unknown>> = {
  SplitButton: {
    children: "Save",
    menuItems: SAMPLE_MENU,
  },
  Sidebar: {
    items: SAMPLE_SIDEBAR_ITEMS,
    defaultValue: "home",
    container: "parent",
    heightMode: "parent",
  },
  Menubar: {
    menus: [
      { label: "File", items: SAMPLE_MENU },
      { label: "Edit", items: [{ label: "Undo", onClick: () => {} }] },
    ],
  },
  Stepper: {
    steps: [
      { label: "Account", description: "Your details" },
      { label: "Shipping", description: "Delivery info" },
      { label: "Payment", description: "Review" },
    ],
    defaultValue: 0,
  },
  AvatarGroup: {
    items: [
      { name: "Alex Jane", color: "primary" },
      { name: "Jordan Lee", color: "accent" },
      { name: "Sam Kim", color: "success" },
    ],
    max: 3,
  },
  Avatar: {
    name: "Alex Jane",
    color: "primary",
  },
  Table: {
    data: SAMPLE_TABLE_DATA,
    columns: SAMPLE_TABLE_COLUMNS,
  },
  TreeView: {
    items: [
      {
        id: "root",
        label: "Documents",
        kind: "folder",
        children: [
          { id: "drafts", label: "Drafts", kind: "file" },
          { id: "archive", label: "Archive", kind: "file" },
        ],
      },
    ],
    defaultSelectedId: "root",
    defaultExpandedIds: ["root"],
    draggable: true,
    allowAddSibling: true,
    allowAddChild: true,
    allowDelete: true,
  },
  CodeBlock: {
    code: 'const hello = "world";\nconsole.log(hello);',
    language: "typescript",
  },
  Carousel: {
    items: [
      { image: "https://picsum.photos/seed/carousel1/480/200", imageAlt: "Slide 1", content: "Slide 1" },
      { image: "https://picsum.photos/seed/carousel2/480/200", imageAlt: "Slide 2", content: "Slide 2" },
    ],
  },
  Accordion: {
    items: [
      { value: "one", label: "Section one", content: "First panel content." },
      { value: "two", label: "Section two", content: "Second panel content." },
    ],
    defaultValue: "one",
  },
  AlertDialog: {
    open: true,
    container: "parent",
    title: "Delete item?",
    description: "This action cannot be undone.",
    confirmProps: { label: "Delete" },
    cancelProps: { label: "Cancel" },
  },
  ConfirmModal: {
    open: true,
    container: "parent",
    heading: "Confirm action",
    description: "Are you sure you want to continue?",
    confirmProps: { label: "Confirm" },
    cancelProps: { label: "Cancel" },
  },
  Modal: {
    open: true,
    container: "parent",
    header: "Dialog title",
    children: "Dialog body content.",
  },
  Drawer: {
    open: true,
    container: "parent",
    header: "Drawer title",
    placement: "right",
    children: "Drawer content.",
  },
  TriggerModal: {
    open: false,
    container: "parent",
    header: "Modal title",
    children: "Modal body.",
    triggerProps: { label: "Open modal", variant: "primary" },
  },
  FormModal: {
    open: false,
    container: "parent",
    heading: "Create item",
    triggerProps: { label: "Open form", variant: "primary" },
  },
  Overlay: {
    open: true,
    container: "parent",
    children: "Scoped overlay content",
  },
  LoadingOverlay: {
    open: false,
    container: "parent",
  },
  Popover: {
    defaultOpen: false,
    children: "Popover content",
  },
  HoverCard: {
    defaultOpen: false,
    children: "Hover card content",
  },
  Navbar: {
    logo: "Jane",
    items: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
    ],
  },
  NavigationMenu: {
    items: [
      { label: "Getting started", href: "#" },
      { label: "Components", href: "#" },
    ],
  },
  ContextMenu: {
    items: SAMPLE_MENU,
    children: "Right-click me",
  },
  Tag: {
    label: "Design system",
  },
  Toaster: {
    position: "bottom-right",
  },
  AppShell: {
    children: "Main content area",
  },
  FixedScreenWidget: {
    defaultOpen: false,
    children: "Fixed panel content",
    triggerProps: { label: "Open panel", variant: "primary" },
  },
  ResizeContainer: {
    defaultScale: 1,
    showControls: true,
  },
  Tabs: {
    items: [
      { label: "Overview", value: "overview", content: "Overview panel" },
      { label: "Details", value: "details", content: "Details panel" },
    ],
    defaultValue: "overview",
  },
  Breadcrumb: {
    items: [
      { label: "Home", href: "#" },
      { label: "Library", href: "#" },
      { label: "Data" },
    ],
  },
  Pagination: {
    total: 50,
    pageSize: 10,
    defaultValue: 1,
  },
  RadioGroup: {
    items: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
    ],
    defaultValue: "a",
    name: "preview-radio",
  },
  Select: {
    items: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
    ],
    defaultValue: "a",
    placeholder: "Select…",
  },
  Dropdown: {
    items: [
      { label: "Option A", onClick: () => {} },
      { label: "Option B", onClick: () => {} },
      { label: "Option C", onClick: () => {} },
      { label: "Option D", onClick: () => {} },
      { label: "Option E", onClick: () => {} },
      { label: "Option F", onClick: () => {} },
      { label: "Option G", onClick: () => {} },
      { label: "Option H", onClick: () => {} },
      { label: "Option I", onClick: () => {} },
      { label: "Option J", onClick: () => {} },
      { label: "Option K", onClick: () => {} },
      { label: "Option L", onClick: () => {} },
    ],
    triggerProps: { label: "Actions" },
  },
  Command: {
    items: [
      { label: "Search files", value: "search" },
      { label: "New document", value: "new" },
    ],
    placeholder: "Type a command…",
  },
  PhoneInput: {
    label: "Phone",
    value: { countryCode: "US", number: "" },
  },
  Upload: {
    label: "Upload file",
  },
  DatePicker: {
    label: "Date",
  },
  TimePicker: {
    label: "Time",
  },
  DateRangePicker: {
    label: "Date range",
  },
  Calendar: {
    defaultValue: new Date().toISOString().slice(0, 10),
  },
  Alert: {
    title: "Heads up",
    description: "Something needs your attention.",
    tone: "info",
    variant: "subtle",
  },
  Toast: {
    title: "Saved",
    description: "Your changes were saved.",
    tone: "success",
    variant: "solid",
  },
  EmptyState: {
    title: "No results",
    description: "Try adjusting your filters.",
  },
  Hero: {
    title: "Build faster",
    description: "Compose screens from primitives.",
  },
  PageHeader: {
    heading: "Page title",
    description: "Supporting description text.",
  },
  InlineEdit: {
    defaultValue: "Editable text",
  },
  BarChart: {
    data: [
      { label: "Mon", value: 42 },
      { label: "Tue", value: 58 },
      { label: "Wed", value: 51 },
    ],
    xKey: "label",
    yKey: "value",
    height: 160,
  },
  LineChart: {
    data: [
      { label: "Mon", value: 42 },
      { label: "Tue", value: 58 },
      { label: "Wed", value: 51 },
    ],
    xKey: "label",
    yKey: "value",
    height: 160,
  },
  PieChart: {
    data: [
      { label: "A", value: 40 },
      { label: "B", value: 35 },
      { label: "C", value: 25 },
    ],
    labelKey: "label",
    valueKey: "value",
    height: 160,
  },
  Chart: {
    type: "bar",
    data: [
      { label: "A", value: 40 },
      { label: "B", value: 65 },
    ],
    xKey: "label",
    yKey: "value",
    height: 160,
  },
}

/** Props stripped when false so they are not passed to DOM nodes. */
const OMIT_WHEN_FALSE = new Set(["indeterminate", "external"])

/** Gallery-only prop names that must not reach DOM (wrong API shape from stubs). */
const GALLERY_ONLY_PROPS = new Set(["page", "totalPages"])

export function getPreviewDefaults(componentName: string): Record<string, unknown> {
  return PREVIEW_DEFAULTS[componentName] ?? {}
}

export function sanitizeGalleryProps(props: Record<string, unknown>): Record<string, unknown> {
  const next = { ...props }
  for (const key of OMIT_WHEN_FALSE) {
    if (next[key] === false) delete next[key]
  }
  for (const key of GALLERY_ONLY_PROPS) {
    delete next[key]
  }
  return next
}

export function mergePreviewProps(
  componentName: string,
  metadataDefaults: Record<string, unknown> | undefined,
  userProps: Record<string, unknown>
): Record<string, unknown> {
  return sanitizeGalleryProps({
    ...getPreviewDefaults(componentName),
    ...metadataDefaults,
    ...userProps,
  })
}
