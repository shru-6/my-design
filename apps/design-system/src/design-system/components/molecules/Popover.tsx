"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Button } from "../atoms/Button"

import { cn } from "../utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

const popoverSides = ["top", "right", "bottom", "left"] as const
const popoverAligns = ["start", "center", "end"] as const

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  side,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  side?: typeof popoverSides[number]
  align?: typeof popoverAligns[number]
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

export function PopoverShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Sides</h4>
        <div className="flex flex-wrap gap-4">
          {popoverSides.map((side) => (
            <Popover key={side}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </Button>
              </PopoverTrigger>
              <PopoverContent side={side}>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Popover on {side}</h4>
                  <p className="text-sm text-muted-foreground">
                    This popover appears on the {side} side.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Default Popover</h4>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

