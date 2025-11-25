"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

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

export function GridShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Grid Layouts</h4>
        <div className="space-y-4">
          <Grid cols={3} gap="md">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg bg-muted">Item {i + 1}</div>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

