import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { disabledControl, focusRing } from "./fieldPieces"
import { Text } from "../data-display/Text"
import { Label } from "./Label"
import { ControlErrorMessage } from "./fieldPieces"

const sliderThumbClassName = `block h-4 w-4 rounded-full border border-primary/60 bg-background shadow ${focusRing} ${disabledControl}`

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
      (nextValue: number | [number, number]) => {
        if (Array.isArray(nextValue)) return nextValue
        if (range) return [nextValue, nextValue] as [number, number]
        return nextValue
      },
      [range]
    )

    const initialValue = React.useMemo(() => {
      const seed = value ?? defaultValue
      return normalizeValue(seed)
    }, [defaultValue, normalizeValue, value])

    const [internalValue, setInternalValue] = React.useState<number | [number, number]>(initialValue)
    const isControlled = value !== undefined && onChange != null
    const current = isControlled ? value : internalValue
    const currentDisplay = valueFormatter
      ? valueFormatter(current)
      : Array.isArray(current)
        ? `${current[0]} - ${current[1]}`
        : current

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
          value={Array.isArray(current) ? current : [current]}
          orientation={orientation}
          onValueChange={(next) => {
            const nextValue = range
              ? ([next[0] ?? 0, next[1] ?? next[0] ?? 0] as [number, number])
              : next[0] ?? 0
            if (!isControlled) setInternalValue(nextValue)
            onChange?.(nextValue)
          }}
          className={cn(
            sliderVariants({ size }),
            orientation === "vertical" ? "h-40 w-6 flex-col" : "w-full",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
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
