import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
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
  /**
   * Plain-text name for the remove control (`Remove {removeLabel}`). Needed
   * whenever `label` is not a string — it used to be `String(item.label)`,
   * which announced "Remove [object Object]" for any `ReactNode` label.
   * Defaults to `label` when it is a string/number, otherwise to `value`.
   */
  removeLabel?: string
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

/** `Remove …` text for a pill whose `label` may be a `ReactNode`. */
function removeLabelFor(item: PillItem): string {
  if (item.removeLabel) return item.removeLabel
  if (typeof item.label === "string" || typeof item.label === "number") return String(item.label)
  return item.value
}

export interface PillGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect">,
    VariantProps<typeof groupVariants> {
  /**
   * The rendered pills. `PillGroup` treats this as the single source of truth
   * and never removes from it itself — see `onRemove`.
   */
  items: PillItem[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (next: string[]) => void
  selectable?: boolean
  onSelect?: (item: PillItem, selected: boolean) => void
  multiple?: boolean
  removable?: boolean
  /**
   * Fired when a pill's dismiss control is used. **The parent must apply it** —
   * `next` is `items` with that pill dropped, ready to hand back as `items`.
   *
   * This used to be handled by mirroring `items` into local state; any parent
   * re-render with a fresh array identity resurrected every removed pill, and
   * the removal never reached the parent's data at all.
   */
  onRemove?: (value: string, next: PillItem[]) => void
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

export const PillGroup = React.forwardRef<HTMLDivElement, PillGroupProps>(function PillGroup(
  {
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
  },
  ref
) {
  const groupBusy = Boolean(groupLoading)
  const resolvedToggleSurface =
    toggleSurface != null && toggleSurface !== "" ? toggleSurface : undefined

  // Only read on first render (useControllableValue seeds `useState` with it).
  const [initialSelectedValues] = React.useState<string[]>(
    () => defaultValue ?? items.filter((item) => item.selected).map((item) => item.value)
  )

  const [selectedValues, setSelectedValues] = useControllableValue<string[]>({
    value,
    defaultValue: initialSelectedValues,
    onChange,
  })

  const isInteractive = selectable

  const visibleItems =
    typeof maxVisible === "number" && maxVisible >= 0 ? items.slice(0, maxVisible) : items
  const overflowCount =
    typeof maxVisible === "number" && maxVisible >= 0 ? Math.max(0, items.length - maxVisible) : 0

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

    setSelectedValues(next)
    onSelect?.(item, !isSelected)
  }

  const handleRemove = (item: PillItem) => {
    if (groupBusy || !removable || item.disabled) return

    if (selectable && selectedValues.includes(item.value)) {
      setSelectedValues(selectedValues.filter((v) => v !== item.value))
    }

    onRemove?.(
      item.value,
      items.filter((pill) => pill.value !== item.value)
    )
  }

  return (
    <div ref={ref} className={cn(groupVariants({ gap, wrap }), className)} {...props}>
      {visibleItems.map((item) => {
        const selected = selectable ? selectedValues.includes(item.value) : Boolean(item.selected)
        const badgeClassName = cn(
          isInteractive && !groupBusy && "cursor-pointer hover:opacity-90",
          (item.disabled || groupBusy) && "cursor-not-allowed opacity-60"
        )
        // Deliberately NOT `Pill`'s own `onRemove` (which renders an
        // `IconButton`) and deliberately not an `IconButton` here either: in
        // the selectable case the pill itself is a `<button>`, and a nested
        // `<button>` is invalid HTML that React warns about. A `role="button"`
        // span is the one affordance that is safe in both shells. The label —
        // the part that was actually broken — now comes from `removeLabelFor`.
        const removeNode =
          removable && !item.disabled && !groupBusy ? (
            <span
              role="button"
              tabIndex={0}
              className="text-current/70 hover:text-current"
              aria-label={`Remove ${removeLabelFor(item)}`}
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

        const shared = {
          size,
          appearance: resolvedToggleSurface != null ? undefined : variant,
          tone: item.tone ?? "neutral",
          toggleSurface: resolvedToggleSurface,
          selected,
          left: item.left,
          right: removeNode,
          className: badgeClassName,
          dot: item.dot,
          loading: !groupBusy && Boolean(item.loading),
          disabled: item.disabled || groupBusy,
        } as const

        return (
          <div key={item.value} className="inline-flex">
            {isInteractive ? (
              <Pill
                as="button"
                onClick={() => handleToggle(item)}
                aria-pressed={selected}
                {...shared}
              >
                {item.label}
              </Pill>
            ) : (
              <Pill {...shared}>{item.label}</Pill>
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
})

PillGroup.displayName = "PillGroup"
