import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const skeletonVariants = cva("animate-pulse bg-skeleton", {
  variants: {
    variant: {
      text: "h-4 w-12 rounded",
      avatar: "h-10 w-10 rounded-full",
      button: "h-9 w-24 rounded-md",
      badge: "h-5 w-5 rounded-full",
      card: "h-32 w-32 rounded-lg",
      input: "h-9 w-24 rounded-md",
      checkbox: "h-5 w-5 rounded-sm",
      radio: "h-5 w-5 rounded-full",
    },
  },
  defaultVariants: {
    variant: "text",
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
  count?: number
  className?: string
  children?: React.ReactNode
}

function withUnit(value?: string | number): string | number | undefined {
  if (value == null) return undefined
  return typeof value === "number" ? `${value}px` : value
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant, width, height, count = 1, className, children, ...props }, ref) => {
    const items = Array.from({ length: Math.max(1, count) })
    return (
      <div className={cn("flex flex-col gap-2", count === 1 && "contents")}>
        {items.map((_, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? ref : undefined}
            data-slot={`skeleton-${idx}`}
            className={cn(skeletonVariants({ variant }), className)}
            style={{ width: withUnit(width), height: withUnit(height) }}
            {...props}
          >
            {children}
          </div>
        ))}
      </div>
    )
  }
)

Skeleton.displayName = "Skeleton"
