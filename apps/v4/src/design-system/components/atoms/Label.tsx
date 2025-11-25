"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { TextInput } from "./TextInput"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

export function LabelShowcase() {
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">Basic Label</h4>
        <Label htmlFor="name">Name</Label>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">With Input</h4>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <TextInput id="username" placeholder="Enter username" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Required Field</h4>
        <div className="space-y-2">
          <Label htmlFor="password">
            Password <span className="text-destructive">*</span>
          </Label>
          <TextInput id="password" type="password" placeholder="Enter password" />
        </div>
      </div>
    </div>
  )
}

