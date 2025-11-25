"use client"

import * as React from "react"
import { useState } from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { Label } from "./Label"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

export function SwitchShowcase() {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Default Switch</h4>
        <div className="flex items-center space-x-2">
          <Switch
            id="notifications"
            checked={enabled}
            onCheckedChange={(value) => setEnabled(value === true)}
          />
          <Label htmlFor="notifications" className="cursor-pointer">
            Enable notifications
          </Label>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Multiple Switches</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch id="email" />
            <Label htmlFor="email">Email notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="sms" />
            <Label htmlFor="sms">SMS notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="push" disabled />
            <Label htmlFor="push" className="text-muted-foreground">
              Push notifications (disabled)
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}

