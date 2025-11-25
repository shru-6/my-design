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
      data-slot="box"
      className={cn(className)}
      {...props}
    />
  )
}

export function BoxShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Box Component</h4>
        <div className="space-y-2">
          <Box as="div" className="p-4 border rounded-lg">Div Box</Box>
          <Box as="section" className="p-4 border rounded-lg">Section Box</Box>
          <Box as="article" className="p-4 border rounded-lg">Article Box</Box>
        </div>
      </div>
    </div>
  )
}

