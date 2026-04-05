import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Icon } from "../utilities/Icon"

const avatarVariants = cva("relative inline-flex shrink-0 bg-muted text-muted-foreground", {
  variants: {
    size: {
      xs: "h-6 w-6 text-[10px]",
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
})

type Status = "online" | "offline" | "away" | "busy"

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  status?: Status
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, status, size, shape, className, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false)
    const imageNode =
      src && !failed ? (
        <img
          src={src}
          alt={alt ?? "Avatar"}
          className={cn("h-full w-full object-cover", shape === "square" ? "rounded-md" : "rounded-full")}
          onError={() => setFailed(true)}
        />
      ) : null

    const fallbackNode = fallback ?? (alt ? alt.slice(0, 2).toUpperCase() : "AV")

    return (
      <div ref={ref} className={cn(avatarVariants({ size, shape }), className)} {...props}>
        <Icon
          node={imageNode}
          fallback={fallbackNode}
          alt={alt}
          status={status}
          statusPosition="bottom-right"
          size={size === "xs" ? "xs" : size === "sm" ? "sm" : size === "lg" ? "lg" : size === "xl" ? "xl" : "md"}
          shape={shape === "square" ? "square" : "circle"}
          className="h-full w-full justify-center"
        />
      </div>
    )
  }
)

Avatar.displayName = "Avatar"
