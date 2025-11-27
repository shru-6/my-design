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

export function FormInputShowcase() {
  const [value, setValue] = React.useState("")
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">Default FormInput</h4>
        <FormInput
          label="Email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">With Error</h4>
        <FormInput
          label="Email"
          error="Email is required"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">With Description</h4>
        <FormInput
          label="Username"
          description="Choose a unique username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

