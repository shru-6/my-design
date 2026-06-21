import type { CSSProperties } from "react"
import { zLayerValue } from "./zIndex"

export type FloatingAlign = "start" | "center" | "end"

const VIEWPORT_MARGIN = 8

export function computeFloatingMenuStyle(
  trigger: HTMLElement,
  menu: HTMLElement | null,
  options?: {
    align?: FloatingAlign
    sideOffset?: number
    maxHeightCap?: number
    minWidth?: string
    zIndex?: number
  }
): CSSProperties {
  const align = options?.align ?? "start"
  const sideOffset = options?.sideOffset ?? 4
  const maxHeightCap = options?.maxHeightCap ?? 320
  const minWidth = options?.minWidth ?? "10rem"
  const zIndex = options?.zIndex ?? zLayerValue("dropdown")

  const rect = trigger.getBoundingClientRect()
  const menuHeight = menu?.offsetHeight ?? 0
  const menuWidth = menu?.offsetWidth ?? 0
  const vw = window.innerWidth
  const vh = window.innerHeight

  const spaceBelow = vh - rect.bottom - sideOffset - VIEWPORT_MARGIN
  const spaceAbove = rect.top - sideOffset - VIEWPORT_MARGIN
  const openBelow = menuHeight === 0 || spaceBelow >= menuHeight || spaceBelow >= spaceAbove

  let top = openBelow ? rect.bottom + sideOffset : rect.top - sideOffset - (menuHeight || 0)
  let left = rect.left
  let transform: string | undefined

  if (align === "center") {
    left = rect.left + rect.width / 2
    transform = "translateX(-50%)"
    if (menuWidth > 0) {
      const half = menuWidth / 2
      if (left - half < VIEWPORT_MARGIN) left = VIEWPORT_MARGIN + half
      if (left + half > vw - VIEWPORT_MARGIN) left = vw - VIEWPORT_MARGIN - half
    }
  } else if (align === "end") {
    left = rect.right
    transform = "translateX(-100%)"
    if (menuWidth > 0 && left - menuWidth < VIEWPORT_MARGIN) {
      left = VIEWPORT_MARGIN + menuWidth
    }
  } else if (menuWidth > 0 && left + menuWidth > vw - VIEWPORT_MARGIN) {
    left = Math.max(VIEWPORT_MARGIN, vw - VIEWPORT_MARGIN - menuWidth)
  }

  if (top < VIEWPORT_MARGIN) top = VIEWPORT_MARGIN
  if (menuHeight > 0 && top + menuHeight > vh - VIEWPORT_MARGIN) {
    top = Math.max(VIEWPORT_MARGIN, vh - VIEWPORT_MARGIN - menuHeight)
  }

  const available = openBelow ? spaceBelow : spaceAbove
  const maxHeight = Math.max(120, Math.min(maxHeightCap, available))

  return {
    position: "fixed",
    top,
    left,
    transform,
    zIndex,
    minWidth: align === "start" ? `${Math.max(rect.width, 0)}px` : minWidth,
    maxHeight,
    overflowY: "auto",
    visibility: "visible",
  }
}
