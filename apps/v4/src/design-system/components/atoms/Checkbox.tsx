"use client"

import * as React from "react"
import { useState } from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { Label } from "./Label"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

export function CheckboxShowcase() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Default Checkbox</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Label htmlFor="terms" className="cursor-pointer">
            Accept terms and conditions
          </Label>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Multiple Checkboxes</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="option1" />
            <Label htmlFor="option1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="option2" />
            <Label htmlFor="option2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="option3" disabled />
            <Label htmlFor="option3" className="text-muted-foreground">
              Option 3 (disabled)
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}

