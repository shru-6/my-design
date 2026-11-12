import * as React from "react"
import { cn } from "../../utils"
import { Avatar, type AvatarProps } from "./Avatar"
import { avatarShapeRadius, avatarSizeScale, type AvatarSizeKey } from "./shared"

export interface AvatarGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: Omit<AvatarProps, "size">[]
  max?: number
  size?: AvatarProps["size"]
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ items = [], max, size = "md", className, ...props }, ref) => {
    const visible = max != null ? items.slice(0, max) : items
    const overflow = max != null && items.length > max ? items.length - max : 0
    const scale = avatarSizeScale[(size ?? "md") as AvatarSizeKey]

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {visible.map((item, index) => (
          <Avatar
            key={index}
            {...item}
            size={size}
            className={cn("-ml-2 ring-2 ring-background first:ml-0", item.className)}
          />
        ))}
        {overflow > 0 ? (
          <div
            className={cn(
              "-ml-2 flex shrink-0 items-center justify-center ring-2 ring-background",
              "bg-muted text-muted-foreground",
              // Shared with Avatar — see data-display/shared.ts.
              scale.overflowBox,
              scale.text,
              avatarShapeRadius.circle
            )}
            aria-label={`${overflow} more`}
          >
            +{overflow}
          </div>
        ) : null}
      </div>
    )
  }
)

AvatarGroup.displayName = "AvatarGroup"
