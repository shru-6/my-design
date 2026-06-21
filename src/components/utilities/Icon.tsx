import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

export const iconVariants = cva("inline-flex items-center justify-center shrink-0", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
    shape: {
      default: "",
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    shape: "default",
  },
})

type Status = "online" | "offline" | "away" | "busy"
type StatusPosition = "top-right" | "bottom-right"

const statusTone: Record<Status, string> = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  away: "bg-warning",
  busy: "bg-info",
}

export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof iconVariants> {
  node?: React.ReactNode
  alt?: string
  status?: Status
  statusPosition?: StatusPosition
  fallback?: React.ReactNode
}

/** True when `node` should be ignored so `fallback` can be used (`??` alone misses `""` and whitespace). */
function isEmptyIconNode(node: React.ReactNode): boolean {
  if (node == null || node === false) return true
  if (typeof node === "string") return node.trim().length === 0
  if (Array.isArray(node)) return node.length === 0 || node.every(isEmptyIconNode)
  return false
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      node,
      alt,
      status,
      statusPosition = "bottom-right",
      fallback,
      size,
      variant,
      shape,
      className,
      ...props
    },
    ref
  ) => {
    const resolvedContent = isEmptyIconNode(node) ? (fallback ?? null) : node
    if (resolvedContent == null || resolvedContent === false) return null
    if (typeof resolvedContent === "string" && resolvedContent.trim() === "") return null

    return (
      <span
        ref={ref}
        data-slot="icon"
        role={alt ? "img" : undefined}
        aria-label={alt}
        className={cn(iconVariants({ size, variant, shape }), status && "relative", className)}
        {...props}
      >
        {React.isValidElement(resolvedContent)
          ? React.cloneElement(resolvedContent as React.ReactElement, {
              className: cn((resolvedContent as React.ReactElement<{ className?: string }>).props.className),
              "aria-hidden": alt ? undefined : true,
            })
          : resolvedContent}
        {status && (
          <span
            className={cn(
              "absolute h-2.5 w-2.5 rounded-full border border-background",
              statusPosition === "top-right" ? "-right-0.5 -top-0.5" : "-bottom-0.5 -right-0.5",
              statusTone[status]
            )}
          />
        )}
      </span>
    )
  }
)

Icon.displayName = "Icon"
