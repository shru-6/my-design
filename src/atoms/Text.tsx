import * as React from "react"
import { cn } from "../utils"

const textVariants = ["default", "muted", "small", "large"] as const
const textAsElements = ["p", "span", "div", "code"] as const

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: typeof textVariants[number]
  as?: typeof textAsElements[number]
}

export function Text({
  className,
  variant = "default",
  as: Component = "p",
  ...props
}: TextProps) {
  return (
    <Component
      data-slot="text"
      className={cn(
        "text-foreground",
        variant === "muted" && "text-muted-foreground",
        variant === "small" && "text-sm",
        variant === "large" && "text-lg",
        className
      )}
      {...props}
    />
  )
}
