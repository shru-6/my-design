import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { IconButton, type IconButtonProps } from "./IconButton"

/**
 * `position: fixed` chrome that floats above page content *and* above the
 * dropdowns/popovers a page renders inline — hence `z-dropdown` rather than
 * `z-sticky`, which left it under every menu on the page.
 */
const fabVariants = cva("fixed z-dropdown shadow-lg transition-transform hover:scale-105 active:scale-95", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
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
})

export type FABPosition = NonNullable<VariantProps<typeof fabVariants>["position"]>

export interface FABProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    Pick<VariantProps<typeof fabVariants>, "variant" | "size" | "position"> {
  /** The glyph. Named `left` for parity with `Button`'s adornment slot. */
  left: React.ReactNode
  ariaLabel: string
}

export const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ left, ariaLabel, variant, size, position, className, type = "button", ...props }, ref) => (
    <IconButton
      ref={ref}
      type={type}
      ariaLabel={ariaLabel}
      icon={left}
      shape="round"
      iconSize={size === "lg" ? "lg" : "md"}
      // The FAB paints its own surface, so it opts out of Button's variant
      // colors rather than layering them.
      variant="ghost"
      size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
      className={cn(fabVariants({ variant, size, position }), className)}
      {...(props as Omit<IconButtonProps, "icon" | "ariaLabel">)}
    />
  )
)

FAB.displayName = "FAB"

export { fabVariants }
