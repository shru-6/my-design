import * as React from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Text } from "../data-display/Text"

export interface ResizeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical" | "both"
  minScale?: number
  maxScale?: number
  defaultScale?: number
  scale?: number
  onScaleChange?: (scale: number) => void
  fit?: "contain" | "cover" | "fill"
  showControls?: boolean
  disabled?: boolean
  maxWidth?: string | number
  maxHeight?: string | number
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  contentProps?: React.HTMLAttributes<HTMLDivElement>
  children?: React.ReactNode
  className?: string
}

export function ResizeContainer({
  direction: _direction = "both",
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
}: ResizeContainerProps) {
  const [internalScale, setInternalScale] = React.useState(defaultScale)
  const isControlled = scaleProp !== undefined
  const scale = isControlled ? scaleProp : internalScale

  const setScale = (next: number) => {
    const clamped = Math.min(maxScale, Math.max(minScale, next))
    if (!isControlled) setInternalScale(clamped)
    onScaleChange?.(clamped)
  }

  const fitClass =
    fit === "cover" ? "object-cover" : fit === "fill" ? "object-fill" : "object-contain"

  return (
    <div className={cn("w-full", className)} {...rest}>
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
              aria-label="Zoom out"
              disabled={disabled || scale <= minScale}
              left={<Minus className="h-4 w-4" />}
              onClick={() => setScale(scale - 0.1)}
            />
            <Button
              variant="outline"
              size="sm"
              iconOnly
              aria-label="Zoom in"
              disabled={disabled || scale >= maxScale}
              left={<Plus className="h-4 w-4" />}
              onClick={() => setScale(scale + 0.1)}
            />
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Reset zoom"
              disabled={disabled}
              left={<RotateCcw className="h-4 w-4" />}
              onClick={() => setScale(defaultScale)}
            />
          </div>
        </div>
      ) : null}
      <div
        className="overflow-auto rounded-lg border border-border bg-muted/20 p-4"
        style={{ maxWidth, maxHeight }}
        {...containerProps}
      >
        <div
          className={cn("origin-top-left transition-transform", fitClass)}
          style={{ transform: `scale(${scale})` }}
          {...contentProps}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

ResizeContainer.displayName = "ResizeContainer"
