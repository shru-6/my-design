"use client"

import * as React from "react"
import { useState } from "react"
import { Label } from "./Label"

import { cn } from "@/lib/utils"

const textInputTypes = ["text", "email", "password", "number", "tel", "url", "search"] as const

function TextInput({ className, type = "text", ...props }: React.ComponentProps<"input"> & {
  type?: typeof textInputTypes[number]
}) {
  return (
    <input
      type={type}
      data-slot="text-input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { TextInput }

export function TextInputShowcase() {
  const [value, setValue] = useState("")
  const typeLabels: Record<typeof textInputTypes[number], string> = {
    text: "Text",
    email: "Email",
    password: "Password",
    number: "Number",
    tel: "Telephone",
    url: "URL",
    search: "Search",
  }
  const typePlaceholders: Record<typeof textInputTypes[number], string> = {
    text: "Enter text...",
    email: "you@example.com",
    password: "Enter password...",
    number: "Enter number...",
    tel: "+1 (555) 000-0000",
    url: "https://example.com",
    search: "Search...",
  }
  
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">Input Types</h4>
        <div className="space-y-3">
          {textInputTypes.map((type) => (
            <div key={type} className="space-y-2">
              <Label htmlFor={`input-${type}`}>{typeLabels[type]}</Label>
              <TextInput
                id={`input-${type}`}
                type={type}
                placeholder={typePlaceholders[type]}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Default Text Input</h4>
        <TextInput
          placeholder="Enter text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Disabled</h4>
        <TextInput placeholder="Disabled input" disabled />
      </div>
    </div>
  )
}

