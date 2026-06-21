import * as React from "react"
import { cn } from "../../utils"

/** Shared popover shell — list menus (Dropdown, TimePicker options). */
export const floatingMenuListClass =
  "z-dropdown overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none"

/** Shared popover shell — rich panels (Calendar, presets). */
export const floatingMenuSurfaceClass =
  "z-dropdown overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none"

/** Hover/focus tint for interactive cells inside popover surfaces (menus, calendar days). */
export const floatingMenuHoverClass =
  "hover:bg-[hsl(var(--foreground)/0.08)] focus-visible:bg-[hsl(var(--foreground)/0.08)] active:bg-[hsl(var(--foreground)/0.12)]"

/** Shared row styling for selectable menu / listbox options. */
export const floatingMenuItemClass =
  "flex w-full cursor-default select-none items-center gap-2 rounded-sm border-0 bg-transparent px-2 py-1.5 text-left text-sm text-popover-foreground outline-none transition-colors disabled:pointer-events-none disabled:opacity-50"

export const floatingMenuItemSelectedClass = "bg-[hsl(var(--foreground)/0.06)]"

export interface FloatingMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export function FloatingMenuItem({ className, selected, type = "button", ...props }: FloatingMenuItemProps) {
  return (
    <button
      type={type}
      className={cn(floatingMenuItemClass, floatingMenuHoverClass, selected && floatingMenuItemSelectedClass, className)}
      {...props}
    />
  )
}

FloatingMenuItem.displayName = "FloatingMenuItem"
