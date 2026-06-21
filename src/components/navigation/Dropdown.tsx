import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Icon } from "../utilities/Icon"
import { useFloatingMenu } from "../overlays/useFloatingMenu"
import {
  floatingMenuItemClass,
  floatingMenuHoverClass,
  floatingMenuListClass,
} from "../overlays/floatingMenu"

export interface DropdownItem {
  label: React.ReactNode
  value?: string
  onClick?: () => void
  left?: React.ReactNode
  disabled?: boolean
  separator?: boolean
  children?: DropdownItem[]
}

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: DropdownItem[]
  triggerProps?: {
    label?: React.ReactNode
    left?: React.ReactNode
    variant?: ButtonProps["variant"]
    size?: ButtonProps["size"]
    className?: string
  }
  /** Optional custom trigger (replaces `triggerProps` button). */
  trigger?: React.ReactNode
  contentClassName?: string
  align?: "start" | "center" | "end"
  sideOffset?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dropdown({
  items,
  triggerProps,
  trigger,
  contentClassName,
  align = "start",
  sideOffset = 4,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  ...rest
}: DropdownProps) {
  const { label = "Menu", left, variant = "outline", size = "md", className: triggerClassName } = triggerProps ?? {}

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined && onOpenChange != null
  const open = isControlled ? Boolean(openProp) : internalOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const triggerRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const { menuStyle } = useFloatingMenu({
    open,
    onOpenChange: setOpen,
    triggerRef,
    menuRef,
    align,
    sideOffset,
  })

  const focusableIndex = React.useRef(0)

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const menu = menuRef.current
    if (!menu) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const count = menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])').length
      focusableIndex.current = Math.min(focusableIndex.current + 1, Math.max(0, count - 1))
      const nodes = menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
      nodes[focusableIndex.current]?.focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      focusableIndex.current = Math.max(focusableIndex.current - 1, 0)
      const nodes = menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
      nodes[focusableIndex.current]?.focus()
    } else if (e.key === "Home") {
      e.preventDefault()
      focusableIndex.current = 0
      menu.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
    } else if (e.key === "End") {
      e.preventDefault()
      const nodes = menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
      focusableIndex.current = Math.max(0, nodes.length - 1)
      nodes[nodes.length - 1]?.focus()
    }
  }

  React.useEffect(() => {
    if (!open || !menuRef.current) return
    focusableIndex.current = 0
    const first = menuRef.current.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
    requestAnimationFrame(() => first?.focus())
  }, [open])

  const menuContent = open ? (
    <div
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      style={menuStyle}
      onKeyDown={onMenuKeyDown}
      className={cn(floatingMenuListClass, contentClassName)}
    >
      {items.map((item, index) =>
        item.separator ? (
          <div key={`sep-${index}`} role="separator" className="-mx-1 my-1 h-px bg-border" />
        ) : (
          <button
            key={item.value ?? `item-${index}`}
            type="button"
            role="menuitem"
            tabIndex={-1}
            disabled={item.disabled}
            className={cn(floatingMenuItemClass, floatingMenuHoverClass, item.disabled && "pointer-events-none opacity-50")}
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
          </button>
        )
      )}
    </div>
  ) : null

  return (
    <div className={cn("relative inline-block", className)} {...rest}>
      <div ref={triggerRef}>
        {trigger ? (
          React.isValidElement(trigger) ? (
            React.cloneElement(trigger as React.ReactElement<any>, {
              onClick: (e: unknown) => {
                ;(trigger as React.ReactElement<any>).props.onClick?.(e)
                setOpen(!open)
              },
              "aria-expanded": open,
              "aria-haspopup": "menu" as const,
            })
          ) : (
            trigger
          )
        ) : (
          <Button
            variant={variant}
            size={size}
            className={cn("gap-2", triggerClassName)}
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen(!open)}
          >
            {left ? <Icon node={left} size="sm" /> : null}
            {label}
          </Button>
        )}
      </div>
      {typeof document !== "undefined" && menuContent ? createPortal(menuContent, document.body) : null}
    </div>
  )
}

Dropdown.displayName = "Dropdown"
