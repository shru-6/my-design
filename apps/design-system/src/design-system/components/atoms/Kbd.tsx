import * as React from "react"
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

export function KbdShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Keyboard Keys</h4>
        <div className="flex flex-wrap gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Shift</Kbd>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Keyboard Shortcuts</h4>
        <div className="flex items-center gap-2 text-sm">
          Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette
        </div>
      </div>
    </div>
  )
}

