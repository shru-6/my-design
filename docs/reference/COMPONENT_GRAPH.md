# Component composition graph

**Personal reference** — how components nest inside each other. ASCII flowcharts render everywhere (no Mermaid needed).

> **Source of truth:** `test/src/utils/metadata/subComponentsMap.ts`  
> **Inventory (98):** [COMPONENTS.md](./COMPONENTS.md)  
> **Gallery props:** `componentMetadata.ts` + `propSchemas.ts` + `galleryPreviewProps.ts`

---

## How to read this

```
  ___________          ___________
 |  Parent   |  --->  |  Child    |     Parent renders Child internally
 -------------        -------------
```

| Symbol | Meaning |
|--------|---------|
| `A ──► B` | A **renders** B (direct child) |
| `A ···► B` | Optional / conditional |
| `[ box ]` | Component |
| `( layer )` | z-index or abstraction layer |

Edges are **one level deep** unless noted. Props → TypeScript `XxxProps` or gallery.

---

## 1. Layer model

Higher layers compose lower ones.

```
                    _______________________
                   |  ⑤ Patterns          |
                   |  AppShell            |
                   |  FormModal           |
                   |  ConfirmModal        |
                   |  Hero, AuthLayout    |
                   |  EmptyState          |
                    ---------------------
                              |
              +---------------+---------------+
              |                               |
              v                               v
   _______________________         _______________________
  |  ④ Navigation         |       |  ③ Surfaces          |
  |  Sidebar, Navbar      |       |  Card, Table, List   |
  |  Tabs, Breadcrumb     |       |  Alert, Toast        |
  |  Pagination, Stepper  |       |  Modal, Drawer       |
   ---------------------           ---------------------
              \                               /
               \                             /
                v                           v
         _______________________
        |  ② Inputs & actions   |
        |  Form, FormField      |
        |  TextInput, Select    |
        |  Button, Upload       |
         ---------------------
                    |
                    v
         _______________________
        |  ① Primitives         |
        |  Text, Icon, Spinner  |
        |  Skeleton, Overlay    |
        |  Separator            |
        |  Label, HelperText    |
         ---------------------
```

---

## 2. Overlay & z-index stack

Viewport-global stacking (top = front). `container="parent"` → local stack inside `OverlayPortalScope`.

```
  ( z-toast 60 )  highest
  _______________________
 |       Toaster         |
  ---------------------
           |
           v
  _______________________
 |        Toast          |
  ---------------------
     |         |
     v         v
  [ Text ]  [ Button ]  [ Icon ]


  ( z-modal 50 )
  _______________________
 |   Modal / Drawer      |
 |   AlertDialog         |
  ---------------------
           |
     +-----+-----+
     v           v
  [ Card ]    [ Button ]


  ( z-overlay 40 )
  _______________________
 |      Overlay          |  ◄── backdrop / scrim
  ---------------------
           ^
           | used by Modal, Drawer, AlertDialog,
           |         LoadingOverlay


  ( z-dropdown 20 )
  _______________________
 |  Dropdown, Popover    |
 |  Select menu          |
 |  ContextMenu          |
  ---------------------
           |
     +-----+-----+
     v           v
  [ Button ]  [ Icon ]

  HoverCard ···► Popover


  ( z-sticky 10 )  in-page chrome
  _______________________
 | Navbar, PageHeader    |
 | Table (sticky header) |
  ---------------------
```

### Modal family

```
  _______________________       _______________________
 |      FormModal        |       |    ConfirmModal     |
  ---------------------         ---------------------
           |                               |
           +───────────┬───────────────────┘
                       v
              _______________________
             |     TriggerModal      |
              ---------------------
                   |           |
                   v           v
            ___________   ___________
           |   Modal   |   | Button  |  trigger
            -----------   -----------
                   |
         +---------+---------+
         v         v         v
   ___________ ___________ ___________
  |  Overlay  | |  Card   | | Button  |
   ----------- ----------- -----------


  FormModal also pulls in:

  ___________     ___________     ___________
 |   Form    |──►| FormField |──►| TextInput |
  -----------     -----------     -----------
       |               |
       v               +──► Label, HelperText
  ___________
 |  Button   |  submit
  -----------

  ___________
 | PageHeader│──► Text, Pill
  -----------
```

| Component | Adds on top of Modal |
|-----------|----------------------|
| `TriggerModal` | `triggerProps` opens modal |
| `FormModal` | `Form` + `PageHeader` + submit |
| `ConfirmModal` | `PageHeader` + intent |
| `Drawer` | Same overlay pattern, slides from edge |
| `AlertDialog` | Focus-trapped confirm + actions |

---

## 3. Input & form anatomy

### Standard field

```
  ___________
 |   Form    |
  -----------
       |
   +---+---+
   v       v
___________   ___________
| FormField | | Button  |  submit
 -----------   -----------
       |
   +---+---+---+
   v   v       v
_____ _____ ___________
|Label|Help | TextInput |
 ---  ---   -----------
  |    |         |
  v    v         v
[Text][Text]  [ Icon ]


  FormField can swap TextInput for:

  ___________  ___________  ___________  ___________
 | Textarea  ||  Select   || Checkbox  ||  Radio   |
  -----------  -----------  -----------  -----------
       |            |            |            |
       +────────────+────────────+────────────+
                    |
              Label, HelperText, Text …
```

### Picker & date chain

```
  ___________         ___________
 | DatePicker|──────►| TextInput |
  -----------         -----------
       |
       v
  ___________
 | Calendar  |──► Button, Text
  -----------

  ___________         ___________         ___________
 |DateRange  |──────►| TextInput |       | Calendar  |
 |  Picker   |──────────────────►────────►-----------
  -----------                             |
       |                                  v
       └────────────────────────────► [ Button ]


  ___________         ___________
 |TimePicker |──────►| TextInput |
  -----------         -----------

  ___________         ___________         ___________
 |PhoneInput |──────►| TextInput |──────►| Dropdown  |
  -----------         -----------         -----------

  ___________         ___________         ___________
 |  Command  |──────►|SearchInput|──────►| TextInput |
  -----------         -----------         -----------
                            |
                            v
                       [ Spinner ]
```

### InputGroup & inline edit

```
  ___________
 | InputGroup|
  -----------
       |
   +---+---+---+
   v   v       v
 _____ _____ _______________
|Input|Addon|InputGroupBtn |──► Button
 ---  ---   ----------------


  ___________
 | InlineEdit|
  -----------
       |
   +---+---+---+
   v   v       v
 _____ _____ ___________
|Text |Text | Button   |
|Input|     |
 ---        


  ___________
 |RadioGroup |──► Radio (× n)
  -----------
```

---

## 4. App shell & navigation

### Shell frame

```
  _______________________
 |       AppShell        |
  ---------------------
       |         |         |
       v         v         v
 ___________ ___________ ___________
|  Sidebar  ||  Navbar  ||PageFooter|
 ----------- ----------- -----------
       |         |
       v         v
  Button      Button
  Link        Link
  Text        Dropdown
  Collapsible Separator
  Separator


  Typical page content (inside AppShell children):

  ___________         ___________
 | PageHeader|         |  Hero   |
  -----------         -----------
       |                   |
       v                   v
  Text, Pill          Text, Button
  Separator, Icon       Image, Pill
```

### Navigation controls

```
  ___________     ___________     ___________
 |   Tabs    |     |  Stepper  |     |Breadcrumb |
  -----------     -----------     -----------
   |  |  |          |  |  |          |       |
   v  v  v          v  v  v          v       v
 Btn Text Icon    Btn Text Icon    Link    Text


  ___________     ___________     ___________
 |Pagination |     | Menubar   |     | NavMenu   |
  -----------     -----------     -----------
   |     |            |               |
   v     v            v               v
 Button Text      Button         Popover
                  Dropdown       Button, Link
```

---

## 5. Data display & lists

```
  ___________
 |   Table   |
  -----------
       |
   +---+---+---+---+---+
   v   v   v   v   v   v
 Check Btn Text Skel Page Empty
 box       eton ation State


  ___________
 |   List    |
  -----------
       |
   +---+---+---+---+
   v   v   v   v   v
 Stack Grid Search Text Icon
             Input


  ___________         ___________
 | PillGroup |──────►|   Pill    |──► Text, Spinner
  -----------         -----------


  ___________
 |  TreeView |
  -----------
       |
   +---+---+---+
   v   v       v
 Text Icon  Spinner


  ___________         ___________         ___________
 | CodeBlock |──────►| CopyButton|──────►|  Button   |
  -----------         -----------    └──►|  Tooltip  |
                                         -----------


  ___________         ___________
 |  Carousel |──────►|   Image   |──► Skeleton (fallback)
  -----------         -----------
       |
   +---+---+
   v       v
 Button   Text


  ___________         ___________
 |AvatarGroup|──────►|  Avatar   |──► Icon
  -----------         -----------
```

---

## 6. Layout, resize & panels

```
  _______________________
 | ResizablePanelGroup   |
  ---------------------
           |
       +---+---+
       v       v
 ___________ _______________
|Resizable  ||Resizable    |
|  Panel    ||  Handle     |
 -----------  --------------


  _______________________
 |   ResizeContainer     |  wraps panel group + controls
  ---------------------
           |
           v
     (same as above)


  ___________         ___________
 | Accordion |──────►|Collapsible|──► Button
  -----------         -----------
       |
   +---+---+
   v       v
 Spinner  Icon


  ___________
 |FixedScreen|──► Button, Card
 |  Widget   |
  -----------


  Leaf layout (no children in map):
  ___________  ___________  ___________  ___________
 |   Stack   ||   Grid    ||AspectRatio|| Separator |
  -----------  -----------  -----------  -----------
```

---

## 7. Charts

```
  ___________         ___________
 | BarChart  |──┐     | LineChart |──┐
  -----------  |      -----------  |
               +──────► ___________ ◄──+
               |       |   Chart   |   |
               |        -----------    |
  ___________  |                       |
 | PieChart  |──┘                       |
  -----------                           |
         (Chart has no sub-components)  |
```

---

## 8. Theme UI (test app only)

```
  ___________
 |ThemeToggle|
  -----------
       |
       v
  ___________
 | ThemePanel|
  -----------
       |
   +---+---+---+---+---+
   v   v   v   v   v   v
 Card Page Pill Hist Button
      Header Group Ctrl
                         |
                         v
                    ___________
                   |  Button   |──► Tooltip
                    -----------
```

---

## 9. Category map (bird's-eye)

By `src/components/` folder. Cross-folder arrows = common composition paths.

```
  patterns/                    navigation/
  ___________                  ___________
 | AppShell  |───────────────►| Sidebar  |
  -----------        |         -----------
       |             |              |
       |             └─────────────►| Navbar  |
       v                            -----------
  ___________                            |
 | FormModal |                            v
  -----------                       ___________
       |                           | Dropdown |
       v                            -----------
  ___________
 |TriggerModal|
  -----------
       |
       v
  overlays/          layout/           actions/
  ___________       ___________       ___________
 |   Modal   |──────►|   Card   |       | Button  |◄── used everywhere
  -----------       -----------       -----------
       |                                    ▲
       v                                    |
  ___________                          ___________
 |  Overlay  |                         |   Icon  |  utilities/
  -----------                          -----------
                                              ▲
  inputs/                                     |
  ___________       ___________               |
 |   Form    |──────►|FormField |──────────────┘
  -----------       -----------
                          │
                          v
                    ___________
                   | TextInput |
                    -----------

  data-display/              feedback/
  ___________               ___________
 |   Table   |──► EmptyState    Toaster │──► Toast
  -----------               -----------
  ___________
 |  TreeView  |──► Icon
  -----------

  data-viz/
  ___________
 | BarChart  |──► Chart
  -----------
```

---

## 10. Full parent → child table

One-level nesting from `subComponentsMap.ts`.

| Parent | Children |
|--------|----------|
| Accordion | Collapsible, Spinner, Icon |
| Alert | Text, Button, Icon |
| AlertDialog | Overlay, Text, Button |
| AppShell | Sidebar, Navbar, PageFooter |
| AuthLayout | Card, Text |
| Avatar | Icon |
| AvatarGroup | Avatar |
| BarChart | Chart |
| Breadcrumb | Link, Text |
| Button | Icon, Spinner |
| Calendar | Button, Text |
| Carousel | Image, Button, Text |
| Checkbox | Text, HelperText |
| CodeBlock | CopyButton, Text |
| Collapsible | Button |
| Command | SearchInput, Spinner, Icon |
| ConfirmModal | TriggerModal, PageHeader, Button, Icon |
| ContextMenu | Dropdown, Icon |
| CopyButton | Button, Tooltip |
| DatePicker | TextInput, Calendar |
| DateRangePicker | TextInput, Calendar, Button |
| Drawer | Overlay, Card, Button |
| Dropdown | Button, Icon |
| EmptyState | Text, Button, Icon |
| FAB | Icon |
| FixedScreenWidget | Button, Card |
| Form | FormField, Button |
| FormField | Label, HelperText, TextInput |
| FormModal | TriggerModal, Form, FormField, PageHeader, Button, Icon |
| HelperText | Text |
| Hero | Text, Button, Image, Pill |
| HistoryControlButtons | Button, Tooltip |
| HoverCard | Popover |
| Image | Skeleton |
| InlineEdit | TextInput, Text, Button |
| InputGroup | InputGroupInput, InputGroupAddon, InputGroupButton, Button |
| Label | Text |
| LineChart | Chart |
| List | Stack, Grid, SearchInput, Text, Icon |
| LoadingOverlay | Overlay, Spinner |
| Menubar | Button, Dropdown |
| Modal | Overlay, Card, Button |
| Navbar | Button, Link, Dropdown, Separator |
| NavigationMenu | Button, Link, Text, Icon, Popover |
| PageFooter | Text, Separator |
| PageHeader | Text, Pill, Separator, Icon |
| Pagination | Button, Text |
| PhoneInput | TextInput, Dropdown |
| PieChart | Chart |
| Pill | Text, Spinner |
| PillGroup | Pill, Spinner |
| Popover | Card, Button |
| Progress | Text |
| Radio | Text, HelperText |
| RadioGroup | Radio |
| Rating | Text |
| ResizeContainer | ResizablePanelGroup, ResizablePanel, ResizableHandle |
| ResizablePanelGroup | ResizablePanel, ResizableHandle |
| SearchInput | TextInput, Spinner |
| Select | Label, HelperText, Icon |
| Sidebar | Button, Link, Text, Separator, Collapsible |
| Slider | Label, HelperText |
| SplitButton | Button, Dropdown |
| Stepper | Button, Text, Icon |
| Table | Checkbox, Button, Text, Skeleton, Pagination, EmptyState |
| Tabs | Text, Icon, Button |
| Text | Icon |
| TextInput | Label, HelperText, Icon |
| Textarea | Label, HelperText |
| TimePicker | TextInput |
| Toast | Text, Button, Icon |
| Toaster | Toast |
| Toggle | Text, HelperText |
| TreeView | Text, Icon, Spinner |
| TriggerModal | Modal, Button |
| Upload | Button, Text, Image, Spinner |

**Leaf components** (no children in map): Card, Separator, Spinner, Skeleton, Kbd, Icon, VisuallyHidden, Link, Stack, Grid, AspectRatio, Video, Overlay, Tooltip, ResizablePanel, ResizableHandle, InputOTP, DescriptionList, Chart, ErrorBoundary, …

---

## Maintaining

1. Edit `test/src/utils/metadata/subComponentsMap.ts` when composition changes.
2. Update the **matching ASCII section** above (not just the table).
3. Run `npm run check` — export parity must stay at 98.
