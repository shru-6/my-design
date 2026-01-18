"use client"

import * as React from "react"
import { cn } from "../utils"
import { TextInput } from "../atoms/TextInput"
import { EmptyScreen } from "./EmptyScreen"
import { Skeleton } from "../atoms/Skeleton"
import { SearchIcon } from "lucide-react"
export interface ListProps {
  items: Array<any>
  renderItem: (item: any, index: number) => React.ReactNode
  searchable?: boolean
  searchPlaceholder?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  loading?: boolean
  skeletonCount?: number
  renderSkeleton?: () => React.ReactNode
  type?: "grid" | "list"
  gridCols?: { default?: number; md?: number; lg?: number }
  className?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filterItems?: (items: Array<any>, searchValue: string) => Array<any>
  error?: string | React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

export function List({
  items = [],
  renderItem,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyTitle = "No items",
  emptyDescription,
  emptyAction,
  loading = false,
  skeletonCount = 6,
  renderSkeleton,
  type = "list",
  gridCols = { default: 1, md: 2, lg: 3 },
  className,
  searchValue: searchValueProp,
  onSearchChange: onSearchChangeProp,
  filterItems,
  error,
  header,
  footer,
}: ListProps) {
  const [internalSearchValue, setInternalSearchValue] = React.useState("")
  const isControlled = searchValueProp !== undefined
  const searchValue = isControlled ? searchValueProp : internalSearchValue
  const setSearchValue = isControlled ? onSearchChangeProp || (() => {}) : setInternalSearchValue

  // Ensure items is always an array
  const safeItems = React.useMemo(() => {
    return Array.isArray(items) ? items : []
  }, [items])

  // Filter items based on search
  const filteredItems = React.useMemo(() => {
    if (!searchable || !searchValue) return safeItems
    if (filterItems) {
      return filterItems(safeItems, searchValue)
    }
    // Default: simple string search on item values
    const lowerSearch = searchValue.toLowerCase()
    return safeItems.filter((item) => {
      const itemStr = JSON.stringify(item).toLowerCase()
      return itemStr.includes(lowerSearch)
    })
  }, [safeItems, searchValue, searchable, filterItems])

  // Grid column classes - using explicit Tailwind classes
  const gridClasses = React.useMemo(() => {
    if (type !== "grid") return ""
    const cols = gridCols || {}
    const classes: string[] = []
    
    // Map common column values to Tailwind classes
    const colMap: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }
    
    if (cols.default && colMap[cols.default]) {
      classes.push(colMap[cols.default])
    }
    if (cols.md && colMap[cols.md]) {
      classes.push(`md:${colMap[cols.md]}`)
    }
    if (cols.lg && colMap[cols.lg]) {
      classes.push(`lg:${colMap[cols.lg]}`)
    }
    
    return classes.join(" ")
  }, [type, gridCols])

  // Default skeleton renderer
  const defaultRenderSkeleton = () => (
    <Skeleton className={type === "grid" ? "h-32" : "h-16"} />
  )

  const skeletonRenderer = renderSkeleton || defaultRenderSkeleton

  return (
    <div className={cn("space-y-4", className)} data-slot="enhanced-list">
      {/* Header */}
      {header && <div data-slot="list-header">{header}</div>}

      {/* Search */}
      {searchable && (
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <TextInput
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div data-slot="list-error" className="text-destructive text-sm">
          {typeof error === "string" ? error : error}
        </div>
      )}

      {/* Loading State */}
      {loading && !error && (
        <div
          className={cn(
            type === "grid" && "grid gap-4",
            type === "list" && "space-y-2",
            gridClasses
          )}
        >
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <React.Fragment key={i}>{skeletonRenderer()}</React.Fragment>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredItems.length === 0 && (
        <EmptyScreen
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      )}

      {/* Items */}
      {!loading && !error && filteredItems.length > 0 && (
        <div
          className={cn(
            type === "grid" && "grid gap-4",
            type === "list" && "space-y-2",
            gridClasses
          )}
        >
          {filteredItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Footer */}
      {footer && <div data-slot="list-footer">{footer}</div>}
    </div>
  )
}

