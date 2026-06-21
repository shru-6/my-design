import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { disabledControl, focusRing, focusRingOffset } from "../inputs/fieldPieces"
import { Spinner } from "../data-display/Spinner"
import { Icon } from "../utilities/Icon"

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 rounded-[var(--radius-button,0.375rem)] font-medium transition-colors ${focusRing} ${focusRingOffset} ${disabledControl}`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-[var(--control-height-sm,2rem)] px-[var(--control-padding-sm,0.625rem)] text-sm",
        md: "h-[var(--control-height-md,2.5rem)] px-[var(--control-padding-md,0.75rem)] text-sm",
        lg: "h-[var(--control-height-lg,2.75rem)] px-[var(--control-padding-lg,0.875rem)] text-base",
      },
      iconOnly: {
        true: "aspect-square p-0",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-[var(--control-height-sm,2rem)]" },
      { iconOnly: true, size: "md", class: "w-[var(--control-height-md,2.5rem)]" },
      { iconOnly: true, size: "lg", class: "w-[var(--control-height-lg,2.75rem)]" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false,
    },
  }
)

type ButtonBaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type">

export type ButtonProps = ButtonBaseProps & {
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  left?: React.ReactNode
  right?: React.ReactNode
  iconOnly?: boolean
  ariaLabel?: string
  loading?: boolean
  className?: string
  children?: React.ReactNode
  href?: string
  label?: string
  type?: "button" | "submit" | "reset"
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    variant,
    size,
    left,
    right,
    iconOnly,
    ariaLabel,
    loading,
    className,
    children,
    href,
    label,
    type = "button",
    disabled,
    ...domProps
  } = props

  const busy = Boolean(loading)

  const content = (
    <>
      {busy ? <Spinner size={size === "lg" ? "md" : "sm"} /> : left ? <Icon node={left} size="sm" /> : null}
      {!iconOnly ? (children ?? label) : null}
      {!busy && right ? <Icon node={right} size="sm" /> : null}
    </>
  )

  const classes = cn(buttonVariants({ variant, size, iconOnly }), className)

  if (href) {
    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        aria-busy={busy || undefined}
        className={classes}
        {...(domProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      type={type}
      aria-label={ariaLabel}
      aria-busy={busy || undefined}
      disabled={disabled || busy}
      className={classes}
      {...domProps}
    >
      {content}
    </button>
  )
})

Button.displayName = "Button"
export { buttonVariants }
