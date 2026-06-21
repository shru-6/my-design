# Recipes

Copy-paste composition patterns. Full working code lives in `test/src/pages/showcase/` — run `npm run dev` → `/showcase`.

---

## App shell

Sidebar navigation + navbar + page content. Source: `ShowcasePage.tsx`.

```tsx
import {
  AppShell,
  Sidebar,
  Navbar,
  PageHeader,
  PageFooter,
  Breadcrumb,
  ThemeToggle,
} from "shru-design-system"

const sidebarItems = [
  { label: "Dashboard", value: "dashboard", left: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Projects", value: "projects", left: <FolderKanban className="h-4 w-4" /> },
]

<AppShell
  sidebar={
    <Sidebar
      items={sidebarItems}
      value={section}
      onChange={setSection}
      collapsible
    />
  }
  header={<Navbar logo={<Text weight="bold">Acme</Text>} items={navItems} />}
  footer={<PageFooter left={<Text size="sm">© Acme</Text>} />}
>
  <PageHeader heading="Dashboard" description="Overview" />
  <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />
  {children}
  <ThemeToggle position="bottom-left" />
</AppShell>
```

**You own:** `section` state, nav items, page content per route.

---

## Dashboard

Metrics + chart + table. Source: `DashboardView.tsx`.

```tsx
import { Card, BarChart, Progress, Table, Alert, EmptyState, Pill } from "shru-design-system"

<Card header="Usage">
  <Progress value={usagePercent} showLabel />
</Card>

<BarChart data={chartData} xKey="label" yKey="value" height={200} />

<Table
  data={team}
  columns={[
    { key: "name", header: "Name" },
    { key: "status", header: "Status", render: (r) => <Pill tone="success">{r.status}</Pill> },
  ]}
/>

{activeProjects.length === 0 && (
  <EmptyState title="No projects" description="Create one to get started." />
)}

<Alert tone="info" title="Tip">Use the sidebar to switch views.</Alert>
```

---

## Projects + API tree

Resizable sidebar with `TreeView` + main table. Source: `ProjectsView.tsx`.

```tsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  TreeView,
  Table,
  CodeBlock,
  moveTreeNode,
  addTreeNodeChild,
  addTreeNodeSibling,
  deleteTreeNode,
} from "shru-design-system"

<ResizablePanelGroup direction="horizontal" className="min-h-[480px] rounded-lg border border-border">
  <ResizablePanel defaultSize={30} minSize={22}>
    <TreeView
      items={apiCollection}
      selectedId={selectedApiId}
      onSelect={setSelectedApiId}
      expandedIds={expandedIds}
      onExpandedChange={setExpandedIds}
      draggable
      allowAddSibling
      allowAddChild
      allowDelete
      onMove={(p) => setItems((prev) => moveTreeNode(prev, p.draggedId, p.targetId, p.position))}
      onAdd={(p) => setItems((prev) =>
        p.relation === "child"
          ? addTreeNodeChild(prev, p.targetId, newNode)
          : addTreeNodeSibling(prev, p.targetId, newNode)
      )}
      onDelete={(id) => setItems((prev) => deleteTreeNode(prev, id))}
    />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={70}>
    <Table data={projects} columns={columns} selectable pagination={...} />
    {snippet && <CodeBlock code={snippet} language="typescript" />}
  </ResizablePanel>
</ResizablePanelGroup>
```

**You own:** tree state, table data, selection, pagination.

---

## Settings form

Profile form + embedded theme panel + toast on save. Source: `SettingsView.tsx`.

```tsx
import { Form, FormField, Toggle, Upload, Separator, toast } from "shru-design-system"

<Form
  initialValues={{ name: profile.name, email: profile.email }}
  onSubmit={async (values) => {
    await saveProfile(values)
    toast({ title: "Saved", tone: "success" })
  }}
>
  <FormField name="name" label="Display name" required />
  <FormField name="email" label="Email" type="email" validate />

  <Separator />

  {/* ThemePanel + useThemeToggle({ embedded: true }) — see use/THEMING.md */}

  <Toggle checked={notifications} onChange={setNotifications} label="Email notifications" />
  <Upload accept="image/*" onUpload={handleAvatar} />
</Form>
```

---

## Form modal (create / edit)

Source: `ShowcasePage.tsx` project modals.

```tsx
import { FormModal } from "shru-design-system"

<FormModal
  heading={editing ? "Edit project" : "New project"}
  open={open}
  onOpenChange={setOpen}
  mode={editing ? "edit" : "create"}
  fields={[
    { name: "name", label: "Name", required: true },
    { name: "owner", label: "Owner" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ]}
  initialValues={editing ? project : {}}
  onSubmit={handleSave}
  triggerProps={{ label: "New project", variant: "primary" }}
/>
```

For full control, compose `TriggerModal` + `Form` + `PageHeader` yourself.

---

## Confirm destructive action

```tsx
import { ConfirmModal } from "shru-design-system"

<ConfirmModal
  heading="Archive projects?"
  description={`Archive ${count} selected project(s)?`}
  intent="destructive"
  open={open}
  onOpenChange={setOpen}
  onConfirm={handleArchive}
  triggerProps={{ label: "Archive", variant: "outline" }}
/>
```

---

## Drawer detail panel

```tsx
import { Drawer } from "shru-design-system"

<Drawer
  open={open}
  onOpenChange={setOpen}
  placement="right"
  header="Project detail"
  size="md"
>
  <ProjectDetail project={selected} />
</Drawer>
```

---

## Scoped modal in a card

For modals inside a dashboard panel (not full viewport):

```tsx
import { Modal, OverlayPortalScope, Card } from "shru-design-system"

<OverlayPortalScope className="relative isolate">
  <Card header="Workspace">
    <Modal
      open={open}
      onOpenChange={setOpen}
      container="parent"
      header="Edit"
    >
      ...
    </Modal>
  </Card>
</OverlayPortalScope>
```

See [Features](./FEATURES.md) for overlay details.

---

## Explore more

`/showcase` → **Explore** tab catalogs remaining component families. `/gallery` toggles individual props.
