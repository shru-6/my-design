import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { sizeToCss } from "../layout/shared"

const skeletonVariants = cva("animate-pulse bg-skeleton", {
  variants: {
    // Radius mirrors the real thing each placeholder stands in for: controls
    // get `control-*`, cards get `surface-*`, round things get `pill`.
    variant: {
      text: "h-4 w-12 rounded-control-sm",
      avatar: "h-10 w-10 rounded-pill",
      button: "h-9 w-24 rounded-control-md",
      badge: "h-5 w-5 rounded-pill",
      card: "h-32 w-32 rounded-surface-md",
      input: "h-9 w-24 rounded-control-md",
      checkbox: "h-4 w-4 rounded-control-sm",
      tableCell: "h-4 w-full rounded-control-sm",
      tableRow: "h-10 w-full rounded-control-md",
      radio: "h-5 w-5 rounded-pill",
    },
  },
  defaultVariants: {
    variant: "text",
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
  /** Repeat the placeholder N times inside a wrapper. Default 1 (no wrapper). */
  count?: number
  className?: string
  children?: React.ReactNode
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant, width, height, count = 1, className, children, ...props }, ref) => {
    const shapeClass = cn(skeletonVariants({ variant }), className)
    const shapeStyle = { width: sizeToCss(width), height: sizeToCss(height) }

    // `count === 1` is the overwhelmingly common case and renders no wrapper at
    // all, so `id` / `aria-*` / `ref` land on the element the caller styled.
    if (count <= 1) {
      return (
        <div ref={ref} data-slot="skeleton" className={shapeClass} style={shapeStyle} {...props}>
          {children}
        </div>
      )
    }

    // Repeated: `{...props}` goes on the wrapper exactly once (spreading it on
    // every line duplicated `id` N times), while `className` still styles each
    // line — that's what callers pass it for.
    return (
      <div ref={ref} data-slot="skeleton-group" className="flex flex-col gap-2" {...props}>
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            data-slot={`skeleton-${idx}`}
            className={shapeClass}
            style={shapeStyle}
          >
            {children}
          </div>
        ))}
      </div>
    )
  }
)

Skeleton.displayName = "Skeleton"

export interface TableSkeletonProps {
  columns: number
  rows?: number
  selectable?: boolean
  size?: "sm" | "md" | "lg"
  /** Optional per-column widths (px, rem, %, etc.). */
  columnWidths?: Array<string | number | undefined>
  className?: string
}

const tableSkeletonRowPad: Record<NonNullable<TableSkeletonProps["size"]>, string> = {
  sm: "py-1.5",
  md: "py-2",
  lg: "py-3",
}

const tableSkeletonCellHeight: Record<NonNullable<TableSkeletonProps["size"]>, string> = {
  sm: "h-3.5",
  md: "h-4",
  lg: "h-5",
}

/** Column-aware table placeholder — matches Table cell rhythm. */
export function TableSkeleton({
  columns,
  rows = 5,
  selectable,
  size = "md",
  columnWidths,
  className,
}: TableSkeletonProps) {
  const rowPad = tableSkeletonRowPad[size]
  const cellHeight = tableSkeletonCellHeight[size]
  return (
    <div className={cn("w-full space-y-0", className)} aria-hidden>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className={cn("flex items-center gap-3 border-b border-border/80", rowPad)}>
          {selectable ? <Skeleton variant="checkbox" className="shrink-0" /> : null}
          {Array.from({ length: columns }).map((__, colIndex) => {
            const width = columnWidths?.[colIndex]
            return (
              <Skeleton
                key={colIndex}
                className={cn(
                  "block min-w-0 flex-1 rounded-control-sm leading-none",
                  cellHeight,
                  width === undefined && colIndex > 0 && "max-w-[12rem]"
                )}
                style={width !== undefined ? { width, maxWidth: width } : undefined}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

TableSkeleton.displayName = "TableSkeleton"
