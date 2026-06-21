import type { PropDefinition } from "../componentMetadata"

function own(...props: PropDefinition[]): PropDefinition[] {
  return props.map((p) => ({ scope: "own" as const, ...p }))
}

const CHART_DATA = [
  { label: "A", value: 40 },
  { label: "B", value: 65 },
  { label: "C", value: 50 },
]

/** Prop schemas for components not yet in enrichedPropSchemas — merged at build time. */
export const extendedPropSchemas: Record<string, PropDefinition[]> = {
  Button: own(
    { name: "label", type: "string", defaultValue: "Button" },
    { name: "variant", type: "variant", options: ["primary", "secondary", "outline", "ghost", "destructive"], defaultValue: "primary" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "iconOnly", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Text: own(
    { name: "children", type: "reactNode", defaultValue: "Sample text" },
    { name: "size", type: "size", options: ["2xs", "xs", "sm", "base", "md", "lg", "xl", "2xl"], defaultValue: "md" },
    { name: "variant", type: "variant", options: ["default", "muted", "subtle", "code", "danger", "outline"], defaultValue: "default" },
    { name: "weight", type: "select", options: ["normal", "medium", "semibold", "bold", "extrabold"], defaultValue: "normal" },
    { name: "as", type: "select", options: ["span", "div", "p", "label", "button"], defaultValue: "span" },
    { name: "truncate", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  TextInput: own(
    { name: "label", type: "string", defaultValue: "Email" },
    { name: "placeholder", type: "string", defaultValue: "you@example.com" },
    { name: "value", type: "string", defaultValue: "" },
    { name: "type", type: "select", options: ["text", "email", "password", "number", "url", "search"], defaultValue: "email" },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "errorMessage", type: "string" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "variant", type: "variant", options: ["outline", "filled", "ghost", "underline"], defaultValue: "outline" },
    { name: "className", type: "string" }
  ),

  Textarea: own(
    { name: "label", type: "string", defaultValue: "Notes" },
    { name: "placeholder", type: "string", defaultValue: "Write something…" },
    { name: "rows", type: "number", defaultValue: 3 },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  SearchInput: own(
    { name: "placeholder", type: "string", defaultValue: "Search…" },
    { name: "value", type: "string", defaultValue: "" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "loading", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Checkbox: own(
    { name: "label", type: "string", defaultValue: "Accept terms" },
    { name: "checked", type: "boolean", defaultValue: false },
    { name: "default", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "indeterminate", type: "boolean", defaultValue: false },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  Radio: own(
    { name: "label", type: "string", defaultValue: "Option A" },
    { name: "name", type: "string", defaultValue: "preview-radio" },
    { name: "checked", type: "boolean", defaultValue: false },
    { name: "default", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  Slider: own(
    { name: "label", type: "string", defaultValue: "Volume" },
    { name: "value", type: "number", defaultValue: 50 },
    { name: "defaultValue", type: "number", defaultValue: 50 },
    { name: "min", type: "number", defaultValue: 0 },
    { name: "max", type: "number", defaultValue: 100 },
    { name: "showValue", type: "boolean", defaultValue: true },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Label: own(
    { name: "children", type: "reactNode", defaultValue: "Field label" },
    { name: "htmlFor", type: "string" },
    { name: "required", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  HelperText: own(
    { name: "children", type: "reactNode", defaultValue: "Helper message for this field." },
    { name: "className", type: "string" }
  ),

  Card: own(
    { name: "children", type: "reactNode", defaultValue: "Card content" },
    { name: "header", type: "reactNode", defaultValue: "Card header" },
    { name: "footer", type: "reactNode" },
    { name: "variant", type: "variant", options: ["transparent", "surface-1", "surface-2", "outlined"], defaultValue: "surface-1" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  Pill: own(
    { name: "children", type: "reactNode", defaultValue: "Active" },
    { name: "tone", type: "select", options: ["neutral", "primary", "success", "warning", "info", "destructive"], defaultValue: "neutral" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  PillGroup: own(
    {
      name: "items",
      type: "array",
      defaultValue: [
        { label: "React", value: "react" },
        { label: "TypeScript", value: "ts" },
      ],
    },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  Progress: own(
    { name: "value", type: "number", defaultValue: 65 },
    { name: "max", type: "number", defaultValue: 100 },
    { name: "showLabel", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Skeleton: own(
    { name: "variant", type: "select", options: ["text", "avatar", "button", "badge", "card", "input", "tableCell", "tableRow"], defaultValue: "text" },
    { name: "width", type: "string", defaultValue: "120px" },
    { name: "height", type: "string" },
    { name: "count", type: "number", defaultValue: 1 },
    { name: "className", type: "string" }
  ),

  Spinner: own(
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  Link: own(
    { name: "children", type: "reactNode", defaultValue: "Learn more" },
    { name: "href", type: "string", defaultValue: "#" },
    { name: "external", type: "boolean", defaultValue: false },
    { name: "variant", type: "variant", options: ["default", "muted", "underline"], defaultValue: "default" },
    { name: "className", type: "string" }
  ),

  List: own(
    { name: "items", type: "array", defaultValue: [{ label: "Inbox" }, { label: "Sent" }] },
    { name: "selectable", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Image: own(
    { name: "src", type: "string", defaultValue: "https://picsum.photos/seed/gallery/320/180" },
    { name: "alt", type: "string", defaultValue: "Sample image" },
    { name: "aspectRatio", type: "string" },
    { name: "className", type: "string" }
  ),

  Video: own(
    { name: "src", type: "string", defaultValue: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { name: "controls", type: "boolean", defaultValue: true },
    { name: "className", type: "string" }
  ),

  DescriptionList: own(
    {
      name: "items",
      type: "array",
      defaultValue: [
        { label: "Plan", value: "Pro" },
        { label: "Seats", value: "12" },
      ],
    },
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "vertical" },
    { name: "className", type: "string" }
  ),

  Rating: own(
    { name: "value", type: "number", defaultValue: 3 },
    { name: "max", type: "number", defaultValue: 5 },
    { name: "readOnly", type: "boolean", defaultValue: false },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  Separator: own(
    { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "className", type: "string" }
  ),

  Kbd: own(
    { name: "children", type: "reactNode", defaultValue: "⌘K" },
    { name: "className", type: "string" }
  ),

  AspectRatio: own(
    { name: "ratio", type: "number", defaultValue: 16 / 9 },
    { name: "children", type: "reactNode", defaultValue: "16:9 content" },
    { name: "className", type: "string" }
  ),

  Stack: own(
    { name: "gap", type: "select", options: ["none", "xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
    { name: "items", type: "array", defaultValue: ["Alpha", "Beta", "Gamma"] },
    { name: "className", type: "string" }
  ),

  Grid: own(
    { name: "columns", type: "number", defaultValue: 3 },
    { name: "gap", type: "select", options: ["none", "xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
    { name: "items", type: "array", defaultValue: ["1", "2", "3", "4"] },
    { name: "className", type: "string" }
  ),

  FAB: own(
    { name: "ariaLabel", type: "string", defaultValue: "Create" },
    { name: "variant", type: "variant", options: ["primary", "secondary", "outline"], defaultValue: "primary" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  CopyButton: own(
    { name: "value", type: "string", defaultValue: "copied-text" },
    { name: "copyLabel", type: "string", defaultValue: "Copy" },
    { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "sm" },
    { name: "variant", type: "variant", options: ["primary", "outline", "ghost"], defaultValue: "outline" },
    { name: "className", type: "string" }
  ),

  Icon: own(
    { name: "node", type: "reactNode", defaultValue: "star" },
    { name: "size", type: "size", options: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
    { name: "className", type: "string" }
  ),

  VisuallyHidden: own(
    { name: "children", type: "reactNode", defaultValue: "Hidden from sight" },
    { name: "className", type: "string" }
  ),

  ErrorBoundary: own(
    { name: "children", type: "reactNode", defaultValue: "Child content" },
    { name: "className", type: "string" }
  ),

  InputOTP: own(
    { name: "length", type: "number", defaultValue: 6 },
    { name: "disabled", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  Overlay: own(
    { name: "open", type: "boolean", defaultValue: true },
    { name: "blur", type: "boolean", defaultValue: true },
    { name: "closeOnBackdropClick", type: "boolean", defaultValue: true },
    { name: "showCloseButton", type: "boolean", defaultValue: false },
    { name: "container", type: "select", options: ["parent", "body"], defaultValue: "parent", galleryOnly: true },
    { name: "children", type: "reactNode", defaultValue: "Overlay content" },
    { name: "className", type: "string" }
  ),

  Tooltip: own(
    { name: "content", type: "reactNode", defaultValue: "Tooltip text" },
    { name: "placement", type: "select", options: ["top", "bottom", "left", "right"], defaultValue: "top" },
    { name: "children", type: "reactNode", defaultValue: "Hover me" },
    { name: "className", type: "string" }
  ),

  Pagination: own(
    { name: "total", type: "number", defaultValue: 100 },
    { name: "pageSize", type: "number", defaultValue: 10 },
    { name: "value", type: "number", defaultValue: 1 },
    { name: "defaultValue", type: "number", defaultValue: 1 },
    { name: "className", type: "string" }
  ),

  Chart: own(
    { name: "type", type: "select", options: ["bar", "line", "area", "pie", "donut", "scatter"], defaultValue: "bar" },
    { name: "data", type: "array", defaultValue: CHART_DATA },
    { name: "xKey", type: "string", defaultValue: "label" },
    { name: "yKey", type: "string", defaultValue: "value" },
    { name: "height", type: "number", defaultValue: 160 },
    { name: "className", type: "string" }
  ),

  BarChart: own(
    { name: "data", type: "array", defaultValue: CHART_DATA },
    { name: "xKey", type: "string", defaultValue: "label" },
    { name: "yKey", type: "string", defaultValue: "value" },
    { name: "height", type: "number", defaultValue: 160 },
    { name: "horizontal", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  LineChart: own(
    { name: "data", type: "array", defaultValue: CHART_DATA },
    { name: "xKey", type: "string", defaultValue: "label" },
    { name: "yKey", type: "string", defaultValue: "value" },
    { name: "height", type: "number", defaultValue: 160 },
    { name: "area", type: "boolean", defaultValue: false },
    { name: "className", type: "string" }
  ),

  PieChart: own(
    {
      name: "data",
      type: "array",
      defaultValue: [
        { label: "A", value: 40 },
        { label: "B", value: 35 },
        { label: "C", value: 25 },
      ],
    },
    { name: "labelKey", type: "string", defaultValue: "label" },
    { name: "valueKey", type: "string", defaultValue: "value" },
    { name: "height", type: "number", defaultValue: 160 },
    { name: "className", type: "string" }
  ),

  ResizablePanelGroup: own(
    { name: "direction", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    { name: "className", type: "string" }
  ),

  ResizablePanel: own(
    { name: "defaultSize", type: "number", defaultValue: 50 },
    { name: "minSize", type: "number", defaultValue: 20 },
    { name: "className", type: "string" }
  ),

  ResizableHandle: own(
    { name: "withHandle", type: "boolean", defaultValue: true },
    { name: "className", type: "string" }
  ),
}
