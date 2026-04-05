import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Text, textVariants } from "../data-display/Text"

const labelVariants = cva("inline-flex items-center gap-1.5 text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean
  left?: React.ReactNode
}

const labelTextSizeMap: Record<NonNullable<VariantProps<typeof labelVariants>["size"]>, "xs" | "sm" | "base"> = {
  sm: "xs",
  md: "sm",
  lg: "base",
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ size, required, left, className, children, ...props }, ref) => {
    const resolvedSize = size ?? "md"
    return (
      <Text
        ref={ref as React.ForwardedRef<HTMLElement>}
        as="label"
        size={labelTextSizeMap[resolvedSize]}
        weight="medium"
        left={left}
        className={cn(labelVariants({ size }), className)}
        {...props}
      >
          {children}
          {required ? <span className={textVariants({ variant: "danger" })}>*</span> : null}
      </Text>
    )
  }
)

Label.displayName = "Label"
