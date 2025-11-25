"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl"
  weight?: "normal" | "medium" | "semibold" | "bold"
}

export function Text({
  className,
  as: Component = "p",
  size = "base",
  weight = "normal",
  ...props
}: TextProps) {
  return (
    <Component
      data-slot="primitive-text"
      className={cn(
        "text-foreground",
        size === "xs" && "text-xs",
        size === "sm" && "text-sm",
        size === "base" && "text-base",
        size === "lg" && "text-lg",
        size === "xl" && "text-xl",
        size === "2xl" && "text-2xl",
        weight === "normal" && "font-normal",
        weight === "medium" && "font-medium",
        weight === "semibold" && "font-semibold",
        weight === "bold" && "font-bold",
        className
      )}
      {...props}
    />
  )
}

export function PrimitiveTextShowcase() {
  const sizes = ["xs", "sm", "base", "lg", "xl", "2xl"] as const
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Primitive Text Sizes</h4>
        <div className="space-y-2">
          {sizes.map((size) => (
            <Text key={size} size={size}>
              {size.charAt(0).toUpperCase() + size.slice(1)} Text
            </Text>
          ))}
        </div>
      </div>
    </div>
  )
}

