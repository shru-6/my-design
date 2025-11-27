"use client"

import * as React from "react"
import { cn } from "../utils"
import { TextInput } from "../atoms/TextInput"

export interface InlineEditProps {
  value: string
  onSave: (value: string) => void
  className?: string
  placeholder?: string
}

export function InlineEdit({
  value: initialValue,
  onSave,
  className,
  placeholder,
}: InlineEditProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [value, setValue] = React.useState(initialValue)

  const handleSave = () => {
    onSave(value)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setValue(initialValue)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div data-slot="inline-edit" className={cn("flex items-center gap-2", className)}>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave()
            if (e.key === "Escape") handleCancel()
          }}
          autoFocus
        />
      </div>
    )
  }

  return (
    <span
      data-slot="inline-edit-display"
      className={cn("cursor-pointer hover:underline", className)}
      onClick={() => setIsEditing(true)}
    >
      {value || placeholder || "Click to edit"}
    </span>
  )
}

export function InlineEditShowcase() {
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">Inline Edit</h4>
        <InlineEdit
          value="Click to edit"
          onSave={(value) => console.log("Saved:", value)}
        />
      </div>
    </div>
  )
}

