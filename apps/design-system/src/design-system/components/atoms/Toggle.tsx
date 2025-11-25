"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariantsConfig = {
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10",
    },
  },
  defaultVariants: {
    variant: "default" as const,
    size: "default" as const,
  },
} as const

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  toggleVariantsConfig
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

export function ToggleShowcase() {
  const variants = Object.keys(toggleVariantsConfig.variants.variant) as Array<keyof typeof toggleVariantsConfig.variants.variant>
  const sizes = Object.keys(toggleVariantsConfig.variants.size) as Array<keyof typeof toggleVariantsConfig.variants.size>
  
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Variants</h4>
        <div className="flex items-center gap-2">
          {variants.map((variant) => (
            <div key={variant} className="flex items-center gap-2">
              <Toggle variant={variant} aria-label={`Toggle ${variant}`}>
                <span>{variant === "default" ? "B" : "I"}</span>
              </Toggle>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Sizes</h4>
        <div className="flex items-center gap-2">
          {sizes.map((size) => (
            <Toggle key={size} size={size} aria-label={`${size} toggle`}>
              {size === "sm" ? "S" : size === "default" ? "M" : "L"}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  )
}

