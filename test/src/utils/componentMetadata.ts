// Component metadata (reset baseline)
// Old category inventory removed; we'll rebuild from scratch.

import { applyEnrichedPropSchemas } from "./metadata/propSchemas"

export type ComponentCategory =
  | "inputs"
  | "actions"
  | "navigation"
  | "data-display"
  | "feedback"
  | "overlays"
  | "layout"
  | "utilities"
  | "data-viz"
  | "patterns"

export interface PropDefinition {
  name: string
  type:
    | "variant"
    | "size"
    | "boolean"
    | "string"
    | "number"
    | "counter"
    | "select"
    | "reactNode"
    | "array"
    | "object"
    | "callback"
    | "expression"
  options?: string[]
  defaultValue?: any
  description?: string
  /** `own` = root component API; `slot` = forwarded to a sub-component or slot object */
  scope?: "own" | "slot"
  /** When `scope` is `slot`, names the target (e.g. Button, Card, triggerProps) */
  slotTarget?: string
  /** Test app only — excluded from generated usage snippets */
  galleryOnly?: boolean
}

export interface ComponentMetadata {
  name: string
  category: ComponentCategory
  description?: string
  props: PropDefinition[]
  defaultProps?: Record<string, any>
  subComponents?: string[]
}

const subComponentsMap: Record<string, string[]> = {
  TextInput: ["Label", "HelperText", "Icon"],
  SearchInput: ["TextInput", "Spinner"],
  Textarea: ["Label", "HelperText"],
  Checkbox: ["Text", "HelperText"],
  Radio: ["Text", "HelperText"],
  Toggle: ["Text", "HelperText"],
  Slider: ["Label", "HelperText"],
  Label: ["Text"],
  HelperText: ["Text"],
  Button: ["Icon", "Spinner"],
  FAB: ["Icon"],
  Card: [],
  Separator: [],
  Text: ["Icon"],
  Spinner: ["Text"],
  Skeleton: [],
  PillGroup: ["Pill"],
  Pill: ["Text"],
  Avatar: ["Icon"],
  Progress: ["Text"],
  Kbd: [],
  Image: ["Skeleton"],
  Icon: [],
  VisuallyHidden: [],
  ErrorBoundary: ["Text"],
  Link: [],
  Stack: [],
  Grid: [],
  AspectRatio: [],
  Rating: [],
  DescriptionList: [],
  InputOTP: [],
  List: ["Stack", "Grid", "SearchInput", "Text", "Icon"],
  Video: [],
  Overlay: [],
  Tooltip: [],
  ResizablePanelGroup: [],
  ResizablePanel: [],
  ResizableHandle: [],
  // FieldLayout: ["Label", "HelperText"],
}

export function getSubComponents(componentName: string): string[] {
  return subComponentsMap[componentName] || []
}

export function getAllSubComponents(): string[] {
  const allSubComponents = new Set<string>()
  Object.values(subComponentsMap).forEach((subs) => {
    subs.forEach((sub) => allSubComponents.add(sub))
  })
  return Array.from(allSubComponents).sort()
}

const rawComponentMetadata: ComponentMetadata[] = [
  {
    name: "TextInput",
    category: "inputs",
    props: [
      { name: "type", type: "select", options: ["text", "password", "number", "email", "url", "search"], defaultValue: "text" },
      { name: "value", type: "string" },
      { name: "defaultValue", type: "string" },
      { name: "placeholder", type: "string", defaultValue: "Enter text..." },
      { name: "label", type: "string" },
      { name: "left", type: "reactNode" },
      { name: "right", type: "reactNode" },
      { name: "required", type: "boolean", defaultValue: false },
      { name: "readOnly", type: "boolean", defaultValue: false },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "maxLength", type: "number" },
      { name: "minLength", type: "number" },
      { name: "autoFocus", type: "boolean", defaultValue: false },
      { name: "autoComplete", type: "string" },
      { name: "validate", type: "callback", description: "boolean or (value) => error string" },
      { name: "onValidate", type: "callback", description: "(isValid, error?) => void" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "variant", type: "variant", options: ["outline", "filled", "ghost", "underline"], defaultValue: "outline" },
      { name: "errorMessage", type: "string" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("TextInput"),
  },
  {
    name: "SearchInput",
    category: "inputs",
    description: "Debounced search built on TextInput (search icon + clear via rightInteractive).",
    props: [
      { name: "value", type: "string" },
      { name: "defaultValue", type: "string", defaultValue: "" },
      { name: "onChange", type: "callback", description: "(value: string) => void" },
      { name: "onSearch", type: "callback", description: "Debounced (value: string) => void" },
      { name: "onClear", type: "callback", description: "() => void" },
      { name: "debounceMs", type: "number", defaultValue: 300 },
      { name: "clearable", type: "boolean", defaultValue: true },
      { name: "placeholder", type: "string", defaultValue: "Search…" },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "loading", type: "boolean", defaultValue: false },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "variant", type: "variant", options: ["outline", "filled", "ghost", "underline"], defaultValue: "outline" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("SearchInput"),
  },
  {
    name: "Textarea",
    category: "inputs",
    props: [
      { name: "value", type: "string" },
      { name: "defaultValue", type: "string" },
      { name: "placeholder", type: "string", defaultValue: "Write something..." },
      { name: "label", type: "string" },
      { name: "rows", type: "number", defaultValue: 3 },
      { name: "required", type: "boolean", defaultValue: false },
      { name: "readOnly", type: "boolean", defaultValue: false },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "maxLength", type: "number" },
      { name: "minLength", type: "number" },
      { name: "autoFocus", type: "boolean", defaultValue: false },
      { name: "resize", type: "select", options: ["none", "vertical", "horizontal", "both"], defaultValue: "vertical" },
      { name: "validate", type: "callback", description: "boolean or (value) => error string" },
      { name: "onValidate", type: "callback", description: "(isValid, error?) => void" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "variant", type: "variant", options: ["outline", "filled", "ghost", "underline"], defaultValue: "outline" },
      { name: "errorMessage", type: "string" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Textarea"),
  },
  {
    name: "Checkbox",
    category: "inputs",
    props: [
      { name: "checked", type: "boolean" },
      { name: "default", type: "boolean", defaultValue: true },
      { name: "label", type: "string", defaultValue: "Checkbox" },
      { name: "description", type: "string" },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "required", type: "boolean", defaultValue: false },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "errorMessage", type: "string" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Checkbox"),
  },
  {
    name: "Radio",
    category: "inputs",
    props: [
      { name: "checked", type: "boolean" },
      { name: "default", type: "boolean", defaultValue: true },
      { name: "name", type: "string" },
      { name: "value", type: "string" },
      { name: "label", type: "string", defaultValue: "Radio" },
      { name: "description", type: "string" },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "required", type: "boolean", defaultValue: false },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "errorMessage", type: "string" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Radio"),
  },
  {
    name: "Slider",
    category: "inputs",
    props: [
      { name: "value", type: "number" },
      { name: "defaultValue", type: "number", defaultValue: 25 },
      { name: "label", type: "string" },
      { name: "showValue", type: "boolean", defaultValue: false },
      { name: "range", type: "boolean", defaultValue: false },
      { name: "valueFormatter", type: "callback", description: "(value) => ReactNode" },
      { name: "marks", type: "array", description: "Array<{ value, label? }>" },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "min", type: "number", defaultValue: 0 },
      { name: "max", type: "number", defaultValue: 100 },
      { name: "step", type: "number", defaultValue: 1 },
      { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "errorMessage", type: "string" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Slider"),
  },
  {
    name: "Rating",
    category: "inputs",
    props: [
      { name: "value", type: "number", description: "Controlled; omit with defaultValue for interactive preview" },
      { name: "defaultValue", type: "number", defaultValue: 3 },
      { name: "onChange", type: "callback", description: "(value: number) => void" },
      { name: "max", type: "number", defaultValue: 5 },
      { name: "precision", type: "select", options: ["1", "0.5", "0.25"], defaultValue: "1" },
      { name: "readOnly", type: "boolean", defaultValue: false },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "left", type: "reactNode", description: "Optional icon before stars" },
      { name: "showValue", type: "boolean", defaultValue: false },
      { name: "label", type: "string", defaultValue: "Rating" },
      { name: "errorMessage", type: "string" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Rating"),
  },
  {
    name: "InputOTP",
    category: "inputs",
    props: [
      { name: "value", type: "string" },
      { name: "defaultValue", type: "string", defaultValue: "" },
      { name: "onChange", type: "callback", description: "(value: string) => void" },
      { name: "onComplete", type: "callback", description: "(value: string) => void" },
      { name: "length", type: "number", defaultValue: 6 },
      { name: "mask", type: "boolean", defaultValue: false },
      { name: "label", type: "string", defaultValue: "One-time code" },
      { name: "validate", type: "callback", description: "boolean or (value) => error string" },
      { name: "onValidate", type: "callback", description: "(isValid, error?) => void" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "variant", type: "variant", options: ["outline", "filled", "ghost", "underline"], defaultValue: "outline" },
      { name: "errorMessage", type: "string" },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "autoFocus", type: "boolean", defaultValue: false },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("InputOTP"),
  },
  {
    name: "Label",
    category: "inputs",
    props: [
      { name: "children", type: "reactNode", defaultValue: "Label" },
      { name: "required", type: "boolean", defaultValue: false },
      { name: "left", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Label"),
  },
  {
    name: "HelperText",
    category: "inputs",
    props: [
      { name: "children", type: "reactNode", defaultValue: "Helper text" },
      { name: "tone", type: "select", options: ["default", "muted", "error"], defaultValue: "muted" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("HelperText"),
  },
  {
    name: "FAB",
    category: "actions",
    props: [
      { name: "left", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)", defaultValue: "plus" },
      { name: "ariaLabel", type: "string", defaultValue: "Quick action" },
      { name: "variant", type: "variant", options: ["primary", "secondary"], defaultValue: "primary" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "position", type: "select", options: ["bottom-right", "bottom-left", "bottom-center"], defaultValue: "bottom-center" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("FAB"),
  },
  {
    name: "Button",
    category: "actions",
    props: [
      { name: "variant", type: "variant", options: ["primary", "secondary", "outline", "ghost", "destructive"], defaultValue: "primary" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "left", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)" },
      { name: "right", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)" },
      { name: "iconOnly", type: "boolean", defaultValue: false },
      { name: "ariaLabel", type: "string" },
      { name: "loading", type: "boolean", defaultValue: false },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "href", type: "string" },
      { name: "label", type: "string", defaultValue: "Button" },
      { name: "className", type: "string" },
      { name: "children", type: "reactNode" },
    ],
    subComponents: getSubComponents("Button"),
  },
  {
    name: "Card",
    category: "layout",
    props: [
      { name: "variant", type: "variant", options: ["transparent", "surface-1", "surface-2", "outlined"], defaultValue: "surface-1" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "header", type: "reactNode" },
      { name: "footer", type: "reactNode" },
      { name: "minHeight", type: "string" },
      { name: "maxHeight", type: "string" },
      { name: "className", type: "string" },
      { name: "children", type: "reactNode", defaultValue: "Card content" },
    ],
    subComponents: getSubComponents("Card"),
  },
  {
    name: "Separator",
    category: "layout",
    props: [
      { name: "orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
      { name: "variant", type: "variant", options: ["solid", "dashed", "dotted"], defaultValue: "solid" },
      { name: "decorative", type: "boolean", defaultValue: true },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Separator"),
  },
  {
    name: "Text",
    category: "data-display",
    props: [
      { name: "as", type: "select", options: ["span", "div", "p", "label"], defaultValue: "div" },
      { name: "size", type: "size", options: ["xs", "sm", "base", "md", "lg", "xl", "2xl"], defaultValue: "md" },
      { name: "variant", type: "variant", options: ["default", "muted", "subtle", "code", "danger", "outline"], defaultValue: "default" },
      { name: "weight", type: "select", options: ["normal", "medium", "semibold", "bold", "extrabold"], defaultValue: "normal" },
      { name: "left", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)" },
      { name: "right", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)" },
      { name: "truncate", type: "boolean", defaultValue: false },
      { name: "lineClamp", type: "number" },
      { name: "className", type: "string" },
      { name: "children", type: "reactNode", defaultValue: "Text" },
    ],
    subComponents: getSubComponents("Text"),
  },
  {
    name: "Pill",
    category: "data-display",
    description: "Unified chip: counts, tags, filters. `Badge` / `Tag` are compatibility aliases.",
    props: [
      { name: "as", type: "select", options: ["span", "button"], defaultValue: "span" },
      { name: "children", type: "reactNode", defaultValue: "Pill" },
      { name: "left", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)" },
      { name: "right", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)" },
      { name: "onRemove", type: "callback", description: "() => void — dismiss control" },
      { name: "dot", type: "boolean", defaultValue: false },
      { name: "selected", type: "boolean", defaultValue: false },
      { name: "tone", type: "select", options: ["neutral", "info", "success", "warning", "danger"], defaultValue: "neutral" },
      { name: "appearance", type: "variant", options: ["solid", "subtle", "outline", "ghost"], defaultValue: "subtle" },
      {
        name: "variant",
        type: "select",
        options: ["default", "muted", "subtle", "code", "danger", "outline"],
        defaultValue: "default",
        description: "Text variant (Typography)",
      },
      { name: "size", type: "size", options: ["sm", "md"], defaultValue: "md" },
      { name: "shape", type: "select", options: ["rounded", "pill"], defaultValue: "pill" },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Pill"),
  },
  {
    name: "Avatar",
    category: "data-display",
    props: [
      { name: "src", type: "string" },
      { name: "alt", type: "string", defaultValue: "Avatar" },
      { name: "fallback", type: "reactNode", defaultValue: "AV" },
      { name: "status", type: "select", options: ["online", "offline", "away", "busy"] },
      { name: "size", type: "size", options: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
      { name: "shape", type: "select", options: ["circle", "square"], defaultValue: "circle" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Avatar"),
  },
  {
    name: "Progress",
    category: "data-display",
    props: [
      { name: "value", type: "number", defaultValue: 45 },
      { name: "max", type: "number", defaultValue: 100 },
      { name: "showLabel", type: "boolean", defaultValue: false },
      { name: "loading", type: "boolean", defaultValue: false },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Progress"),
  },
  {
    name: "Kbd",
    category: "data-display",
    props: [
      { name: "children", type: "reactNode", defaultValue: "⌘K" },
      { name: "size", type: "size", options: ["sm", "md"], defaultValue: "md" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Kbd"),
  },
  {
    name: "Image",
    category: "data-display",
    props: [
      { name: "src", type: "string", defaultValue: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400" },
      { name: "alt", type: "string", defaultValue: "Demo image" },
      { name: "loadingStrategy", type: "select", options: ["lazy", "eager"], defaultValue: "lazy" },
      { name: "width", type: "string", defaultValue: "140" },
      { name: "height", type: "string", defaultValue: "80" },
      { name: "fit", type: "select", options: ["cover", "contain", "fill", "none", "scale-down"], defaultValue: "cover" },
      { name: "position", type: "string" },
      { name: "variant", type: "select", options: ["default", "rounded", "circle", "square"], defaultValue: "rounded" },
      { name: "placeholder", type: "select", options: ["blur", "skeleton", "none"], defaultValue: "none" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Image"),
  },
  {
    name: "Spinner",
    category: "data-display",
    props: [
      { name: "size", type: "size", options: ["xs", "sm", "md", "lg"], defaultValue: "md" },
      { name: "label", type: "string" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Spinner"),
  },
  {
    name: "Skeleton",
    category: "data-display",
    props: [
      { name: "variant", type: "variant", options: ["text", "avatar", "button", "badge", "card", "input", "checkbox", "radio"], defaultValue: "text" },
      { name: "width", type: "string" },
      { name: "height", type: "string" },
      { name: "count", type: "counter", defaultValue: 1, description: "Number of skeleton items" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Skeleton"),
  },
  {
    name: "PillGroup",
    category: "data-display",
    props: [
      { name: "items", type: "array", description: "PillItem[] in component API" ,defaultValue:[
        { label: "React", value: "react" },
        { label: "TypeScript", value: "typescript" },
        { label: "Tailwind", value: "tailwind" },
      ]},
      { name: "value", type: "array" },
      { name: "defaultValue", type: "array" },
      { name: "onChange", type: "callback", description: "(next: string[]) => void" },
      { name: "selectable", type: "boolean", defaultValue: false },
      { name: "onSelect", type: "callback", description: "(item, selected) => void" },
      { name: "multiple", type: "boolean", defaultValue: true },
      { name: "removable", type: "boolean", defaultValue: false },
      { name: "onRemove", type: "callback", description: "(value: string) => void" },
      { name: "maxVisible", type: "number" },
      { name: "overflowLabel", type: "string", defaultValue: "+{count}" },
      { name: "children", type: "reactNode" },
      { name: "size", type: "size", options: ["sm", "md"], defaultValue: "md" },
      { name: "variant", type: "variant", options: ["solid", "subtle", "outline"], defaultValue: "subtle" },
      { name: "gap", type: "select", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "wrap", type: "boolean", defaultValue: true },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("PillGroup"),
  },
  {
    name: "DescriptionList",
    category: "data-display",
    props: [
      {
        name: "items",
        type: "array",
        defaultValue: [
          { label: "Status", value: "Active" },
          { label: "Region", value: "us-east-1" },
        ],
        description: "DescriptionItem[] { label, value }",
      },
      { name: "layout", type: "select", options: ["vertical", "horizontal"], defaultValue: "vertical" },
      { name: "size", type: "size", options: ["sm", "md"], defaultValue: "md" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("DescriptionList"),
  },
  {
    name: "List",
    category: "data-display",
    props: [
      {
        name: "items",
        type: "array",
        defaultValue: [
          { label: "Inbox", value: "inbox", description: "3 unread" },
          { label: "Drafts", value: "drafts" },
          { label: "Sent", value: "sent" },
        ],
        description: "ListItem[] { label, value?, left?, description?, action?, disabled?, selected?, filterKeys?, custom? }",
      },
      { name: "listType", type: "select", options: ["unordered", "ordered", "none"], defaultValue: "unordered" },
      { name: "layout", type: "select", options: ["list", "grid"], defaultValue: "list" },
      { name: "search", type: "boolean", defaultValue: true, description: "true = built-in SearchInput + filter. Object: ListSearchConfig { placeholder?, value?, onChange?, filterItems?, filter?, debounceMs? } — use filterItems: false when filtering external data (gallery toolbar)." },
      { name: "filterChips", type: "object", description: "ListFilterChipsConfig — PillGroup + optional filter; matches ListItem.filterKeys" },
      { name: "header", type: "reactNode", description: "Prepended above search and list body (e.g. PageHeader)" },
      {
        name: "gap",
        type: "select",
        options: ["none", "sm", "md", "lg"],
        defaultValue: "md",
        description: "Stack gap (layout=list) or Grid gap if gridGap omitted (layout=grid)",
      },
      {
        name: "direction",
        type: "select",
        options: ["row", "column"],
        defaultValue: "column",
        description: "layout=list → Stack",
      },
      { name: "wrap", type: "boolean", defaultValue: false, description: "layout=list → Stack" },
      {
        name: "columns",
        type: "select",
        options: ["1", "2", "3", "4", "6", "12"],
        defaultValue: "2",
        description: "layout=grid (ignored if minChildWidth set)",
      },
      { name: "minChildWidth", type: "string", description: "layout=grid — auto-fill tracks (e.g. 12rem)" },
      { name: "divider", type: "boolean", defaultValue: false },
      { name: "selectable", type: "boolean", defaultValue: false },
      { name: "selectedValue", type: "string" },
      { name: "defaultSelectedValue", type: "string" },
      { name: "onSelect", type: "callback", description: "(value, item) => void" },
      { name: "emptyState", type: "reactNode" },
      { name: "noResultsState", type: "reactNode", description: "When search filters to zero rows" },
      { name: "errorState", type: "reactNode", description: "Replaces list body on fetch/load failure" },
      { name: "loading", type: "boolean", defaultValue: false },
      { name: "loadingState", type: "reactNode", description: "Custom skeleton when loading" },
      { name: "renderItem", type: "callback", description: "(item, index) => ReactNode" },
      { name: "children", type: "reactNode" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("List"),
  },
  {
    name: "Video",
    category: "data-display",
    props: [
      {
        name: "src",
        type: "string",
        defaultValue: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      { name: "controls", type: "boolean", defaultValue: true },
      { name: "autoPlay", type: "boolean", defaultValue: false },
      { name: "loop", type: "boolean", defaultValue: false },
      { name: "muted", type: "boolean", defaultValue: true },
      { name: "playsInline", type: "boolean", defaultValue: true },
      { name: "width", type: "string", defaultValue: "100%" },
      { name: "height", type: "string", defaultValue: "120" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Video"),
  },
  {
    name: "Overlay",
    category: "overlays",
    props: [
      { name: "open", type: "boolean", defaultValue: true },
      { name: "onClose", type: "callback", description: "() => void (backdrop click)" },
      { name: "blur", type: "boolean", defaultValue: false },
      {
        name: "container",
        type: "select",
        options: ["parent", "body"],
        defaultValue: "parent",
        description: "parent = scoped to nearest OverlayPortalScope",
      },
      { name: "className", type: "string" },
      {
        name: "children",
        type: "reactNode",
        defaultValue: "Modal surface",
      },
    ],
    subComponents: getSubComponents("Overlay"),
  },
  {
    name: "Tooltip",
    category: "overlays",
    props: [
      { name: "content", type: "reactNode", defaultValue: "Tooltip copy" },
      { name: "openDelay", type: "number", defaultValue: 300 },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "placement", type: "select", options: ["top", "bottom", "left", "right"], defaultValue: "top" },
      { name: "variant", type: "variant", options: ["default", "inverted", "info"], defaultValue: "default" },
      { name: "className", type: "string" },
      { name: "children", type: "reactNode", defaultValue: "Hover me" },
    ],
    subComponents: getSubComponents("Tooltip"),
  },
  {
    name: "VisuallyHidden",
    category: "utilities",
    props: [
      { name: "children", type: "reactNode", defaultValue: "Screen-reader only text" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("VisuallyHidden"),
  },
  {
    name: "ErrorBoundary",
    category: "utilities",
    props: [
      { name: "fallback", type: "reactNode", defaultValue: "Something went wrong." },
      { name: "onError", type: "callback", description: "(error, info) => void" },
      { name: "children", type: "reactNode", defaultValue: "Content protected by boundary" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("ErrorBoundary"),
  },
  {
    name: "Icon",
    category: "utilities",
    props: [
      { name: "node", type: "reactNode", description: "Keyword symbol (search, plus, check, x, star...)", defaultValue: "star" },
      { name: "alt", type: "string" },
      { name: "status", type: "select", options: ["online", "offline", "away", "busy"] },
      { name: "statusPosition", type: "select", options: ["top-right", "bottom-right"], defaultValue: "bottom-right" },
      { name: "fallback", type: "reactNode", description: "Used only when node is missing (null/undefined)" },
      { name: "size", type: "size", options: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
      { name: "variant", type: "variant", options: ["default", "muted"], defaultValue: "default" },
      { name: "shape", type: "select", options: ["default", "circle", "square"], defaultValue: "default" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Icon"),
  },
  // {
  //   name: "FieldLayout",
  //   category: "inputs",
  //   props: [
  //     { name: "label", type: "string", defaultValue: "Field label" },
  //     { name: "htmlFor", type: "string", defaultValue: "field-demo" },
  //     { name: "required", type: "boolean", defaultValue: false },
  //     { name: "errorMessage", type: "string" },
  //     { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
  //     { name: "className", type: "string" },
  //     { name: "children", type: "reactNode", defaultValue: "Control slot" },
  //   ],
  //   subComponents: getSubComponents("FieldLayout"),
  // },
  {
    name: "Link",
    category: "data-display",
    props: [
      { name: "href", type: "string", defaultValue: "#" },
      { name: "children", type: "reactNode", defaultValue: "Link text" },
      { name: "variant", type: "variant", options: ["default", "muted", "underline"], defaultValue: "default" },
      { name: "target", type: "select", options: ["_self", "_blank"] },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("Link"),
  },
  {
    name: "Stack",
    category: "layout",
    props: [
      { name: "direction", type: "select", options: ["row", "column"], defaultValue: "column" },
      { name: "gap", type: "select", options: ["none", "sm", "md", "lg"], defaultValue: "sm" },
      { name: "align", type: "select", options: ["start", "center", "end", "stretch", "baseline"] },
      { name: "justify", type: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
      { name: "wrap", type: "boolean", defaultValue: false },
      { name: "className", type: "string" },
      {
        name: "items",
        type: "array",
        defaultValue: ["A", "B", "C"],
        description: "Data passed to renderItem",
      },
      {
        name: "renderItem",
        type: "expression",
        defaultValue:
          "(item, i) => <div key={i} className=\"rounded border border-border p-2 text-sm\">{String(item)}</div>",
        description: "JSX expression for renderItem={...}",
      },
    ],
    subComponents: getSubComponents("Stack"),
  },
  {
    name: "Grid",
    category: "layout",
    props: [
      { name: "columns", type: "select", options: ["1", "2", "3", "4", "6", "12"], defaultValue: "2" },
      { name: "rows", type: "select", options: ["1", "2", "3", "4", "5", "6"] },
      { name: "minChildWidth", type: "string", description: "e.g. 10rem — auto-fill columns" },
      { name: "gap", type: "select", options: ["none", "sm", "md", "lg"], defaultValue: "sm" },
      {
        name: "autoFlow",
        type: "select",
        options: ["default", "row", "column", "dense", "rowDense", "colDense"],
        defaultValue: "default",
      },
      { name: "alignItems", type: "select", options: ["start", "center", "end", "stretch"] },
      { name: "justifyItems", type: "select", options: ["start", "center", "end", "stretch"] },
      { name: "columnGap", type: "select", options: ["none", "sm", "md", "lg"] },
      { name: "rowGap", type: "select", options: ["none", "sm", "md", "lg"] },
      { name: "className", type: "string" },
      {
        name: "items",
        type: "array",
        defaultValue: ["1", "2", "3", "4"],
        description: "Data passed to renderItem",
      },
      {
        name: "renderItem",
        type: "expression",
        defaultValue:
          "(item, i) => <div key={i} className=\"rounded border border-border p-2 text-sm\">{String(item)}</div>",
        description: "JSX expression for renderItem={...}",
      },
    ],
    subComponents: getSubComponents("Grid"),
  },
  {
    name: "AspectRatio",
    category: "layout",
    props: [
      { name: "ratio", type: "number", defaultValue: 14/3 },
      { name: "minWidth", type: "string", description: "e.g. 200px or 12rem" },
      { name: "maxWidth", type: "string", description: "e.g. 480px" },
      { name: "className", type: "string" },
      {
        name: "children",
        type: "reactNode",
        defaultValue: "container ratio: {ratio}",
      },
    ],
    subComponents: getSubComponents("AspectRatio"),
  },
  {
    name: "ResizablePanelGroup",
    category: "layout",
    props: [
      { name: "direction", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
      { name: "autoSaveId", type: "string", description: "Persist sizes in localStorage" },
      { name: "className", type: "string" },
    ],
    subComponents: getSubComponents("ResizablePanelGroup"),
  },
  {
    name: "ResizablePanel",
    category: "layout",
    props: [
      { name: "defaultSize", type: "number", defaultValue: 40 },
      { name: "minSize", type: "number", defaultValue: 10 },
      { name: "maxSize", type: "number" },
      { name: "collapsible", type: "boolean", defaultValue: false },
      { name: "className", type: "string" },
      { name: "children", type: "reactNode", defaultValue: "Panel" },
    ],
    subComponents: getSubComponents("ResizablePanel"),
  },
  {
    name: "ResizableHandle",
    category: "layout",
    props: [
      { name: "withHandle", type: "boolean", defaultValue: true },
      { name: "className", type: "string" },
      { name: "children", type: "reactNode" },
    ],
    subComponents: getSubComponents("ResizableHandle"),
  },
  {
    name: "PhoneInput",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["TextInput","Dropdown"]
  },
  {
    name: "InputGroup",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["InputGroupInput","InputGroupAddon","InputGroupButton","Button"]
  },
  {
    name: "Command",
    category: "inputs",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["SearchInput","Spinner","Icon"]
  },
  {
    name: "RadioGroup",
    category: "inputs",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Radio"]
  },
  {
    name: "Toggle",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Text","HelperText"]
  },
  {
    name: "Select",
    category: "inputs",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Label","HelperText","Icon"]
  },
  {
    name: "Calendar",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Button","Text"]
  },
  {
    name: "DatePicker",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["TextInput","Calendar"]
  },
  {
    name: "TimePicker",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["TextInput"]
  },
  {
    name: "DateRangePicker",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["TextInput","Calendar","Button"]
  },
  {
    name: "Upload",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Button","Text","Image","Spinner"]
  },
  {
    name: "FormField",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Label","HelperText","TextInput"]
  },
  {
    name: "Form",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["FormField","Button"]
  },
  {
    name: "SplitButton",
    category: "actions",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Button","Dropdown"]
  },
  {
    name: "CopyButton",
    category: "actions",
    props: [
      { name: "variant", type: "variant", options: ["default", "outline", "ghost", "destructive"], defaultValue: "default" },
      { name: "size", type: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      { name: "children", type: "reactNode", defaultValue: "Button" },
      { name: "disabled", type: "boolean", defaultValue: false }
    ],
    subComponents: ["Button","Tooltip"]
  },
  {
    name: "Sidebar",
    category: "navigation",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Button","Link","Text","Separator","Collapsible"]
  },
  {
    name: "Navbar",
    category: "navigation",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Button","Link","Dropdown","Separator"]
  },
  {
    name: "NavigationMenu",
    category: "navigation",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Button","Link","Text","Icon","Popover"]
  },
  {
    name: "Dropdown",
    category: "navigation",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Button","Icon"]
  },
  {
    name: "ContextMenu",
    category: "navigation",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Dropdown","Icon"]
  },
  {
    name: "Menubar",
    category: "navigation",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Button","Dropdown"]
  },
  {
    name: "Tabs",
    category: "navigation",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Text","Icon","Button"]
  },
  {
    name: "Breadcrumb",
    category: "navigation",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Link","Text"]
  },
  {
    name: "Pagination",
    category: "navigation",
    props: [
      { name: "total", type: "number", defaultValue: 50 },
      { name: "pageSize", type: "number", defaultValue: 10 },
      { name: "defaultValue", type: "number", defaultValue: 1 },
      { name: "className", type: "string" },
    ],
    subComponents: ["Button","Text"]
  },
  {
    name: "Stepper",
    category: "navigation",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Button","Text","Icon"]
  },
  {
    name: "Badge",
    category: "utilities",
    props: [
      { name: "className", type: "string" }
    ]
  },
  {
    name: "Tag",
    category: "utilities",
    props: [
      { name: "className", type: "string" }
    ]
  },
  {
    name: "AvatarGroup",
    category: "data-display",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Avatar"]
  },
  {
    name: "Table",
    category: "data-display",
    props: [
      { name: "className", type: "string" },
      { name: "items", type: "array", defaultValue: [{ label: "Item A", value: "a" }, { label: "Item B", value: "b" }] }
    ],
    subComponents: ["Checkbox","Button","Text","Skeleton","Pagination","EmptyState"]
  },
  {
    name: "TreeView",
    category: "data-display",
    props: [
      { name: "className", type: "string" },
      { name: "draggable", type: "boolean", defaultValue: false },
      { name: "allowAddSibling", type: "boolean", defaultValue: false },
      { name: "allowAddChild", type: "boolean", defaultValue: false },
      { name: "allowDelete", type: "boolean", defaultValue: false },
      {
        name: "items",
        type: "array",
        defaultValue: [
          {
            id: "root",
            label: "Documents",
            kind: "folder",
            children: [{ id: "drafts", label: "Drafts", kind: "file" }],
          },
        ],
      },
    ],
    subComponents: ["Text","Icon","Spinner"]
  },
  {
    name: "CodeBlock",
    category: "data-display",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["CopyButton","Text"]
  },
  {
    name: "Carousel",
    category: "data-display",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Image","Button","Text"]
  },
  {
    name: "Alert",
    category: "feedback",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Text","Button","Icon"]
  },
  {
    name: "Toast",
    category: "feedback",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Text","Button","Icon"]
  },
  {
    name: "Toaster",
    category: "feedback",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Toast"]
  },
  {
    name: "LoadingOverlay",
    category: "feedback",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Overlay","Spinner"]
  },
  {
    name: "Modal",
    category: "overlays",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Overlay","Card"]
  },
  {
    name: "AlertDialog",
    category: "overlays",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Overlay","Text","Button"]
  },
  {
    name: "Drawer",
    category: "overlays",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Overlay","Card","Button"]
  },
  {
    name: "Popover",
    category: "overlays",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Card","Button"]
  },
  {
    name: "HoverCard",
    category: "overlays",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Popover"]
  },
  {
    name: "Collapsible",
    category: "layout",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Button"]
  },
  {
    name: "CollapsiblePanel",
    category: "layout",
    props: [
      { name: "open", type: "boolean", defaultValue: true },
      { name: "defaultOpen", type: "boolean", defaultValue: true },
      { name: "closeDirection", type: "select", options: ["left", "right", "top", "bottom"], defaultValue: "left" },
      { name: "size", type: "string", defaultValue: "12rem" },
      {
        name: "collapsedSize",
        type: "string",
        description: "Omit: 0 for none/floater; icon rail for header",
      },
      { name: "crossAxis", type: "select", options: ["full", "parent", "viewport"], defaultValue: "parent" },
      { name: "triggerPlacement", type: "select", options: ["none", "header", "floater"], defaultValue: "floater" },
      { name: "triggerVariant", type: "select", options: ["default", "pill"], defaultValue: "default" },
      { name: "header", type: "reactNode", defaultValue: "Panel" },
      { name: "footer", type: "reactNode" },
      { name: "children", type: "reactNode", defaultValue: "Scrollable panel body." },
      { name: "scrollable", type: "boolean", defaultValue: true },
      { name: "variant", type: "variant", options: ["default", "inset"], defaultValue: "default" },
      { name: "className", type: "string" }
    ],
    subComponents: getSubComponents("CollapsiblePanel"),
  },
  {
    name: "Accordion",
    category: "layout",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Collapsible","Spinner","Icon"]
  },
  {
    name: "Chart",
    category: "data-viz",
    props: [
      { name: "data", type: "array", defaultValue: [{ label: "A", value: 40 }, { label: "B", value: 65 }] },
      { name: "height", type: "number", defaultValue: 200 }
    ]
  },
  {
    name: "BarChart",
    category: "data-viz",
    props: [
      { name: "data", type: "array", defaultValue: [{ label: "A", value: 40 }, { label: "B", value: 65 }] },
      { name: "height", type: "number", defaultValue: 200 }
    ],
    subComponents: ["Chart"]
  },
  {
    name: "LineChart",
    category: "data-viz",
    props: [
      { name: "data", type: "array", defaultValue: [{ label: "A", value: 40 }, { label: "B", value: 65 }] },
      { name: "height", type: "number", defaultValue: 200 }
    ],
    subComponents: ["Chart"]
  },
  {
    name: "PieChart",
    category: "data-viz",
    props: [
      { name: "data", type: "array", defaultValue: [{ label: "A", value: 40 }, { label: "B", value: 65 }] },
      { name: "height", type: "number", defaultValue: 200 }
    ],
    subComponents: ["Chart"]
  },
  {
    name: "TriggerModal",
    category: "patterns",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Modal","Button"]
  },
  {
    name: "FormModal",
    category: "patterns",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["TriggerModal","Form","FormField","PageHeader","Button","Icon"]
  },
  {
    name: "ConfirmModal",
    category: "patterns",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["TriggerModal","PageHeader","Button","Icon"]
  },
  {
    name: "AppShell",
    category: "patterns",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Sidebar","Navbar","PageFooter"]
  },
  {
    name: "PageHeader",
    category: "patterns",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Text","Pill","Separator","Icon"]
  },
  {
    name: "PageFooter",
    category: "patterns",
    props: [
      { name: "className", type: "string" },
      { name: "children", type: "reactNode", defaultValue: "Content" }
    ],
    subComponents: ["Text","Separator"]
  },
  {
    name: "Hero",
    category: "patterns",
    props: [
      { name: "className", type: "string" },
      { name: "children", type: "reactNode", defaultValue: "Content" }
    ],
    subComponents: ["Text","Button","Image","Pill"]
  },
  {
    name: "AuthLayout",
    category: "patterns",
    props: [
      { name: "className", type: "string" },
      { name: "children", type: "reactNode", defaultValue: "Content" }
    ],
    subComponents: ["Card","Text"]
  },
  {
    name: "EmptyState",
    category: "patterns",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Text","Button","Icon"]
  },
  {
    name: "InlineEdit",
    category: "inputs",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["TextInput","Text","Button"]
  },
  {
    name: "HistoryControlButtons",
    category: "patterns",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Button","Tooltip"]
  },
  {
    name: "FixedScreenWidget",
    category: "patterns",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["Button","Card"]
  },
  {
    name: "ResizeContainer",
    category: "layout",
    props: [
      { name: "className", type: "string" }
    ],
    subComponents: ["ResizablePanelGroup","ResizablePanel","ResizableHandle"]
  }
]

export const componentMetadata = applyEnrichedPropSchemas(rawComponentMetadata)

export function getComponentMetadata(name: string): ComponentMetadata | undefined {
  return componentMetadata.find((c) => c.name === name)
}
