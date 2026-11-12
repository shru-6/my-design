import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Icon } from "../utilities/Icon"
import { avatarShapeRadius, avatarSizeScale, type AvatarSizeKey } from "./shared"

const sizeClass = (key: AvatarSizeKey) => `${avatarSizeScale[key].box} ${avatarSizeScale[key].text}`

const avatarVariants = cva("relative inline-flex shrink-0 bg-muted text-muted-foreground", {
  variants: {
    // Size + shape both come from `data-display/shared.ts` so AvatarGroup's
    // overflow chip can't drift away from a real avatar.
    size: {
      xs: sizeClass("xs"),
      sm: sizeClass("sm"),
      md: sizeClass("md"),
      lg: sizeClass("lg"),
      xl: sizeClass("xl"),
    },
    shape: avatarShapeRadius,
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
})

type Status = "online" | "offline" | "away" | "busy"

const FALLBACK_COLOR_CLASS: Record<string, string> = {
  muted: "bg-muted text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-info text-info-foreground",
  destructive: "bg-destructive text-destructive-foreground",
}

/** First + last word initials (e.g. "Alex Jane" → "AJ"). */
export function getAvatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase()
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  name?: string
  /** Fallback background — semantic token name or any CSS color. */
  color?: string
  fallback?: React.ReactNode
  status?: Status
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, color, fallback, status, size, shape, className, style, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false)
    const imageNode =
      src && !failed ? (
        <img
          src={src}
          alt={alt ?? "Avatar"}
          className={cn("h-full w-full object-cover", avatarShapeRadius[shape ?? "circle"])}
          onError={() => setFailed(true)}
        />
      ) : null

    const fallbackNode =
      fallback ??
      (name ? getAvatarInitials(name) : alt ? getAvatarInitials(alt) : "?")

    const showImage = Boolean(imageNode)
    const colorClass = color && !showImage ? FALLBACK_COLOR_CLASS[color] : undefined
    const colorStyle =
      color && !showImage && !colorClass ? { backgroundColor: color, ...style } : style

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape }), !showImage && colorClass, className)}
        style={colorStyle}
        {...props}
      >
        <Icon
          node={imageNode}
          fallback={fallbackNode}
          alt={alt}
          status={status}
          statusPosition="bottom-right"
          size={avatarSizeScale[size ?? "md"].icon}
          shape={shape === "square" ? "square" : "circle"}
          className="h-full w-full justify-center"
        />
      </div>
    )
  }
)

Avatar.displayName = "Avatar"
