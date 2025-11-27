import * as React from "react"
import { cn } from "../utils"

const textVariants = ["default", "muted", "small", "large"] as const
const textAsElements = ["p", "span", "div"] as const

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

export function TextShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Variants</h4>
        <div className="space-y-2">
          {textVariants.map((variant) => (
            <Text key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} text
            </Text>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">As Different Elements</h4>
        <div className="space-y-2">
          {textAsElements.map((as) => (
            <Text key={as} as={as}>
              {as.charAt(0).toUpperCase() + as.slice(1)} text
            </Text>
          ))}
        </div>
      </div>
    </div>
  )
}

