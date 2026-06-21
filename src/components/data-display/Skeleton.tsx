import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const skeletonVariants = cva("animate-pulse bg-skeleton", {
  variants: {
    variant: {
      text: "h-4 w-12 rounded",
      avatar: "h-10 w-10 rounded-full",
      button: "h-9 w-24 rounded-md",
      badge: "h-5 w-5 rounded-full",
      card: "h-32 w-32 rounded-lg",
      input: "h-9 w-24 rounded-md",
      checkbox: "h-4 w-4 rounded-sm",
      tableCell: "h-4 w-full rounded",
      tableRow: "h-10 w-full rounded-md",
      radio: "h-5 w-5 rounded-full",
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
  count?: number
  className?: string
  children?: React.ReactNode
}

function withUnit(value?: string | number): string | number | undefined {
  if (value == null) return undefined
  return typeof value === "number" ? `${value}px` : value
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant, width, height, count = 1, className, children, ...props }, ref) => {
    const items = Array.from({ length: Math.max(1, count) })
    return (
      <div className={cn("flex flex-col gap-2", count === 1 && "contents")}>
        {items.map((_, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? ref : undefined}
            data-slot={`skeleton-${idx}`}
            className={cn(skeletonVariants({ variant }), className)}
            style={{ width: withUnit(width), height: withUnit(height) }}
            {...props}
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
                  "block min-w-0 flex-1 rounded-sm leading-none",
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
