import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Link } from "../data-display/Link"
import { Separator } from "../layout/Separator"
import { Icon } from "../utilities/Icon"
import { useControllableOpen } from "../overlays/useControllableOpen"

export const sidebarVariants = cva("flex flex-col border-border bg-background transition-[width] duration-200", {
  variants: {
    variant: {
      default: "border-r",
      floating: "m-2 rounded-xl border shadow-sm",
      inset: "m-2 rounded-xl border bg-muted/30",
    },
    side: {
      left: "",
      right: "border-l border-r-0",
    },
  },
  defaultVariants: {
    variant: "default",
    side: "left",
  },
})

export type SidebarItem = {
  label: React.ReactNode
  value?: string
  href?: string
  left?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  children?: SidebarItem[]
}

export interface SidebarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange">,
    VariantProps<typeof sidebarVariants> {
  items: SidebarItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  collapsible?: boolean
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  container?: "screen" | "parent"
  heightMode?: "viewport" | "parent" | "content"
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  width?: string | number
  collapsedWidth?: string | number
  toggleButtonProps?: Partial<ButtonProps>
  itemProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  className?: string
}

function toCssSize(value: string | number | undefined, fallback: string): string {
  if (value == null) return fallback
  return typeof value === "number" ? `${value}px` : value
}

function itemValue(item: SidebarItem, index: number, prefix = ""): string {
  return item.value ?? `${prefix}item-${index}`
}

function firstEnabledValue(items: SidebarItem[]): string | undefined {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (!item.disabled) return itemValue(item, i)
    if (item.children?.length) {
      const nested = firstEnabledValue(item.children)
      if (nested) return nested
    }
  }
  return undefined
}

function SidebarNavItem({
  item,
  index,
  depth,
  collapsed,
  activeValue,
  onSelect,
  itemProps,
}: {
  item: SidebarItem
  index: number
  depth: number
  collapsed: boolean
  activeValue?: string
  onSelect: (value: string) => void
  itemProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}) {
  const value = itemValue(item, index, depth > 0 ? `${depth}-` : "")
  const isActive = activeValue === value
  const hasChildren = Boolean(item.children?.length)
  const [nestedOpen, setNestedOpen] = React.useState(false)

  const rowClass = cn(
    "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors",
    "hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    isActive && "bg-muted text-foreground",
    !isActive && "text-muted-foreground hover:text-foreground",
    item.disabled && "pointer-events-none opacity-50",
    collapsed && "justify-center px-2"
  )

  const content = (
    <>
      {item.left ? (
        <span className="shrink-0 text-muted-foreground">
          <Icon node={item.left} size="sm" />
        </span>
      ) : null}
      {!collapsed ? <span className="min-w-0 flex-1 truncate text-left">{item.label}</span> : null}
      {!collapsed && item.badge != null ? (
        <span className="shrink-0 text-xs text-muted-foreground">{item.badge}</span>
      ) : null}
      {!collapsed && hasChildren ? (
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", nestedOpen && "rotate-180")}
          aria-hidden
        />
      ) : null}
    </>
  )

  const handleActivate = () => {
    if (item.disabled) return
    if (hasChildren && !collapsed) {
      setNestedOpen((o) => !o)
      return
    }
    onSelect(value)
    if (item.href && typeof window !== "undefined") window.location.assign(item.href)
  }

  return (
    <div className={cn(depth > 0 && !collapsed && "pl-2")}>
      {item.href && !hasChildren ? (
        <Link
          href={item.href}
          className={rowClass}
          aria-current={isActive ? "page" : undefined}
          onClick={() => onSelect(value)}
        >
          {content}
        </Link>
      ) : (
        <button type="button" className={rowClass} disabled={item.disabled} onClick={handleActivate} {...itemProps}>
          {content}
        </button>
      )}
      {hasChildren && nestedOpen && !collapsed ? (
        <div className="mt-0.5 space-y-0.5 border-l border-border pl-2">
          {item.children!.map((child, childIndex) => (
            <SidebarNavItem
              key={itemValue(child, childIndex, `${value}-`)}
              item={child}
              index={childIndex}
              depth={depth + 1}
              collapsed={collapsed}
              activeValue={activeValue}
              onSelect={onSelect}
              itemProps={itemProps}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function Sidebar({
  items = [],
  value,
  defaultValue,
  onChange,
  side = "left",
  variant = "default",
  collapsible = false,
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onCollapsedChange,
  container = "parent",
  heightMode = "parent",
  header,
  footer,
  children,
  width = "16rem",
  collapsedWidth = "3.5rem",
  toggleButtonProps,
  itemProps,
  className,
  ...rest
}: SidebarProps) {
  const autoDefault = value === undefined && defaultValue === undefined ? firstEnabledValue(items) : undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? autoDefault ?? "")
  const isValueControlled = value !== undefined
  const activeValue = isValueControlled ? value : internalValue

  const [collapsed, setCollapsed] = useControllableOpen({
    open: collapsedProp,
    defaultOpen: defaultCollapsed,
    onOpenChange: onCollapsedChange,
  })

  const isCollapsed = collapsible ? collapsed : false
  const resolvedWidth = isCollapsed ? toCssSize(collapsedWidth, "3.5rem") : toCssSize(width, "16rem")

  const handleSelect = (next: string) => {
    if (!isValueControlled) setInternalValue(next)
    onChange?.(next)
  }

  return (
    <aside
      aria-label="Sidebar"
      style={{ width: resolvedWidth }}
      className={cn(
        sidebarVariants({ variant, side }),
        container === "screen" && "fixed inset-y-0 z-sticky",
        container === "screen" && side === "left" && "left-0",
        container === "screen" && side === "right" && "right-0",
        heightMode === "viewport" && "min-h-screen",
        heightMode === "parent" && "h-full min-h-0",
        className
      )}
      {...rest}
    >
      {header || collapsible ? (
        <div className={cn("flex items-center gap-2 p-3", isCollapsed && "justify-center")}>
          {!isCollapsed && header ? <div className="min-w-0 flex-1">{header}</div> : null}
          {collapsible ? (
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              left={isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              onClick={() => setCollapsed(!isCollapsed)}
              {...toggleButtonProps}
            />
          ) : null}
        </div>
      ) : null}

      <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-1">
        {items.map((item, index) => (
          <SidebarNavItem
            key={itemValue(item, index)}
            item={item}
            index={index}
            depth={0}
            collapsed={isCollapsed}
            activeValue={activeValue}
            onSelect={handleSelect}
            itemProps={itemProps}
          />
        ))}
      </nav>

      {children}

      {footer ? (
        <>
          <Separator />
          <div className={cn("p-3 text-sm text-muted-foreground", isCollapsed && "px-2 text-center")}>{footer}</div>
        </>
      ) : null}
    </aside>
  )
}

Sidebar.displayName = "Sidebar"
