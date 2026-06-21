import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Text } from "../data-display/Text"
import { Icon } from "../utilities/Icon"

const emptyStateVariants = cva("mx-auto flex flex-col items-center justify-center text-center", {
  variants: {
    variant: {
      default:
        "rounded-xl border border-border bg-card/40 px-6 py-8 shadow-sm ring-1 ring-border/60",
      minimal: "rounded-md border-0 bg-transparent py-4 text-muted-foreground",
      spacious:
        "max-w-2xl rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 px-10 py-16",
      error:
        "rounded-xl border-2 border-destructive/45 bg-destructive/[0.07] px-6 py-8 text-destructive shadow-sm",
    },
    size: {
      sm: "max-w-sm gap-2",
      md: "max-w-md gap-3",
      lg: "max-w-lg gap-4",
    },
  },
  compoundVariants: [
    { variant: "minimal", size: "sm", class: "gap-1.5 py-3" },
    { variant: "spacious", size: "lg", class: "gap-6 py-20" },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export interface EmptyStateAction {
  label: string
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  variant?: React.ComponentProps<typeof Button>["variant"]
}

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof emptyStateVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: EmptyStateAction
  className?: string
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ variant, size, title, description, icon, action, className, ...props }, ref) => {
    const iconMuted =
      variant === "minimal" ? "text-muted-foreground/80" : variant === "error" ? "text-destructive/80" : "text-muted-foreground"

    return (
      <div
        ref={ref}
        role="status"
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
      >
        {icon ? (
          <span className={iconMuted}>
            <Icon node={icon} size={variant === "spacious" && size === "lg" ? "xl" : "lg"} />
          </span>
        ) : null}
        {title ? (
          <Text
            as="div"
            size={size === "lg" ? "xl" : variant === "minimal" ? "sm" : "lg"}
            weight="semibold"
            variant={variant === "error" ? "danger" : "default"}
          >
            {title}
          </Text>
        ) : null}
        {description ? (
          <Text
            as="div"
            size="sm"
            variant={variant === "error" ? "danger" : "muted"}
            className={cn("max-w-sm", variant === "error" && "opacity-90")}
          >
            {description}
          </Text>
        ) : null}
        {action ? (
          <Button
            variant={action.variant ?? (variant === "error" ? "destructive" : "primary")}
            size={size === "sm" ? "sm" : "md"}
            loading={action.loading}
            disabled={action.disabled}
            onClick={action.onClick}
            className={cn("mt-1", variant === "minimal" && "mt-0")}
          >
            {action.label}
          </Button>
        ) : null}
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"
export { emptyStateVariants }
