"use client"

import * as React from "react"
import { cn } from "../utils"

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
