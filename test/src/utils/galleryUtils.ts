import type { ComponentCategory, ComponentMetadata } from "./componentMetadata"

export const GALLERY_CATEGORIES: { id: ComponentCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "inputs", label: "Inputs" },
  { id: "actions", label: "Actions" },
  { id: "navigation", label: "Navigation" },
  { id: "data-display", label: "Data display" },
  { id: "feedback", label: "Feedback" },
  { id: "overlays", label: "Overlays" },
  { id: "layout", label: "Layout" },
  { id: "utilities", label: "Utilities" },
  { id: "data-viz", label: "Data viz" },
  { id: "patterns", label: "Patterns" },
]

export function filterGalleryMetadata(
  items: ComponentMetadata[],
  query: string,
  category: ComponentCategory | "all"
): ComponentMetadata[] {
  const q = query.trim().toLowerCase()
  return items.filter((item) => {
    if (category !== "all" && item.category !== category) return false
    if (!q) return true
    const haystack = [item.name, item.category, item.description ?? "", ...(item.subComponents ?? [])]
      .join(" ")
      .toLowerCase()
    return haystack.includes(q)
  })
}

/** Card shell fills its grid cell; fixed chrome lives inside ComponentCard header. */
export function galleryCardClass(): string {
  return "flex h-full min-h-0 w-full min-w-0 flex-col"
}
