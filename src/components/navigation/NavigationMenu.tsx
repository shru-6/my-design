import * as React from "react"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Link } from "../data-display/Link"
import { Text } from "../data-display/Text"
import { Icon } from "../utilities/Icon"
import { Popover } from "../overlays/Popover"

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
  children?: React.ReactNode
  className?: string
}

function itemValue(item: NavMenuItem, index: number): string {
  return item.value ?? `item-${index}`
}

function firstEnabledValue(items: NavMenuItem[]): string | undefined {
  return items.find((i) => !i.disabled)?.value ?? (items[0] ? itemValue(items[0], 0) : undefined)
}

function NavMenuLeaf({
  item,
  active,
  onSelect,
}: {
  item: NavMenuItem
  active: boolean
  onSelect: () => void
}) {
  const className = cn(
    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
    "hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
    item.disabled && "pointer-events-none opacity-50"
  )

  if (item.href) {
    return (
      <Link href={item.href} className={className} aria-current={active ? "page" : undefined} onClick={onSelect}>
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

function NavMenuSubmenu({ item, activeValue, onSelect }: { item: NavMenuItem; activeValue?: string; onSelect: (value: string) => void }) {
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
          const value = itemValue(child, index)
          const active = activeValue === value
          return (
            <button
              key={value}
              type="button"
              disabled={child.disabled}
              className={cn(
                "flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted/80",
                active && "bg-muted",
                child.disabled && "pointer-events-none opacity-50"
              )}
              onClick={() => {
                onSelect(value)
                if (child.href && typeof window !== "undefined") window.location.assign(child.href)
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

export function NavigationMenu({
  items,
  value,
  defaultValue,
  onChange,
  orientation = "horizontal",
  children,
  className,
  ...rest
}: NavigationMenuProps) {
  const autoDefault = value === undefined && defaultValue === undefined ? firstEnabledValue(items) : undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? autoDefault ?? "")
  const isControlled = value !== undefined
  const activeValue = isControlled ? value : internalValue

  const select = (next: string) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  return (
    <nav
      aria-label="Main"
      className={cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col items-stretch" : "flex-row flex-wrap items-center",
        className
      )}
      {...rest}
    >
      {items.map((item, index) => {
        const itemKey = itemValue(item, index)
        if (item.children?.length) {
          return <NavMenuSubmenu key={itemKey} item={item} activeValue={activeValue} onSelect={select} />
        }
        return (
          <NavMenuLeaf
            key={itemKey}
            item={item}
            active={activeValue === itemKey}
            onSelect={() => {
              select(itemKey)
              if (item.href && typeof window !== "undefined") window.location.assign(item.href)
            }}
          />
        )
      })}
      {children}
    </nav>
  )
}

NavigationMenu.displayName = "NavigationMenu"
