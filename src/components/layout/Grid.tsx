import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

type GridColumnCount = 1 | 2 | 3 | 4 | 6 | 12
type GridRowCount = 1 | 2 | 3 | 4 | 5 | 6

const columnClass: Record<GridColumnCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
}

const rowClass: Record<GridRowCount, string> = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
}

const gridSpacingVariants = cva("", {
  variants: {
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
    columnGap: {
      none: "gap-x-0",
      sm: "gap-x-2",
      md: "gap-x-4",
      lg: "gap-x-6",
    },
    rowGap: {
      none: "gap-y-0",
      sm: "gap-y-2",
      md: "gap-y-4",
      lg: "gap-y-6",
    },
    autoFlow: {
      default: "",
      row: "grid-flow-row",
      column: "grid-flow-col",
      dense: "grid-flow-dense",
      rowDense: "grid-flow-row-dense",
      colDense: "grid-flow-col-dense",
    },
    alignItems: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justifyItems: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
  },
  defaultVariants: {
    gap: "md",
    autoFlow: "default",
  },
})

/**
 * **autoFlow** → CSS `grid-auto-flow`: `default` (no class, browser row); `row` (explicit);
 * `column` (fill columns first); `dense` | `rowDense` | `colDense` (backfill holes).
 */
export type GridRootTag = "div" | "ul" | "ol"

export interface GridProps<T = unknown>
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    VariantProps<typeof gridSpacingVariants> {
  /** Semantic wrapper (`ul` / `ol` for lists). Default `div`. */
  as?: GridRootTag
  /** Fixed column count; ignored when `minChildWidth` is set. */
  columns?: GridColumnCount
  /** Fixed row count (implicit tracks). */
  rows?: GridRowCount
  /** When set, uses auto-fill columns with this min track width (e.g. `12rem`, `200px`). */
  minChildWidth?: string
  className?: string
  items: readonly T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getItemKey?: (item: T, index: number) => React.Key
}

function normalizeColumns(value: GridProps["columns"]): GridColumnCount {
  if (value == null) return 1
  const n = typeof value === "string" ? Number(value) : value
  return ([1, 2, 3, 4, 6, 12] as const).includes(n as GridColumnCount) ? (n as GridColumnCount) : 1
}

function normalizeRows(value: GridProps["rows"]): GridRowCount | undefined {
  if (value == null) return undefined
  const n = typeof value === "string" ? Number(value) : value
  return ([1, 2, 3, 4, 5, 6] as const).includes(n as GridRowCount) ? (n as GridRowCount) : undefined
}

const GridInner = <T,>(
  {
    as = "div",
    columns: columnsProp = 1,
    rows: rowsProp,
    gap,
    columnGap,
    rowGap,
    autoFlow,
    alignItems,
    justifyItems,
    minChildWidth,
    className,
    style,
    items,
    renderItem,
    getItemKey,
    ...props
  }: GridProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const columns = normalizeColumns(columnsProp)
  const rows = normalizeRows(rowsProp)
  const Comp = as as React.ElementType
  return (
    <Comp
      ref={ref}
      data-slot="grid"
      className={cn(
        "grid",
        minChildWidth
          ? "grid-cols-[repeat(auto-fill,minmax(var(--grid-min),1fr))]"
          : columnClass[columns],
        rows != null && rowClass[rows],
        gridSpacingVariants({ gap, columnGap, rowGap, autoFlow, alignItems, justifyItems }),
        className
      )}
      style={
        minChildWidth
          ? ({ ...style, ["--grid-min" as string]: minChildWidth } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={getItemKey?.(item, index) ?? index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </Comp>
  )
}

export const Grid = Object.assign(
  React.forwardRef(GridInner) as <T>(
    props: GridProps<T> & React.RefAttributes<HTMLElement>
  ) => React.ReactElement | null,
  { displayName: "Grid" }
)
export { gridSpacingVariants as gridVariants }
