import * as React from "react"
import { createPortal } from "react-dom"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useFloatingMenu } from "../overlays/useFloatingMenu"
import { floatingMenuSurfaceClass } from "../overlays/floatingMenu"
import { Button } from "../actions/Button"
import { fieldSurfaceVariants } from "./fieldPieces"
import { TextInput, type TextInputProps } from "./TextInput"
import { Calendar, type CalendarProps } from "./Calendar"
import {
  formatDateRange,
  isRangeWithinLimits,
  startOfDay,
  type DateRangeValue,
} from "./dateUtils"

export type DatePreset = {
  label: React.ReactNode
  value: DateRangeValue
}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: DateRangeValue | null
  defaultValue?: DateRangeValue | null
  onChange?: (value: DateRangeValue | null) => void
  /** Earliest selectable calendar day. */
  minDate?: Date
  /** Latest selectable calendar day. */
  maxDate?: Date
  /** Minimum inclusive span (both endpoints count). */
  minRangeDays?: number
  /** Maximum inclusive span (both endpoints count). */
  maxRangeDays?: number
  disabled?: boolean
  required?: boolean
  placeholder?: string
  label?: React.ReactNode
  errorMessage?: string
  format?: string
  locale?: string
  /** Require Apply to commit; shows Apply / Cancel footer. When false, closes on a valid complete range. */
  showApplyButton?: boolean
  applyLabel?: string
  cancelLabel?: string
  clearable?: boolean
  presets?: DatePreset[]
  size?: VariantProps<typeof fieldSurfaceVariants>["size"]
  variant?: VariantProps<typeof fieldSurfaceVariants>["variant"]
  inputProps?: Partial<TextInputProps>
  calendarProps?: Partial<CalendarProps>
  className?: string
}

const EMPTY_RANGE: DateRangeValue = { from: null, to: null }

function normalizeRangeInput(next: DateRangeValue | null): DateRangeValue | null {
  if (!next) return null
  return {
    from: next.from ? startOfDay(next.from) : null,
    to: next.to ? startOfDay(next.to) : null,
  }
}

export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  minRangeDays,
  maxRangeDays,
  disabled,
  required,
  placeholder = "Pick a date range",
  label,
  errorMessage,
  format = "PP",
  locale,
  showApplyButton = false,
  applyLabel = "Apply",
  cancelLabel = "Cancel",
  clearable = true,
  presets = [],
  size = "md",
  variant = "outline",
  inputProps,
  calendarProps,
  className,
  ...rest
}: DateRangePickerProps) {
  const [internal, setInternal] = React.useState<DateRangeValue | null>(
    normalizeRangeInput(defaultValue ?? null)
  )
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<DateRangeValue | null>(EMPTY_RANGE)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const selected = isControlled ? normalizeRangeInput(value ?? null) : internal

  const limits = React.useMemo(
    () => ({ minDate, maxDate, minRangeDays, maxRangeDays }),
    [minDate, maxDate, minRangeDays, maxRangeDays]
  )

  const { menuStyle } = useFloatingMenu({
    open,
    onOpenChange: setOpen,
    triggerRef,
    menuRef,
    maxHeight: 420,
  })

  React.useEffect(() => {
    if (!open) return
    setDraft(selected ?? EMPTY_RANGE)
  }, [open, selected])

  const commitRange = (next: DateRangeValue | null) => {
    const normalized = normalizeRangeInput(next)
    if (!isControlled) setInternal(normalized)
    onChange?.(normalized)
  }

  const setSelected = (next: DateRangeValue | null) => {
    const normalized = normalizeRangeInput(next)
    if (showApplyButton) {
      setDraft(normalized ?? EMPTY_RANGE)
      return
    }
    commitRange(normalized)
    if (
      !showApplyButton &&
      normalized?.from &&
      normalized?.to &&
      isRangeWithinLimits(normalized, limits)
    ) {
      setOpen(false)
    }
  }

  const applyDraft = () => {
    if (!draft?.from || !draft?.to || !isRangeWithinLimits(draft, limits)) return
    commitRange(draft)
    setOpen(false)
  }

  const cancelDraft = () => {
    setDraft(selected ?? EMPTY_RANGE)
    setOpen(false)
  }

  const calendarValue = showApplyButton && open ? draft : selected ?? EMPTY_RANGE
  const canApply = Boolean(draft?.from && draft?.to && isRangeWithinLimits(draft, limits))

  const display = selected ? formatDateRange(selected, format) : ""

  const menu = open ? (
    <div ref={menuRef} style={menuStyle} className={floatingMenuSurfaceClass}>
      {presets.length ? (
        <div className="flex flex-wrap gap-1 border-b border-border p-2">
          {presets.map((preset, index) => {
            const next = normalizeRangeInput(preset.value)
            const valid = next && isRangeWithinLimits(next, limits)
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                disabled={!valid}
                onClick={() => {
                  if (!next || !valid) return
                  if (showApplyButton) setDraft(next)
                  else setSelected(next)
                }}
              >
                {preset.label}
              </Button>
            )
          })}
        </div>
      ) : null}
      <Calendar
        value={calendarValue}
        onChange={(next) => {
          if (next && typeof next === "object" && !Array.isArray(next) && !(next instanceof Date)) {
            setSelected({
              from: next.from ? startOfDay(next.from) : null,
              to: next.to ? startOfDay(next.to) : null,
            })
          }
        }}
        minDate={minDate}
        maxDate={maxDate}
        minRangeDays={minRangeDays}
        maxRangeDays={maxRangeDays}
        disabled={disabled}
        locale={locale}
        selectionMode="range"
        {...calendarProps}
      />
      {showApplyButton ? (
        <div className="flex justify-end gap-2 border-t border-border p-2">
          <Button variant="ghost" size="sm" onClick={cancelDraft}>
            {cancelLabel}
          </Button>
          <Button variant="primary" size="sm" disabled={!canApply} onClick={applyDraft}>
            {applyLabel}
          </Button>
        </div>
      ) : null}
    </div>
  ) : null

  return (
    <div className={cn("relative w-full", className)} {...rest}>
      <div ref={triggerRef}>
        <TextInput
          label={label}
          required={required}
          errorMessage={errorMessage}
          size={size}
          variant={variant}
          disabled={disabled}
          placeholder={placeholder}
          readOnly
          value={display}
          left={<CalendarIcon className="h-4 w-4" strokeWidth={2} />}
          right={
            clearable && selected?.from && !disabled ? (
              <button
                type="button"
                tabIndex={-1}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Clear range"
                onClick={() => {
                  if (showApplyButton) setDraft(EMPTY_RANGE)
                  commitRange(null)
                }}
              >
                <X className="h-4 w-4" />
              </button>
            ) : undefined
          }
          rightInteractive={clearable && Boolean(selected?.from)}
          onFocus={() => !disabled && setOpen(true)}
          onClick={() => !disabled && setOpen(true)}
          {...inputProps}
        />
      </div>
      {typeof document !== "undefined" && menu ? createPortal(menu, document.body) : null}
    </div>
  )
}

DateRangePicker.displayName = "DateRangePicker"
