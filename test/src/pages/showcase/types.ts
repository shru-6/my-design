export type Section = "dashboard" | "projects" | "settings" | "explore"

export type ProjectStatus = "Active" | "Draft" | "Archived"

export interface Project {
  id: string
  name: string
  owner: string
  status: ProjectStatus
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  status: "Active" | "Invited"
}

export interface Profile {
  name: string
  email: string
}

export const PAGE_SIZE = 5

export const SECTION_META: Record<
  Section,
  { label: string; breadcrumb: string; description: string }
> = {
  dashboard: {
    label: "Dashboard",
    breadcrumb: "Dashboard",
    description: "Overview of usage, signups, and your team.",
  },
  projects: {
    label: "Projects",
    breadcrumb: "Projects",
    description: "Create, filter, archive, and manage projects.",
  },
  settings: {
    label: "Settings",
    breadcrumb: "Settings",
    description: "Profile, notifications, and preferences.",
  },
  explore: {
    label: "Explore",
    breadcrumb: "Explore",
    description: "Browse every component family in realistic mini-demos.",
  },
}
