"use client"

import * as React from "react"
import { cn } from "../utils"

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "sm" | "md" | "lg"
}

export function Stack({
  className,
  spacing = "md",
  ...props
}: StackProps) {
  return (
    <div
      data-slot="primitive-stack"
      className={cn(
        "flex flex-col",
        spacing === "sm" && "space-y-2",
        spacing === "md" && "space-y-4",
        spacing === "lg" && "space-y-6",
        className
      )}
      {...props}
    />
  )
}

export function PrimitiveStackShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Primitive Stack</h4>
        <Stack spacing="md" className="border p-4">
          <div className="p-2 bg-muted">Item 1</div>
          <div className="p-2 bg-muted">Item 2</div>
          <div className="p-2 bg-muted">Item 3</div>
        </Stack>
      </div>
    </div>
  )
}

