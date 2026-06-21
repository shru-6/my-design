import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "./Button"
import { Dropdown, type DropdownItem, type DropdownProps } from "../navigation/Dropdown"

export type SplitButtonMenuItem = {
  label: React.ReactNode
  onClick?: () => void
  left?: React.ReactNode
  disabled?: boolean
  separator?: boolean
}

export interface SplitButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  onClick?: () => void
  menuItems: SplitButtonMenuItem[]
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  variant?: Exclude<ButtonProps["variant"], "destructive">
  size?: ButtonProps["size"]
  buttonProps?: Partial<Omit<ButtonProps, "variant" | "size" | "children" | "iconOnly">>
  dropdownProps?: Partial<Omit<DropdownProps, "items" | "trigger">>
}

function menuToDropdownItems(items: SplitButtonMenuItem[]): DropdownItem[] {
  return items.map((item) => ({
    label: item.label,
    onClick: item.onClick,
    left: item.left,
    disabled: item.disabled,
    separator: item.separator,
  }))
}

export function SplitButton({
  onClick,
  menuItems,
  disabled,
  loading,
  children,
  variant = "primary",
  size = "md",
  buttonProps,
  dropdownProps,
  className,
  ...rest
}: SplitButtonProps) {
  const items = menuToDropdownItems(menuItems ?? [])
  const {
    className: bpClass,
    onClick: bpOnClick,
    disabled: bpDisabled,
    loading: bpLoading,
    ...restButton
  } = buttonProps ?? {}

  const divideClass =
    variant === "outline"
      ? "divide-border border border-border bg-background"
      : variant === "ghost"
        ? "divide-border/50"
        : variant === "secondary"
          ? "divide-secondary-foreground/25"
          : "divide-primary-foreground/25"

  return (
    <div className={cn("inline-flex divide-x overflow-hidden rounded-md", divideClass, className)} {...rest}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled ?? bpDisabled}
        loading={loading ?? bpLoading}
        className={cn("rounded-none rounded-l-md border-0 shadow-none", bpClass)}
        onClick={(e) => {
          bpOnClick?.(e)
          onClick?.()
        }}
        {...restButton}
      >
        {children ?? "Action"}
      </Button>
      <Dropdown
        items={items}
        align="end"
        trigger={
          <Button
            variant={variant}
            size={size}
            iconOnly
            ariaLabel="Open menu"
            disabled={Boolean(disabled ?? bpDisabled) || Boolean(loading ?? bpLoading)}
            className={cn("rounded-none rounded-r-md border-0 shadow-none", bpClass)}
            left={<ChevronDown className="h-4 w-4" strokeWidth={2} aria-hidden />}
          />
        }
        {...dropdownProps}
      />
    </div>
  )
}

SplitButton.displayName = "SplitButton"
