import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Icon } from "../utilities/Icon"
import { floatingMenuHoverClass, floatingMenuItemClass } from "../overlays/floatingMenu"

/**
 * Internal shared primitive: the one menu row renderer + roving keyboard model
 * for `Dropdown` and `ContextMenu`. ContextMenu previously carried a partial,
 * `<div role="menuitem">`-based copy of Dropdown's loop with no keyboard
 * handling at all; keeping the keyboard model attached to the renderer is what
 * stops that from drifting apart again.
 */

/** One row in a menu. `separator: true` renders a rule and ignores every other field. */
export interface MenuItemSpec {
  label: React.ReactNode
  value?: string
  onClick?: () => void
  left?: React.ReactNode
  disabled?: boolean
  separator?: boolean
  children?: MenuItemSpec[]
}

export const menuSeparatorClass = "-mx-1 my-1 h-px bg-border"

const menuItemRowVariants = cva(cn(floatingMenuItemClass, floatingMenuHoverClass), {
  variants: {
    disabled: {
      true: "pointer-events-none opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export interface MenuItemRowProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "disabled">,
    Omit<VariantProps<typeof menuItemRowVariants>, "disabled"> {
  item: MenuItemSpec
  /** Fired after the item's own `onClick` — menus use it to close. */
  onSelect?: () => void
}

export const MenuItemRow = React.forwardRef<HTMLButtonElement, MenuItemRowProps>(
  ({ item, onSelect, className, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={item.disabled}
      aria-disabled={item.disabled || undefined}
      className={cn(menuItemRowVariants({ disabled: Boolean(item.disabled) }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (item.disabled) return
        item.onClick?.()
        onSelect?.()
      }}
      {...props}
    >
      {item.left ? (
        <span className="text-muted-foreground">
          <Icon node={item.left} size="sm" />
        </span>
      ) : null}
      <span className="flex-1">{item.label}</span>
    </button>
  )
)

MenuItemRow.displayName = "MenuItemRow"

/** Renders a whole `items` array — separators included — for a `role="menu"` container. */
export function renderMenuItems(items: MenuItemSpec[], onSelect: () => void): React.ReactNode {
  return items.map((item, index) =>
    item.separator ? (
      <div key={`sep-${index}`} role="separator" className={menuSeparatorClass} />
    ) : (
      <MenuItemRow key={item.value ?? `item-${index}`} item={item} onSelect={onSelect} />
    )
  )
}

/**
 * Roving Arrow/Home/End focus over the rendered rows, plus initial focus on
 * open (with the animation frame properly cancelled on unmount).
 */
export function useMenuKeyboard(menuRef: React.RefObject<HTMLElement | null>, open: boolean) {
  const activeIndex = React.useRef(0)

  const rows = React.useCallback(
    () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])'
        ) ?? []
      ),
    [menuRef]
  )

  React.useEffect(() => {
    if (!open) return
    activeIndex.current = 0
    const raf = requestAnimationFrame(() => rows()[0]?.focus())
    return () => cancelAnimationFrame(raf)
  }, [open, rows])

  return React.useCallback(
    (e: React.KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return
      const nodes = rows()
      if (nodes.length === 0) return
      e.preventDefault()
      if (e.key === "ArrowDown") {
        activeIndex.current = Math.min(activeIndex.current + 1, nodes.length - 1)
      } else if (e.key === "ArrowUp") {
        activeIndex.current = Math.max(activeIndex.current - 1, 0)
      } else if (e.key === "Home") {
        activeIndex.current = 0
      } else {
        activeIndex.current = nodes.length - 1
      }
      nodes[activeIndex.current]?.focus()
    },
    [rows]
  )
}
