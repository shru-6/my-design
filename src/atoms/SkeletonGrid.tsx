import * as React from "react"
import { cn } from "../utils"
import { Skeleton } from "./Skeleton"

export interface SkeletonGridProps {
  count?: number
  cols?: { default?: number; md?: number; lg?: number }
  className?: string
  renderSkeleton?: () => React.ReactNode
}

export function SkeletonGrid({
  count = 6,
  cols = { default: 1, md: 2, lg: 3 },
  className,
  renderSkeleton,
}: SkeletonGridProps) {
  const defaultSkeleton = () => <Skeleton className="h-32" />
  const skeleton = renderSkeleton || defaultSkeleton

  // Map column values to Tailwind classes
  const colMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }

  const gridClasses = cn(
    "grid gap-4",
    cols.default && colMap[cols.default],
    cols.md && `md:${colMap[cols.md]}`,
    cols.lg && `lg:${colMap[cols.lg]}`,
    className
  )

  return (
    <div className={gridClasses} data-slot="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>{skeleton()}</React.Fragment>
      ))}
    </div>
  )
}
