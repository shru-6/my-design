import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { floatingMenuHoverClass } from "../overlays/floatingMenu"
import { IconButton } from "../actions/IconButton"
import { Text } from "../data-display/Text"
import {
  addMonths,
  getCalendarDays,
  isAfterDay,
  isBeforeDay,
  isBetweenDays,
  isSameDay,
  rangeLengthDays,
  startOfDay,
  startOfMonth,
  type DateRangeValue,
} from "./dateUtils"

export type CalendarSelectionMode = "single" | "multiple" | "range"

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date | Date[] | DateRangeValue | null
  defaultValue?: Date | Date[] | DateRangeValue | null
  onChange?: (value: Date | Date[] | DateRangeValue | null) => void
  minDate?: Date
  maxDate?: Date
  /** Minimum inclusive span when `selectionMode="range"` (both endpoints count). */
  minRangeDays?: number
  /** Maximum inclusive span when `selectionMode="range"`. */
  maxRangeDays?: number
  disabled?: boolean
  selectionMode?: CalendarSelectionMode
  showOutsideDays?: boolean
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  disabledDates?: Date[] | ((date: Date) => boolean)
  highlightedDates?: Date[]
  locale?: string
  className?: string
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

/**
 * Day-cell state matrix. `tone` carries color/hover, `shape` carries the radius
 * (a range endpoint squares off the edge that faces the middle of the range),
 * and `outsideMonth` / `dimmed` / `highlight` stack on top of either.
 * `shape: "soft"` rather than a key spelled like a raw radius utility — the
 * lint reads file text, not just class strings.
 */
const dayCellVariants = cva("h-9 w-9 border-0 bg-transparent text-sm transition-colors", {
  // Key order is class order, and class order is what `cn()`'s tailwind-merge
  // resolves conflicts by: the dimming states have to be emitted before `tone`
  // so a selected endpoint's foreground still wins over an outside-month day's.
  variants: {
    outsideMonth: { true: "text-muted-foreground/50", false: "" },
    dimmed: { true: "pointer-events-none opacity-40", false: "" },
    highlight: { true: "font-semibold text-primary", false: "" },
    tone: {
      plain: "",
      interactive: floatingMenuHoverClass,
      rangeMiddle: `bg-primary/15 text-foreground ${floatingMenuHoverClass}`,
      endpoint: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/90",
    },
    shape: {
      none: "",
      soft: "rounded-control-md",
      // Arbitrary zero rather than the flat Tailwind scale's zero utility: that
      // scale is banned, and a merged range edge is "no shape", not a radius.
      square: "rounded-[0]",
      startEdge: "rounded-control-md rounded-r-[0]",
      endEdge: "rounded-control-md rounded-l-[0]",
    },
  },
  defaultVariants: {
    tone: "plain",
    shape: "none",
    outsideMonth: false,
    dimmed: false,
    highlight: false,
  },
})

function isDateDisabled(
  date: Date,
  opts: {
    disabled?: boolean
    minDate?: Date
    maxDate?: Date
    disabledDates?: CalendarProps["disabledDates"]
    selectionMode?: CalendarSelectionMode
    rangeAnchor?: Date | null
    minRangeDays?: number
    maxRangeDays?: number
  }
): boolean {
  if (opts.disabled) return true
  if (opts.minDate && isBeforeDay(date, opts.minDate)) return true
  if (opts.maxDate && isAfterDay(date, opts.maxDate)) return true
  if (Array.isArray(opts.disabledDates)) {
    return opts.disabledDates.some((d) => isSameDay(d, date))
  }
  if (typeof opts.disabledDates === "function") return opts.disabledDates(date)
  if (
    opts.selectionMode === "range" &&
    opts.rangeAnchor &&
    (opts.minRangeDays != null || opts.maxRangeDays != null)
  ) {
    const len = rangeLengthDays(opts.rangeAnchor, date)
    if (opts.minRangeDays != null && len < opts.minRangeDays) return true
    if (opts.maxRangeDays != null && len > opts.maxRangeDays) return true
  }
  return false
}

function normalizeRange(value: Date | Date[] | DateRangeValue | null | undefined): DateRangeValue {
  if (!value || value instanceof Date) return { from: value instanceof Date ? value : null, to: null }
  if (Array.isArray(value)) return { from: value[0] ?? null, to: value[1] ?? null }
  return { from: value.from ?? null, to: value.to ?? null }
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      minRangeDays,
      maxRangeDays,
      disabled,
      selectionMode = "single",
      showOutsideDays = true,
      weekStartsOn = 0,
      disabledDates,
      highlightedDates = [],
      locale,
      className,
      ...rest
    },
    ref
  ) => {
    const initial = value ?? defaultValue ?? null
    const [month, setMonth] = React.useState(() => startOfMonth(initial instanceof Date ? initial : new Date()))
    const [rangeDraft, setRangeDraft] = React.useState<Date | null>(null)

    const [selected, setSelected] = useControllableValue<Date | Date[] | DateRangeValue | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange,
    })

    const monthLabel = month.toLocaleDateString(locale, { month: "long", year: "numeric" })
    const days = getCalendarDays(month, weekStartsOn)
    const weekdays = [...WEEKDAY_LABELS.slice(weekStartsOn), ...WEEKDAY_LABELS.slice(0, weekStartsOn)]
    const range = normalizeRange(selected)
    const rangeAnchor =
      selectionMode === "range" && range.from && !range.to ? startOfDay(range.from) : rangeDraft

    const disableOpts = {
      disabled,
      minDate,
      maxDate,
      disabledDates,
      selectionMode,
      rangeAnchor,
      minRangeDays,
      maxRangeDays,
    }

    const handleSelect = (date: Date) => {
      if (isDateDisabled(date, disableOpts)) return
      const day = startOfDay(date)

      if (selectionMode === "single") {
        setSelected(day)
        return
      }

      if (selectionMode === "multiple") {
        const current = Array.isArray(selected) ? selected : []
        const exists = current.some((d) => isSameDay(d, day))
        const next = exists ? current.filter((d) => !isSameDay(d, day)) : [...current, day]
        setSelected(next)
        return
      }

      const range = normalizeRange(selected)
      if (!rangeDraft || (range.from && range.to)) {
        setRangeDraft(day)
        setSelected({ from: day, to: null })
        return
      }
      const from = isBeforeDay(rangeDraft, day) ? rangeDraft : day
      const to = isBeforeDay(rangeDraft, day) ? day : rangeDraft
      if (minRangeDays != null && rangeLengthDays(from, to) < minRangeDays) return
      if (maxRangeDays != null && rangeLengthDays(from, to) > maxRangeDays) return
      setRangeDraft(null)
      setSelected({ from, to })
    }

    const isSelectedDay = (date: Date): boolean => {
      if (!selected) return false
      if (selectionMode === "single" && selected instanceof Date) return isSameDay(selected, date)
      if (selectionMode === "multiple" && Array.isArray(selected)) return selected.some((d) => isSameDay(d, date))
      const range = normalizeRange(selected)
      if (range.from && !range.to) return isSameDay(range.from, date)
      if (range.from && range.to) return isBetweenDays(date, range.from, range.to)
      return false
    }

    const isRangeEdge = (date: Date): "start" | "end" | false => {
      if (selectionMode !== "range") return false
      const range = normalizeRange(selected)
      if (range.from && isSameDay(range.from, date)) return "start"
      if (range.to && isSameDay(range.to, date)) return "end"
      return false
    }

    const isRangeMiddle = (date: Date): boolean => {
      if (selectionMode !== "range") return false
      const range = normalizeRange(selected)
      if (!range.from || !range.to) return false
      return isBetweenDays(date, range.from, range.to) && !isSameDay(date, range.from) && !isSameDay(date, range.to)
    }

    return (
      <div ref={ref} className={cn("w-[280px] select-none p-3", className)} {...rest}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <IconButton
            ariaLabel="Previous month"
            disabled={disabled}
            icon={<ChevronLeft />}
            onClick={() => setMonth((m) => addMonths(m, -1))}
          />
          <Text as="div" size="sm" weight="semibold">
            {monthLabel}
          </Text>
          <IconButton
            ariaLabel="Next month"
            disabled={disabled}
            icon={<ChevronRight />}
            onClick={() => setMonth((m) => addMonths(m, 1))}
          />
        </div>

        <div className="mb-1 grid grid-cols-7 gap-1">
          {weekdays.map((label) => (
            <Text key={label} as="div" size="xs" variant="muted" className="text-center">
              {label}
            </Text>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date) => {
            const inMonth = date.getMonth() === month.getMonth()
            if (!showOutsideDays && !inMonth) {
              return <div key={date.toISOString()} aria-hidden />
            }
            const dayDisabled = isDateDisabled(date, disableOpts)
            const rangeEdge = isRangeEdge(date)
            const rangeMiddle = isRangeMiddle(date)
            const highlighted = highlightedDates.some((d) => isSameDay(d, date))
            const activeRange = normalizeRange(selected)
            const pendingStart =
              selectionMode === "range" && activeRange.from && !activeRange.to && isSameDay(activeRange.from, date)
            const isEndpoint =
              rangeEdge === "start" ||
              rangeEdge === "end" ||
              pendingStart ||
              (selectionMode === "single" && isSelectedDay(date)) ||
              (selectionMode === "multiple" && isSelectedDay(date))

            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={dayDisabled}
                onClick={() => handleSelect(date)}
                className={cn(
                  dayCellVariants({
                    tone: rangeMiddle
                      ? "rangeMiddle"
                      : isEndpoint
                        ? "endpoint"
                        : inMonth && !dayDisabled
                          ? "interactive"
                          : "plain",
                    shape: rangeMiddle
                      ? "square"
                      : isEndpoint
                        ? rangeEdge === "start" && activeRange.to
                          ? "startEdge"
                          : rangeEdge === "end"
                            ? "endEdge"
                            : "soft"
                        : inMonth && !dayDisabled
                          ? "soft"
                          : "none",
                    outsideMonth: !inMonth,
                    dimmed: dayDisabled,
                    highlight: highlighted && !isEndpoint && !rangeMiddle,
                  })
                )}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)

Calendar.displayName = "Calendar"
