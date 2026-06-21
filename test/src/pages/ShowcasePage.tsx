import { FolderKanban, LayoutDashboard, Layers, Settings } from "lucide-react"
import {
  AlertDialog,
  AppShell,
  Pill,
  Breadcrumb,
  Button,
  Card,
  ConfirmModal,
  Drawer,
  FormModal,
  Hero,
  LoadingOverlay,
  Modal,
  Navbar,
  OverlayPortalScope,
  PageFooter,
  PageHeader,
  Select,
  Sidebar,
  Text,
  TextInput,
  ThemeToggle,
  Tooltip,
} from "shru-design-system"
import { SECTION_META } from "./showcase/types"
import { useShowcaseApp } from "./showcase/useShowcaseApp"
import { DashboardView } from "./showcase/views/DashboardView"
import { ProjectsView } from "./showcase/views/ProjectsView"
import { SettingsView } from "./showcase/views/SettingsView"
import { ExploreView } from "./showcase/views/ExploreView"

export function ShowcasePage() {
  const app = useShowcaseApp()
  const meta = SECTION_META[app.section]
  const hasSelection = app.selectedProjectIds.length > 0

  const sidebarItems = [
    { label: "Dashboard", value: "dashboard", left: <LayoutDashboard className="h-4 w-4" /> },
    {
      label: "Projects",
      value: "projects",
      left: <FolderKanban className="h-4 w-4" />,
      badge: <Pill size="sm">{app.activeProjects.length}</Pill>,
    },
    { label: "Settings", value: "settings", left: <Settings className="h-4 w-4" /> },
    { label: "Explore", value: "explore", left: <Layers className="h-4 w-4" /> },
  ]

  const projectActions = (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <FormModal
        container="parent"
        heading="New project"
        triggerProps={{ label: "New project", size: "sm", variant: "primary" }}
        fields={[{ name: "title", label: "Title", required: true, placeholder: "Project name" }]}
        onSubmit={app.addProject}
      />
      <Button size="sm" variant="outline" onClick={() => app.setDrawerOpen(true)}>
        Filters
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={!hasSelection}
        onClick={() => app.setAlertDialogOpen(true)}
      >
        Archive
      </Button>
      <Button
        size="sm"
        variant="destructive"
        disabled={!hasSelection}
        onClick={() => app.setConfirmOpen(true)}
      >
        Delete
      </Button>
    </div>
  )

  return (
    <>
      <OverlayPortalScope className="relative flex h-full min-h-0 flex-1 flex-col">
        <AppShell
          sidebar={
            <Sidebar
              items={sidebarItems}
              value={app.section}
              onChange={(value) => app.navigate(value as typeof app.section)}
              collapsible
              container="parent"
              heightMode="parent"
              header={<Text weight="semibold">Jane</Text>}
              footer={
                <div className="flex flex-col gap-0.5">
                  <Text as="div" size="sm" weight="medium">
                    {app.profile.name}
                  </Text>
                  <Text as="div" size="xs" variant="muted">
                    {app.profile.email}
                  </Text>
                </div>
              }
              className="h-full min-h-0 border-r border-border"
            />
          }
          header={
            <Navbar
              variant="bordered"
              logo={<Text weight="semibold">{meta.label}</Text>}
              right={
                <Tooltip content="Simulate a background save">
                  <Button size="sm" variant="outline" onClick={app.simulateLoading}>
                    Simulate save
                  </Button>
                </Tooltip>
              }
            />
          }
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
            {app.section !== "dashboard" ? (
              <Breadcrumb
                items={[
                  {
                    label: (
                      <button
                        type="button"
                        className="text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => app.navigate("dashboard")}
                      >
                        Jane
                      </button>
                    ),
                  },
                  { label: meta.breadcrumb, current: true },
                ]}
              />
            ) : null}

            {app.section === "dashboard" ? (
              <>
                <Hero
                  title={`Good morning, ${app.profile.name.split(" ")[0]}`}
                  description="Track usage, team activity, and manage projects from the sidebar."
                  badge="Live demo"
                  actions={{
                    primary: {
                      label: "View projects",
                      onClick: () => app.navigate("projects"),
                    },
                    secondary: {
                      label: "Settings",
                      variant: "outline",
                      onClick: () => app.navigate("settings"),
                    },
                  }}
                />
                <DashboardView
                  profile={app.profile}
                  notifications={app.notifications}
                  usagePercent={app.usagePercent}
                  chartData={app.chartData}
                  activeProjects={app.activeProjects}
                  showSkeleton={app.showSkeleton}
                  setShowSkeleton={app.setShowSkeleton}
                  navigate={app.navigate}
                />
              </>
            ) : null}

            {app.section === "projects" ? (
              <>
                <PageHeader
                  heading={meta.label}
                  description={meta.description}
                  actions={projectActions}
                />
                <Card className="overflow-hidden p-0">
                  <ProjectsView
                    paginatedProjects={app.paginatedProjects}
                    filteredProjects={app.filteredProjects}
                    selectedProjectIds={app.selectedProjectIds}
                    setSelectedProjectIds={app.setSelectedProjectIds}
                    page={app.page}
                    setPage={app.setPage}
                    openProjectDetail={app.openProjectDetail}
                    apiCollection={app.apiCollection}
                    selectedApiId={app.selectedApiId}
                    setSelectedApiId={app.setSelectedApiId}
                    apiExpandedIds={app.apiExpandedIds}
                    setApiExpandedIds={app.setApiExpandedIds}
                    moveApiNode={app.moveApiNode}
                    addApiNode={app.addApiNode}
                    deleteApiNode={app.deleteApiNode}
                  />
                </Card>
              </>
            ) : null}

            {app.section === "settings" ? (
              <>
                <PageHeader
                  heading={meta.label}
                  description={meta.description}
                  actions={
                    <Button size="sm" variant="outline" onClick={() => app.navigate("dashboard")}>
                      Back to dashboard
                    </Button>
                  }
                />
                <Card>
                  <SettingsView
                    profile={app.profile}
                    notifications={app.notifications}
                    setNotifications={app.setNotifications}
                    saveProfile={app.saveProfile}
                  />
                </Card>
              </>
            ) : null}

            {app.section === "explore" ? (
              <>
                <PageHeader heading={meta.label} description={meta.description} />
                <ExploreView />
              </>
            ) : null}

            <PageFooter
              left={
                <Text size="xs" variant="muted">
                  Jane showcase · {app.activeProjects.length} active projects
                </Text>
              }
              right={
                <Text size="xs" variant="muted">
                  Design system demo
                </Text>
              }
            />
          </div>

          <LoadingOverlay open={app.loadingOpen} message="Saving changes…" container="parent" />

          <Modal
            open={app.modalOpen}
            onOpenChange={app.setModalOpen}
            container="parent"
            header={<Text weight="semibold">{app.detailProject?.name ?? "Project"}</Text>}
          >
            {app.detailProject ? (
              <div className="flex flex-col gap-3">
                <Text size="sm">
                  <Text as="span" weight="semibold">
                    Owner:
                  </Text>{" "}
                  {app.detailProject.owner}
                </Text>
                <Text size="sm">
                  <Text as="span" weight="semibold">
                    Status:
                  </Text>{" "}
                  {app.detailProject.status}
                </Text>
                <Text size="sm" variant="muted">
                  Last updated {app.detailProject.updatedAt}
                </Text>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      app.setSelectedProjectIds([app.detailProject!.id])
                      app.setAlertDialogOpen(true)
                    }}
                  >
                    Archive
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      app.setSelectedProjectIds([app.detailProject!.id])
                      app.setConfirmOpen(true)
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <Text size="sm" variant="muted">
                Select a project from the table to view details.
              </Text>
            )}
          </Modal>

          <Drawer
            open={app.drawerOpen}
            onOpenChange={app.setDrawerOpen}
            container="parent"
            header={<Text weight="semibold">Filter projects</Text>}
          >
            <div className="flex flex-col gap-4">
              <TextInput
                label="Search"
                placeholder="Name or owner…"
                value={app.filterQuery}
                onChange={(event) => app.setFilterQuery(event.target.value)}
              />
              <Select
                label="Status"
                items={[
                  { label: "All statuses", value: "all" },
                  { label: "Active", value: "Active" },
                  { label: "Draft", value: "Draft" },
                  { label: "Archived", value: "Archived" },
                ]}
                value={app.statusFilter}
                onValueChange={(value) => app.setStatusFilter(value as typeof app.statusFilter)}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={app.applyFilters}>
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    app.setFilterQuery("")
                    app.setStatusFilter("all")
                    app.setPage(1)
                    app.setDrawerOpen(false)
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Drawer>

          <AlertDialog
            open={app.alertDialogOpen}
            onOpenChange={app.setAlertDialogOpen}
            container="parent"
            title="Archive selected projects?"
            description="Archived projects stay in the list but no longer count toward your active quota."
            confirmProps={{
              label: "Archive",
              onClick: app.archiveSelected,
            }}
            cancelProps={{ label: "Cancel" }}
          />

          <ConfirmModal
            open={app.confirmOpen}
            onOpenChange={app.setConfirmOpen}
            container="parent"
            heading="Delete selected projects?"
            description="This permanently removes the selected projects."
            intent="destructive"
            confirmProps={{ label: "Delete", onClick: app.deleteSelected }}
            cancelProps={{ label: "Cancel" }}
          />
        </AppShell>
      </OverlayPortalScope>

      <ThemeToggle position="bottom-left" />
    </>
  )
}
