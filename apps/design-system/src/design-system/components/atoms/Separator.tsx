"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const separatorOrientations = ["horizontal", "vertical"] as const

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  orientation?: typeof separatorOrientations[number]
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

export function SeparatorShowcase() {
  return (
    <div className="space-y-6">
      {separatorOrientations.map((orientation) => (
        <div key={orientation}>
          <h4 className="text-sm font-medium mb-3">
            {orientation.charAt(0).toUpperCase() + orientation.slice(1)} Separator
          </h4>
          {orientation === "horizontal" ? (
            <div className="space-y-2">
              <div>Content above</div>
              <Separator orientation={orientation} />
              <div>Content below</div>
            </div>
          ) : (
            <div className="flex items-center gap-2 h-20">
              <div>Left</div>
              <Separator orientation={orientation} />
              <div>Right</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

