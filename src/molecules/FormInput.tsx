import * as React from "react"
import { cn } from "../utils"
import { TextInput } from "../atoms/TextInput"
import { Textarea } from "../atoms/Textarea"
import { Label } from "../atoms/Label"
import { Checkbox } from "../atoms/Checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./Select"

export type FormInputType = "text" | "email" | "url" | "number" | "textarea" | "select" | "checkbox"

export interface FormInputProps {
  type?: FormInputType
  label?: string
  error?: string
  description?: string
  variant?: "default" | "minimal"
  // Text input props
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  // Select props
  options?: Array<{ label: string; value: string }>
  onValueChange?: (value: string) => void
  // Checkbox props
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  // Common props
  id?: string
  className?: string
  required?: boolean
  disabled?: boolean
  [key: string]: any
}

export function FormInput({
  className,
  type = "text",
  label,
  error,
  description,
  variant = "default",
  id,
  options,
  onValueChange,
  checked,
  onCheckedChange,
  ...props
}: FormInputProps) {
  const inputId = id || React.useId()

  if (type === "checkbox") {
    return (
      <div data-slot="form-input" className={cn("space-y-2", className)}>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={inputId}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={props.disabled}
          />
          {label && (
            <Label htmlFor={inputId} className={cn("cursor-pointer", error && "text-destructive")}>
              {label}
              {props.required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }

  if (type === "select") {
    return (
      <div data-slot="form-input" className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={inputId} className={error && "text-destructive"}>
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <Select
          value={props.value as string}
          onValueChange={onValueChange}
        >
          <SelectTrigger 
            id={inputId} 
            className={cn(
              error && "border-destructive",
              variant === "minimal" && "border-0 shadow-none bg-transparent"
            )}
          >
            <SelectValue placeholder={props.placeholder || "Select..."} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }

  if (type === "textarea") {
    return (
      <div data-slot="form-input" className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={inputId} className={error && "text-destructive"}>
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <Textarea
          id={inputId}
          className={cn(
            error && "border-destructive",
            variant === "minimal" && "border-0 shadow-none bg-transparent"
          )}
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

  return (
    <div data-slot="form-input" className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={inputId} className={error && "text-destructive"}>
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <TextInput
        id={inputId}
        type={type}
        className={cn(
          error && "border-destructive",
          variant === "minimal" && "border-0 shadow-none bg-transparent"
        )}
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
