import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Text } from "./Text"

const progressVariants = cva("relative w-full overflow-hidden rounded-full bg-muted", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Omit or pass `null` for unknown progress (same as `loading`). */
  value?: number | null
  max?: number
  showLabel?: boolean
  /** Unknown completion (e.g. waiting on server). Same as `value={null}`. */
  loading?: boolean
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, showLabel, loading: loadingProp, size, className, ...props }, ref) => {
    const isLoading = Boolean(loadingProp) || value === null
    const numeric = isLoading ? 0 : (value ?? 0)
    const clamped = Math.max(0, Math.min(numeric, max))
    const percent = max > 0 ? (clamped / max) * 100 : 0

    return (
      <div className="w-full space-y-1">
        {showLabel ? (
          <Text as="div" size="xs" variant="muted">
            {isLoading ? "…" : `${Math.round(percent)}%`}
          </Text>
        ) : null}
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={isLoading ? undefined : clamped}
          aria-busy={isLoading || undefined}
          data-state={isLoading ? "indeterminate" : "determinate"}
          className={cn(progressVariants({ size }), className)}
          {...props}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
            {isLoading ? (
              <span
                className="absolute inset-y-0 left-0 w-[32%] min-w-[3rem] rounded-full bg-primary shadow-sm ring-1 ring-primary/25 animate-progress-indeterminate motion-reduce:animate-none"
                aria-hidden
              />
            ) : (
              <div
                className="h-full rounded-[inherit] bg-primary transition-[width] duration-300 ease-out"
                style={{ width: `${percent}%` }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"
