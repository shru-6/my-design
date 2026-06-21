import type { ComponentMetadata } from "./componentMetadata"

function setNested(target: Record<string, unknown>, path: string[], value: unknown) {
  let cursor: Record<string, unknown> = target
  for (let i = 0; i < path.length - 1; i += 1) {
    const key = path[i]
    const existing = cursor[key]
    if (existing && typeof existing === "object" && !Array.isArray(existing)) {
      cursor = existing as Record<string, unknown>
    } else {
      const next: Record<string, unknown> = {}
      cursor[key] = next
      cursor = next
    }
  }
  cursor[path[path.length - 1]] = value
}

/** Maps flat slot props to nested targets (e.g. `label` with description `triggerProps.label`). */
export function resolveGallerySlotProps(
  metadata: ComponentMetadata | undefined,
  props: Record<string, unknown>
): Record<string, unknown> {
  if (!metadata?.props.length) return props

  const next = { ...props }
  const nested: Record<string, unknown> = {}
  const consumed = new Set<string>()

  for (const prop of metadata.props) {
    if (prop.scope !== "slot" || next[prop.name] === undefined || !prop.description?.includes(".")) continue

    const path = prop.description.split(".")
    setNested(nested, path, next[prop.name])
    consumed.add(prop.name)
  }

  for (const key of consumed) delete next[key]

  for (const [key, value] of Object.entries(nested)) {
    const existing = next[key]
    if (existing && typeof existing === "object" && !Array.isArray(existing) && typeof value === "object" && value) {
      next[key] = { ...(existing as Record<string, unknown>), ...(value as Record<string, unknown>) }
    } else {
      next[key] = value
    }
  }

  return next
}
