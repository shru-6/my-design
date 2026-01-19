import * as React from "react"
import { TriggerModal } from "./TriggerModal"
import { Button } from "../atoms/Button"
// import { TextInput } from "../atoms/TextInput"
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
  placeholder?: string | ((formData: Record<string, any>) => string)
  description?: string
  helpText?: string | ((formData: Record<string, any>) => string)
  required?: boolean | ((formData: Record<string, any>) => boolean)
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
  rows?: number
  variant?: "default" | "dashed" | "outlined"
  size?: "sm" | "md" | "lg"
  defaultValue?: any
  onChange?: (
    value: any,
    params: {
      formData: Record<string, any>
      setFormData: (data: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => void
      fieldName: string
    }
  ) => void
  onFileSelect?: (
    file: File,
    params: {
      formData: Record<string, any>
      setFormData: (data: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => void
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
  icon?: React.ReactNode
  // Common props
  title: string
  description?: string
  variant?: "create" | "edit"
  itemType?: string
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  submitLabel?: string
  submittingLabel?: string
  cancelLabel?: string
  loading?: boolean
  isSubmitDisabled?: boolean | ((formData: Record<string, any>) => boolean)
  onCreated?: (data: Record<string, any>) => void
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
  icon,
  title,
  description,
  variant,
  itemType,
  onSubmit,
  submitLabel,
  submittingLabel,
  cancelLabel = "Cancel",
  loading: loadingProp,
  isSubmitDisabled,
  onCreated,
  fields,
  children,
  beforeFields,
  afterFields,
  ...props
}: FormModalProps) {
  const [open, setOpen] = React.useState(openProp ?? false)
  const [formData, setFormData] = React.useState<Record<string, any>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  // Auto-generate submit label based on variant and itemType
  const getSubmitLabel = () => {
    if (submittingLabel && (isSubmitting || loadingProp)) return submittingLabel
    if (submitLabel) return submitLabel
    if (variant === "create") {
      return itemType ? `Create ${itemType}` : "Create"
    }
    if (variant === "edit") {
      return itemType ? `Update ${itemType}` : "Update"
    }
    return "Submit"
  }
  
  const loading = loadingProp ?? isSubmitting

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

  // Compute all field options at component level to ensure reactivity
  // This ensures function-based options re-evaluate when formData changes
  const fieldOptions = React.useMemo(() => {
    if (!fields) return {}
    
    const optionsMap: Record<string, Array<{ label: string; value: string }>> = {}
    
    fields.forEach((field) => {
      if (field.type === "select" && field.options) {
        if (Array.isArray(field.options)) {
          optionsMap[field.name] = field.options
        } else if (typeof field.options === 'function') {
          try {
            optionsMap[field.name] = field.options(formData)
          } catch (e) {
            console.error(`Error resolving options for field ${field.name}:`, e)
            optionsMap[field.name] = []
          }
        }
      }
    })
    
    return optionsMap
  }, [fields, formData])

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
      // Call onCreated callback if provided and variant is create
      if (onCreated && variant === "create") {
        onCreated(formData)
      }
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

    // Resolve function-based props once per field
    const resolvedPlaceholder = typeof field.placeholder === "function"
      ? field.placeholder(formData)
      : field.placeholder
    const resolvedRequired = typeof field.required === "function"
      ? field.required(formData)
      : field.required
    const resolvedHelpText = typeof field.helpText === "function"
      ? field.helpText(formData)
      : field.helpText

    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return (
          <div key={field.name} className="space-y-2">
            <FormInput
              label={field.label}
              description={field.description}
              error={error}
              type={field.type}
              placeholder={resolvedPlaceholder}
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field)}
              required={resolvedRequired}
            />
            {resolvedHelpText && (
              <p className="text-sm text-muted-foreground">{resolvedHelpText}</p>
            )}
          </div>
        )

      case "number":
        return (
          <div key={field.name} className="space-y-2">
            <FormInput
              label={field.label}
              description={field.description}
              error={error}
              type="number"
              placeholder={resolvedPlaceholder}
              value={value || ""}
              onChange={(e) => handleChange(field.name, parseFloat(e.target.value) || 0, field)}
              min={field.min}
              max={field.max}
              step={field.step}
              required={resolvedRequired}
            />
            {resolvedHelpText && (
              <p className="text-sm text-muted-foreground">{resolvedHelpText}</p>
            )}
          </div>
        )

      case "textarea":
        return (
          <div key={field.name} className="space-y-2">
            {field.label && (
              <Label htmlFor={field.name} className={error && "text-destructive"}>
                {field.label}
                {resolvedRequired && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Textarea
              id={field.name}
              placeholder={resolvedPlaceholder}
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field)}
              className={error && "border-destructive"}
              required={resolvedRequired}
              rows={field.rows}
            />
            {resolvedHelpText && (
              <p className="text-sm text-muted-foreground">{resolvedHelpText}</p>
            )}
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
        )

      case "select":
        // Get pre-computed options from component-level memoization
        // This ensures function-based options re-evaluate when formData changes
        const resolvedOptions = fieldOptions[field.name] || []
        
        // Create a key based on options to force SelectContent re-render when options change
        const optionsKey = resolvedOptions.map(o => o.value).join(',')
        
        return (
          <div key={field.name} className="space-y-2">
            {field.label && (
              <Label htmlFor={field.name} className={error && "text-destructive"}>
                {field.label}
                {resolvedRequired && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Select
              value={value || ""}
              onValueChange={(val) => handleChange(field.name, val, field)}
              key={`select-${field.name}-${optionsKey}`}
            >
              <SelectTrigger id={field.name} className={error && "border-destructive"}>
                <SelectValue placeholder={resolvedPlaceholder || "Select..."} />
              </SelectTrigger>
              <SelectContent key={`select-content-${field.name}-${optionsKey}`}>
                {resolvedOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {resolvedHelpText && (
              <p className="text-sm text-muted-foreground">{resolvedHelpText}</p>
            )}
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
        )

      case "checkbox":
        return (
          <div key={field.name} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.name}
                checked={value || false}
                onCheckedChange={(checked) => handleChange(field.name, checked, field)}
              />
              {field.label && (
                <Label htmlFor={field.name} className="cursor-pointer">
                  {field.label}
                  {resolvedRequired && <span className="text-destructive ml-1">*</span>}
                </Label>
              )}
            </div>
            {field.description && (
              <p className="text-sm text-muted-foreground ml-6">{field.description}</p>
            )}
            {resolvedHelpText && (
              <p className="text-sm text-muted-foreground ml-6">{resolvedHelpText}</p>
            )}
            {error && (
              <p className="text-sm text-destructive ml-6" role="alert">
                {error}
              </p>
            )}
          </div>
        )

      case "upload":
        
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files
          handleChange(field.name, files, field)
          
          // Call onFileSelect if provided
          if (field.onFileSelect && files && files.length > 0) {
            field.onFileSelect(files[0], {
              formData,
              setFormData: (data) => {
                if (typeof data === 'function') {
                  setFormData((prev) => data(prev))
                } else {
                  setFormData(data)
                }
              },
            })
          }
        }
        
        const uploadVariantClasses = {
          default: "",
          dashed: "border-dashed border-2",
          outlined: "border-2",
        }
        
        const uploadSizeClasses = {
          sm: "text-xs py-1",
          md: "text-sm py-2",
          lg: "text-base py-3",
        }
        
        return (
          <div key={field.name} className="space-y-2">
            {field.label && (
              <Label htmlFor={field.name} className={error && "text-destructive"}>
                {field.label}
                {resolvedRequired && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Upload
              id={field.name}
              accept={field.accept}
              multiple={field.multiple}
              onChange={handleFileChange}
              className={cn(
                error && "border-destructive",
                uploadVariantClasses[field.variant || "default"],
                uploadSizeClasses[field.size || "md"]
              )}
            />
            {resolvedHelpText && (
              <p className="text-sm text-muted-foreground">{resolvedHelpText}</p>
            )}
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

  const footer = (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen?.(false)}
        disabled={isSubmitting}
      >
        {cancelLabel}
      </Button>
      <Button 
        className="ml-2"
        type="submit" 
        disabled={
          loading || 
          (typeof isSubmitDisabled === "function" 
            ? isSubmitDisabled(formData) 
            : isSubmitDisabled ?? false)
        }
      >
        {loading ? getSubmitLabel() : getSubmitLabel()}
      </Button>
    </>
  )

  return (
    <TriggerModal
      open={isOpen}
      onOpenChange={setIsOpen}
      triggerLabel={triggerLabel}
      triggerProps={triggerProps}
      icon={icon}
      stopPropagation={true}
      title={title}
      description={description}
      showCloseButton={false}
      footer={footer}
      className="data-slot-form-modal"
      {...props}
    >
      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        {beforeFields}
        {fields ? (
          <div className="space-y-4">
            {fields.map((field) => renderField(field))}
          </div>
        ) : (
          children
        )}
        {afterFields}
      </form>
    </TriggerModal>
  )
}
