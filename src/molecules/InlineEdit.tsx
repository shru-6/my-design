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
      <div data-slot="inline-edit" className={cn("inline-flex items-center", className)}>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave()
            if (e.key === "Escape") handleCancel()
          }}
          autoFocus
          className="h-9"
        />
      </div>
    )
  }

  return (
    <span
      data-slot="inline-edit-display"
      className={cn(
        "inline-flex items-center h-9 cursor-pointer hover:underline px-3 py-2",
        "border border-transparent rounded-md",
        className
      )}
      onClick={() => setIsEditing(true)}
    >
      {value || placeholder || "Click to edit"}
    </span>
  )
}
