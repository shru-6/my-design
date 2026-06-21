import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Icon } from "../utilities/Icon"

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      "2xs": "text-[10px] leading-tight",
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    variant: {
      default: "",
      muted: "text-muted-foreground",
      subtle: "opacity-80",
      code: "font-mono rounded bg-muted px-1.5 py-0.5",
      danger: "text-destructive",
      outline: "border border-border",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    weight: "normal",
  },
})

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "type">,
    VariantProps<typeof textVariants> {
  as?: "span" | "div" | "p" | "label" | "button"
  left?: React.ReactNode
  right?: React.ReactNode
  truncate?: boolean
  lineClamp?: number
  className?: string
  children?: React.ReactNode
}

const textIconSizeMap: Record<NonNullable<TextProps["size"]>, "xs" | "sm" | "md" | "lg" | "xl"> = {
  "2xs": "xs",
  xs: "xs",
  sm: "xs",
  base: "sm",
  md: "sm",
  lg: "md",
  xl: "lg",
  "2xl": "xl",
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { as: Comp = "div", left, right, truncate, lineClamp, size, variant, weight, className, children, ...props },
    ref
  ) => {
    const resolvedSize = size ?? "md"
    const iconSize = textIconSizeMap[resolvedSize]
    const clamped = lineClamp != null
    const isInlineHost = Comp === "span" || Comp === "button"

    return (
      <Comp
        ref={ref as never}
        data-slot="text"
        className={cn(
          textVariants({ size, variant, weight }),
          isInlineHost ? "inline-flex min-w-0 items-center gap-1.5" : "flex min-w-0 items-center gap-1.5",
          className
        )}
        {...props}
      >
        {left ? <Icon node={left} size={iconSize} /> : null}
        <span
          className={cn("min-w-0", truncate && "truncate", clamped && "overflow-hidden")}
          style={
            clamped
              ? {
                  WebkitLineClamp: lineClamp,
                  WebkitBoxOrient: "vertical",
                  display: "-webkit-box",
                }
              : undefined
          }
        >
          {children}
        </span>
        {right ? <Icon node={right} size={iconSize} /> : null}
      </Comp>
    )
  }
)

Text.displayName = "Text"
export { textVariants }
