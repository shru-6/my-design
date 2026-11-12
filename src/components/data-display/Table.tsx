import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { cn } from "../../utils"
import { Checkbox } from "../inputs/Checkbox"
import { Button } from "../actions/Button"
import { Skeleton } from "./Skeleton"
import { Pagination, type PaginationProps } from "../navigation/Pagination"
import { EmptyState } from "../patterns/EmptyState"

const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    variant: {
      default: "",
      striped: "[&_tbody_tr:nth-child(even)]:bg-muted/30",
      bordered: "border border-border [&_td]:border-border [&_th]:border-border [&_td]:border [&_th]:border",
    },
    size: {
      sm: "[&_th]:px-2 [&_th]:py-1.5 [&_td]:px-2 [&_td]:py-1.5",
      md: "[&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2",
      lg: "[&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export type TableColumnAlign = "left" | "center" | "right"

export interface TableColumn<T> {
  key: string
  /** Header cell content (any `ReactNode`; not passed through `Icon`). */
  header: React.ReactNode
  /** Cell content; default renders `row[key]` as a `ReactNode`. */
  render?: (row: T, rowIndex: number) => React.ReactNode
  sortable?: boolean
  width?: string | number
  align?: TableColumnAlign
  /** Pin column while scrolling horizontally. Set `width` on columns used in offset math; unknown widths are omitted (no default). */
  sticky?: "left" | "right"
}

export type SortDirection = "asc" | "desc"

export interface TableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof tableVariants> {
  data: T[]
  columns: TableColumn<T>[]
  /** When true, column headers with `sortable` toggle sort. */
  sortable?: boolean
  /** Uncontrolled default sort column key. */
  defaultSortKey?: string
  defaultSortDirection?: SortDirection
  sortKey?: string
  sortDirection?: SortDirection
  onSortChange?: (key: string, direction: SortDirection) => void
  selectable?: boolean
  selectedRows?: Array<string | number>
  defaultSelectedRows?: Array<string | number>
  onSelectionChange?: (selected: Array<string | number>) => void
  getRowId?: (row: T, index: number) => string | number
  stickyHeader?: boolean
  onRowClick?: (row: T, index: number) => void
  loading?: boolean
  /** Skeleton row count when `loading` (defaults to data length or 5). */
  loadingRows?: number
  emptyState?: React.ReactNode
  pagination?: PaginationProps
  /** Scroll container max height (number → px, or any CSS length). */
  maxHeight?: string | number
}

function alignClass(a?: TableColumnAlign) {
  if (a === "center") return "text-center"
  if (a === "right") return "text-right"
  return "text-left"
}

/**
 * A row plus the identity that follows it through sorting.
 *
 * `id` used to be resolved per render with `data.indexOf(row)` — O(n²) over the
 * table, and wrong for any table whose rows are primitives or structurally
 * shared: every duplicate collapsed onto the first match's index, so with the
 * default `getRowId` (the index) selecting one duplicate selected them all.
 * Ids are computed once, in source order, and carried alongside the row.
 */
type TableRow<T> = { row: T; index: number; id: string | number }

const defaultGetRowId = (_row: unknown, index: number): string | number => index

function nextDirection(current: SortDirection | undefined, sameKey: boolean): SortDirection {
  if (!sameKey) return "asc"
  return current === "asc" ? "desc" : "asc"
}

function tableCellContent<T>(col: TableColumn<T>, row: T, rowIndex: number): React.ReactNode {
  if (col.render) return col.render(row, rowIndex)
  const raw = (row as Record<string, unknown>)[col.key]
  return (raw as React.ReactNode) ?? null
}

const SELECT_COL_OFFSET = "3rem"

function widthPart(w: string | number | undefined): string | null {
  if (w === undefined) return null
  if (typeof w === "number") return `${w}px`
  return String(w)
}

function stickyLeftOffset<T>(columns: TableColumn<T>[], columnIndex: number, selectable: boolean): string | undefined {
  if (columns[columnIndex]?.sticky !== "left") return undefined
  const parts: string[] = []
  if (selectable) parts.push(SELECT_COL_OFFSET)
  for (let j = 0; j < columnIndex; j++) {
    const p = widthPart(columns[j]?.width)
    if (p) parts.push(p)
  }
  if (parts.length === 0) return "0"
  if (parts.length === 1) return parts[0]
  return `calc(${parts.join(" + ")})`
}

function stickyRightOffset<T>(columns: TableColumn<T>[], columnIndex: number): string | undefined {
  if (columns[columnIndex]?.sticky !== "right") return undefined
  const parts: string[] = []
  for (let j = columnIndex + 1; j < columns.length; j++) {
    const p = widthPart(columns[j]?.width)
    if (p) parts.push(p)
  }
  if (parts.length === 0) return "0"
  if (parts.length === 1) return parts[0]
  return `calc(${parts.join(" + ")})`
}

/**
 * Opaque surface + a rule on the edge that meets scrolling content.
 *
 * The rule used to be doubled by a hand-written inset box-shadow whose colour
 * was a raw 14%-opacity black literal — it stayed black in every theme, so on a dark
 * surface it read as a smear rather than a shade. It was purely decorative on
 * top of a border that already marks the seam, so it's gone; the `border-r` /
 * `border-l` uses `border-border` and follows the theme.
 */
function stickyColumnClasses(side: "left" | "right"): string {
  return cn(
    "bg-background",
    side === "left" && "border-r border-border",
    side === "right" && "border-l border-border"
  )
}

function stickyCheckboxEdgeClasses(): string {
  return "bg-background border-r border-border"
}

/**
 * Sticky layering, expressed against the `--z-sticky` token instead of the
 * literal 2..6 ladder this used to inline.
 *
 * Three tiers is all the layering actually needs — the old six were mostly
 * distinctions without a difference:
 *  - a sticky *body* cell is `position: sticky`, and positioned elements
 *    already paint over the static cells beside them, so it only needs to sit
 *    on the base sticky rung;
 *  - a sticky header row must beat every body cell, sticky or not;
 *  - a header cell that is also a sticky column must beat the rest of its own
 *    header row (it comes first in DOM order, so it would otherwise lose).
 */
const stickyZ = {
  column: "var(--z-sticky, 10)",
  header: "calc(var(--z-sticky, 10) + 1)",
  headerColumn: "calc(var(--z-sticky, 10) + 2)",
} as const

function stickyCellZ(
  isHeader: boolean,
  stickyHeaderRow: boolean,
  columnSticky: boolean
): string | undefined {
  if (isHeader) {
    if (columnSticky) return stickyZ.headerColumn
    if (stickyHeaderRow) return stickyZ.header
    return undefined
  }
  return columnSticky ? stickyZ.column : undefined
}

export function Table<T>({
  data = [],
  columns = [],
  sortable: tableSortable,
  defaultSortKey,
  defaultSortDirection = "asc",
  sortKey: sortKeyProp,
  sortDirection: sortDirectionProp,
  onSortChange,
  selectable,
  selectedRows: selectedRowsProp,
  defaultSelectedRows,
  onSelectionChange,
  getRowId = defaultGetRowId,
  stickyHeader,
  onRowClick,
  loading,
  loadingRows,
  emptyState,
  pagination,
  maxHeight,
  variant,
  size,
  className,
  ...props
}: TableProps<T>) {
  const [internalSortKey, setInternalSortKey] = React.useState<string | undefined>(defaultSortKey)
  const [internalSortDir, setInternalSortDir] = React.useState<SortDirection>(defaultSortDirection)
  const sortKey = sortKeyProp !== undefined ? sortKeyProp : internalSortKey
  const sortDir = sortDirectionProp !== undefined ? sortDirectionProp : internalSortDir

  const [internalSelected, setInternalSelected] = React.useState<Array<string | number>>(defaultSelectedRows ?? [])
  const selectionControlled = selectedRowsProp !== undefined
  const selectedSet = React.useMemo(() => {
    const list = selectionControlled ? selectedRowsProp! : internalSelected
    return new Set(list)
  }, [selectionControlled, selectedRowsProp, internalSelected])

  // Ids resolved once, in source order — see TableRow above.
  const rows = React.useMemo<TableRow<T>[]>(
    () => data.map((row, index) => ({ row, index, id: getRowId(row, index) })),
    [data, getRowId]
  )

  const sortedRows = React.useMemo(() => {
    if (!tableSortable || !sortKey) return rows
    const col = columns.find((c) => c.key === sortKey)
    if (!col?.sortable) return rows
    const copy = [...rows]
    const mult = sortDir === "asc" ? 1 : -1
    copy.sort((a, b) => {
      const ai = (a.row as Record<string, unknown>)[sortKey]
      const bi = (b.row as Record<string, unknown>)[sortKey]
      if (ai == null && bi == null) return 0
      if (ai == null) return 1
      if (bi == null) return -1
      if (typeof ai === "number" && typeof bi === "number") return (ai - bi) * mult
      return String(ai).localeCompare(String(bi), undefined, { numeric: true }) * mult
    })
    return copy
  }, [rows, columns, tableSortable, sortKey, sortDir])

  const allSelected =
    sortedRows.length > 0 && sortedRows.every((entry) => selectedSet.has(entry.id))
  const someSelected = sortedRows.some((entry) => selectedSet.has(entry.id))

  const toggleSort = (key: string, columnSortable?: boolean) => {
    if (!tableSortable || !columnSortable) return
    const same = sortKey === key
    const nextDir = nextDirection(sortDir, same)
    if (sortKeyProp === undefined) setInternalSortKey(key)
    if (sortDirectionProp === undefined) setInternalSortDir(nextDir)
    onSortChange?.(key, nextDir)
  }

  const toggleRow = (id: string | number) => {
    const next = new Set(selectedSet)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    const arr = Array.from(next)
    if (!selectionControlled) setInternalSelected(arr)
    onSelectionChange?.(arr)
  }

  const toggleAll = () => {
    const next = allSelected ? [] : sortedRows.map((entry) => entry.id)
    if (!selectionControlled) setInternalSelected(next)
    onSelectionChange?.(next)
  }

  const showEmpty = !loading && sortedRows.length === 0
  const skeletonRowCount = loadingRows ?? (data.length > 0 ? data.length : 5)
  // `h-5.5` is not a Tailwind class (the default spacing scale has no 5.5), so
  // `size="sm"` loading rows collapsed to zero height and the skeleton was
  // invisible. `h-5` is the real neighbour of the md/lg steps below.
  const skeletonLineClass = size === "sm" ? "h-5" : size === "lg" ? "h-7" : "h-6"
  const hasCheckbox = Boolean(selectable)

  const scrollStyle: React.CSSProperties = {
    ...(maxHeight != null
      ? {
          maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        }
      : {}),
  }

  return (
    <div className={cn("w-full space-y-3", className)} {...props}>
      <div
        className="relative w-full overflow-auto rounded-surface-md border border-border"
        style={scrollStyle}
      >
        <table className={cn(tableVariants({ variant, size }))}>
          <thead className="border-b border-border bg-background [&_tr]:border-b">
            <tr className="transition-colors">
              {selectable ? (
                <th
                  scope="col"
                  className={cn("w-10 align-middle shadow-sm", stickyCheckboxEdgeClasses())}
                  style={{
                    position: "sticky",
                    left: 0,
                    ...(stickyHeader ? { top: 0 } : {}),
                    zIndex: stickyZ.headerColumn,
                  }}
                >
                  <Checkbox
                    aria-label="Select all rows"
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onChange={toggleAll}
                  />
                </th>
              ) : null}
              {columns.map((col, colIndex) => {
                const active = sortKey === col.key
                const canSort = Boolean(tableSortable && col.sortable)
                const sl = stickyLeftOffset(columns, colIndex, hasCheckbox)
                const sr = stickyRightOffset(columns, colIndex)
                const colSticky = Boolean(sl || sr)
                const z = stickyCellZ(true, Boolean(stickyHeader), colSticky)
                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{
                      ...(col.width !== undefined ? { width: col.width } : {}),
                      ...(sl ? { left: sl } : {}),
                      ...(sr ? { right: sr } : {}),
                      ...(stickyHeader || colSticky ? { position: "sticky" as const } : {}),
                      ...(stickyHeader ? { top: 0 } : {}),
                      ...(z ? { zIndex: z } : {}),
                    }}
                    className={cn(
                      "font-medium text-foreground bg-background",
                      alignClass(col.align),
                      canSort && "select-none",
                      colSticky && col.sticky && stickyColumnClasses(col.sticky),
                      stickyHeader && "shadow-sm"
                    )}
                  >
                    {canSort ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn("-ml-2 h-auto min-h-8 gap-1 px-2 font-medium", alignClass(col.align))}
                        onClick={() => toggleSort(col.key, col.sortable)}
                      >
                        <span className="inline-flex min-w-0 items-center gap-1.5">{col.header}</span>
                        {active ? (
                          sortDir === "asc" ? (
                            <ArrowUp className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                          ) : (
                            <ArrowDown className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                          )
                        ) : (
                          <ArrowUpDown className="h-3.5 w-3.5 shrink-0 opacity-40" aria-hidden />
                        )}
                      </Button>
                    ) : (
                      col.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {loading
              ? Array.from({ length: skeletonRowCount }).map((_, i) => (
                  <tr key={`sk-${i}`} className="border-b border-border/80">
                    {selectable ? (
                      <td
                        className={cn(stickyCheckboxEdgeClasses(), variant === "striped" && "bg-inherit")}
                        style={{ position: "sticky", left: 0, zIndex: stickyZ.column }}
                      >
                        <Skeleton variant="checkbox" />
                      </td>
                    ) : null}
                    {columns.map((col, colIndex) => {
                      const sl = stickyLeftOffset(columns, colIndex, hasCheckbox)
                      const sr = stickyRightOffset(columns, colIndex)
                      const colSticky = Boolean(sl || sr)
                      const z = stickyCellZ(false, false, colSticky)
                      return (
                        <td
                          key={col.key}
                          style={{
                            ...(col.width !== undefined ? { width: col.width } : {}),
                            ...(sl ? { left: sl } : {}),
                            ...(sr ? { right: sr } : {}),
                            ...(colSticky ? { position: "sticky" as const } : {}),
                            ...(z ? { zIndex: z } : {}),
                          }}
                          className={cn(
                            alignClass(col.align),
                            colSticky &&
                              cn(
                                col.sticky && stickyColumnClasses(col.sticky),
                                variant === "striped" && "bg-inherit"
                              )
                          )}
                        >
                          <Skeleton
                            className={cn(
                              "block w-full max-w-full rounded-control-sm leading-none",
                              skeletonLineClass,
                              col.width === undefined && colIndex > 0 && "max-w-[12rem]"
                            )}
                            style={col.width !== undefined ? { width: col.width, maxWidth: col.width } : undefined}
                          />
                        </td>
                      )
                    })}
                  </tr>
                ))
              : sortedRows.map(({ row, index: sourceIndex, id }, rowIndex) => {
                  const clickable = Boolean(onRowClick)
                  return (
                    <tr
                      key={String(id)}
                      className={cn(
                        "border-b border-border/80 transition-colors",
                        clickable && "cursor-pointer hover:bg-muted/40"
                      )}
                      onClick={clickable ? () => onRowClick!(row, sourceIndex) : undefined}
                    >
                      {selectable ? (
                        <td
                          onClick={(e) => e.stopPropagation()}
                          className={cn(stickyCheckboxEdgeClasses(), variant === "striped" && "bg-inherit")}
                          style={{ position: "sticky", left: 0, zIndex: stickyZ.column }}
                        >
                          <Checkbox
                            aria-label={`Select row ${rowIndex + 1}`}
                            checked={selectedSet.has(id)}
                            onChange={() => toggleRow(id)}
                          />
                        </td>
                      ) : null}
                      {columns.map((col, colIndex) => {
                        const sl = stickyLeftOffset(columns, colIndex, hasCheckbox)
                        const sr = stickyRightOffset(columns, colIndex)
                        const colSticky = Boolean(sl || sr)
                        const z = stickyCellZ(false, false, colSticky)
                        return (
                          <td
                            key={col.key}
                            style={{
                              ...(sl ? { left: sl } : {}),
                              ...(sr ? { right: sr } : {}),
                              ...(colSticky ? { position: "sticky" as const } : {}),
                              ...(z ? { zIndex: z } : {}),
                            }}
                            className={cn(
                              "align-middle",
                              alignClass(col.align),
                              colSticky &&
                                cn(
                                  col.sticky && stickyColumnClasses(col.sticky),
                                  variant === "striped" && "bg-inherit"
                                )
                            )}
                          >
                            {tableCellContent(col, row, rowIndex)}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </div>

      {showEmpty ? (
        emptyState ?? (
          <EmptyState variant="minimal" size="sm" title="No data" description="There is nothing to display yet." />
        )
      ) : null}

      {pagination && !showEmpty ? <Pagination {...pagination} /> : null}
    </div>
  )
}

Table.displayName = "Table"
