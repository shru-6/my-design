import * as React from "react"
import { cn } from "../../utils"
import { Dropdown, type DropdownItem } from "./Dropdown"

export type MenubarMenu = {
  label: React.ReactNode
  value?: string
  items: DropdownItem[]
}

export interface MenubarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  menus: MenubarMenu[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

function menuValue(menu: MenubarMenu, index: number): string {
  return menu.value ?? `menu-${index}`
}

export function Menubar({ menus = [], value, defaultValue, onChange, className, ...rest }: MenubarProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const isControlled = value !== undefined
  const activeValue = isControlled ? value : internalValue

  const setActive = (next: string) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  return (
    <div role="menubar" className={cn("inline-flex items-center gap-1 rounded-md border border-border bg-background p-1", className)} {...rest}>
      {menus.map((menu, index) => {
        const menuKey = menuValue(menu, index)
        const open = activeValue === menuKey
        return (
          <Dropdown
            key={menuKey}
            items={menu.items}
            open={open}
            onOpenChange={(nextOpen) => setActive(nextOpen ? menuKey : "")}
            triggerProps={{
              label: menu.label,
              variant: "ghost",
              size: "md",
              className: cn("font-medium", open && "bg-muted text-foreground"),
            }}
          />
        )
      })}
    </div>
  )
}

Menubar.displayName = "Menubar"
