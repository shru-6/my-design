import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { Dropdown, type DropdownItem } from "./Dropdown"

export const menubarVariants = cva("inline-flex items-center gap-1 p-1", {
  variants: {
    variant: {
      default: "rounded-control-md border border-border bg-background",
      ghost: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type MenubarMenu = {
  label: React.ReactNode
  value?: string
  items: DropdownItem[]
}

export interface MenubarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof menubarVariants> {
  menus: MenubarMenu[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

function menuValue(menu: MenubarMenu, index: number): string {
  return menu.value ?? `menu-${index}`
}

export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ menus = [], value, defaultValue, onChange, variant, className, ...rest }, ref) => {
    const [activeValue, setActive] = useControllableValue<string>({
      value,
      defaultValue: defaultValue ?? "",
      onChange,
    })

    return (
      <div
        ref={ref}
        role="menubar"
        className={cn(menubarVariants({ variant }), className)}
        {...rest}
      >
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
)

Menubar.displayName = "Menubar"
