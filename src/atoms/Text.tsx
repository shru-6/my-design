import * as React from "react"
import { cn } from "../utils"

const textVariants = ["default", "muted", "small", "large"] as const
const textAsElements = ["p", "span", "div", "code"] as const

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: typeof textVariants[number]
  as?: typeof textAsElements[number]
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Text({
  className,
  variant = "default",
  as: Component = "p",
  leftIcon,
  rightIcon,
  children,
  ...props
}: TextProps) {
  const hasIcons = leftIcon || rightIcon
  
  return (
    <Component
      data-slot="text"
      className={cn(
        "text-foreground",
        variant === "muted" && "text-muted-foreground",
        variant === "small" && "text-sm",
        variant === "large" && "text-lg",
        hasIcons && "flex items-center gap-2",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </Component>
  )
}
