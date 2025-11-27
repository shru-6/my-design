"use client"

import * as React from "react"
import { useState } from "react"
import { Label } from "./Label"

import { cn } from "../utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

export function TextareaShowcase() {
  const [value, setValue] = useState("")
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">Default Textarea</h4>
        <Textarea
          placeholder="Enter your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">With Label</h4>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            rows={4}
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Disabled</h4>
        <Textarea placeholder="Disabled textarea" disabled />
      </div>
    </div>
  )
}

