# Features

Non-obvious capabilities and API contracts after install. For setup see [Install](./INSTALL.md).

---

## Overlays & portaling

By default, `Modal`, `Drawer`, `AlertDialog`, and `LoadingOverlay` portal to `document.body` at `z-modal`.

### Scope to a panel or card

Wrap the region in `OverlayPortalScope` and pass `container="parent"` on the overlay component:

```tsx
import { Modal, OverlayPortalScope } from "shru-design-system"

<OverlayPortalScope className="relative isolate min-h-[320px]">
  <Card>
    <Modal open={open} onOpenChange={setOpen} container="parent" header="Scoped">
      Content stays inside the card stack.
    </Modal>
  </Card>
</OverlayPortalScope>
```

| `container` | Behavior |
|-------------|----------|
| `"body"` (default) | Viewport-fixed portal, global z-index |
| `"parent"` | Portals into nearest `OverlayPortalScope` host; `absolute` positioning |

Components that accept `container`: `Modal`, `Drawer`, `AlertDialog`, `LoadingOverlay`, `Overlay`.

### Z-index (high level)

| Layer | Token | Typical use |
|-------|-------|-------------|
| Sticky chrome | `z-sticky` | Navbar, table headers |
| Menus / pickers | `z-dropdown` | Dropdown, Popover, Select menu |
| Backdrop | `z-overlay` | Scrim behind modal |
| Modal surface | `z-modal` | Modal, Drawer |
| Toasts | `z-toast` | `Toaster` |

Full table: [reference/COMPONENTS.md](../reference/COMPONENTS.md#layering--z-index-contract).

Use `container="parent"` when embedding modals in dashboards — not when you need a true viewport modal.

---

## Toasts

Mount `Toaster` once at app root:

```tsx
import { Toaster, toast } from "shru-design-system"

function App() {
  return (
    <>
      <YourRoutes />
      <Toaster />
    </>
  )
}

// Anywhere:
toast({ title: "Saved", description: "Profile updated.", tone: "success" })
```

- **Imperative:** `toast({ ... })` from `toastStore`
- **Declarative:** render `<Toast />` inline (rare)
- `Toaster` subscribes to the queue and renders at `z-toast`

---

## Forms

```tsx
import { Form, FormField } from "shru-design-system"

<Form
  initialValues={{ name: "", email: "" }}
  validate={(values) => {
    const errors: Record<string, string> = {}
    if (!values.email?.includes("@")) errors.email = "Invalid email"
    return errors
  }}
  validateOn="submit"
  onSubmit={async (values) => { /* save */ }}
>
  <FormField name="name" label="Name" required />
  <FormField name="email" label="Email" type="email" validate />
</Form>
```

- `FormField` wires `Label`, `HelperText`, and the correct input by `type`
- `useFormContext()` inside children for advanced cases
- `FormModal` = `TriggerModal` + `Form` + `PageHeader` — see [Recipes](./RECIPES.md)

Controlled mode: pass `values` + `onValuesChange`, or `errors` + `submitted` for submit-gated error display.

---

## Input API differences

| Component | Handler | Notes |
|-----------|---------|-------|
| `TextInput`, `Textarea` | `onChange(event)` | Standard DOM event |
| `SearchInput` | `onChange(value: string)` | String only; debounced `onSearch` |
| `Select` | `onValueChange(value)` | Not `onChange` |
| `PhoneInput` | `onChange(PhoneValue)` | Unified phone object |
| `Slider`, `Toggle`, `Checkbox` | `onChange(value)` | Boolean or number |

### Controlled overlays

Pass **both** `open` and `onOpenChange`:

```tsx
<Dropdown open={open} onOpenChange={setOpen} items={items} />
```

`open` alone does not enter controlled mode for several overlay/menu components.

---

## TreeView

Postman-style sidebar tree — drag reorder, add sibling/child, delete:

```tsx
import {
  TreeView,
  moveTreeNode,
  addTreeNodeChild,
  addTreeNodeSibling,
  deleteTreeNode,
  type TreeItem,
} from "shru-design-system"

const [items, setItems] = useState<TreeItem[]>([...])

<TreeView
  items={items}
  selectedId={selectedId}
  onSelect={setSelectedId}
  draggable
  allowAddSibling
  allowAddChild
  allowDelete
  onMove={({ draggedId, targetId, position }) =>
    setItems((prev) => moveTreeNode(prev, draggedId, targetId, position))
  }
  onAdd={({ targetId, relation }) =>
    setItems((prev) =>
      relation === "child"
        ? addTreeNodeChild(prev, targetId, newNode)
        : addTreeNodeSibling(prev, targetId, newNode)
    )
  }
  onDelete={(id) => setItems((prev) => deleteTreeNode(prev, id))}
/>
```

Helpers are exported from the `TreeView` module (`moveTreeNode`, `addTreeNodeChild`, `addTreeNodeSibling`, `deleteTreeNode`).

---

## Table

```tsx
<Table
  data={rows}
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "status", header: "Status", render: (row) => <Pill>{row.status}</Pill> },
  ]}
  selectable
  pagination={{ page, pageSize, total, onChange: setPage }}
/>
```

Pair with `EmptyState` when `data` is empty. Loading: pass skeleton rows or toggle a loading prop pattern from showcase Dashboard.

---

## Command vs SearchInput

- **SearchInput** — debounced text field with clear button; `onChange(value: string)`
- **Command** — searchable list / combobox / command palette with `items`, fuzzy filter, keyboard nav

Use Command when results appear in a dropdown list; SearchInput for simple search fields.

---

## Styling & components

| Topic | Guidance |
|-------|----------|
| Colors | Semantic tokens only — theme owns color |
| Chips / tags | Prefer `Pill` / `PillGroup` over legacy `Badge` / `Tag` |
| `variant`, `size`, `tone` | Visual controls on the component — not theme category names |
| `placement` | Overlay position: `top`, `bottom`, `left`, `right` |
| Density | Switch `comfortable` ↔ `compact` in theme — controls resize globally |

---

## Prop reference

Full typed API: import `XxxProps` from `shru-design-system` or use `/gallery` props panel when running this repo locally.
