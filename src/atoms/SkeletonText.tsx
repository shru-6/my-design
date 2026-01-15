import * as React from "react"
import { cn } from "../utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonTextProps {
  lines?: number
  className?: string
  lineHeight?: "sm" | "md" | "lg"
  lastLineWidth?: "full" | "3/4" | "1/2"
}

export function SkeletonText({
  lines = 3,
  className,
  lineHeight = "md",
  lastLineWidth = "3/4",
}: SkeletonTextProps) {
  const heightClasses = {
    sm: "h-3",
    md: "h-4",
    lg: "h-5",
  }

  const widthClasses = {
    full: "w-full",
    "3/4": "w-3/4",
    "1/2": "w-1/2",
  }

  return (
    <div className={cn("space-y-2", className)} data-slot="skeleton-text">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            heightClasses[lineHeight],
            i === lines - 1 && widthClasses[lastLineWidth],
            i < lines - 1 && "w-full"
          )}
        />
      ))}
    </div>
  )
}
