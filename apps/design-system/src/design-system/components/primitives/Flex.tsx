"use client"

import * as React from "react"
import { cn } from "../utils"

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
  wrap?: boolean
  gap?: "none" | "sm" | "md" | "lg"
}

export function Flex({
  className,
  direction = "row",
  wrap = false,
  gap = "none",
  ...props
}: FlexProps) {
  return (
    <div
      data-slot="primitive-flex"
      className={cn(
        "flex",
        direction === "row" && "flex-row",
        direction === "column" && "flex-col",
        direction === "row-reverse" && "flex-row-reverse",
        direction === "column-reverse" && "flex-col-reverse",
        wrap && "flex-wrap",
        gap === "sm" && "gap-2",
        gap === "md" && "gap-4",
        gap === "lg" && "gap-6",
        className
      )}
      {...props}
    />
  )
}

export function PrimitiveFlexShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Primitive Flex</h4>
        <Flex gap="md" className="border p-4">
          <div className="p-2 bg-muted">Item 1</div>
          <div className="p-2 bg-muted">Item 2</div>
          <div className="p-2 bg-muted">Item 3</div>
        </Flex>
      </div>
    </div>
  )
}

