"use client"

import * as React from "react"
import { useState } from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"
import { Label } from "./Label"

import { cn } from "@/lib/utils"

function Radio({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { Radio, RadioItem }

export function RadioShowcase() {
  const [value, setValue] = useState("")
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Default Radio Group</h4>
        <Radio value={value} onValueChange={setValue}>
          <div className="flex items-center space-x-2">
            <RadioItem value="option1" id="r1" />
            <Label htmlFor="r1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioItem value="option2" id="r2" />
            <Label htmlFor="r2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioItem value="option3" id="r3" />
            <Label htmlFor="r3">Option 3</Label>
          </div>
        </Radio>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">With Label</h4>
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Radio defaultValue="card">
            <div className="flex items-center space-x-2">
              <RadioItem value="card" id="card" />
              <Label htmlFor="card">Credit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioItem value="bank" id="bank" />
              <Label htmlFor="bank">Bank Transfer</Label>
            </div>
          </Radio>
        </div>
      </div>
    </div>
  )
}

