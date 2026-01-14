"use client"

import * as React from "react"
import { cn } from "../utils"

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: "none" | "sm" | "md" | "lg"
}

export function Grid({
  className,
  cols = 3,
  gap = "md",
  ...props
}: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "grid",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-2",
        cols === 3 && "grid-cols-3",
        cols === 4 && "grid-cols-4",
        cols === 6 && "grid-cols-6",
        cols === 12 && "grid-cols-12",
        gap === "sm" && "gap-2",
        gap === "md" && "gap-4",
        gap === "lg" && "gap-6",
        className
      )}
      {...props}
    />
  )
}
