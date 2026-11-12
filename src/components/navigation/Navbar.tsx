import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Link } from "../data-display/Link"
import { Separator } from "../layout/Separator"
import { Dropdown, type DropdownItem } from "./Dropdown"
import { handleNavLinkClick, navigateToHref, type NavigateHandler } from "./shared"

export const navbarVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      bordered: "border-b border-border bg-background",
      floating: "mx-auto max-w-6xl rounded-surface-lg border border-border bg-background shadow-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type NavItem = {
  label: React.ReactNode
  href?: string
  left?: React.ReactNode
  active?: boolean
  disabled?: boolean
  children?: NavItem[]
}

export interface NavbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    VariantProps<typeof navbarVariants> {
  logo?: React.ReactNode
  items?: NavItem[]
  left?: React.ReactNode
  right?: React.ReactNode
  sticky?: boolean
  separator?: boolean
  children?: React.ReactNode
  /** Passed to top-level nav links (not submenus). */
  linkVariant?: React.ComponentProps<typeof Link>["variant"]
  /**
   * Called instead of a full page load when a nav item with an `href` is
   * activated — wire a client router here. Omit and the Navbar navigates on its
   * own (`location.assign` for submenu rows, the plain anchor for link rows).
   */
  onNavigate?: NavigateHandler<NavItem>
}

function navChildrenToDropdownItems(
  children: NavItem[],
  onNavigate?: NavigateHandler<NavItem>
): DropdownItem[] {
  return children.map((c) => ({
    label: c.label,
    disabled: c.disabled,
    onClick: c.disabled || !c.href ? undefined : () => navigateToHref(c.href, c, onNavigate),
  }))
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(function Navbar(
  {
    logo,
    items = [],
    left,
    right,
    sticky = false,
    separator = false,
    variant = "default",
    className,
    children,
    linkVariant = "muted",
    onNavigate,
    ...rest
  },
  ref
) {
  return (
    <header
      ref={ref}
      className={cn(
        navbarVariants({ variant }),
        sticky && "sticky top-0 z-sticky",
        className
      )}
      {...rest}
    >
      <nav className="flex min-h-14 flex-wrap items-center gap-3 px-4 py-2 md:gap-6 md:px-6" aria-label="Main">
        {logo != null ? <div className="flex shrink-0 items-center gap-2">{logo}</div> : null}
        {left != null ? <div className="flex shrink-0 items-center gap-2">{left}</div> : null}

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1 md:gap-2">
          {items.map((item, index) => {
            if (item.children?.length) {
              return (
                <Dropdown
                  key={index}
                  items={navChildrenToDropdownItems(item.children, onNavigate)}
                  triggerProps={{
                    label: item.label,
                    left: item.left,
                    variant: "ghost",
                    size: "md",
                    className: cn(
                      "font-normal text-muted-foreground hover:text-foreground",
                      item.active && "bg-muted text-foreground"
                    ),
                  }}
                />
              )
            }

            if (item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  variant={linkVariant}
                  className={cn(
                    "rounded-control-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/80",
                    item.active && "bg-muted text-foreground",
                    item.disabled && "pointer-events-none opacity-50"
                  )}
                  aria-current={item.active ? "page" : undefined}
                  onClick={(e) => handleNavLinkClick(e, item.href, item, onNavigate)}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <Button
                key={index}
                variant="ghost"
                size="md"
                left={item.left}
                disabled={item.disabled}
                className={cn(
                  "font-normal text-muted-foreground hover:text-foreground",
                  item.active && "bg-muted text-foreground"
                )}
              >
                {item.label}
              </Button>
            )
          })}
        </div>

        {right != null ? <div className="ml-auto flex shrink-0 items-center gap-2">{right}</div> : null}
        {children}
      </nav>
      {separator ? <Separator /> : null}
    </header>
  )
})

Navbar.displayName = "Navbar"
