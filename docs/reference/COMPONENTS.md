# Component Categories & Inventory

**Legend:** **✓** = shipped (implemented and exported from `src/index.ts`).

## Preview apps (`test/`)

| Route | Purpose |
|-------|---------|
| `/gallery` | Component catalog with props panel |
| `/showcase` | Interconnected mini admin app (sidebar views, shared state) |

**Showcase coverage:** All **98** shipped components are used in `/showcase` — main flows (Dashboard, Projects, Settings), shell chrome, and **Explore** (including Primitives for Icon, Label, Overlay, AuthLayout, etc.). Gallery (`/gallery`) remains the full props reference.

> Component nesting diagrams: [COMPONENT_GRAPH.md](./COMPONENT_GRAPH.md)

## Component Organization by Category

---

## Prop Taxonomy (Strict)

- `Props`: data, state, events, behavior.
- `StyleProps`: only component-relevant visual controls (`variant`, sizing, placement, surface/layout dimensions).
- `SlotProps`: pass-through grouped internal customization.
- Theme handles color tokens globally; avoid exposing per-component color props.

## Source Organization (By Category)

- `src/components/inputs`
- `src/components/actions`
- `src/components/navigation`
- `src/components/data-display`
- `src/components/feedback`
- `src/components/overlays`
- `src/components/layout`
- `src/components/utilities`
- `src/components/data-viz`
- `src/components/patterns`

Foundational pieces should live in their category folders (not a shared primitives bucket), e.g. `Button` in actions, `Card` in layout, `Text/Spinner/Skeleton` in data-display, `Icon` in utilities.

## Layering / Z-Index Contract

Token-backed Tailwind utilities (see `scripts/tokens/base.json`):

| Token | Class | Use |
|-------|-------|-----|
| `--z-sticky` (10) | `z-sticky` | In-page sticky chrome |
| `--z-dropdown` (20) | `z-dropdown` | Popovers, menus, pickers |
| `--z-overlay` (40) | `z-overlay` | Backdrops / scrims |
| `--z-modal` (50) | `z-modal` | Modal / drawer surfaces |
| `--z-toast` (60) | `z-toast` | Toaster, global tooltips |

When `container="parent"`, overlays use local stacking inside `OverlayPortalScope` instead of viewport-global layers.

### 1️⃣ Inputs (Data Entry)

#### Text Inputs

- ✓ TextInput
  - Props: `type? enum: text|password|number|email|url|search`, `value?`, `defaultValue?`, `onChange?`, `placeholder?`, `disabled?`, `readOnly?`, `required?`, `left?`, `right?`, `rightInteractive?` (use when `right` is a button; adornments are otherwise non-interactive), `label?`, `errorMessage?`, `maxLength?`, `minLength?`, `autoFocus?`, `autoComplete?`, `validate?`, `onValidate?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost|underline`, `className?`
  - SlotProps: `inputProps?`, `labelProps?`, `helperTextProps?`
  - Sub-components: Label, HelperText, Icon

- ✓ Textarea
  - Props: `value?`, `defaultValue?`, `onChange?`, `placeholder?`, `disabled?`, `readOnly?`, `required?`, `rows?`, `maxLength?`, `minLength?`, `autoFocus?`, `resize? enum: none|vertical|horizontal|both`, `label?`, `errorMessage?`, `validate?`, `onValidate?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost|underline`, `className?`
  - SlotProps: `textareaProps?`, `labelProps?`, `helperTextProps?`
  - Sub-components: Label, HelperText

- ✓ InputOTP
  - Props: `value?`, `defaultValue?`, `onComplete?`, `length?`, `disabled?`, `autoFocus?`, `mask?`, `label?`, `errorMessage?`, `validate?`, `onValidate?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost`, `className?`

- ✓ SearchInput — debounced search implemented with **TextInput** (`FieldLayout`, validation hooks, `fieldSurfaceVariants`): fixed `left` search icon, `right` clear button with `rightInteractive`. `onChange` is `(value: string) => void`. For dropdown suggestions use Command.
  - Props: inherits TextInput props except `onChange` shape, `left`, `right`, `type`; plus `onSearch?` (debounced), `onClear?`, `debounceMs?`, `clearable?`, `loading?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost|underline`, `className?` (via TextInput)
  - Sub-components: TextInput, Spinner (`loading`)

- ✓ PhoneInput
  - Props: `value?`, `defaultValue?`, `onChange?`, `defaultCountry?`, `allowedCountries?`, `placeholder?`, `disabled?`, `required?`, `label?`, `errorMessage?`, `validate?`, `onValidate?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost`, `className?`
  - SlotProps: `inputProps?`, `dropdownProps?`
  - Sub-components: TextInput, Dropdown (country selector)

- ✓ InputGroup
  - Props: `children`, `disabled?`, `loading?`, `invalid?`, `orientation? enum: horizontal|vertical`, `attached?`, `left?` (leading icon/slot inside `InputGroupInput`; pill shell when set, attached horizontal), `placeholder?` (default for `InputGroupInput`)
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost|underline`, `className?`
  - Sub-components: InputGroupInput, InputGroupButton, InputGroupAddon

- ✓ Command (Combobox / Command Palette)
  - Props: `items? CommandItem[]`, `value?`, `defaultValue?`, `onValueChange?`, `inputValue?`, `defaultInputValue?`, `onInputValueChange?`, `onSelect?`, `placeholder?`, `emptyState?`, `loading?`, `disabled?`, `loop?`, `debounceMs?`, `filterFn?`, `children?`
  - StyleProps: `maxHeight?`, `className?`
  - SlotProps: `searchInputProps?`, `dropdownProps?`
  - `CommandItem: { label, value, left?, group?, disabled?, keywords? }`
  - Note: Fuzzy-matching searchable list. Use for autocomplete, command palette, and search-with-results scenarios.
  - Sub-components: TextInput, Dropdown

#### Selection Controls

- ✓ Checkbox
  - Props: `checked?`, `default?`, `onChange?`, `indeterminate?`, `disabled?`, `required?`, `label?`, `description?`, `errorMessage?`
  - StyleProps: `size? enum: sm|md|lg`, `className?`
  - Note: If `checked` is passed without `onChange`, treat it as initial state (uncontrolled behavior). `default` is the explicit uncontrolled initializer.
  - Sub-components: Text, HelperText

- ✓ Radio
  - Props: `checked?`, `default?`, `onChange?`, `name?`, `value?`, `disabled?`, `required?`, `label?`, `description?`, `errorMessage?`
  - StyleProps: `size? enum: sm|md|lg`, `className?`
  - Note: If `checked` is passed without `onChange`, treat it as initial state (uncontrolled behavior). `default` is the explicit uncontrolled initializer.
  - Sub-components: Text, HelperText

- ✓ RadioGroup
  - Props: `items RadioGroupItem[]`, `value?`, `defaultValue?`, `onChange?`, `name?`, `heading?` (rendered as `<legend>`), `required?`, `disabled?`, `orientation? enum: horizontal|vertical`, `errorMessage?`
  - StyleProps: `size? enum: sm|md|lg`, `className?`
  - `RadioGroupItem: { label, value, description?, disabled? }`
  - Sub-components: Radio

- ✓ Toggle
  - Props: `checked?`, `default?`, `onChange?`, `disabled?`, `required?`, `label?`, `description?`, `errorMessage?`
  - StyleProps: `size? enum: sm|md|lg`, `className?`
  - Note: If `checked` is passed without `onChange`, treat it as initial state (uncontrolled behavior). `default` is the explicit uncontrolled initializer.
  - Sub-components: Text, HelperText

- ✓ Select
  - Props: `items SelectItem[]`, `value?`, `defaultValue?`, `onChange?`, `multiple?`, `placeholder?`, `searchable?`, `searchPlaceholder?`, `onSearchChange?`, `emptyState?`, `clearable?`, `label?`, `errorMessage?`, `disabled?`, `loading?`, `closeOnSelect?`, `children?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost`, `className?`
  - SlotProps: `inputProps?`, `dropdownProps?`, `searchInputProps?`, `listProps?`
  - `SelectItem: { label, value, disabled?, group?, left? }`
  - Sub-components: TextInput, Dropdown

- ✓ Slider
  - Props: `value?`, `defaultValue?`, `onChange?`, `min?`, `max?`, `step?`, `range?`, `disabled?`, `orientation? enum: horizontal|vertical`, `showValue?`, `valueFormatter?`, `marks? Mark[]`, `label?`, `errorMessage?`
  - StyleProps: `size? enum: sm|md|lg`, `className?`
  - `Mark: { value, label? }`
  - Note: `range: true` enables dual-handle range selection. No separate RangeSlider needed.
  - Note: If `value` is passed without `onChange`, treat it as initial state (uncontrolled behavior).
  - Sub-components: Label, HelperText

- ✓ Rating
  - Props: `value?`, `defaultValue?`, `onChange?`, `max?`, `precision? enum: 1|0.5|0.25`, `readOnly?`, `disabled?`, `left?`, `showValue?`, `label?`, `errorMessage?`
  - StyleProps: `size? enum: sm|md|lg`, `className?`

#### Date & Time

- ✓ Calendar
  - Props: `value?`, `defaultValue?`, `onChange?`, `minDate?`, `maxDate?`, `disabled?`, `selectionMode? enum: single|multiple|range`, `showOutsideDays?`, `weekStartsOn?`, `disabledDates?`, `highlightedDates?`, `locale?`
  - StyleProps: `className?`
  - Sub-components: Button, Text

- ✓ DatePicker
  - Props: `value?`, `defaultValue?`, `onChange?`, `minDate?`, `maxDate?`, `disabled?`, `required?`, `placeholder?`, `label?`, `errorMessage?`, `format?`, `locale?`, `closeOnSelect?`, `clearable?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost`, `className?`
  - SlotProps: `inputProps?`, `dropdownProps?`, `calendarProps?`
  - Sub-components: TextInput, Dropdown, Calendar

- ✓ TimePicker
  - Props: `value?`, `defaultValue?`, `onChange?`, `minTime?`, `maxTime?`, `disabled?`, `required?`, `placeholder?`, `label?`, `errorMessage?`, `format? enum: 12h|24h`, `step?`, `closeOnSelect?`, `clearable?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost`, `className?`
  - SlotProps: `inputProps?`, `dropdownProps?`
  - Sub-components: TextInput, Dropdown

- ✓ DateRangePicker
  - Props: `value?`, `defaultValue?`, `onChange?`, `minDate?`, `maxDate?`, `disabled?`, `required?`, `placeholder?`, `label?`, `errorMessage?`, `format?`, `locale?`, `closeOnSelect?`, `clearable?`, `presets? DatePreset[]`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost`, `className?`
  - SlotProps: `inputProps?`, `dropdownProps?`, `calendarProps?`
  - `DatePreset: { label, value: { from, to } }`
  - Sub-components: TextInput, Dropdown, Calendar

#### File & Upload

- ✓ Upload
  - Props: `onUpload`, `onRemove?`, `value?`, `defaultValue?`, `onChange?`, `multiple?`, `maxFiles?`, `accept?`, `maxSize?`, `disabled?`, `loading?`, `dragAndDrop?`, `preview?`, `label?`, `errorMessage?`, `showFileList?`, `children?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: outline|filled|ghost`, `className?`
  - Sub-components: Button, Text, Image

#### Form Utilities

- ✓ Label
  - Props: `htmlFor?`, `required?`, `left?`, `children?`
  - StyleProps: `size? enum: sm|md|lg`, `className?`
  - Sub-components: Text

- ✓ HelperText
  - Props: `tone? enum: default|muted|error`, `children?`
  - StyleProps: `className?`
  - Sub-components: Text (via `textVariants`)

- ✓ FieldLayout(internal)
  - Props: `label?`, `htmlFor?`, `required?`, `size? enum: sm|md|lg` (label), `errorMessage?`, `children`, `className?`
  - Sub-components: Label, HelperText (via `ControlErrorMessage`)

- ✓ FormField — wraps any input with label, error, and layout context
  - Props: `name`, `type?`, `label?`, `placeholder?`, `required?`, `disabled?`, `value?`, `defaultValue?`, `onChange?`, `validate?`, `errorMessage?`, `touched?`, `showError?`, `render?`, `children?`
  - StyleProps: `className?`
  - SlotProps: `inputProps?`, `labelProps?`, `helperTextProps?`
  - Sub-components: Label, HelperText, any input component

- ✓ Form — provides form state, validation context, and layout
  - Props: `onSubmit`, `onCancel?`, `initialValues?`, `values?`, `onValuesChange?`, `validate?`, `errors?`, `validateOn? enum: submit|change|blur`, `layout? enum: vertical|horizontal|grid`, `columns?`, `submitLabel?`, `cancelLabel?`, `footer?`, `disabled?`, `loading?`, `children?`
  - StyleProps: `className?`
  - SlotProps: `submitButtonProps?`, `cancelButtonProps?`
  - Note: Prefer children (FormField components) for complex forms. Programmatic `fields` config is for FormModal only.
  - Sub-components: FormField, Button

---

### 2️⃣ Actions

- ✓ Button
  - Props: `label?`, `left?`, `right?`, `iconOnly?`, `ariaLabel?`, `href?`, `onClick?`, `disabled?`, `loading?`, `children?`
  - StyleProps: `variant? enum: primary|secondary|outline|ghost|destructive`, `size? enum: sm|md|lg`, `className?`
  - Note: Renders as `<a>` when `href` is set.
  - Sub-components: Icon, Spinner

- ✓ SplitButton
  - Props: `onClick?`, `menuItems MenuItem[]`, `disabled?`, `loading?`, `children?`
  - StyleProps: `variant? enum: primary|secondary|outline|ghost`, `size? enum: sm|md|lg`, `className?`
  - SlotProps: `buttonProps?`, `dropdownProps?`
  - `MenuItem: { label, onClick?, left?, disabled?, separator? }`
  - Sub-components: Button, Dropdown

- ✓ FAB (Floating Action Button)
  - Props: `left`, `ariaLabel`, `onClick?`, `position? enum: bottom-right|bottom-left|bottom-center`
  - StyleProps: `variant? enum: primary|secondary`, `size? enum: sm|md|lg`, `className?`
  - Sub-components: Icon

- ✓ CopyButton
  - Props: `value`, `onValueCopy?`, `onCopyError?`, `copyLabel?` (ReactNode), `copiedLabel?` (ReactNode), `timeout?`, `tooltip?`, `tooltipLabel?` (ReactNode, idle tooltip; default `copyLabel`), `tooltipCopiedLabel?` (ReactNode; default `copiedLabel`), `disabled?`, `loading?`, `children?` (button body override)
  - StyleProps: `variant? enum: primary|secondary|outline|ghost|destructive`, `size? enum: sm|md|lg`, `className?`
  - Sub-components: Button, Tooltip

---

### 3️⃣ Navigation

- ✓ Sidebar
  - Props: `items SidebarItem[]`, `value?`, `defaultValue?`, `onChange?`, `side? enum: left|right`, `collapsible?`, `defaultCollapsed?`, `onCollapsedChange?`, `collapsed?`, `container? enum: screen|parent`, `heightMode? enum: viewport|parent|content`, `header?`, `footer?`, `children?`
  - StyleProps: `variant? enum: default|floating|inset`, `width?`, `collapsedWidth?`, `className?`
  - SlotProps: `toggleButtonProps?`, `itemProps?`
  - `SidebarItem: { label, href?, left?, badge?, disabled?, children?: SidebarItem[] }`
  - Sub-components: Button, Text, Separator, Collapsible

- ✓ Navbar
  - Props: `logo?`, `items NavItem[]`, `left?`, `right?`, `sticky?`, `separator?`, `children?`
  - StyleProps: `variant? enum: default|bordered|floating`, `className?`
  - `NavItem: { label, href?, left?, active?, disabled?, children?: NavItem[] }`
  - Sub-components: Button, Text, Dropdown, Separator

- ✓ NavigationMenu
  - Props: `items NavMenuItem[]`, `value?`, `defaultValue?`, `onChange?`, `orientation? enum: horizontal|vertical`, `children?`
  - StyleProps: `className?`
  - `NavMenuItem: { label, href?, left?, description?, children?: NavMenuItem[] }`
  - Sub-components: Button, Text, Icon, Popover

- ✓ Dropdown (Menu)
  - Props: `items DropdownItem[]`, `triggerProps`, `open?`, `defaultOpen?`, `onOpenChange?`, `onItemSelect?`, `closeOnSelect?`, `closeOnOutsideClick?`, `emptyState?`, `loading?`, `disabled?`, `portal?`, `children?`
  - StyleProps: `placement?`, `offset?`, `matchTriggerWidth?`, `className?`
  - SlotProps: `searchInputProps?`, `listProps?`, `contentProps?`
  - `DropdownItem: { label, value?, onClick?, left?, disabled?, separator?, children?: DropdownItem[] }`
  - `triggerProps: { label?, left?, variant?, className? }`
  - Sub-components: List, Button

- ✓ ContextMenu
  - Props: `items DropdownItem[]`, `open?`, `defaultOpen?`, `onOpenChange?`, `children?`
  - StyleProps: `className?`
  - Uses same `DropdownItem` shape as Dropdown. Triggered by right-click.
  - Sub-components: Dropdown

- ✓ Menubar
  - Props: `menus MenubarMenu[]`, `value?`, `defaultValue?`, `onChange?`
  - StyleProps: `className?`
  - `MenubarMenu: { label, items: DropdownItem[] }`
  - Sub-components: Button, Dropdown

- ✓ Tabs
  - Props: `items TabItem[]`, `value?`, `defaultValue?`, `onChange?`, `orientation? enum: horizontal|vertical`, `children?`
  - StyleProps: `variant? enum: default|underline|pill`, `className?`
  - `TabItem: { label, value, left?, badge?, disabled?, content? }`
  - Sub-components: Button

- ✓ Breadcrumb
  - Props: `items BreadcrumbItem[]`, `separator?`, `maxItems?`
  - StyleProps: `className?`
  - `BreadcrumbItem: { label, href?, current? }`
  - Sub-components: Text, Icon, Link

- ✓ Pagination
  - Props: `value?`, `defaultValue?`, `onChange?`, `total`, `pageSize?`, `pageCount?`, `siblingCount?`, `showFirstLast?`
  - StyleProps: `className?`
  - Sub-components: Button, Text

- ✓ Stepper
  - Props: `steps StepItem[]`, `value?`, `defaultValue?`, `onChange?`, `orientation? enum: horizontal|vertical`
  - StyleProps: `className?`
  - `StepItem: { label, description?, optional?, status? enum: complete|current|upcoming|error }`
  - Sub-components: Button, Text, Icon

---

### 4️⃣ Data Display

#### Typography & Labels

- ✓ Text
  - Props: `as?`, `left?`, `right?`, `children?`
  - StyleProps: `size? enum: xs|sm|base|md|lg|xl|2xl`, `variant? enum: default|muted|subtle|code`, `weight? enum: normal|medium|semibold|bold|extrabold`, `truncate?`, `lineClamp?`, `className?`
  - Note: Uses a stable left / content / right layout with proper truncation and inline alignment for label-like UI.
  - Sub-components: Icon

- ✓ Link
  - Props: `href`, `target? enum: _self|_blank`, `rel?`, `children?`
  - StyleProps: `variant? enum: default|muted|underline`, `className?`
  - Note: Auto-applies `rel="noopener noreferrer"` when `target="_blank"` and `rel` is omitted. Replaces bare `<a>` usage. (uses `fieldPieces` focus-ring tokens; compose with `Text` as children when needed)

- ✓ Pill — unified chip (counts, status, filters, removable tags, **button-style toggles** via `toggleSurface`). **`Badge`** and **`Tag`** remain export aliases for compatibility (`Tag` maps `label` + surface `variant` → `appearance`).
  - Props: `as? enum: span|button`, `left?`, `right?`, `onRemove?`, `dot?`, `selected?`, `loading?`, `tone? enum: neutral|info|success|warning|danger`, `variant? enum: default|muted|subtle|code|danger|outline` (Typography / `Text`; not the same union as `appearance`), `disabled?`, `children?`
  - StyleProps: `appearance? enum: solid|subtle|outline|ghost` (ignored when `toggleSurface` is set), `toggleSurface? enum: primary|secondary|outline|ghost` (button-like chip), `size? enum: sm|md`, `shape? enum: rounded|pill`, `className?`
  - Sub-components: Text, Spinner

- ✓ Badge — alias of **Pill** (same props API).

- ✓ Tag — thin wrapper: `label`, `variant?` (solid|subtle|outline) → Pill `appearance`, optional `onRemove`.

- ✓ PillGroup
  - Props: `items PillItem[]`, `value?`, `defaultValue?`, `onChange?`, `selectable?`, `onSelect?`, `multiple?`, `removable?`, `onRemove?`, `maxVisible?`, `overflowLabel?`, `loading?`, `children?`
  - StyleProps: `size? enum: sm|md`, `variant? enum: solid|subtle|outline|ghost` (Pill `appearance` when `toggleSurface` omitted), `toggleSurface? enum: primary|secondary|outline|ghost`, `gap? enum: sm|md|lg`, `wrap?`, `className?`
  - `PillItem: { label, value, tone? enum: neutral|info|success|warning|danger, disabled?, left?, selected?, dot?, loading? }`
  - Note: Wrap-friendly pill selector/display group; use `selectable` + `toggleSurface` for segmented control–style UI (replaces a separate toggle-group). For dropdown-based multi-select, use `Select` with `multiple`.
  - Sub-components: Pill, Spinner

- ✓ Kbd
  - Props: `children?`
  - StyleProps: `size? enum: sm|md`, `className?`

- ✓ Avatar
  - Props: `src?`, `alt?`, `fallback?`, `status? enum: online|offline|away|busy`
  - StyleProps: `size? enum: xs|sm|md|lg|xl`, `shape? enum: circle|square`, `className?`
  - Sub-components: Icon

- ✓ AvatarGroup
  - Props: `items AvatarProps[]`, `max?`
  - StyleProps: `size? enum: xs|sm|md|lg|xl`, `className?`
  - Sub-components: Avatar

#### Structured Data

- ✓ Table
  - Props: `data`, `columns TableColumn[]`, `sortable?`, `selectable?`, `selectedRows?`, `onSelectionChange?`, `stickyHeader?`, `onRowClick?`, `loading?`, `emptyState?`, `pagination? PaginationProps`
  - StyleProps: `variant? enum: default|striped|bordered`, `size? enum: sm|md|lg`, `className?`
  - `TableColumn: { key, header, render?, sortable?, width?, align? enum: left|center|right }`
  - Sub-components: Text, Button, Icon, Skeleton, Pagination

- ✓ List
  - Props: `items ListItem[]`, `layout? enum: list|grid`, `listType? enum: unordered|ordered|none`, `header?`, `search? boolean | ListSearchConfig` (`filter?`, `defaultQuery?`, plus SearchInput props except wired handlers), `divider?`, `selectable?`, `selectedValue?`, `defaultSelectedValue?`, `onSelect?`, `emptyState?`, `noResultsState?`, `loading?`, `children?`
  - When `layout=list`: forwards **Stack** props — `direction?`, `gap? enum: none|sm|md|lg`, `align?`, `justify?`, `wrap?`
  - When `layout=grid`: forwards **Grid** props — `columns?`, `rows?`, `minChildWidth?`, `gridGap?`, `gap?` (if `gridGap` omitted), `columnGap?`, `rowGap?`, `autoFlow?`, `alignItems?`, `justifyItems?`
  - StyleProps: `className?` (root); inner layout uses Stack/Grid tokens above
  - `ListItem: { label, value?, left?, description?, action?, disabled?, selected? }`
  - Sub-components: Stack, Grid, SearchInput, Text, Icon
  - Built-in default filter: `defaultListItemFilter` (label/description/value substring, case-insensitive). For virtualised lists compose with a scroll container.

- ✓ DescriptionList
  - Props: `items DescriptionItem[]`, `layout? enum: horizontal|vertical`
  - StyleProps: `size? enum: sm|md`, `className?`
  - `DescriptionItem: { label, value }`

- ✓ TreeView
  - Props: `items TreeItem[]`, `selectedId?`, `defaultSelectedId?`, `onSelect?`, `expandedIds?`, `defaultExpandedIds?`, `onExpandedChange?`, `showIndentGuides?`, `loading?`, `emptyState?`, `draggable?`, `onMove?`
  - StyleProps: `indent?`, `className?`
  - `TreeItem: { id, label, left?, children?: TreeItem[] }`
  - Sub-components: List, Collapsible, Text

- ✓ CodeBlock
  - Props: `code`, `language?`, `showLineNumbers?`, `showCopy?`, `filename?`
  - StyleProps: `className?`
  - Sub-components: Text, CopyButton

#### Visual Indicators

- ✓ Progress
  - Props: `value?`, `max?`, `loading?`, `showLabel?`
  - StyleProps: `size? enum: sm|md|lg`, `variant? enum: linear|circular`, `className?`
  - Note: `variant="circular"` covers circular progress. No separate CircularProgress needed.
  - Sub-components: Text

- ✓ Skeleton
  - Props: `variant? enum: text|avatar|button|badge|card|input|checkbox|radio`, `count?`
  - StyleProps: `width?`, `height?`, `className?`

- ✓ Spinner
  - Props: `label?`
  - StyleProps: `size? enum: xs|sm|md|lg`, `className?`
  - Sub-components: Text (via `textVariants` for color)

#### Media

- ✓ Image
  - Props: `src`, `alt?`, `loading?`, `loadingStrategy? enum: lazy|eager`, `fallback?`, `placeholder? enum: blur|skeleton|none`, `allowFullscreen?`
  - StyleProps: `width?`, `height?`, `fit? enum: cover|contain|fill|none|scale-down`, `position?`, `variant? enum: default|rounded|circle|square`, `className?`
  - Sub-components: Skeleton

- ✓ AspectRatio
  - Props: `ratio?` (default 16:9), `children?`
  - StyleProps: `minWidth?`, `maxWidth?`, `className?`
  - Note: When `children` is a string, `{ratio}` is replaced with a readable label (e.g. `16:9`), same pattern as `{count}` in PillGroup `overflowLabel`.

- ✓ Video
  - Props: `src`, `poster?`, `controls?`, `autoPlay?`, `muted?`, `loop?`, `onPlay?`, `onPause?`, `onEnded?`
  - StyleProps: `width?`, `height?`, `className?`

- ✓ Carousel
  - Props: `items CarouselItem[]`, `autoPlay?`, `loop?`, `interval?`, `showIndicators?`, `showArrows?`
  - StyleProps: `className?`, `orientation?`
  - `CarouselItem: { image, imageAlt?, content? }`
  - Sub-components: Image, Button, Icon

---

### 5️⃣ Feedback & Status

- ✓ Alert (inline contextual message)
  - Props: `title?`, `description?`, `left?`, `action?`, `tone? enum: neutral|info|success|warning|danger`, `dismissible?`, `onClose?` (runs after the close control **unmounts** the alert internally), `children?`
  - StyleProps: `variant? enum: solid|subtle|outline`, `className?`
  - Note: Replaces `Banner`. For page-level notification bars use `variant="solid"` with full-width layout. When `dismissible`, the close button removes the alert from the tree; use `onClose` for side effects only.
  - Sub-components: Text, Button, Icon

- ✓ Toast
  - Props: `title?`, `description?`, `duration?`, `action?`, `tone? enum: neutral|info|success|warning|danger`, `onClose?`, `left?`, `dismissible?`
  - StyleProps: `variant? enum: solid|subtle|outline`, `className?`
  - Sub-components: Text, Button, Icon

- ✓ Toaster (provider / container)
  - Props: `position? enum: top-left|top-center|top-right|bottom-left|bottom-center|bottom-right`, `maxVisible?`
  - StyleProps: `className?`
  - Note: Singleton provider. Manages toast queue, stacking, and positioning.
  - Sub-components: Toast

- ✓ LoadingOverlay
  - Props: `open`, `message?`
  - StyleProps: `blur?`, `className?`
  - Sub-components: Overlay, Spinner

---

### 6️⃣ Overlays & Surfaces

- ✓ Overlay (backdrop primitive)
  - Props: `open?`, `onClose?`, `showCloseButton?`, `closeOnBackdropClick?`, `container?`, `children?`
  - StyleProps: `blur?`, `className?`

- ✓ Modal
  - Props: `open?`, `defaultOpen?`, `onOpenChange?`, `onClose?`, `triggerProps?`, `header?`, `footer?`, `showClose?`, `loading?`, `initialFocus?`, `children?`
  - StyleProps: `size? enum: sm|md|lg|xl|full`, `minHeight?`, `maxHeight?`, `className?`
  - SlotProps: `cardProps?`
  - `triggerProps: { label?, left?, variant?, className? }`
  - Sub-components: Overlay, Card, Button

- ✓ AlertDialog
  - Props: `open?`, `defaultOpen?`, `onOpenChange?`, `title`, `description?`, `variant? enum: default|destructive|warning`, `confirmProps`, `cancelProps?`, `loading?`
  - StyleProps: `className?`
  - `confirmProps: { label, onClick, loading? }`
  - `cancelProps: { label, onClick }`
  - Note: Always exactly two actions. Not a general modal — use Modal for freeform content.
  - Sub-components: Overlay, Text, Button

- ✓ Drawer
  - Props: `open?`, `defaultOpen?`, `onOpenChange?`, `showClose?`, `header?`, `footer?`, `initialFocus?`, `children?`
  - StyleProps: `placement? enum: top|bottom|left|right`, `size? enum: sm|md|lg|xl|full`, `variant? enum: default|sheet`, `className?`
  - Note: `variant="sheet"` replaces the separate Sheet component (bottom slide-up with rounded corners).
  - Sub-components: Overlay, Card, Button, Portal

- ✓ Popover
  - Props: `open?`, `defaultOpen?`, `onOpenChange?`, `triggerProps?`, `closeOnOutsideClick?`, `initialFocus?`, `children?`
  - StyleProps: `placement?`, `offset?`, `className?`
  - SlotProps: `cardProps?`
  - `triggerProps: { label?, left?, variant?, className? }`
  - Sub-components: Card, Portal

- ✓ HoverCard
  - Props: `open?`, `defaultOpen?`, `onOpenChange?`, `triggerProps?`, `openDelay?`, `closeDelay?`, `children?`
  - StyleProps: `placement?`, `className?`
  - `triggerProps: { label?, left?, className? }`
  - Note: Popover triggered on hover. Use for preview cards on links or avatars.
  - Sub-components: Popover

- ✓ Tooltip
  - Props: `content`, `openDelay?`, `disabled?`, `children?`
  - StyleProps: `placement?`, `variant? enum: default|inverted|info`, `className?`

---

### 7️⃣ Layout & Structure

- ✓ Stack
  - Props: `as? enum: div|ul|ol`, `direction? enum: row|column`, `items`, `renderItem`, `getItemKey?`
  - StyleProps: `gap?`, `align?`, `justify?`, `wrap?`, `className?`
  - Note: `renderItem: (item, index) => ReactNode` — layout only; no `children`.

- ✓ Grid
  - Props: `as? enum: div|ul|ol`, `columns? enum: 1|2|3|4|6|12`, `rows? enum: 1|2|3|4|5|6`, `autoFlow? enum: default|row|column|dense|rowDense|colDense` (`default` = CSS initial row flow, no utility), `items`, `renderItem`, `getItemKey?`
  - StyleProps: `gap?`, `columnGap?`, `rowGap?`, `minChildWidth?`, `alignItems?`, `justifyItems?`, `className?`
  - Note: `renderItem: (item, index) => ReactNode` — same list pattern as Stack; no `children`.

- ✓ Separator
  - Props: `orientation? enum: horizontal|vertical`, `decorative?`
  - StyleProps: `variant? enum: solid|dashed|dotted`, `className?`

- ✓ Card (surface container)
  - Props: `header?`, `footer?`, `children?`
  - StyleProps: `variant? enum: transparent|surface-1|surface-2|outlined`, `size? enum: sm|md|lg`, `minHeight?`, `maxHeight?`, `className?`
  - Note: Header and footer stay pinned while only body content scrolls.

- ✓ Collapsible
  - Props: `open?`, `defaultOpen?`, `onOpenChange?`, `trigger?`, `disabled?`, `header?`, `footer?`, `children?`
  - StyleProps: `direction? enum: vertical|horizontal`, `className?`
  - Sub-components: Button

- ✓ Accordion
  - Props: `items AccordionItem[]`, `type? enum: single|multiple`, `value?`, `defaultValue?`, `onChange?`, `collapsible?`, `disabled?`
  - StyleProps: `className?`
  - `AccordionItem: { value, label, content, left?, disabled?, loading? }`
  - Sub-components: Collapsible

- ✓ ResizablePanelGroup / ResizablePanel / ResizableHandle
  - `ResizablePanelGroup` Props: `direction? enum: horizontal|vertical`, `onLayout?`, `children?`
  - `ResizablePanelGroup` StyleProps: `className?`
  - `ResizablePanel` Props: `defaultSize?`, `minSize?`, `maxSize?`, `collapsible?`, `collapsedSize?`, `onCollapse?`, `onExpand?`, `children?`
  - `ResizablePanel` StyleProps: `className?`
  - `ResizableHandle` Props: `withHandle?`, `disabled?`
  - `ResizableHandle` StyleProps: `className?`

---

### 8️⃣ Utilities

- ✓ VisuallyHidden
  - Props: `asChild?`, `children?`
  - StyleProps: `className?`

- ✓ ErrorBoundary
  - Props: `fallback?`, `onError?`, `children?`
  - StyleProps: `className?`
  - Sub-components: Text

- ✓ Icon
  - Props: `node`, `alt?`, `status? enum: online|offline|away|busy`, `statusPosition? enum: top-right|bottom-right`, `fallback?`
  - StyleProps: `size? enum: xs|sm|md|lg|xl`, `variant? enum: default|muted`, `shape? enum: default|circle|square`, `className?`

---

### 9️⃣ Data Visualization

- ✓ Chart
  - Props: `type enum: bar|line|area|pie|donut|scatter`, `data`, `xKey?`, `yKey?`, `valueKey?`, `labelKey?`, `responsive?`, `legend?`, `tooltip?`, `grid?`, `config?`
  - StyleProps: `height?`, `width?`, `className?`
  - Note: Base chart engine used internally by specialized chart components and available for direct advanced use.
  - Sub-components: SVG

- ✓ BarChart
  - Props: `data`, `xKey`, `yKey`, `stacked?`, `horizontal?`, `responsive?`, `legend?`, `tooltip?`, `grid?`
  - StyleProps: `height?`, `width?`, `className?`
  - Note: Specialized chart component for bar/column visuals. Uses `Chart` internally.
  - Sub-components: Chart

- ✓ LineChart
  - Props: `data`, `xKey`, `yKey`, `curve? enum: linear|monotone|step`, `showPoints?`, `area?`, `responsive?`, `legend?`, `tooltip?`, `grid?`
  - StyleProps: `height?`, `width?`, `className?`
  - Note: Specialized chart component for line/time-series visuals. Uses `Chart` internally.
  - Sub-components: Chart

- ✓ PieChart
  - Props: `data`, `valueKey`, `labelKey?`, `innerRadius?`, `padAngle?`, `startAngle?`, `endAngle?`, `responsive?`, `legend?`, `tooltip?`
  - StyleProps: `height?`, `width?`, `className?`
  - Note: Specialized chart component for pie/donut visuals. Uses `Chart` internally.
  - Sub-components: Chart

---

### 🔟 Composite / Pattern Components

#### Modal Patterns

- ✓ TriggerModal
  - Props: `open?`, `defaultOpen?`, `onOpenChange?`, `triggerProps?`, `header?`, `footer?`, `showClose?`, `loading?`, `children?`
  - StyleProps: `minHeight?`, `maxHeight?`, `className?`
  - `triggerProps: { label?, left?, variant?, className? }`
  - Sub-components: Modal, Button, Text, Icon

- ✓ FormModal
  - Props: `open?`, `onOpenChange?`, `triggerProps?`, `heading`, `subheading?`, `left?`, `mode? enum: create|edit`, `fields? FormFieldSchema[]`, `formProps?`, `onSubmit`, `onSubmitSuccess?`, `onSubmitError?`, `submitLabel?`, `submittingLabel?`, `cancelLabel?`, `loading?`, `submitDisabled?`, `onCancel?`, `validateOnSubmit?`, `children?`
  - StyleProps: `className?`
  - SlotProps: `submitButtonProps?`, `cancelButtonProps?`, `triggerModalProps?`
  - `triggerProps: { label, left?, variant?, className? }`
  - Note: If `children` is provided, schema mode (`fields`) is ignored.
  - Sub-components: TriggerModal, Form, Button, PageHeader, Icon

- ✓ ConfirmModal
  - Props: `open?`, `onOpenChange?`, `triggerProps?`, `heading`, `description?`, `left?`, `intent? enum: default|destructive|delete|save|warning`, `confirmProps`, `cancelProps?`, `loading?`
  - StyleProps: `className?`
  - SlotProps: `triggerModalProps?`
  - `triggerProps: { label, left?, variant?, className? }`
  - `confirmProps: { label, loading? }`
  - `cancelProps: { label }`
  - Sub-components: TriggerModal, Button, PageHeader, Icon

#### Layout Patterns

- ✓ AppShell
  - Props: `sidebar?`, `header?`, `footer?`, `children?`
  - StyleProps: `className?`
  - Sub-components: Sidebar, Navbar, PageFooter

- ✓ PageHeader
  - Props: `heading?`, `subheading?`, `description?`, `badge?`, `actions?`, `left?`, `right?`, `sticky?`, `separator?`, `children?`
  - StyleProps: `variant? enum: default|bordered|minimal`, `className?`
  - Note: In-page section header — not the `<header>` element.
  - Sub-components: Text, Badge, Button, Separator

- ✓ PageFooter
  - Props: `left?`, `right?`, `sticky?`, `separator?`, `children?`
  - StyleProps: `variant? enum: default|minimal`, `className?`
  - Sub-components: Text, Separator

- ✓ Hero
  - Props: `title?`, `description?`, `image?`, `badge?`, `actions?`, `children?`
  - StyleProps: `variant? enum: default|centered|split`, `className?`
  - `actions: { primary?: ButtonProps, secondary?: ButtonProps }`
  - Sub-components: Text, Button, Image, Badge

- ✓ AuthLayout
  - Props: `title?`, `subtitle?`, `logo?`, `footer?`, `children?`
  - StyleProps: `className?`
  - Sub-components: Card, Text

- ✓ EmptyState
  - Props: `title?`, `description?`, `icon?`, `action?`
  - StyleProps: `variant? enum: default|minimal|spacious|error` (distinct surfaces: card vs bare vs dashed vs destructive), `size? enum: sm|md|lg`, `className?`
  - `action: { label, onClick?, loading?, disabled?, variant? }`
  - Sub-components: Text, Button, Icon

#### Interaction Patterns

- ✓ InlineEdit
  - Props: `value?`, `defaultValue?`, `onSave?`, `onCancel?`, `placeholder?`, `disabled?`, `required?`, `validate?`, `onValidate?`, `editTrigger? enum: click|doubleClick`, `saveOnBlur?`, `saveOnEnter?`
  - StyleProps: `size? enum: sm|md|lg`, `className?`
  - SlotProps: `textInputProps?`, `saveButtonProps?`, `cancelButtonProps?`
  - Sub-components: TextInput, Text, Button

- ✓ HistoryControlButtons
  - Props: `canUndo?`, `canRedo?`, `onUndo?`, `onRedo?`, `onReset?`, `showLabels?`
  - StyleProps: `className?`
  - SlotProps: `undoButtonProps?`, `redoButtonProps?`, `resetButtonProps?`
  - Sub-components: Button, Tooltip

- ✓ FixedScreenWidget
  - Props: `open?`, `defaultOpen?`, `onOpenChange?`, `position? enum: top-left|top-right|bottom-left|bottom-right|left-center|right-center`, `slideFrom? enum: left|right|top|bottom`, `trigger?`, `triggerProps?`, `panelProps?`, `offsetX?`, `offsetY?`, `pointerEvents? enum: none|auto`, `closeOnOutsideClick?`, `closeOnEscape?`, `children?`
  - StyleProps: `className?`
  - Note: Fixed on-screen utility panel with slide in/out behavior for use cases like AI chat launcher, corner tools, and edge contact/help widgets.
  - Sub-components: Button, Card

#### Container Patterns

- ✓ ResizeContainer
  - Props: `direction? enum: horizontal|vertical|both`, `minScale?`, `maxScale?`, `defaultScale?`, `scale?`, `onScaleChange?`, `fit? enum: contain|cover|fill`, `showControls?`, `disabled?`, `children?`
  - StyleProps: `maxWidth?`, `maxHeight?`, `className?`
  - SlotProps: `containerProps?`, `contentProps?`
  - Sub-components: ResizablePanelGroup, ResizablePanel, ResizableHandle

---

## Component Count

| Category | Count |
|----------|-------|
| Inputs | 23 |
| Actions | 4 |
| Navigation | 10 |
| Data Display | 20 |
| Feedback | 4 |
| Overlays | 7 |
| Layout | 7 |
| Utilities | 4 |
| Data Viz | 4 |
| Composite | 13 |
| TOTAL | 96 |

---