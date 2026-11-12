import * as React from "react"
import { createPortal } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { zLayerValue } from "../../utils/zIndex"
import { VIEWPORT_MARGIN, clampToViewport } from "../../utils/floatingPosition"
import { useControllableOpen } from "../overlays/useControllableOpen"
import { usePositionedPortal, withPortalVisibility } from "../overlays/usePositionedPortal"
import { floatingMenuListClass } from "../overlays/floatingMenu"
import { renderMenuItems, useMenuKeyboard } from "./menuItemRow"
import { type DropdownItem } from "./Dropdown"

export const contextMenuVariants = cva(floatingMenuListClass, {
  variants: {
    /** Minimum width of the menu surface. */
    size: {
      sm: "min-w-[10rem]",
      md: "min-w-[14rem]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export interface ContextMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof contextMenuVariants> {
  items: DropdownItem[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  (
    {
      items,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      size,
      children,
      className,
      contentClassName,
      onContextMenu: consumerOnContextMenu,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
    const [coords, setCoords] = React.useState({ x: 0, y: 0 })
    const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({ visibility: "hidden" })
    const menuRef = React.useRef<HTMLDivElement>(null)

    /** Point-anchored, so it clamps a box at (x, y) rather than flipping around a trigger rect. */
    const updatePosition = React.useCallback(() => {
      const menu = menuRef.current
      const width = menu?.offsetWidth ?? 0
      const height = menu?.offsetHeight ?? 0
      const vh = typeof window !== "undefined" ? window.innerHeight : 0
      const { left, top } = clampToViewport(coords.x, coords.y, width, height)
      setMenuStyle({
        position: "fixed",
        top,
        left,
        zIndex: zLayerValue("dropdown"),
        maxHeight: Math.max(120, vh - VIEWPORT_MARGIN * 2),
        overflowY: "auto",
        visibility: "visible",
      })
    }, [coords])

    const positioned = usePositionedPortal(open, updatePosition)
    const onMenuKeyDown = useMenuKeyboard(menuRef, open)

    React.useEffect(() => {
      if (!open) return
      const onPointerDown = (e: PointerEvent) => {
        const t = e.target as Node
        if (menuRef.current?.contains(t)) return
        setOpen(false)
      }
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false)
      }
      document.addEventListener("pointerdown", onPointerDown, true)
      document.addEventListener("keydown", onKeyDown, true)
      return () => {
        document.removeEventListener("pointerdown", onPointerDown, true)
        document.removeEventListener("keydown", onKeyDown, true)
      }
    }, [open, setOpen])

    /**
     * Consumer handler first, then ours — a spread `onContextMenu` used to
     * replace the internal one outright and the menu simply stopped opening.
     */
    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      consumerOnContextMenu?.(e)
      e.preventDefault()
      setCoords({ x: e.clientX, y: e.clientY })
      setOpen(true)
    }

    const menu = open ? (
      <div
        ref={menuRef}
        role="menu"
        tabIndex={-1}
        style={withPortalVisibility(menuStyle, positioned)}
        onKeyDown={onMenuKeyDown}
        className={cn(contextMenuVariants({ size }), "animate-in fade-in-0", contentClassName)}
      >
        {renderMenuItems(items, () => setOpen(false))}
      </div>
    ) : null

    return (
      <div
        ref={ref}
        className={cn("inline-block", className)}
        onContextMenu={handleContextMenu}
        {...rest}
      >
        {children}
        {typeof document !== "undefined" && menu ? createPortal(menu, document.body) : null}
      </div>
    )
  }
)

ContextMenu.displayName = "ContextMenu"
