import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const cardVariants = cva("rounded-lg border text-foreground", {
  variants: {
    variant: {
      transparent: "border-transparent bg-transparent shadow-none",
      "surface-1": "border-border bg-card shadow-sm",
      "surface-2": "border-border bg-muted/40 shadow-md",
      outlined: "border-border bg-background shadow-none",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "surface-1",
    size: "md",
  },
})

export type CardVariant = VariantProps<typeof cardVariants>["variant"]
export type CardColor = never

const sectionPad: Record<NonNullable<VariantProps<typeof cardVariants>["size"]>, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4",
}

function withUnit(value?: string | number): string | number | undefined {
  if (value == null) return undefined
  return typeof value === "number" ? `${value}px` : value
}

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode
  footer?: React.ReactNode
  minHeight?: string | number
  maxHeight?: string | number
  children?: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant, size = "md", header, footer, minHeight, maxHeight, className, children, style, ...props }, ref) => {
    const effectiveSize: NonNullable<VariantProps<typeof cardVariants>["size"]> = size ?? "md"

    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn("relative flex flex-col overflow-hidden", cardVariants({ variant, size: effectiveSize }), className)}
        style={{ minHeight: withUnit(minHeight), maxHeight: withUnit(maxHeight), ...style }}
        {...props}
      >
        {header ? (
          <div
            data-slot="card-header"
            className={cn("sticky top-0 z-20 shrink-0 border-b border-border bg-inherit", sectionPad[effectiveSize])}
          >
            {header}
          </div>
        ) : null}
        <div data-slot="card-content" className={cn("min-h-0 flex-1 overflow-y-auto", sectionPad[effectiveSize])}>
          {children}
        </div>
        {footer ? (
          <div
            data-slot="card-footer"
            className={cn("sticky bottom-0 z-20 shrink-0 border-t border-border bg-inherit", sectionPad[effectiveSize])}
          >
            {footer}
          </div>
        ) : null}
      </div>
    )
  }
)

Card.displayName = "Card"

export { cardVariants }
