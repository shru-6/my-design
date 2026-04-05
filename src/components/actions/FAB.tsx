import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { disabledControl, focusRing } from "../inputs/fieldPieces"
import { Icon } from "../utilities/Icon"

const fabVariants = cva(
  `fixed z-30 inline-flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 ${focusRing} ${disabledControl}`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "h-10 w-10",
        md: "h-12 w-12",
        lg: "h-14 w-14",
      },
      position: {
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      position: "bottom-right",
    },
  }
)

export interface FABProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof fabVariants> {
  left: React.ReactNode
  ariaLabel: string
}

export const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ left, ariaLabel, variant, size, position, className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={cn(fabVariants({ variant, size, position }), className)}
      {...props}
    >
      <Icon node={left} size={size === "lg" ? "lg" : "md"} />
    </button>
  )
)

FAB.displayName = "FAB"
