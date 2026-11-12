import * as React from "react"
import { zLayerValue } from "../../utils/zIndex"
import { computeFloatingMenuStyle, type FloatingAlign } from "../../utils/floatingPosition"
import { usePositionedPortal, withPortalVisibility } from "./usePositionedPortal"

export type { FloatingAlign } from "../../utils/floatingPosition"

export interface UseFloatingMenuOptions {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  menuRef: React.RefObject<HTMLElement | null>
  align?: FloatingAlign
  sideOffset?: number
  minWidth?: string
  maxHeight?: number
  zIndex?: number
}

export function useFloatingMenu({
  open,
  onOpenChange,
  triggerRef,
  menuRef,
  align = "start",
  sideOffset = 4,
  minWidth = "10rem",
  maxHeight: maxHeightCap = 320,
  zIndex = zLayerValue("dropdown"),
}: UseFloatingMenuOptions) {
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({ visibility: "hidden" })

  const updatePosition = React.useCallback(() => {
    const trigger = triggerRef.current
    const menu = menuRef.current
    if (!trigger) return
    setMenuStyle(
      computeFloatingMenuStyle(trigger, menu, {
        align,
        sideOffset,
        maxHeightCap,
        minWidth,
        zIndex,
      })
    )
  }, [align, maxHeightCap, minWidth, sideOffset, triggerRef, menuRef, zIndex])

  const positioned = usePositionedPortal(open, updatePosition)

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return
      onOpenChange(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("pointerdown", onPointerDown, true)
    document.addEventListener("keydown", onKeyDown, true)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true)
      document.removeEventListener("keydown", onKeyDown, true)
    }
  }, [open, onOpenChange, triggerRef, menuRef])

  const resolvedStyle = React.useMemo<React.CSSProperties>(
    () => withPortalVisibility(menuStyle, positioned),
    [menuStyle, positioned]
  )

  return { menuStyle: resolvedStyle, updatePosition, positioned }
}
