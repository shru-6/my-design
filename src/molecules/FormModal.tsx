import * as React from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalTrigger,
} from "./Modal"
import { Button } from "../atoms/Button"
import { TextInput } from "../atoms/TextInput"
import { Textarea } from "../atoms/Textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./Select"
import { Checkbox } from "../atoms/Checkbox"
import { Upload } from "../atoms/Upload"
import { Label } from "../atoms/Label"
import { FormInput } from "./FormInput"
import { cn } from "../utils"

export type FormFieldType = 
  | "text" 
  | "textarea" 
  | "select" 
  | "checkbox" 
  | "upload" 
  | "number" 
  | "email" 
  | "url"

export interface FormFieldConfig {
  name: string
  type: FormFieldType
  label?: string
  placeholder?: string
  description?: string
  required?: boolean
  active?: boolean | ((values: Record<string, any>) => boolean)
  validation?: (value: any) => string | undefined
  options?: 
    | Array<{ label: string; value: string }>
    | ((formData: Record<string, any>) => Array<{ label: string; value: string }>)
    | (() => Array<{ label: string; value: string }>)
  accept?: string
  multiple?: boolean
  min?: number
  max?: number
  step?: number
  defaultValue?: any
  onChange?: (
    value: any,
    params: {
      formData: Record<string, any>
      setFormData: (data: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => void
      fieldName: string
    }
  ) => void
}

export interface FormModalProps {
  // Controlled API
  open?: boolean
  onOpenChange?: (open: boolean) => void
  // Uncontrolled API
  triggerLabel?: string
  triggerProps?: React.ComponentProps<typeof Button>
  // Common props
  title: string
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  submitLabel?: string
  cancelLabel?: string
  // Fields API
  fields?: FormFieldConfig[]
  // Children API (for custom content)
  children?: React.ReactNode
  // Custom slots
  beforeFields?: React.ReactNode
  afterFields?: React.ReactNode
}

export function FormModal({
  open: openProp,
  onOpenChange,
  triggerLabel,
  triggerProps,
  title,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  fields,
  children,
  beforeFields,
  afterFields,
}: FormModalProps) {
  const [open, setOpen] = React.useState(openProp ?? false)
  const [formData, setFormData] = React.useState<Record<string, any>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const isControlled = openProp !== undefined
  const isOpen = isControlled ? openProp : open
  const setIsOpen = isControlled ? onOpenChange : setOpen

  React.useEffect(() => {
    if (fields) {
      const initialData: Record<string, any> = {}
      fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          initialData[field.name] = field.defaultValue
        }
      })
      setFormData(initialData)
    }
  }, [fields])

  const handleChange = (name: string, value: any, field?: FormFieldConfig) => {
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
    
    // Call field-level onChange if provided
    if (field?.onChange) {
      field.onChange(value, {
        formData: newFormData,
        setFormData: (data) => {
          if (typeof data === 'function') {
            setFormData((prev) => data(prev))
          } else {
            setFormData(data)
          }
        },
        fieldName: name,
      })
    }
  }

  const validateField = (field: FormFieldConfig, value: any): string | undefined => {
    if (field.required && (value === undefined || value === null || value === "")) {
      return `${field.label || field.name} is required`
    }
    if (field.validation) {
      return field.validation(value)
    }
    return undefined
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!fields) {
      // Legacy children API - let form handle it
      return
    }

    // Validate all fields
    const newErrors: Record<string, string> = {}
    fields.forEach((field) => {
      const isActive = typeof field.active === "function" 
        ? field.active(formData)
        : field.active !== false
      
      if (isActive) {
        const error = validateField(field, formData[field.name])
        if (error) {
          newErrors[field.name] = error
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setIsOpen?.(false)
      setFormData({})
      setErrors({})
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormFieldConfig) => {
    const isActive = typeof field.active === "function" 
      ? field.active(formData)
      : field.active !== false

    if (!isActive) return null

    const value = formData[field.name] ?? field.defaultValue
    const error = errors[field.name]

    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return (
          <FormInput
            key={field.name}
            label={field.label}
            description={field.description}
            error={error}
            type={field.type}
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => handleChange(field.name, e.target.value, field)}
            required={field.required}
          />
        )

      case "number":
        return (
          <FormInput
            key={field.name}
            label={field.label}
            description={field.description}
            error={error}
            type="number"
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => handleChange(field.name, parseFloat(e.target.value) || 0, field)}
            min={field.min}
            max={field.max}
            step={field.step}
            required={field.required}
          />
        )

      case "textarea":
        return (
          <div key={field.name} className="space-y-2">
            {field.label && (
              <Label htmlFor={field.name} className={error && "text-destructive"}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field)}
              className={error && "border-destructive"}
              required={field.required}
            />
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
        )

      case "select":
        // Resolve options - support function-based options
        const resolvedOptions = React.useMemo(() => {
          if (!field.options) return []
          if (Array.isArray(field.options)) return field.options
          if (typeof field.options === 'function') {
            try {
              return field.options(formData)
            } catch (e) {
              console.error(`Error resolving options for field ${field.name}:`, e)
              return []
            }
          }
          return []
        }, [field.options, formData])
        
        return (
          <div key={field.name} className="space-y-2">
            {field.label && (
              <Label htmlFor={field.name} className={error && "text-destructive"}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Select
              value={value || ""}
              onValueChange={(val) => handleChange(field.name, val, field)}
            >
              <SelectTrigger id={field.name} className={error && "border-destructive"}>
                <SelectValue placeholder={field.placeholder || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {resolvedOptions.map((option) => (
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

      case "checkbox":
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={value || false}
              onCheckedChange={(checked) => handleChange(field.name, checked, field)}
            />
            {field.label && (
              <Label htmlFor={field.name} className="cursor-pointer">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
        )

      case "upload":
        return (
          <div key={field.name} className="space-y-2">
            {field.label && (
              <Label htmlFor={field.name} className={error && "text-destructive"}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Upload
              id={field.name}
              accept={field.accept}
              multiple={field.multiple}
              onChange={(e) => handleChange(field.name, e.target.files)}
              className={error && "border-destructive"}
            />
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const modalContent = (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent data-slot="form-modal">
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <div className="space-y-4 px-6 py-4">
            {beforeFields}
            {fields ? (
              <>
                {fields.map((field) => renderField(field))}
              </>
            ) : (
              children
            )}
            {afterFields}
          </div>
          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen?.(false)}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : submitLabel}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )

  if (triggerLabel) {
    return (
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalTrigger asChild>
          <Button {...triggerProps}>{triggerLabel}</Button>
        </ModalTrigger>
        {modalContent}
      </Modal>
    )
  }

  return modalContent
}
