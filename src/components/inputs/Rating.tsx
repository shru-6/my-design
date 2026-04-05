import * as React from "react"
import { Star } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Text } from "../data-display/Text"
import { ControlErrorMessage } from "./fieldPieces"

const ratingVariants = cva("inline-flex items-center gap-0.5", {
  variants: {
    size: {
      sm: "[&_.rating-star-slot]:h-4 [&_.rating-star-slot]:w-4",
      md: "[&_.rating-star-slot]:h-5 [&_.rating-star-slot]:w-5",
      lg: "[&_.rating-star-slot]:h-6 [&_.rating-star-slot]:w-6",
    },
  },
  defaultVariants: { size: "md" },
})

export type RatingPrecision = 1 | 0.5 | 0.25

function roundToStep(value: number, step: number): number {
  const n = Math.round(value / step)
  return Math.min(100, Math.max(0, n * step))
}

function fillForStar(starIndex1Based: number, value: number): number {
  return Math.min(1, Math.max(0, value - (starIndex1Based - 1)))
}

function valueFromPointer(starIndex1Based: number, clientX: number, starLeft: number, starWidth: number, max: number, precision: RatingPrecision): number {
  const rel = starWidth > 0 ? Math.min(1, Math.max(0, (clientX - starLeft) / starWidth)) : 1
  const step = precision
  const segments = step === 1 ? 1 : step === 0.5 ? 2 : 4
  const seg = Math.max(1, Math.ceil(rel * segments))
  const frac = seg / segments
  const raw = starIndex1Based - 1 + frac
  return roundToStep(Math.min(max, raw), step)
}

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof ratingVariants> {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  max?: number
  /** Coerced from string when set from selects (e.g. test harness). */
  precision?: RatingPrecision | number | string
  readOnly?: boolean
  disabled?: boolean
  left?: React.ReactNode
  showValue?: boolean
  label?: React.ReactNode
  errorMessage?: string
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size,
      value: valueProp,
      defaultValue = 0,
      onChange,
      max = 5,
      precision: precisionProp = 1,
      readOnly,
      disabled,
      left,
      showValue,
      label,
      errorMessage,
      id,
      ...props
    },
    ref
  ) => {
    const n = Number(precisionProp)
    const precision: RatingPrecision = n === 0.25 ? 0.25 : n === 0.5 ? 0.5 : 1

    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState(() => roundToStep(defaultValue, precision))
    const value = roundToStep(isControlled ? (valueProp as number) : internal, precision)

    const setValue = React.useCallback(
      (next: number) => {
        const v = roundToStep(next, precision)
        if (!isControlled) setInternal(v)
        onChange?.(v)
      },
      [isControlled, onChange, precision]
    )

    const starRefs = React.useRef<(HTMLButtonElement | null)[]>([])

    const onStarPointer = React.useCallback(
      (starIndex1Based: number, clientX: number) => {
        if (readOnly || disabled) return
        const el = starRefs.current[starIndex1Based - 1]
        if (!el) return
        const r = el.getBoundingClientRect()
        setValue(valueFromPointer(starIndex1Based, clientX, r.left, r.width, max, precision))
      },
      [readOnly, disabled, max, precision, setValue]
    )

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (readOnly || disabled) return
      const step = precision
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault()
        setValue(Math.min(max, value + step))
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault()
        setValue(Math.max(0, value - step))
      } else if (e.key === "Home") {
        e.preventDefault()
        setValue(0)
      } else if (e.key === "End") {
        e.preventDefault()
        setValue(max)
      }
    }

    const rootId = id ?? React.useId()
    const interactive = !readOnly && !disabled

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
        {label ? (
          <Text as="div" size="sm" weight="medium" className="text-foreground">
            {label}
          </Text>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          {left ? <span className="inline-flex shrink-0 items-center">{left}</span> : null}
          <div
            id={rootId}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled || readOnly}
            aria-readonly={readOnly}
            aria-valuetext={`${value} of ${max}`}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={onKeyDown}
            className={cn(ratingVariants({ size }), interactive && "cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2")}
          >
            {Array.from({ length: max }, (_, i) => {
              const k = i + 1
              const fill = fillForStar(k, value)
              return (
                <button
                  key={k}
                  type="button"
                  ref={(el) => {
                    starRefs.current[i] = el
                  }}
                  disabled={disabled}
                  tabIndex={-1}
                  className={cn(
                    "rating-star-slot relative inline-block shrink-0 border-0 bg-transparent p-0 align-middle",
                    interactive && "cursor-pointer",
                    (readOnly || disabled) && "cursor-default"
                  )}
                  onClick={(e) => onStarPointer(k, e.clientX)}
                  aria-hidden
                >
                  <span className="relative inline-block h-full w-full">
                    <Star
                      className="pointer-events-none absolute inset-0 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span
                      className="absolute inset-y-0 left-0 overflow-hidden"
                      style={{ width: `${fill * 100}%` }}
                      aria-hidden
                    >
                      <Star className="pointer-events-none h-full min-w-full fill-primary text-primary" strokeWidth={1.5} />
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
          {showValue ? (
            <Text as="span" size="sm" variant="muted" className="tabular-nums">
              {value}/{max}
            </Text>
          ) : null}
        </div>
        {errorMessage ? <ControlErrorMessage message={errorMessage} /> : null}
      </div>
    )
  }
)

Rating.displayName = "Rating"
export { ratingVariants }
