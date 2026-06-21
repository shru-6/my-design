import type { Profile, Project, TeamMember } from "./types"

export const INITIAL_PROFILE: Profile = {
  name: "Alex Jane",
  email: "alex@jane.com",
}

export const INITIAL_PROJECTS: Project[] = [
  { id: "p1", name: "Marketing site", owner: "Alex Jane", status: "Active", updatedAt: "2026-06-18" },
  { id: "p2", name: "Mobile app", owner: "Jordan Lee", status: "Active", updatedAt: "2026-06-17" },
  { id: "p3", name: "API gateway", owner: "Alex Jane", status: "Draft", updatedAt: "2026-06-15" },
  { id: "p4", name: "Analytics hub", owner: "Sam Rivera", status: "Active", updatedAt: "2026-06-12" },
  { id: "p5", name: "Legacy migration", owner: "Jordan Lee", status: "Draft", updatedAt: "2026-06-10" },
  { id: "p6", name: "Partner portal", owner: "Alex Jane", status: "Archived", updatedAt: "2026-05-28" },
  { id: "p7", name: "Design tokens", owner: "Sam Rivera", status: "Active", updatedAt: "2026-06-19" },
]

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "t1", name: "Alex Jane", role: "Admin", status: "Active" },
  { id: "t2", name: "Jordan Lee", role: "Editor", status: "Active" },
  { id: "t3", name: "Sam Rivera", role: "Viewer", status: "Invited" },
]

export const CHART_DATA = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 58 },
  { label: "Mar", value: 49 },
  { label: "Apr", value: 72 },
  { label: "May", value: 68 },
  { label: "Jun", value: 81 },
]
