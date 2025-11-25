"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: "ordered" | "unordered"
}

export function List({
  className,
  variant = "unordered",
  ...props
}: ListProps) {
  const Component = variant === "ordered" ? "ol" : "ul"

  return (
    <Component
      data-slot="list"
      className={cn(
        "list-inside space-y-2",
        variant === "unordered" && "list-disc",
        variant === "ordered" && "list-decimal",
        className
      )}
      {...props}
    />
  )
}

export function ListShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">List Variants</h4>
        <div className="grid grid-cols-2 gap-4">
          <List variant="unordered">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </List>
          <List variant="ordered">
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </List>
        </div>
      </div>
    </div>
  )
}

