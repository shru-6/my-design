import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../utils"
import { zLayerValue } from "../../utils/zIndex"
import { Icon } from "../utilities/Icon"
import { useControllableOpen } from "../overlays/useControllableOpen"
import { type DropdownItem } from "./Dropdown"

export interface ContextMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: DropdownItem[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export function ContextMenu({
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  contentClassName,
  ...rest
}: ContextMenuProps) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const menuRef = React.useRef<HTMLDivElement>(null)

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

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setCoords({ x: e.clientX, y: e.clientY })
    setOpen(true)
  }

  const menu = open ? (
    <div
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      style={{ position: "fixed", top: coords.y, left: coords.x, zIndex: zLayerValue("dropdown"), minWidth: "10rem" }}
      className={cn(
        "overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in fade-in-0",
        contentClassName
      )}
    >
      {items.map((item, index) =>
        item.separator ? (
          <div key={`sep-${index}`} role="separator" className="-mx-1 my-1 h-px bg-border" />
        ) : (
          <div
            key={item.value ?? `item-${index}`}
            role="menuitem"
            tabIndex={-1}
            aria-disabled={item.disabled || undefined}
            className={cn(
              "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
              "focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
              item.disabled && "pointer-events-none opacity-50"
            )}
            onClick={() => {
              if (item.disabled) return
              item.onClick?.()
              setOpen(false)
            }}
          >
            {item.left ? (
              <span className="text-muted-foreground">
                <Icon node={item.left} size="sm" />
              </span>
            ) : null}
            <span className="flex-1">{item.label}</span>
          </div>
        )
      )}
    </div>
  ) : null

  return (
    <div className={cn("inline-block", className)} onContextMenu={onContextMenu} {...rest}>
      {children}
      {typeof document !== "undefined" && menu ? createPortal(menu, document.body) : null}
    </div>
  )
}

ContextMenu.displayName = "ContextMenu"
