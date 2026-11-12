import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { type ButtonProps } from "../actions/Button"
import { IconButton } from "../actions/IconButton"
import { Link } from "../data-display/Link"
import { Separator } from "../layout/Separator"
import { Icon } from "../utilities/Icon"
import { focusRing } from "../inputs/fieldPieces"
import { useControllableOpen } from "../overlays/useControllableOpen"
import {
  firstEnabledValue,
  handleNavLinkClick,
  itemIdentity,
  navigateToHref,
  type NavigateHandler,
} from "./shared"

export const sidebarVariants = cva("flex flex-col border-border bg-background transition-[width] duration-normal", {
  variants: {
    variant: {
      default: "border-r",
      floating: "m-2 rounded-surface-lg border shadow-sm",
      inset: "m-2 rounded-surface-lg border bg-muted/30",
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
  /**
   * Called instead of a full page load when an item with an `href` is
   * activated — wire a client router here. Omit and the Sidebar navigates on
   * its own (`location.assign` for button rows, the plain anchor for link rows).
   */
  onNavigate?: NavigateHandler<SidebarItem>
  className?: string
}

function toCssSize(value: string | number | undefined, fallback: string): string {
  if (value == null) return fallback
  return typeof value === "number" ? `${value}px` : value
}

function SidebarNavItem({
  item,
  index,
  depth,
  pathPrefix,
  collapsed,
  activeValue,
  onSelect,
  onNavigate,
  itemProps,
}: {
  item: SidebarItem
  index: number
  depth: number
  /** Full path from the root — the render `key` and the selection identity read from this same string. */
  pathPrefix: string
  collapsed: boolean
  activeValue?: string
  onSelect: (value: string) => void
  onNavigate?: NavigateHandler<SidebarItem>
  itemProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}) {
  const value = itemIdentity(item, index, pathPrefix)
  const isActive = activeValue === value
  const hasChildren = Boolean(item.children?.length)
  const [nestedOpen, setNestedOpen] = React.useState(false)

  const rowClass = cn(
    "flex w-full items-center gap-2 rounded-control-md px-2 py-2 text-sm font-medium transition-colors",
    "hover:bg-muted/80",
    focusRing,
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
    navigateToHref(item.href, item, onNavigate)
  }

  return (
    <div className={cn(depth > 0 && !collapsed && "pl-2")}>
      {item.href && !hasChildren ? (
        <Link
          href={item.href}
          className={rowClass}
          aria-current={isActive ? "page" : undefined}
          onClick={(e) => {
            onSelect(value)
            handleNavLinkClick(e, item.href, item, onNavigate)
          }}
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
              key={itemIdentity(child, childIndex, `${value}-`)}
              item={child}
              index={childIndex}
              depth={depth + 1}
              pathPrefix={`${value}-`}
              collapsed={collapsed}
              activeValue={activeValue}
              onSelect={onSelect}
              onNavigate={onNavigate}
              itemProps={itemProps}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
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
    onNavigate,
    className,
    ...rest
  },
  ref
) {
  const autoDefault = value === undefined && defaultValue === undefined ? firstEnabledValue(items) : undefined
  const [activeValue, handleSelect] = useControllableValue<string>({
    value,
    defaultValue: defaultValue ?? autoDefault ?? "",
    onChange,
  })

  const [collapsed, setCollapsed] = useControllableOpen({
    open: collapsedProp,
    defaultOpen: defaultCollapsed,
    onOpenChange: onCollapsedChange,
  })

  const isCollapsed = collapsible ? collapsed : false
  const resolvedWidth = isCollapsed ? toCssSize(collapsedWidth, "3.5rem") : toCssSize(width, "16rem")

  return (
    <aside
      ref={ref}
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
            <IconButton
              ariaLabel={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              icon={isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              onClick={() => setCollapsed(!isCollapsed)}
              {...toggleButtonProps}
            />
          ) : null}
        </div>
      ) : null}

      <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-1">
        {items.map((item, index) => (
          <SidebarNavItem
            key={itemIdentity(item, index)}
            item={item}
            index={index}
            depth={0}
            pathPrefix=""
            collapsed={isCollapsed}
            activeValue={activeValue}
            onSelect={handleSelect}
            onNavigate={onNavigate}
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
})

Sidebar.displayName = "Sidebar"
