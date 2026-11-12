import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { hasNonEmptyChildren, resolveSectionBorders, sizeToCss } from "./shared"

const cardVariants = cva("border text-foreground", {
  variants: {
    variant: {
      transparent: "border-transparent bg-transparent shadow-none",
      "surface-1": "border-border bg-card shadow-sm",
      "surface-2": "border-border bg-muted/40 shadow-md",
      outlined: "border-border bg-background shadow-none",
    },
    // A Card is a surface, not a control — radius tier follows its own size.
    size: {
      sm: "text-sm rounded-surface-sm",
      md: "text-base rounded-surface-md",
      lg: "text-base rounded-surface-lg",
    },
  },
  defaultVariants: {
    variant: "surface-1",
    size: "md",
  },
})

export type CardVariant = VariantProps<typeof cardVariants>["variant"]

const sectionPad: Record<NonNullable<VariantProps<typeof cardVariants>["size"]>, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4",
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
    const hasContent = hasNonEmptyChildren(children)
    const hasHeader = Boolean(header)
    const hasFooter = Boolean(footer)
    const { headerBorderBottom, footerBorderTop } = resolveSectionBorders({
      hasHeader,
      hasContent,
      hasFooter,
    })

    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn("relative flex flex-col overflow-hidden", cardVariants({ variant, size: effectiveSize }), className)}
        style={{ minHeight: sizeToCss(minHeight), maxHeight: sizeToCss(maxHeight), ...style }}
        {...props}
      >
        {hasHeader ? (
          <div
            data-slot="card-header"
            className={cn(
              "sticky top-0 shrink-0 bg-inherit",
              headerBorderBottom && "border-b border-border",
              sectionPad[effectiveSize]
            )}
          >
            {header}
          </div>
        ) : null}
        {hasContent ? (
          <div data-slot="card-content" className={cn("min-h-0 flex-1 overflow-y-auto", sectionPad[effectiveSize])}>
            {children}
          </div>
        ) : null}
        {hasFooter ? (
          <div
            data-slot="card-footer"
            className={cn(
              "sticky bottom-0 shrink-0 bg-inherit",
              footerBorderTop && "border-t border-border",
              sectionPad[effectiveSize]
            )}
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
