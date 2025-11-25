"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { Button } from "../atoms/Button"
import { HelpCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

const tooltipSides = ["top", "right", "bottom", "left"] as const

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  side,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  side?: typeof tooltipSides[number]
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        side={side}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

export function TooltipShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Sides</h4>
        <div className="flex flex-wrap gap-4">
          {tooltipSides.map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={side}>
                <p>Tooltip on {side}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Tooltip with Icon</h4>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <HelpCircleIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Need help? Click here for more information.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

