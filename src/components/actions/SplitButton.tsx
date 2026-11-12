import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cva } from "class-variance-authority"
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

/**
 * The seam between the two halves. Keyed on `Button`'s own variant names so a
 * new Button variant only needs a line here, not a rewritten conditional —
 * and the `variant` prop below is typed off `ButtonProps["variant"]`, so
 * adding one to Button surfaces as a type error here rather than silently
 * falling through to the primary seam color.
 */
const splitButtonGroupVariants = cva("inline-flex divide-x overflow-hidden", {
  variants: {
    variant: {
      primary: "divide-primary-foreground/25",
      secondary: "divide-secondary-foreground/25",
      outline: "divide-border border border-border bg-background",
      ghost: "divide-border/50",
      destructive: "divide-destructive-foreground/25",
    },
    size: {
      sm: "rounded-control-sm",
      md: "rounded-control-md",
      lg: "rounded-control-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

/**
 * Both halves drop their own radius so the group's `overflow-hidden` is the
 * only thing shaping the corners — otherwise each half rounds against the
 * divider and notches the seam. An arbitrary zero rather than the flat
 * Tailwind scale's zero utility: that scale is banned repo-wide, and this is
 * an explicit "no shape here" anyway, not a shape choice a theme should own.
 */
const splitButtonHalf = "rounded-[0] border-0 shadow-none"

export interface SplitButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  onClick?: () => void
  menuItems: SplitButtonMenuItem[]
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  variant?: ButtonProps["variant"]
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

export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(function SplitButton(
  {
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
  },
  ref
) {
  const items = menuToDropdownItems(menuItems ?? [])
  const {
    className: bpClass,
    onClick: bpOnClick,
    disabled: bpDisabled,
    loading: bpLoading,
    ...restButton
  } = buttonProps ?? {}

  const isDisabled = disabled ?? bpDisabled
  const isLoading = loading ?? bpLoading

  return (
    <div
      ref={ref}
      data-slot="split-button"
      className={cn(splitButtonGroupVariants({ variant, size }), className)}
      {...rest}
    >
      <Button
        variant={variant}
        size={size}
        disabled={isDisabled}
        loading={isLoading}
        className={cn(splitButtonHalf, bpClass)}
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
            disabled={Boolean(isDisabled) || Boolean(isLoading)}
            className={cn(splitButtonHalf, bpClass)}
            left={<ChevronDown className="h-4 w-4" strokeWidth={2} aria-hidden />}
          />
        }
        {...dropdownProps}
      />
    </div>
  )
})

SplitButton.displayName = "SplitButton"

export { splitButtonGroupVariants }
