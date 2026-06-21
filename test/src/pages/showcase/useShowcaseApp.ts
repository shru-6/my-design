import { useCallback, useMemo, useState } from "react"
import {
  addTreeNodeChild,
  addTreeNodeSibling,
  deleteTreeNode,
  moveTreeNode,
  toast,
  type TreeAddRelation,
  type TreeMovePosition,
} from "shru-design-system"
import { createApiNode, INITIAL_API_COLLECTION } from "./apiCollection"
import { CHART_DATA, INITIAL_PROFILE, INITIAL_PROJECTS } from "./data"
import type { Profile, Project, ProjectStatus, Section } from "./types"
import { PAGE_SIZE } from "./types"

export function useShowcaseApp() {
  const [section, setSection] = useState<Section>("dashboard")
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE)
  const [notifications, setNotifications] = useState(true)

  const [selectedProjectIds, setSelectedProjectIds] = useState<Array<string | number>>([])
  const [filterQuery, setFilterQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all")
  const [page, setPage] = useState(1)

  const [detailProjectId, setDetailProjectId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [apiCollection, setApiCollection] = useState(INITIAL_API_COLLECTION)
  const [selectedApiId, setSelectedApiId] = useState("workspace")
  const [apiExpandedIds, setApiExpandedIds] = useState(["workspace", "api-v1", "auth"])

  const activeProjects = useMemo(
    () => projects.filter((project) => project.status !== "Archived"),
    [projects]
  )

  const filteredProjects = useMemo(() => {
    const query = filterQuery.trim().toLowerCase()
    return projects.filter((project) => {
      if (statusFilter !== "all" && project.status !== statusFilter) return false
      if (!query) return true
      return (
        project.name.toLowerCase().includes(query) ||
        project.owner.toLowerCase().includes(query)
      )
    })
  }, [projects, filterQuery, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE))

  const paginatedProjects = useMemo(() => {
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * PAGE_SIZE
    return filteredProjects.slice(start, start + PAGE_SIZE)
  }, [filteredProjects, page, totalPages])

  const detailProject = useMemo(
    () => projects.find((project) => project.id === detailProjectId) ?? null,
    [projects, detailProjectId]
  )

  const usagePercent = useMemo(() => {
    const active = activeProjects.length
    const cap = 10
    return Math.min(100, Math.round((active / cap) * 100))
  }, [activeProjects.length])

  const navigate = useCallback((next: Section) => {
    setSection(next)
    setSelectedProjectIds([])
    setPage(1)
  }, [])

  const openProjectDetail = useCallback((projectId: string) => {
    setDetailProjectId(projectId)
    setModalOpen(true)
  }, [])

  const addProject = useCallback(
    (values: Record<string, unknown>) => {
      const title = String(values.title ?? "").trim()
      if (!title) return

      const project: Project = {
        id: `p${Date.now()}`,
        name: title,
        owner: profile.name,
        status: "Draft",
        updatedAt: new Date().toISOString().slice(0, 10),
      }

      setProjects((current) => [project, ...current])
      setSection("projects")
      setPage(1)
      toast({ title: "Project created", description: `"${title}" was added.` })
    },
    [profile.name]
  )

  const archiveSelected = useCallback(() => {
    if (selectedProjectIds.length === 0) return

    setProjects((current) =>
      current.map((project) =>
        selectedProjectIds.includes(project.id)
          ? { ...project, status: "Archived" as const, updatedAt: new Date().toISOString().slice(0, 10) }
          : project
      )
    )
    setSelectedProjectIds([])
    setModalOpen(false)
    setDetailProjectId(null)
    toast({
      title: "Archived",
      description: `${selectedProjectIds.length} project(s) moved to archive.`,
    })
  }, [selectedProjectIds])

  const deleteSelected = useCallback(() => {
    if (selectedProjectIds.length === 0) return

    const count = selectedProjectIds.length
    setProjects((current) => current.filter((project) => !selectedProjectIds.includes(project.id)))
    setSelectedProjectIds([])
    setDetailProjectId(null)
    setModalOpen(false)
    toast({ title: "Deleted", description: `${count} project(s) removed.` })
  }, [selectedProjectIds])

  const applyFilters = useCallback(() => {
    setPage(1)
    setDrawerOpen(false)
    toast({ title: "Filters applied", description: "Project list updated." })
  }, [])

  const saveProfile = useCallback((values: Record<string, unknown>) => {
    const name = String(values.name ?? "").trim()
    const email = String(values.email ?? "").trim()
    setProfile({ name: name || profile.name, email: email || profile.email })
    toast({ title: "Settings saved", description: "Your profile was updated." })
  }, [profile.email, profile.name])

  const simulateLoading = useCallback(() => {
    setLoadingOpen(true)
    window.setTimeout(() => setLoadingOpen(false), 1200)
  }, [])

  const moveApiNode = useCallback(
    (payload: { draggedId: string; targetId: string; position: TreeMovePosition }) => {
      setApiCollection((current) => moveTreeNode(current, payload.draggedId, payload.targetId, payload.position))
    },
    []
  )

  const addApiNode = useCallback((payload: { targetId: string; relation: TreeAddRelation }) => {
    const label = payload.relation === "child" ? "New folder" : "New request"
    const kind = payload.relation === "child" ? "folder" : "file"
    const node = createApiNode(label, kind)

    setApiCollection((current) =>
      payload.relation === "child"
        ? addTreeNodeChild(current, payload.targetId, node)
        : addTreeNodeSibling(current, payload.targetId, node)
    )
    setSelectedApiId(node.id)
    if (payload.relation === "child") {
      setApiExpandedIds((current) => [...new Set([...current, payload.targetId])])
    }
    toast({ title: "Added", description: `${label} created in collection.` })
  }, [])

  const deleteApiNode = useCallback((id: string) => {
    if (id === "workspace") {
      toast({ title: "Cannot delete", description: "The workspace root is required.", tone: "warning" })
      return
    }

    setApiCollection((current) => deleteTreeNode(current, id))
    setSelectedApiId("workspace")
    toast({ title: "Removed", description: "Item deleted from collection." })
  }, [])

  return {
    section,
    navigate,
    projects,
    profile,
    notifications,
    setNotifications,
    selectedProjectIds,
    setSelectedProjectIds,
    filterQuery,
    setFilterQuery,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    filteredProjects,
    paginatedProjects,
    totalPages,
    activeProjects,
    usagePercent,
    chartData: CHART_DATA,
    detailProject,
    detailProjectId,
    setDetailProjectId,
    modalOpen,
    setModalOpen,
    drawerOpen,
    setDrawerOpen,
    confirmOpen,
    setConfirmOpen,
    alertDialogOpen,
    setAlertDialogOpen,
    loadingOpen,
    showSkeleton,
    setShowSkeleton,
    openProjectDetail,
    addProject,
    archiveSelected,
    deleteSelected,
    applyFilters,
    saveProfile,
    simulateLoading,
    apiCollection,
    selectedApiId,
    setSelectedApiId,
    apiExpandedIds,
    setApiExpandedIds,
    moveApiNode,
    addApiNode,
    deleteApiNode,
  }
}

export type ShowcaseApp = ReturnType<typeof useShowcaseApp>
