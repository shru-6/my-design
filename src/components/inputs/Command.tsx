import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../utils"
import { zLayerValue } from "../../utils/zIndex"
import { Spinner } from "../data-display/Spinner"
import { Icon } from "../utilities/Icon"
import { fieldSurfaceVariants } from "./fieldPieces"
import { SearchInput, type SearchInputProps } from "./SearchInput"

export type CommandItem = {
  label: React.ReactNode
  value: string
  left?: React.ReactNode
  group?: string
  disabled?: boolean
  keywords?: string[]
}

export interface CommandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: CommandItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (value: string) => void
  onSelect?: (item: CommandItem) => void
  placeholder?: string
  emptyState?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  loop?: boolean
  debounceMs?: number
  filterFn?: (item: CommandItem, query: string) => boolean
  maxHeight?: string | number
  searchInputProps?: Partial<SearchInputProps>
  className?: string
  children?: React.ReactNode
}

function defaultFilter(item: CommandItem, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const label = typeof item.label === "string" ? item.label : ""
  const haystack = [label, item.value, ...(item.keywords ?? [])].join(" ").toLowerCase()
  return haystack.includes(q)
}

export function Command({
  items = [],
  value,
  defaultValue,
  onValueChange,
  inputValue,
  defaultInputValue = "",
  onInputValueChange,
  onSelect,
  placeholder = "Search…",
  emptyState = "No results.",
  loading = false,
  disabled,
  loop = true,
  debounceMs = 0,
  filterFn = defaultFilter,
  maxHeight = "16rem",
  searchInputProps,
  className,
  children,
  ...rest
}: CommandProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const [internalQuery, setInternalQuery] = React.useState(defaultInputValue)
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({ visibility: "hidden" })

  const isValueControlled = value !== undefined
  const isQueryControlled = inputValue !== undefined
  const selectedValue = isValueControlled ? value ?? "" : internalValue
  const query = isQueryControlled ? inputValue ?? "" : internalQuery

  const filtered = React.useMemo(
    () => items.filter((item) => !item.disabled && filterFn(item, query)),
    [items, query, filterFn]
  )

  const grouped = React.useMemo(() => {
    const out: { group?: string; items: CommandItem[] }[] = []
    for (const item of filtered) {
      const g = item.group
      const last = out[out.length - 1]
      if (last && last.group === g) last.items.push(item)
      else out.push({ group: g, items: [item] })
    }
    return out
  }, [filtered])

  const flatItems = filtered

  const setQuery = (next: string) => {
    if (!isQueryControlled) setInternalQuery(next)
    onInputValueChange?.(next)
    setOpen(true)
    setActiveIndex(0)
  }

  const selectItem = (item: CommandItem) => {
    if (!isValueControlled) setInternalValue(item.value)
    onValueChange?.(item.value)
    onSelect?.(item)
    setQuery(typeof item.label === "string" ? item.label : item.value)
    setOpen(false)
  }

  const updatePosition = React.useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setMenuStyle({
      position: "fixed",
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: zLayerValue("dropdown"),
      visibility: "visible",
    })
  }, [])

  React.useLayoutEffect(() => {
    if (!open) return
    updatePosition()
    const ro = () => updatePosition()
    window.addEventListener("scroll", ro, true)
    window.addEventListener("resize", ro)
    return () => {
      window.removeEventListener("scroll", ro, true)
      window.removeEventListener("resize", ro)
    }
  }, [open, updatePosition])

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => document.removeEventListener("pointerdown", onPointerDown, true)
  }, [open])

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true)
      return
    }
    if (!flatItems.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => {
        const next = i + 1
        if (next >= flatItems.length) return loop ? 0 : i
        return next
      })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => {
        const next = i - 1
        if (next < 0) return loop ? flatItems.length - 1 : 0
        return next
      })
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = flatItems[activeIndex]
      if (item) selectItem(item)
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const menu = open && items.length ? (
    <div
      ref={menuRef}
      role="listbox"
      style={{ ...menuStyle, maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }}
      className="overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
    >
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <Spinner size="sm" />
        </div>
      ) : flatItems.length === 0 ? (
        <div className="px-3 py-2 text-sm text-muted-foreground">{emptyState}</div>
      ) : (
        grouped.map((section, sectionIndex) => (
          <div key={section.group ?? `section-${sectionIndex}`}>
            {section.group ? (
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{section.group}</div>
            ) : null}
            {section.items.map((item) => {
              const flatIndex = flatItems.indexOf(item)
              const active = item.value === selectedValue || flatIndex === activeIndex
              return (
                <button
                  key={item.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  disabled={item.disabled}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm",
                    "hover:bg-accent hover:text-accent-foreground",
                    active && "bg-accent text-accent-foreground",
                    item.disabled && "pointer-events-none opacity-50"
                  )}
                  onMouseEnter={() => setActiveIndex(flatIndex)}
                  onClick={() => selectItem(item)}
                >
                  {item.left ? (
                    <span className="text-muted-foreground">
                      <Icon node={item.left} size="sm" />
                    </span>
                  ) : null}
                  <span className="flex-1">{item.label}</span>
                </button>
              )
            })}
          </div>
        ))
      )}
    </div>
  ) : null

  return (
    <div className={cn("relative w-full", className)} {...rest}>
      <div ref={triggerRef}>
        <SearchInput
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          debounceMs={debounceMs}
          value={query}
          onChange={setQuery}
          onFocus={() => setOpen(true)}
          onKeyDown={onInputKeyDown}
          {...searchInputProps}
        />
      </div>
      {children}
      {typeof document !== "undefined" && menu ? createPortal(menu, document.body) : null}
    </div>
  )
}

Command.displayName = "Command"
