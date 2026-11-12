import * as React from "react"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { Stack, type StackProps } from "../layout/Stack"
import { Grid, type GridProps } from "../layout/Grid"
import { SearchInput, type SearchInputProps } from "../inputs/SearchInput"
import { Text } from "./Text"
import { Icon } from "../utilities/Icon"
import { PillGroup, type PillGroupProps, type PillItem } from "./PillGroup"

export interface ListItem {
  label: React.ReactNode
  value?: string
  left?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  disabled?: boolean
  selected?: boolean
  /** Matched against selected filter chip values (`filterChips`). */
  filterKeys?: string[]
  /** Render `label` as-is without default row chrome (grid cards, etc.). */
  custom?: boolean
}

export type ListLayout = "list" | "grid"

/** Stable identity for the uncontrolled chip-selection seed. */
const EMPTY_CHIP_SELECTION: string[] = []

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

/** Default chip filter: OR match on `item.filterKeys`; items without keys always pass. */
export function defaultListChipFilter(
  items: readonly ListItem[],
  selected: readonly string[]
): ListItem[] {
  if (selected.length === 0) return [...items]
  return items.filter((item) => {
    const keys = item.filterKeys
    if (!keys?.length) return true
    return keys.some((key) => selected.includes(key))
  })
}

export type ListFilterChipsConfig = Omit<
  PillGroupProps,
  "items" | "value" | "defaultValue" | "onChange" | "selectable"
> & {
  items: PillItem[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (next: string[]) => void
  /** Replace built-in OR match on `item.filterKeys`. */
  filter?: (items: readonly ListItem[], selected: readonly string[]) => readonly ListItem[]
  /** When false, chips render but do not filter rows. Default true. */
  filterItems?: boolean
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

/**
 * Layout pass-through for `layout="list"`.
 *
 * These used to be flattened onto `ListProps` — every `Stack` prop and every
 * `Grid` prop side by side, half of them inert depending on `layout`, with the
 * `gap` collision papered over by a second `gridGap` prop. Grouping them as
 * SlotProps (the convention the project documents) makes it obvious which
 * layout mode a knob belongs to, and drops `gridGap` entirely: each slot has
 * its own `gap`.
 */
export type ListStackProps = Pick<
  StackProps,
  "direction" | "gap" | "align" | "justify" | "wrap"
>

/** Layout pass-through for `layout="grid"`. */
export type ListGridProps = Pick<
  GridProps,
  | "columns"
  | "rows"
  | "minChildWidth"
  | "gap"
  | "columnGap"
  | "rowGap"
  | "autoFlow"
  | "alignItems"
  | "justifyItems"
>

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
  /** Replaces default loading copy when `loading` is true. */
  loadingState?: React.ReactNode
  /** Replaces list body (search/chips chrome still render). */
  errorState?: React.ReactNode
  /** Optional filter chips above the list body — pairs with `ListItem.filterKeys`. */
  filterChips?: ListFilterChipsConfig
  /** Override default row rendering. */
  renderItem?: (item: ListItem, index: number) => React.ReactNode
  children?: React.ReactNode
  /** Prepended above search (if any) and the list body. */
  header?: React.ReactNode
  /** `true`: default search field + built-in filter. Object: pass `filter` and/or SearchInput props. */
  search?: boolean | ListSearchConfig
  /** `Stack` pass-through; applies when `layout="list"` (the default). */
  stackProps?: ListStackProps
  /** `Grid` pass-through; applies when `layout="grid"`. */
  gridProps?: ListGridProps
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(
  (
    {
      className,
      items,
      layout = "list",
      listType = "unordered",
      stackProps,
      gridProps,
      divider,
      selectable,
      selectedValue: selectedValueProp,
      defaultSelectedValue,
      onSelect,
      emptyState,
      noResultsState,
      loading,
      loadingState,
      errorState,
      filterChips,
      renderItem,
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

    const filterChipsEnabled = filterChips != null
    const {
      items: chipItems = [],
      value: chipValueProp,
      defaultValue: chipDefaultValue,
      onChange: onChipChangeProp,
      filter: customChipFilter,
      filterItems: chipFilterItems = true,
      ...pillGroupProps
    } = filterChips ?? {}

    // Three controllable values, one pattern — see utils/useControllableValue.
    const [chipSelection, setChipSelection] = useControllableValue<string[]>({
      value: chipValueProp,
      defaultValue: chipDefaultValue ?? EMPTY_CHIP_SELECTION,
      onChange: onChipChangeProp,
    })

    const [searchQuery, setSearchQuery] = useControllableValue<string>({
      value: searchValueProp,
      defaultValue: defaultQuery ?? "",
      onChange: onSearchChangeProp,
    })

    const [debouncedQuery, setDebouncedQuery] = React.useState(() => defaultQuery ?? "")

    React.useEffect(() => {
      onDebouncedChange?.(debouncedQuery)
    }, [debouncedQuery, onDebouncedChange])

    const [selectedValue, setSelectedValue] = useControllableValue<string | undefined>({
      value: selectedValueProp,
      defaultValue: defaultSelectedValue,
      onChange: undefined,
    })

    const filteredItems = React.useMemo(() => {
      let next = [...items]
      if (filterChipsEnabled && chipFilterItems) {
        const runChip = customChipFilter ?? defaultListChipFilter
        next = [...runChip(next, chipSelection)]
      }
      if (searchEnabled && filterItems) {
        const runSearch = customFilter ?? defaultListItemFilter
        next = [...runSearch(next, debouncedQuery)]
      }
      return next
    }, [
      items,
      debouncedQuery,
      searchEnabled,
      filterItems,
      customFilter,
      filterChipsEnabled,
      chipFilterItems,
      customChipFilter,
      chipSelection,
    ])

    const select = React.useCallback(
      (item: ListItem) => {
        if (!selectable || item.disabled || item.value == null) return
        setSelectedValue(item.value)
        // Not wired as useControllableValue's `onChange` — `onSelect` also
        // hands back the item, which that signature has no room for.
        onSelect?.(item.value, item)
      },
      [selectable, setSelectedValue, onSelect]
    )

    const renderRow = (item: ListItem, index: number) => {
      if (renderItem) return renderItem(item, index)

      if (item.custom) {
        const selected = selectable && item.value != null && selectedValue === item.value
        return (
          <div
            className={cn(
              "min-w-0",
              layout === "grid" && "h-full",
              selectable && !item.disabled && "cursor-pointer",
              item.disabled && "cursor-not-allowed opacity-60",
              selected && layout === "grid" && "ring-2 ring-ring ring-offset-2 ring-offset-background rounded-surface-md"
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
            {item.label}
          </div>
        )
      }

      const selected = selectable && item.value != null && selectedValue === item.value
      return (
        <div
          className={cn(
            "flex min-w-0 items-start gap-3 rounded-control-md px-2 py-2",
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
        return <div className={cn("min-w-0", layout === "grid" && "h-full")}>{row}</div>
      }
      return <li className={cn("list-none", layout === "grid" && "h-full")}>{row}</li>
    }

    const listChrome = listType !== "none" && "list-none pl-0"

    // Auto-fill by default; an explicit `columns` opts back into fixed tracks.
    const resolvedGridMin =
      gridProps?.minChildWidth ?? (gridProps?.columns == null ? "12rem" : undefined)
    const resolvedColumns = resolvedGridMin ? undefined : (gridProps?.columns ?? 2)

    const body =
      layout === "list" ? (
        <Stack
          as={listAs}
          role={selectable ? "listbox" : undefined}
          className={cn(listChrome, divider && "divide-y divide-border")}
          items={filteredItems}
          getItemKey={(item: ListItem, i) => item.value ?? i}
          renderItem={renderWrappedRow}
          {...stackProps}
          // Dividers supply the visual separation, so the default gap would
          // only push the rules apart — overrides any `stackProps.gap`.
          gap={divider ? (stackProps?.gap ?? "none") : stackProps?.gap}
        />
      ) : (
        <Grid
          as={listAs}
          role={selectable ? "listbox" : undefined}
          className={cn(listChrome)}
          items={filteredItems}
          getItemKey={(item: ListItem, i) => item.value ?? i}
          renderItem={renderWrappedRow}
          alignItems="stretch"
          {...gridProps}
          columns={resolvedColumns}
          minChildWidth={resolvedGridMin}
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
        {filterChipsEnabled ? (
          <PillGroup
            items={chipItems}
            value={chipSelection}
            onChange={setChipSelection}
            selectable
            multiple
            {...pillGroupProps}
          />
        ) : null}
        {loading ? (
          loadingState ?? <div className="text-sm text-muted-foreground">Loading…</div>
        ) : errorState ? (
          errorState
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
