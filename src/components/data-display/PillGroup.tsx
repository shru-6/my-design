import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Spinner } from "./Spinner"
import { Pill, type PillProps } from "./Pill"

type PillTone = "neutral" | "info" | "success" | "warning" | "danger"

export interface PillItem {
  label: React.ReactNode
  value: string
  tone?: PillTone
  disabled?: boolean
  left?: React.ReactNode
  selected?: boolean
  dot?: boolean
  loading?: boolean
}

const groupVariants = cva("flex", {
  variants: {
    gap: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap overflow-x-auto",
    },
  },
  defaultVariants: {
    gap: "md",
    wrap: true,
  },
})

export interface PillGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect">,
    VariantProps<typeof groupVariants> {
  items: PillItem[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (next: string[]) => void
  selectable?: boolean
  onSelect?: (item: PillItem, selected: boolean) => void
  multiple?: boolean
  removable?: boolean
  onRemove?: (value: string) => void
  maxVisible?: number
  overflowLabel?: string
  children?: React.ReactNode
  size?: PillProps["size"]
  /** Maps to Pill `appearance` (solid / subtle / outline / ghost). Ignored when `toggleSurface` is set. */
  variant?: PillProps["appearance"]
  /** Button-style surface for every pill (`primary` / `secondary` / `outline` / `ghost`). */
  toggleSurface?: PillProps["toggleSurface"]
  /** Disables all pills and shows a trailing spinner. */
  loading?: boolean
}

export function PillGroup({
  items,
  value,
  defaultValue,
  onChange,
  selectable = false,
  onSelect,
  multiple = true,
  removable = false,
  onRemove,
  maxVisible,
  overflowLabel = "+{count}",
  children,
  size,
  variant,
  toggleSurface,
  loading: groupLoading,
  gap,
  wrap,
  className,
  ...props
}: PillGroupProps) {
  const groupBusy = Boolean(groupLoading)
  const resolvedToggleSurface =
    toggleSurface != null && toggleSurface !== "" ? toggleSurface : undefined
  const initialSelectedValues = React.useMemo(() => {
    if (defaultValue) return defaultValue
    return items.filter((item) => item.selected).map((item) => item.value)
  }, [defaultValue, items])

  const [internalItems, setInternalItems] = React.useState<PillItem[]>(items)
  const [internalValue, setInternalValue] = React.useState<string[]>(initialSelectedValues)

  React.useEffect(() => {
    setInternalItems(items)
  }, [items])

  const selectedValues = value ?? internalValue
  const isControlled = value !== undefined
  const isInteractive = selectable

  const visibleItems =
    typeof maxVisible === "number" && maxVisible >= 0 ? internalItems.slice(0, maxVisible) : internalItems
  const overflowCount =
    typeof maxVisible === "number" && maxVisible >= 0 ? Math.max(0, internalItems.length - maxVisible) : 0

  const handleToggle = (item: PillItem) => {
    if (groupBusy || item.disabled || !selectable) return

    const isSelected = selectedValues.includes(item.value)
    const next = multiple
      ? isSelected
        ? selectedValues.filter((v) => v !== item.value)
        : [...selectedValues, item.value]
      : isSelected
        ? []
        : [item.value]

    if (!isControlled) {
      setInternalValue(next)
    }
    onChange?.(next)
    onSelect?.(item, !isSelected)
  }

  const handleRemove = (item: PillItem) => {
    if (groupBusy || !removable || item.disabled) return

    setInternalItems((prev) => prev.filter((pill) => pill.value !== item.value))

    if (selectable) {
      const nextSelected = selectedValues.filter((value) => value !== item.value)
      if (!isControlled) {
        setInternalValue(nextSelected)
      }
      onChange?.(nextSelected)
    }

    onRemove?.(item.value)
  }

  return (
    <div className={cn(groupVariants({ gap, wrap }), className)} {...props}>
      {visibleItems.map((item) => {
        const selected = selectable
          ? selectedValues.includes(item.value)
          : Boolean(item.selected)
        const badgeClassName = cn(
          isInteractive && !groupBusy && "cursor-pointer hover:opacity-90",
          (item.disabled || groupBusy) && "cursor-not-allowed opacity-60"
        )
        const removeNode =
          removable && !item.disabled ? (
            <span
              role="button"
              tabIndex={0}
              className="text-current/70 hover:text-current"
              aria-label={`Remove ${String(item.label)}`}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                handleRemove(item)
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  event.stopPropagation()
                  handleRemove(item)
                }
              }}
            >
              ×
            </span>
          ) : null

        return (
          <div key={item.value} className="inline-flex">
            {isInteractive ? (
              <Pill
                as="button"
                onClick={() => handleToggle(item)}
                disabled={item.disabled || groupBusy}
                aria-pressed={selectable ? selected : undefined}
                size={size}
                appearance={resolvedToggleSurface != null ? undefined : variant}
                tone={item.tone ?? "neutral"}
                toggleSurface={resolvedToggleSurface}
                selected={selected}
                left={item.left}
                right={removeNode}
                className={badgeClassName}
                dot={item.dot}
                loading={!groupBusy && Boolean(item.loading)}
              >
                {item.label}
              </Pill>
            ) : (
              <Pill
                size={size}
                appearance={resolvedToggleSurface != null ? undefined : variant}
                tone={item.tone ?? "neutral"}
                toggleSurface={resolvedToggleSurface}
                selected={selected}
                left={item.left}
                right={removeNode}
                className={badgeClassName}
                dot={item.dot}
                loading={!groupBusy && Boolean(item.loading)}
                disabled={item.disabled || groupBusy}
              >
                {item.label}
              </Pill>
            )}
          </div>
        )
      })}
      {overflowCount > 0 && (
        <Pill size={size} appearance="outline" tone="neutral" disabled={groupBusy}>
          {overflowLabel.replace("{count}", String(overflowCount))}
        </Pill>
      )}
      {groupBusy ? (
        <span className="inline-flex items-center self-center pl-1" aria-busy>
          <Spinner size="sm" />
        </span>
      ) : null}
      {children}
    </div>
  )
}

PillGroup.displayName = "PillGroup"
