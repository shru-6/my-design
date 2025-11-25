"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export function Box({
  className,
  as: Component = "div",
  ...props
}: BoxProps) {
  return (
    <Component
      data-slot="primitive-box"
      className={cn(className)}
      {...props}
    />
  )
}

export function PrimitiveBoxShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Primitive Box</h4>
        <Box className="p-4 border rounded-lg">Primitive Box Content</Box>
      </div>
    </div>
  )
}

