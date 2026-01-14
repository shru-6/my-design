import * as React from "react"
import { cn } from "../utils"
import { TextInput } from "../atoms/TextInput"
import { Label } from "../atoms/Label"

export interface FormInputProps
  extends React.ComponentProps<typeof TextInput> {
  label?: string
  error?: string
  description?: string
}

export function FormInput({
  className,
  label,
  error,
  description,
  id,
  ...props
}: FormInputProps) {
  const inputId = id || React.useId()

  return (
    <div data-slot="form-input" className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={inputId} className={error && "text-destructive"}>
          {label}
        </Label>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <TextInput
        id={inputId}
        className={error && "border-destructive"}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
