import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
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
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value">,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  showLabel?: boolean
  indeterminate?: boolean
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ value = 0, max = 100, showLabel, indeterminate, size, className, ...props }, ref) => {
  const clamped = Math.max(0, Math.min(value, max))
  const percent = max > 0 ? (clamped / max) * 100 : 0

  return (
    <div className="w-full space-y-1">
      {showLabel ? (
        <Text as="div" size="xs" variant="muted">
          {Math.round(percent)}%
        </Text>
      ) : null}
      <ProgressPrimitive.Root ref={ref} className={cn(progressVariants({ size }), className)} value={indeterminate ? undefined : clamped} max={max} {...props}>
        <ProgressPrimitive.Indicator
          className={cn("h-full bg-primary transition-all", indeterminate && "animate-pulse")}
          style={{ transform: indeterminate ? undefined : `translateX(-${100 - percent}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})

Progress.displayName = "Progress"
