import { useState } from "react"
import { Bell, Plus, Save, Settings } from "lucide-react"
import {
  Accordion,
  AspectRatio,
  AuthLayout,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Calendar,
  Card,
  Carousel,
  Chart,
  Checkbox,
  CodeBlock,
  Collapsible,
  CollapsiblePanel,
  Command,
  ContextMenu,
  CopyButton,
  DatePicker,
  DateRangePicker,
  DescriptionList,
  Dropdown,
  ErrorBoundary,
  FAB,
  FixedScreenWidget,
  Grid,
  HelperText,
  HistoryControlButtons,
  HoverCard,
  Icon,
  Image,
  InlineEdit,
  InputGroup,
  InputGroupButton,
  InputGroupInput,
  InputOTP,
  Kbd,
  Label,
  LineChart,
  Link,
  List,
  Menubar,
  NavigationMenu,
  Overlay,
  OverlayPortalScope,
  Pagination,
  PhoneInput,
  PieChart,
  PillGroup,
  Popover,
  Radio,
  RadioGroup,
  Rating,
  ResizeContainer,
  SearchInput,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  SplitButton,
  Stack,
  Stepper,
  Tabs,
  Tag,
  Text,
  Textarea,
  TextInput,
  TimePicker,
  Toast,
  Toggle,
  Tooltip,
  TriggerModal,
  TreeView,
  Video,
  VisuallyHidden,
  addTreeNodeChild,
  addTreeNodeSibling,
  deleteTreeNode,
  moveTreeNode,
  type TreeItem,
} from "shru-design-system"
import { TEAM_MEMBERS, CHART_DATA } from "../data"

const MENU = [
  { label: "Edit", onClick: () => {} },
  { label: "Duplicate", onClick: () => {} },
  { label: "Archive", onClick: () => {} },
]

const LONG_MENU = Array.from({ length: 16 }, (_, i) => ({
  label: `Item ${i + 1}`,
  onClick: () => {},
}))

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card size="sm" header={<Text weight="semibold">{title}</Text>}>
      <div className="flex flex-col gap-3">{children}</div>
    </Card>
  )
}

const EXPLORE_TREE: TreeItem[] = [
  {
    id: "collection",
    label: "Demo collection",
    kind: "folder",
    children: [
      { id: "req-a", label: "GET /health", kind: "file" },
      { id: "folder-b", label: "Billing", kind: "folder", children: [{ id: "req-b", label: "POST /invoice", kind: "file" }] },
    ],
  },
]

function ErrorThrower() {
  const [broken, setBroken] = useState(false)
  if (broken) throw new Error("Explore demo error")
  return (
    <Button size="sm" variant="outline" onClick={() => setBroken(true)}>
      Trigger render error
    </Button>
  )
}

export function ExploreView() {
  const [step, setStep] = useState(0)
  const [rating, setRating] = useState(4)
  const [phone, setPhone] = useState({ countryCode: "US", number: "" })
  const [history, setHistory] = useState(0)
  const [fabOpen, setFabOpen] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [treeItems, setTreeItems] = useState(EXPLORE_TREE)
  const [treeExpanded, setTreeExpanded] = useState(["collection", "folder-b"])
  const [treeSelected, setTreeSelected] = useState("req-a")

  const tabItems = [
    {
      label: "Inputs",
      value: "inputs",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <DemoCard title="PhoneInput (unified value)">
            <PhoneInput label="Mobile" value={phone} onChange={setPhone} required />
            <Text size="xs" variant="muted">
              {JSON.stringify(phone)}
            </Text>
          </DemoCard>
          <DemoCard title="Search & OTP">
            <SearchInput placeholder="Search docs…" />
            <InputOTP length={6} onComplete={() => {}} />
          </DemoCard>
          <DemoCard title="Pickers">
            <DatePicker label="Date" />
            <TimePicker label="Time" />
            <DateRangePicker
              label="Range (2–14 days, apply)"
              minDate={new Date()}
              maxDate={(() => {
                const d = new Date()
                d.setDate(d.getDate() + 60)
                return d
              })()}
              minRangeDays={2}
              maxRangeDays={14}
              showApplyButton
            />
          </DemoCard>
          <DemoCard title="Controls">
            <Slider label="Volume" defaultValue={40} showValue />
            <Rating value={rating} onChange={setRating} />
            <Toggle label="Labs features" defaultChecked />
            <Checkbox label="Remember device" default />
          </DemoCard>
          <DemoCard title="Groups">
            <RadioGroup
              name="plan"
              items={[
                { label: "Free", value: "free" },
                { label: "Pro", value: "pro" },
              ]}
              defaultValue="pro"
            />
            <Textarea label="Notes" placeholder="Optional notes…" rows={2} />
          </DemoCard>
          <DemoCard title="Command">
            <Command items={[{ label: "New file", value: "new" }, { label: "Settings", value: "settings" }]} />
          </DemoCard>
        </div>
      ),
    },
    {
      label: "Navigation",
      value: "navigation",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <DemoCard title="Stepper">
            <Stepper
              steps={[
                { label: "Profile", description: "Your info" },
                { label: "Billing", description: "Payment" },
                { label: "Done", description: "Review" },
              ]}
              value={step}
              onChange={setStep}
            />
            <Stepper
              orientation="vertical"
              steps={[
                { label: "Draft", description: "Create" },
                { label: "Review", description: "Approve" },
                { label: "Ship", description: "Deploy" },
              ]}
              defaultValue={1}
            />
          </DemoCard>
          <DemoCard title="Dropdown vs Select">
            <Text size="xs" variant="muted">
              Dropdown — custom menu, scroll + viewport flip. Select — native field for forms.
            </Text>
            <Dropdown items={LONG_MENU} triggerProps={{ label: "Long menu", variant: "outline", size: "sm" }} />
          </DemoCard>
          <DemoCard title="Tabs & pagination">
            <Tabs
              items={[
                { label: "Overview", value: "o", content: <Text size="sm">Overview panel</Text> },
                { label: "Activity", value: "a", content: <Text size="sm">Activity panel</Text> },
              ]}
              defaultValue="o"
            />
            <Pagination total={48} pageSize={10} defaultValue={2} />
          </DemoCard>
          <DemoCard title="Menus">
            <Menubar menus={[{ label: "File", items: MENU }, { label: "View", items: MENU }]} />
            <NavigationMenu items={[{ label: "Docs", href: "#" }, { label: "API", href: "#" }]} />
          </DemoCard>
          <DemoCard title="Context menu">
            <ContextMenu items={MENU}>
              <div className="rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Right-click this area
              </div>
            </ContextMenu>
          </DemoCard>
        </div>
      ),
    },
    {
      label: "Display",
      value: "display",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <DemoCard title="People">
            <Avatar name="Alex Jane" color="primary" />
            <AvatarGroup
              items={[
                { name: "Alex Jane", color: "primary" },
                { name: "Jordan Lee", color: "accent" },
                { name: "Sam Kim", color: "success" },
              ]}
              max={3}
            />
          </DemoCard>
          <DemoCard title="Media & code">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
              <Image src="https://picsum.photos/seed/showcase/640/360" alt="Sample" className="h-full w-full object-cover" />
            </AspectRatio>
            <CodeBlock code={'export const hello = "world";'} language="typescript" />
          </DemoCard>
          <DemoCard title="Lists & tree">
            <List items={[{ label: "Inbox" }, { label: "Drafts" }, { label: "Sent" }]} />
            <TreeView
              items={treeItems}
              selectedId={treeSelected}
              onSelect={setTreeSelected}
              expandedIds={treeExpanded}
              onExpandedChange={setTreeExpanded}
              draggable
              allowAddSibling
              allowAddChild
              allowDelete
              onMove={({ draggedId, targetId, position }) =>
                setTreeItems((current) => moveTreeNode(current, draggedId, targetId, position))
              }
              onAdd={({ targetId, relation }) => {
                const node: TreeItem = {
                  id: `node-${Date.now()}`,
                  label: relation === "child" ? "New folder" : "New request",
                  kind: relation === "child" ? "folder" : "file",
                  ...(relation === "child" ? { children: [] } : {}),
                }
                setTreeItems((current) =>
                  relation === "child"
                    ? addTreeNodeChild(current, targetId, node)
                    : addTreeNodeSibling(current, targetId, node)
                )
                if (relation === "child") {
                  setTreeExpanded((current) => [...new Set([...current, targetId])])
                }
              }}
              onDelete={(id) => setTreeItems((current) => deleteTreeNode(current, id))}
            />
          </DemoCard>
          <DemoCard title="Tags & chips">
            <div className="flex flex-wrap gap-2">
              <Tag label="Design" />
              <Badge>New</Badge>
              <PillGroup items={[{ label: "React", value: "react" }, { label: "TS", value: "ts" }]} />
            </div>
            <DescriptionList
              items={[
                { label: "Plan", value: "Pro" },
                { label: "Seats", value: "12" },
              ]}
            />
          </DemoCard>
          <DemoCard title="Carousel">
            <Carousel
              items={[
                { image: "https://picsum.photos/seed/s1/400/160", imageAlt: "One", content: "Slide 1" },
                { image: "https://picsum.photos/seed/s2/400/160", imageAlt: "Two", content: "Slide 2" },
              ]}
            />
          </DemoCard>
        </div>
      ),
    },
    {
      label: "Actions",
      value: "actions",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <DemoCard title="Buttons">
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="outline">
                Outline
              </Button>
              <CopyButton size="sm" value="proj_abc123" copyLabel="Copy ID" />
            </div>
            <SplitButton menuItems={MENU}>Save</SplitButton>
          </DemoCard>
          <DemoCard title="Input group">
            <InputGroup placeholder="Search team">
              <InputGroupInput aria-label="Search" />
              <InputGroupButton label="Go" />
            </InputGroup>
          </DemoCard>
          <DemoCard title="History controls">
            <HistoryControlButtons
              canUndo={history > 0}
              canRedo={history < 3}
              onUndo={() => setHistory((v) => Math.max(0, v - 1))}
              onRedo={() => setHistory((v) => Math.min(3, v + 1))}
              onReset={() => setHistory(0)}
            />
            <Text size="xs" variant="muted">
              Step {history} / 3
            </Text>
          </DemoCard>
          <DemoCard title="Inline edit">
            <InlineEdit defaultValue="Click to rename project" />
          </DemoCard>
        </div>
      ),
    },
    {
      label: "Layout",
      value: "layout",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <DemoCard title="Stack & grid">
            <Stack
              gap="sm"
              items={["Alpha", "Beta", "Gamma"]}
              renderItem={(item) => (
                <Text size="sm" className="rounded border border-border px-2 py-1">
                  {item}
                </Text>
              )}
            />
            <Grid
              columns={3}
              gap="sm"
              items={["1", "2", "3", "4", "5", "6"]}
              renderItem={(item) => (
                <Text size="sm" className="rounded border border-border p-2 text-center tabular-nums">
                  {item}
                </Text>
              )}
            />
          </DemoCard>
          <DemoCard title="Collapse">
            <div className="flex h-48 overflow-visible rounded-md border border-border bg-muted/10">
              <CollapsiblePanel
                closeDirection="left"
                size="10rem"
                triggerPlacement="floater"
                header="Tools"
                defaultOpen
              >
                <Text size="sm">Docked panel — floater toggle on the seam.</Text>
                <Text size="sm" variant="muted">
                  Scrolls when content overflows.
                </Text>
              </CollapsiblePanel>
              <div className="min-w-0 flex-1 p-3">
                <Text size="sm" variant="muted">
                  Main layout area
                </Text>
              </div>
            </div>
            <Collapsible trigger="Release notes" defaultOpen>
              <Text size="sm">June release — gallery sync, phone object API, explore view.</Text>
            </Collapsible>
            <Accordion
              items={[
                { value: "a", label: "Billing", content: "Invoices and payment methods." },
                { value: "b", label: "Security", content: "Sessions and 2FA." },
              ]}
              defaultValue="a"
            />
          </DemoCard>
          <DemoCard title="Resize">
            <ResizeContainer defaultScale={1} showControls>
              <Text size="sm">Zoom the showcase layout preview.</Text>
            </ResizeContainer>
          </DemoCard>
          <DemoCard title="Chrome">
            <Separator />
            <div className="flex items-center gap-2">
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
              <Text size="sm" variant="muted">
                Command palette
              </Text>
            </div>
            <Link href="#">Documentation</Link>
          </DemoCard>
        </div>
      ),
    },
    {
      label: "Overlays",
      value: "overlays",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <DemoCard title="Popover & hover">
            <Popover triggerProps={{ label: "Details", variant: "outline", size: "sm" }}>
              <Text size="sm">Extra metadata and actions.</Text>
            </Popover>
            <HoverCard triggerProps={{ label: "Hover me", variant: "ghost", size: "sm" }}>
              <Text size="sm">Preview card on hover.</Text>
            </HoverCard>
          </DemoCard>
          <DemoCard title="Tooltip & FAB">
            <Tooltip content="⌘S">
              <Button size="sm" variant="outline" iconOnly aria-label="Save" left={<Save className="h-4 w-4" />} />
            </Tooltip>
            <div className="relative h-16">
              <FAB
                ariaLabel="Create item"
                left={<Plus className="h-5 w-5" />}
                className="!absolute !bottom-0 !right-0 !left-auto !translate-x-0"
                onClick={() => setFabOpen((open) => !open)}
              />
              {fabOpen ? (
                <Text size="xs" variant="muted" className="absolute bottom-0 left-0">
                  FAB clicked
                </Text>
              ) : null}
            </div>
          </DemoCard>
          <DemoCard title="Fixed widget">
            <OverlayPortalScope className="relative min-h-[160px] overflow-hidden rounded-md border border-border bg-muted/20 p-4">
              <FixedScreenWidget
                triggerProps={{ label: "Open tips", size: "sm" }}
                position="bottom-right"
                className="!absolute inset-0"
              >
                <Text size="sm">Quick tips panel scoped to this card.</Text>
              </FixedScreenWidget>
            </OverlayPortalScope>
          </DemoCard>
          <DemoCard title="Overlay & TriggerModal">
            <OverlayPortalScope className="relative min-h-[140px] overflow-hidden rounded-md border border-border bg-muted/20 p-4">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setOverlayOpen(true)}>
                  Open overlay
                </Button>
                <TriggerModal
                  container="parent"
                  header={<Text weight="semibold">Quick note</Text>}
                  triggerProps={{ label: "Open trigger modal", size: "sm", variant: "outline" }}
                >
                  <Text size="sm">Base modal with a trigger — ConfirmModal and FormModal extend this.</Text>
                </TriggerModal>
              </div>
              <Overlay open={overlayOpen} onClose={() => setOverlayOpen(false)} container="parent" blur>
                <Card size="sm" className="mx-auto max-w-xs shadow-lg">
                  <Text size="sm">Backdrop primitive — used by modals and drawers.</Text>
                  <Button size="sm" className="mt-3" onClick={() => setOverlayOpen(false)}>
                    Close
                  </Button>
                </Card>
              </Overlay>
            </OverlayPortalScope>
          </DemoCard>
        </div>
      ),
    },
    {
      label: "Primitives",
      value: "primitives",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <DemoCard title="Icon & Spinner">
            <div className="flex items-center gap-3">
              <Icon node={<Bell className="h-5 w-5" />} size="md" />
              <Icon node={<Settings className="h-5 w-5" />} size="md" />
              <Spinner size="sm" />
              <Spinner size="md" />
            </div>
          </DemoCard>
          <DemoCard title="Label & HelperText">
            <div className="flex flex-col gap-1">
              <Label htmlFor="explore-field">API key</Label>
              <TextInput id="explore-field" placeholder="sk_live_…" />
              <HelperText>Rotate keys every 90 days.</HelperText>
            </div>
          </DemoCard>
          <DemoCard title="Radio (standalone)">
            <Radio name="explore-radio" label="Monthly billing" default />
            <Radio name="explore-radio" label="Annual billing" />
          </DemoCard>
          <DemoCard title="Skeleton">
            <div className="flex items-center gap-3">
              <Skeleton variant="avatar" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="45%" />
              </div>
            </div>
          </DemoCard>
          <DemoCard title="Toast (component)">
            <Toast
              title="Sync complete"
              description="3 collections uploaded."
              tone="success"
              dismissible={false}
            />
          </DemoCard>
          <DemoCard title="VisuallyHidden">
            <Button size="sm" variant="outline">
              Save
              <VisuallyHidden>project changes</VisuallyHidden>
            </Button>
            <Text size="xs" variant="muted">
              Screen readers hear “Save project changes”.
            </Text>
          </DemoCard>
          <DemoCard title="ErrorBoundary">
            <ErrorBoundary
              fallback={
                <Text size="sm" variant="danger">
                  Caught — child threw during render.
                </Text>
              }
            >
              <ErrorThrower />
            </ErrorBoundary>
          </DemoCard>
          <DemoCard title="AuthLayout">
            <div className="overflow-hidden rounded-md border border-border">
              <AuthLayout
                title="Sign in"
                subtitle="Preview scaled to fit"
                logo={<Text weight="semibold">Jane</Text>}
                className="min-h-0 items-start bg-muted/20 p-3"
              >
                <TextInput label="Email" placeholder="you@jane.com" />
                <Button className="w-full">Continue</Button>
              </AuthLayout>
            </div>
          </DemoCard>
        </div>
      ),
    },
    {
      label: "Data viz",
      value: "viz",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <DemoCard title="Charts">
            <LineChart data={CHART_DATA} xKey="label" yKey="value" height={140} />
            <Chart type="bar" data={CHART_DATA} xKey="label" yKey="value" height={120} />
            <PieChart
              data={[
                { label: "Active", value: 62 },
                { label: "Draft", value: 28 },
                { label: "Archived", value: 10 },
              ]}
              labelKey="label"
              valueKey="value"
              height={140}
            />
          </DemoCard>
          <DemoCard title="Calendar">
            <Calendar defaultValue={new Date()} />
          </DemoCard>
          <DemoCard title="Video">
            <Video
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4#t=1"
              controls
              className="max-h-40 w-full rounded-md"
            />
          </DemoCard>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <Text variant="muted" size="sm">
        Browse every component family in context — complements the main dashboard / projects / settings flows.
      </Text>
      <Tabs items={tabItems} defaultValue="inputs" />
      <Text size="xs" variant="muted">
        Team sample: {TEAM_MEMBERS.map((m) => m.name).join(", ")}
      </Text>
    </div>
  )
}
