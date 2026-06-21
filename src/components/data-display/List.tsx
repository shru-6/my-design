import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Stack, stackVariants } from "../layout/Stack"
import { Grid, gridVariants } from "../layout/Grid"
import { SearchInput, type SearchInputProps } from "../inputs/SearchInput"
import { Text } from "./Text"
import { Icon } from "../utilities/Icon"

export interface ListItem {
  label: React.ReactNode
  value?: string
  left?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  disabled?: boolean
  selected?: boolean
}

export type ListLayout = "list" | "grid"

function reactNodeToSearchText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node).toLowerCase()
  if (Array.isArray(node)) return node.map(reactNodeToSearchText).join(" ")
  if (React.isValidElement(node)) {
    const ch = (node.props as { children?: React.ReactNode }).children
    return reactNodeToSearchText(ch)
  }
  return ""
}

/** Default filter: case-insensitive match on `label`, `description`, and `value`. */
export function defaultListItemFilter(
  items: readonly ListItem[],
  query: string
): ListItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return [...items]
  return items.filter((item) => {
    const label = reactNodeToSearchText(item.label)
    const desc = item.description ? reactNodeToSearchText(item.description) : ""
    const val = item.value?.toLowerCase() ?? ""
    return label.includes(q) || desc.includes(q) || val.includes(q)
  })
}

export type ListSearchConfig = Omit<
  Partial<SearchInputProps>,
  "value" | "defaultValue" | "onChange" | "onSearch" | "onClear"
> & {
  /** Replace built-in label/description/value matching. */
  filter?: (items: readonly ListItem[], query: string) => readonly ListItem[]
  defaultQuery?: string
  /** Controlled query (pairs with `onChange`). */
  value?: string
  onChange?: (value: string) => void
  /** Fired when debounced query updates (after `onSearch`). */
  onDebouncedChange?: (query: string) => void
  /** When false, search UI does not filter list items (e.g. filters external data). Default true. */
  filterItems?: boolean
}

type StackGap = NonNullable<VariantProps<typeof stackVariants>["gap"]>
type GridGap = NonNullable<VariantProps<typeof gridVariants>["gap"]>
type GridColumnCount = 1 | 2 | 3 | 4 | 6 | 12
type GridRowCount = 1 | 2 | 3 | 4 | 5 | 6

export interface ListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
  items: readonly ListItem[]
  listType?: "unordered" | "ordered" | "none"
  layout?: ListLayout
  divider?: boolean
  selectable?: boolean
  selectedValue?: string
  defaultSelectedValue?: string
  onSelect?: (value: string, item: ListItem) => void
  /** Shown when `items` is empty (ignores search). */
  emptyState?: React.ReactNode
  /** Shown when search is active and nothing matches. */
  noResultsState?: React.ReactNode
  loading?: boolean
  children?: React.ReactNode
  /** Prepended above search (if any) and the list body. */
  header?: React.ReactNode
  /** `true`: default search field + built-in filter. Object: pass `filter` and/or SearchInput props. */
  search?: boolean | ListSearchConfig

  // --- Stack (`layout="list"`) — same tokens as `Stack`
  direction?: VariantProps<typeof stackVariants>["direction"]
  gap?: StackGap
  align?: VariantProps<typeof stackVariants>["align"]
  justify?: VariantProps<typeof stackVariants>["justify"]
  wrap?: VariantProps<typeof stackVariants>["wrap"]

  // --- Grid (`layout="grid"`) — same tokens as `Grid`
  columns?: GridColumnCount
  rows?: GridRowCount
  minChildWidth?: string
  columnGap?: VariantProps<typeof gridVariants>["columnGap"]
  rowGap?: VariantProps<typeof gridVariants>["rowGap"]
  autoFlow?: VariantProps<typeof gridVariants>["autoFlow"]
  alignItems?: VariantProps<typeof gridVariants>["alignItems"]
  justifyItems?: VariantProps<typeof gridVariants>["justifyItems"]
  /** Grid gap (and fallback when you only set `gap` in grid mode). */
  gridGap?: GridGap
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(
  (
    {
      className,
      items,
      layout = "list",
      listType = "unordered",
      gap,
      direction,
      align,
      justify,
      wrap,
      columns,
      rows,
      minChildWidth,
      columnGap,
      rowGap,
      autoFlow,
      alignItems,
      justifyItems,
      gridGap,
      divider,
      selectable,
      selectedValue: selectedValueProp,
      defaultSelectedValue,
      onSelect,
      emptyState,
      noResultsState,
      loading,
      children,
      header,
      search,
      ...props
    },
    ref
  ) => {
    const searchEnabled = search != null && search !== false
    const searchOptions: ListSearchConfig = typeof search === "object" ? search : {}
    const {
      filter: customFilter,
      defaultQuery,
      value: searchValueProp,
      onChange: onSearchChangeProp,
      onDebouncedChange,
      filterItems = true,
      ...searchInputProps
    } = searchOptions

    const isSearchControlled = searchValueProp !== undefined
    const [internalSearchQuery, setInternalSearchQuery] = React.useState(() => defaultQuery ?? "")
    const searchQuery = isSearchControlled ? searchValueProp : internalSearchQuery
    const setSearchQuery = React.useCallback(
      (next: string) => {
        if (!isSearchControlled) setInternalSearchQuery(next)
        onSearchChangeProp?.(next)
      },
      [isSearchControlled, onSearchChangeProp]
    )

    const [debouncedQuery, setDebouncedQuery] = React.useState(() => defaultQuery ?? "")

    React.useEffect(() => {
      onDebouncedChange?.(debouncedQuery)
    }, [debouncedQuery, onDebouncedChange])

    const isControlled = selectedValueProp !== undefined
    const [internalSelected, setInternalSelected] = React.useState<string | undefined>(defaultSelectedValue)
    const selectedValue = isControlled ? selectedValueProp : internalSelected

    const filteredItems = React.useMemo(() => {
      if (!searchEnabled || !filterItems) return [...items]
      const run = customFilter ?? defaultListItemFilter
      return [...run(items, debouncedQuery)]
    }, [items, debouncedQuery, searchEnabled, filterItems, customFilter])

    const select = React.useCallback(
      (item: ListItem) => {
        if (!selectable || item.disabled || item.value == null) return
        if (!isControlled) setInternalSelected(item.value)
        onSelect?.(item.value, item)
      },
      [selectable, isControlled, onSelect]
    )

    const renderRow = (item: ListItem, index: number) => {
      const selected = selectable && item.value != null && selectedValue === item.value
      return (
        <div
          className={cn(
            "flex min-w-0 items-start gap-3 rounded-md px-2 py-2",
            layout === "grid" && "border border-border",
            selectable && !item.disabled && "cursor-pointer hover:bg-muted/60",
            item.disabled && "cursor-not-allowed opacity-60",
            selected && "bg-muted/80"
          )}
          role={selectable ? "option" : undefined}
          aria-selected={selectable ? selected : undefined}
          onClick={() => select(item)}
          onKeyDown={
            selectable
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    select(item)
                  }
                }
              : undefined
          }
          tabIndex={selectable && !item.disabled ? 0 : undefined}
        >
          {item.left ? <Icon node={item.left} size="sm" className="mt-0.5 shrink-0" /> : null}
          <div className="min-w-0 flex-1">
            <Text as="div" size="sm" weight="medium" className="text-foreground">
              {item.label}
            </Text>
            {item.description ? (
              <Text as="div" size="sm" variant="muted" className="mt-0.5">
                {item.description}
              </Text>
            ) : null}
          </div>
          {item.action ? <div className="shrink-0">{item.action}</div> : null}
        </div>
      )
    }

    const listAs = listType === "none" ? "div" : listType === "ordered" ? "ol" : "ul"

    const renderWrappedRow = (item: ListItem, index: number) => {
      const row = renderRow(item, index)
      if (listType === "none") {
        return <div className="min-w-0">{row}</div>
      }
      return <li className="list-none">{row}</li>
    }

    const listChrome = listType !== "none" && "list-none pl-0"

    const resolvedGridMin = minChildWidth ?? (columns == null ? "12rem" : undefined)
    const resolvedColumns = resolvedGridMin ? undefined : (columns ?? 2)
    const resolvedGridGap = gridGap ?? gap

    const body =
      layout === "list" ? (
        <Stack
          as={listAs}
          role={selectable ? "listbox" : undefined}
          className={cn(listChrome, divider && "divide-y divide-border")}
          items={filteredItems}
          getItemKey={(item: ListItem, i) => item.value ?? i}
          renderItem={renderWrappedRow}
          direction={direction}
          gap={divider ? (gap ?? "none") : gap}
          align={align}
          justify={justify}
          wrap={wrap}
        />
      ) : (
        <Grid
          as={listAs}
          role={selectable ? "listbox" : undefined}
          className={cn(listChrome)}
          items={filteredItems}
          getItemKey={(item: ListItem, i) => item.value ?? i}
          renderItem={renderWrappedRow}
          columns={resolvedColumns}
          rows={rows}
          minChildWidth={resolvedGridMin}
          gap={resolvedGridGap}
          columnGap={columnGap}
          rowGap={rowGap}
          autoFlow={autoFlow}
          alignItems={alignItems}
          justifyItems={justifyItems}
        />
      )

    const emptyItems = items.length === 0
    const emptyFilter = !emptyItems && filteredItems.length === 0

    return (
      <div ref={ref} data-slot="list" className={cn("flex w-full flex-col gap-3", className)} {...props}>
        {header}
        {searchEnabled ? (
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={setDebouncedQuery}
            onClear={() => setDebouncedQuery("")}
            {...searchInputProps}
          />
        ) : null}
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : emptyItems ? (
          <div className="text-sm text-muted-foreground">{emptyState ?? "Nothing to show."}</div>
        ) : emptyFilter ? (
          <div className="text-sm text-muted-foreground">{noResultsState ?? "No matches."}</div>
        ) : (
          body
        )}
        {children}
      </div>
    )
  }
)

List.displayName = "List"
