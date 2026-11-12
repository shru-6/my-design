import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { disabledControl, focusRing } from "./fieldPieces"
import { Text } from "../data-display/Text"
import { Label } from "./Label"
import { ControlErrorMessage } from "./fieldPieces"

const sliderThumbClassName = `block h-4 w-4 rounded-pill border border-primary/60 bg-background shadow ${focusRing} ${disabledControl}`

const sliderVariants = cva("relative flex w-full touch-none select-none items-center", {
  variants: {
    size: {
      sm: "h-4",
      md: "h-5",
      lg: "h-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface SliderProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
      "value" | "defaultValue" | "onValueChange" | "onChange"
    >,
    VariantProps<typeof sliderVariants> {
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  onChange?: (value: number | [number, number]) => void
  range?: boolean
  showValue?: boolean
  valueFormatter?: (value: number | [number, number]) => React.ReactNode
  marks?: Array<{ value: number; label?: React.ReactNode }>
  label?: React.ReactNode
  errorMessage?: string
}

export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      onChange,
      range = false,
      showValue,
      valueFormatter,
      marks,
      label,
      errorMessage,
      size,
      orientation = "horizontal",
      className,
      ...props
    },
    ref
  ) => {
    const normalizeValue = React.useCallback(
      (nextValue: number | [number, number]): number | [number, number] => {
        if (Array.isArray(nextValue)) return nextValue
        if (range) return [nextValue, nextValue] as [number, number]
        return nextValue
      },
      [range]
    )

    const [current, setCurrent] = useControllableValue<number | [number, number]>({
      value: value === undefined ? undefined : normalizeValue(value),
      defaultValue: normalizeValue(defaultValue),
      onChange,
    })
    const currentDisplay = valueFormatter
      ? valueFormatter(current)
      : Array.isArray(current)
        ? `${current[0]} - ${current[1]}`
        : current

    const toRadix = (v: number | [number, number]): number[] =>
      Array.isArray(v) ? [v[0], v[1]] : [v]

    return (
      <div className="w-full space-y-1.5">
        {(label || showValue) && (
          <div className="flex items-center justify-between gap-3">
            {label ? <Label size="sm">{label}</Label> : <span />}
            {showValue ? (
              <Text as="span" size="xs" variant="muted">
                {currentDisplay}
              </Text>
            ) : null}
          </div>
        )}
        <SliderPrimitive.Root
          ref={ref}
          value={toRadix(current)}
          orientation={orientation}
          onValueChange={(next) => {
            const nextValue = range
              ? ([next[0] ?? 0, next[1] ?? next[0] ?? 0] as [number, number])
              : (next[0] ?? 0)
            setCurrent(nextValue)
          }}
          className={cn(
            sliderVariants({ size }),
            orientation === "vertical" ? "h-40 w-6 flex-col" : "w-full",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track className="relative grow overflow-hidden rounded-pill bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
            <SliderPrimitive.Range className="absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className={sliderThumbClassName} />
          {range ? <SliderPrimitive.Thumb className={sliderThumbClassName} /> : null}
        </SliderPrimitive.Root>
        {marks?.length ? (
          <div className="flex justify-between">
            {marks.map((mark) => (
              <Text as="span" key={`${mark.value}-${String(mark.label ?? "")}`} size="2xs" variant="muted">
                {mark.label ?? mark.value}
              </Text>
            ))}
          </div>
        ) : null}
        <ControlErrorMessage message={errorMessage} />
      </div>
    )
  }
)

Slider.displayName = "Slider"
