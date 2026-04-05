import * as React from "react"
import { cn } from "../../utils"
import { textVariants } from "../data-display/Text"

export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: "default" | "muted" | "error"
}

const toneToVariant: Record<NonNullable<HelperTextProps["tone"]>, "default" | "muted" | "danger"> = {
  default: "default",
  muted: "muted",
  error: "danger",
}

export const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ tone = "muted", className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(textVariants({ size: "xs", variant: toneToVariant[tone] }), className)}
      {...props}
    >
      {children}
    </p>
  )
)

HelperText.displayName = "HelperText"
