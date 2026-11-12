import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "./Button"

/**
 * Internal shared primitive (not part of the public API — `Button` with
 * `iconOnly` is the exported way to do this). It exists so the "small square
 * or round icon-only clickable" pattern — field clear buttons, overlay close
 * buttons, picker steppers — has exactly one implementation instead of the
 * hand-copied `<button className="inline-flex h-8 w-8 …">` that had been
 * duplicated across DatePicker / TimePicker / SearchInput.
 *
 * Consume it from other categories by relative path:
 *   import { IconButton } from "../actions/IconButton"
 */
const iconButtonVariants = cva("", {
  variants: {
    /**
     * `default` inherits the Button variant's own foreground. `muted` is the
     * adornment look: dim until hovered, no background of its own — what a
     * clear / dismiss control inside a field or surface wants.
     */
    tone: {
      default: "",
      muted: "text-muted-foreground hover:text-foreground",
    },
    shape: {
      /** Keeps `Button`'s size-matched `rounded-control-*`. */
      control: "",
      round: "rounded-pill",
    },
  },
  defaultVariants: {
    tone: "default",
    shape: "control",
  },
})

export type IconButtonProps = Omit<
  ButtonProps,
  "left" | "right" | "children" | "label" | "iconOnly" | "ariaLabel" | "href"
> &
  VariantProps<typeof iconButtonVariants> & {
    /** The glyph. Wrapped in `Icon` by `Button`, so a bare lucide element is fine. */
    icon: React.ReactNode
    /**
     * Required — an icon-only control has no text to name it. Passed straight
     * through as `aria-label`.
     */
    ariaLabel: string
  }

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ariaLabel, tone, shape, variant = "ghost", size = "sm", iconSize, className, ...props }, ref) => (
    <Button
      ref={ref as React.Ref<HTMLButtonElement | HTMLAnchorElement>}
      variant={variant}
      size={size}
      iconOnly
      ariaLabel={ariaLabel}
      left={icon}
      iconSize={iconSize}
      className={cn(iconButtonVariants({ tone, shape }), className)}
      {...props}
    />
  )
)

IconButton.displayName = "IconButton"

export { iconButtonVariants }
