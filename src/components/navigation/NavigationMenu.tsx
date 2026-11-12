import * as React from "react"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { Button } from "../actions/Button"
import { Link } from "../data-display/Link"
import { Text } from "../data-display/Text"
import { Icon } from "../utilities/Icon"
import { focusRing } from "../inputs/fieldPieces"
import { Popover } from "../overlays/Popover"
import { firstEnabledValue, handleNavLinkClick, itemIdentity, navigateToHref, type NavigateHandler } from "./shared"

export type NavMenuItem = {
  label: React.ReactNode
  value?: string
  href?: string
  left?: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  children?: NavMenuItem[]
}

export interface NavigationMenuProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  items: NavMenuItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
  /**
   * Called instead of a full page load when an item with an `href` is
   * activated — wire a client router here. Omit and the menu navigates on its
   * own (`location.assign` for submenu rows, the plain anchor for link rows).
   */
  onNavigate?: NavigateHandler<NavMenuItem>
  children?: React.ReactNode
  className?: string
}

function NavMenuLeaf({
  item,
  active,
  onSelect,
  onNavigate,
}: {
  item: NavMenuItem
  active: boolean
  onSelect: () => void
  onNavigate?: NavigateHandler<NavMenuItem>
}) {
  const className = cn(
    "inline-flex items-center gap-2 rounded-control-md px-3 py-2 text-sm font-medium transition-colors",
    "hover:bg-muted/80",
    focusRing,
    active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
    item.disabled && "pointer-events-none opacity-50"
  )

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={className}
        aria-current={active ? "page" : undefined}
        onClick={(e) => {
          onSelect()
          handleNavLinkClick(e, item.href, item, onNavigate)
        }}
      >
        {item.left ? <Icon node={item.left} size="sm" /> : null}
        {item.label}
      </Link>
    )
  }

  return (
    <Button variant="ghost" size="md" className={className} disabled={item.disabled} left={item.left} onClick={onSelect}>
      {item.label}
    </Button>
  )
}

function NavMenuSubmenu({
  item,
  parentValue,
  activeValue,
  onSelect,
  onNavigate,
}: {
  item: NavMenuItem
  parentValue: string
  activeValue?: string
  onSelect: (value: string) => void
  onNavigate?: NavigateHandler<NavMenuItem>
}) {
  return (
    <Popover
      triggerProps={{
        label: item.label,
        left: item.left,
        variant: "ghost",
        className: "font-medium text-muted-foreground hover:text-foreground",
      }}
      cardProps={{ className: "min-w-[14rem] p-2" }}
      placement="bottom"
    >
      <div className="flex flex-col gap-1">
        {item.children?.map((child, index) => {
          const value = itemIdentity(child, index, `${parentValue}-`)
          const active = activeValue === value
          return (
            <button
              key={value}
              type="button"
              disabled={child.disabled}
              className={cn(
                "flex w-full flex-col items-start gap-0.5 rounded-control-md px-3 py-2 text-left transition-colors hover:bg-muted/80",
                focusRing,
                active && "bg-muted",
                child.disabled && "pointer-events-none opacity-50"
              )}
              onClick={() => {
                onSelect(value)
                navigateToHref(child.href, child, onNavigate)
              }}
            >
              <Text as="span" size="sm" weight="medium">
                {child.label}
              </Text>
              {child.description ? (
                <Text as="span" size="xs" variant="muted">
                  {child.description}
                </Text>
              ) : null}
            </button>
          )
        })}
      </div>
    </Popover>
  )
}

export const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(function NavigationMenu(
  { items, value, defaultValue, onChange, orientation = "horizontal", onNavigate, children, className, ...rest },
  ref
) {
  const autoDefault = value === undefined && defaultValue === undefined ? firstEnabledValue(items) : undefined
  const [activeValue, select] = useControllableValue<string>({
    value,
    defaultValue: defaultValue ?? autoDefault ?? "",
    onChange,
  })

  return (
    <nav
      ref={ref}
      aria-label="Main"
      className={cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col items-stretch" : "flex-row flex-wrap items-center",
        className
      )}
      {...rest}
    >
      {items.map((item, index) => {
        const itemKey = itemIdentity(item, index)
        if (item.children?.length) {
          return (
            <NavMenuSubmenu
              key={itemKey}
              item={item}
              parentValue={itemKey}
              activeValue={activeValue}
              onSelect={select}
              onNavigate={onNavigate}
            />
          )
        }
        return (
          <NavMenuLeaf
            key={itemKey}
            item={item}
            active={activeValue === itemKey}
            onNavigate={onNavigate}
            onSelect={() => select(itemKey)}
          />
        )
      })}
      {children}
    </nav>
  )
})

NavigationMenu.displayName = "NavigationMenu"
