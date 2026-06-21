import * as React from "react"
import { cn } from "../../utils"
import { Avatar, type AvatarProps } from "./Avatar"

export interface AvatarGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: Omit<AvatarProps, "size">[]
  max?: number
  size?: AvatarProps["size"]
}

export function AvatarGroup({ items = [], max, size = "md", className, ...rest }: AvatarGroupProps) {
  const visible = max != null ? items.slice(0, max) : items
  const overflow = max != null && items.length > max ? items.length - max : 0

  return (
    <div className={cn("flex items-center", className)} {...rest}>
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
            size === "xs" && "h-6 min-w-[1.5rem] rounded-full text-[10px]",
            size === "sm" && "h-8 min-w-[2rem] rounded-full text-xs",
            size === "md" && "h-10 min-w-[2.5rem] rounded-full text-sm",
            size === "lg" && "h-12 min-w-[3rem] rounded-full text-base",
            size === "xl" && "h-16 min-w-[4rem] rounded-full text-lg"
          )}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </div>
      ) : null}
    </div>
  )
}

AvatarGroup.displayName = "AvatarGroup"
