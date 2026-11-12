import * as React from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Text } from "../data-display/Text"
import { useControllableValue } from "../../utils/useControllableValue"

/**
 * `direction` had been accepted and then dropped on the floor (`_direction`)
 * while still being advertised in the gallery props panel. It now does the
 * one thing it can honestly mean here: which axis the viewport scrolls when
 * the scaled content outgrows it.
 */
const resizeViewportVariants = cva("border border-border bg-muted/20 p-4 rounded-surface-lg", {
  variants: {
    direction: {
      horizontal: "overflow-x-auto overflow-y-hidden",
      vertical: "overflow-y-auto overflow-x-hidden",
      both: "overflow-auto",
    },
  },
  defaultVariants: {
    direction: "both",
  },
})

const resizeContentVariants = cva("origin-top-left transition-transform", {
  variants: {
    fit: {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
    },
  },
  defaultVariants: {
    fit: "contain",
  },
})

export interface ResizeContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    Pick<VariantProps<typeof resizeViewportVariants>, "direction"> {
  minScale?: number
  maxScale?: number
  defaultScale?: number
  scale?: number
  onScaleChange?: (scale: number) => void
  fit?: NonNullable<VariantProps<typeof resizeContentVariants>["fit"]>
  showControls?: boolean
  disabled?: boolean
  maxWidth?: string | number
  maxHeight?: string | number
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  contentProps?: React.HTMLAttributes<HTMLDivElement>
  children?: React.ReactNode
  className?: string
}

export const ResizeContainer = React.forwardRef<HTMLDivElement, ResizeContainerProps>(
  function ResizeContainer(
    {
      direction = "both",
      minScale = 0.5,
      maxScale = 2,
      defaultScale = 1,
      scale: scaleProp,
      onScaleChange,
      fit = "contain",
      showControls = true,
      disabled,
      maxWidth,
      maxHeight,
      containerProps,
      contentProps,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const [scale, setScaleValue] = useControllableValue<number>({
      value: scaleProp,
      defaultValue: defaultScale,
      onChange: onScaleChange,
    })

    const setScale = (next: number) => {
      setScaleValue(Math.min(maxScale, Math.max(minScale, next)))
    }

    return (
      <div ref={ref} data-slot="resize-container" className={cn("w-full", className)} {...rest}>
        {showControls ? (
          <div className="mb-2 flex items-center justify-between gap-2">
            <Text as="span" size="sm" variant="muted">
              Zoom {Math.round(scale * 100)}%
            </Text>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                iconOnly
                ariaLabel="Zoom out"
                disabled={disabled || scale <= minScale}
                left={<Minus className="h-4 w-4" />}
                onClick={() => setScale(scale - 0.1)}
              />
              <Button
                variant="outline"
                size="sm"
                iconOnly
                ariaLabel="Zoom in"
                disabled={disabled || scale >= maxScale}
                left={<Plus className="h-4 w-4" />}
                onClick={() => setScale(scale + 0.1)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                ariaLabel="Reset zoom"
                disabled={disabled}
                left={<RotateCcw className="h-4 w-4" />}
                onClick={() => setScale(defaultScale)}
              />
            </div>
          </div>
        ) : null}
        {/*
          Slot props are spread FIRST and className/style merged last. Spreading
          them after `className` (as this did) let a consumer's `className`
          silently replace the internal layout classes rather than merge.
        */}
        <div
          {...containerProps}
          className={cn(resizeViewportVariants({ direction }), containerProps?.className)}
          style={{ maxWidth, maxHeight, ...containerProps?.style }}
        >
          <div
            {...contentProps}
            className={cn(resizeContentVariants({ fit }), contentProps?.className)}
            style={{ transform: `scale(${scale})`, ...contentProps?.style }}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)

ResizeContainer.displayName = "ResizeContainer"
