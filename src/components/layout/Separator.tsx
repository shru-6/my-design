import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const separatorVariants = cva("shrink-0 bg-border ", {
  variants: {
    variant: {
      solid: "",
      dashed: "bg-transparent",
      dotted: "bg-transparent",
    },
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-6 w-px",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", variant: "dashed", class: "h-0 border-t border-dashed border-border" },
    { orientation: "horizontal", variant: "dotted", class: "h-0 border-t border-dotted border-border" },
    { orientation: "vertical", variant: "dashed", class: "w-0 border-l border-dashed border-border" },
    { orientation: "vertical", variant: "dotted", class: "w-0 border-l border-dotted border-border" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
  },
})

export interface SeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ variant, orientation, decorative = true, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      aria-orientation={(orientation ?? "horizontal") as "horizontal" | "vertical"}
      className={cn(separatorVariants({ variant, orientation }), className)}
      {...props}
    />
  )
)

Separator.displayName = "Separator"
