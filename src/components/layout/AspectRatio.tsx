import * as React from "react"
import { cn } from "../../utils"

const DEFAULT_RATIO = 16 / 9

function toRatioNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  return fallback
}

/** Display string for a width/height ratio (e.g. 16/9 → `16:9`), same idea as PillGroup `{count}`. */
export function formatAspectRatioLabel(ratio: number): string {
  const pairs: [number, number][] = [
    [21, 9],
    [16, 9],
    [16, 10],
    [3, 2],
    [4, 3],
    [5, 4],
    [1, 1],
  ]
  for (const [w, h] of pairs) {
    if (Math.abs(ratio - w / h) < 0.02) return `${w}:${h}`
  }
  return String(Math.round(ratio * 1000) / 1000)
}

function sizeToCss(value: number | string | undefined): string | undefined {
  if (value == null) return undefined
  return typeof value === "number" ? `${value}px` : value
}

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  /** Width ÷ height. Coerced if passed as string from forms. */
  ratio?: number | string
  minWidth?: number | string
  maxWidth?: number | string
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio: ratioProp = DEFAULT_RATIO, children, minWidth, maxWidth, style, ...props }, ref) => {
    const ratio = toRatioNumber(ratioProp, DEFAULT_RATIO)
    const ratioLabel = formatAspectRatioLabel(ratio)
    const resolvedChildren =
      typeof children === "string" ? children.replace(/\{ratio\}/g, ratioLabel) : children

    const mergedStyle: React.CSSProperties = {
      ...style,
      aspectRatio: ratio,
      ...(minWidth != null && { minWidth: sizeToCss(minWidth) }),
      ...(maxWidth != null && { maxWidth: sizeToCss(maxWidth) }),
    }

    return (
      <div ref={ref} className={cn("w-full overflow-hidden", className)} style={mergedStyle} {...props}>
        {resolvedChildren}
      </div>
    )
  }
)

AspectRatio.displayName = "AspectRatio"
