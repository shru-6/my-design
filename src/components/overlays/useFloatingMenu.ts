import * as React from "react"
import { zLayerValue } from "../../utils/zIndex"
import { computeFloatingMenuStyle, type FloatingAlign } from "../../utils/floatingPosition"

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
  const [positioned, setPositioned] = React.useState(false)

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

  React.useLayoutEffect(() => {
    if (!open) {
      setPositioned(false)
      return
    }
    setPositioned(false)
    updatePosition()
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      updatePosition()
      raf2 = requestAnimationFrame(() => setPositioned(true))
    })
    const fallback = window.setTimeout(() => setPositioned(true), 48)
    const onReposition = () => updatePosition()
    window.addEventListener("scroll", onReposition, true)
    window.addEventListener("resize", onReposition)
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.clearTimeout(fallback)
      window.removeEventListener("scroll", onReposition, true)
      window.removeEventListener("resize", onReposition)
    }
  }, [open, updatePosition])

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
    () => ({
      ...menuStyle,
      visibility: positioned ? menuStyle.visibility ?? "visible" : "hidden",
    }),
    [menuStyle, positioned]
  )

  return { menuStyle: resolvedStyle, updatePosition, positioned }
}
