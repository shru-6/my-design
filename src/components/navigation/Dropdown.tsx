import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Icon } from "../utilities/Icon"
import { useFloatingMenu } from "../overlays/useFloatingMenu"
import { useControllableOpen } from "../overlays/useControllableOpen"
import { useReturnFocusOnClose } from "../overlays/useDialogA11y"
import { floatingMenuListClass } from "../overlays/floatingMenu"
import { renderMenuItems, useMenuKeyboard, type MenuItemSpec } from "./menuItemRow"

/** One row in a menu — shared with `ContextMenu` via `menuItemRow.tsx`. */
export type DropdownItem = MenuItemSpec

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

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
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
    },
    ref
  ) => {
    const {
      label = "Menu",
      left,
      variant = "outline",
      size = "md",
      className: triggerClassName,
    } = triggerProps ?? {}

    const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })

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

    const onMenuKeyDown = useMenuKeyboard(menuRef, open)
    useReturnFocusOnClose(open, { triggerRef })

    const menuContent = open ? (
      <div
        ref={menuRef}
        role="menu"
        tabIndex={-1}
        style={menuStyle}
        onKeyDown={onMenuKeyDown}
        className={cn(floatingMenuListClass, contentClassName)}
      >
        {renderMenuItems(items, () => setOpen(false))}
      </div>
    ) : null

    return (
      <div ref={ref} className={cn("relative inline-block", className)} {...rest}>
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
        {typeof document !== "undefined" && menuContent
          ? createPortal(menuContent, document.body)
          : null}
      </div>
    )
  }
)

Dropdown.displayName = "Dropdown"
