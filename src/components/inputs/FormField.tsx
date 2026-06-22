import * as React from "react"
import { getStringFieldValidationError, FieldLayout, type StringFieldValidateOpts } from "./fieldPieces"
import { Checkbox } from "./Checkbox"
import { Select, type SelectOption } from "./Select"
import { TextInput, type TextInputProps } from "./TextInput"
import { Textarea, type TextareaProps } from "./Textarea"
import { Upload } from "./Upload"
import { useFormContext, type FormFieldRenderProps } from "./formContext"

export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "url"
  | "search"
  | "textarea"
  | "select"
  | "checkbox"
  | "upload"

export interface FormFieldProps {
  name: string
  type?: FormFieldType
  label?: React.ReactNode
  placeholder?: string
  required?: boolean
  disabled?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** Called after the field value updates (select, checkbox, and text inputs). */
  onValueChange?: (value: string) => void
  validate?: boolean | ((value: string) => string | undefined)
  errorMessage?: string
  touched?: boolean
  showError?: boolean
  /** Select options when `type="select"`. */
  items?: SelectOption[]
  rows?: number
  /** Upload options when `type="upload"`. */
  accept?: string
  dragAndDrop?: boolean
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  loading?: boolean
  onUpload?: (files: File[]) => void | Promise<void>
  render?: (props: FormFieldRenderProps) => React.ReactNode
  children?: React.ReactNode
  className?: string
  inputProps?: Partial<TextInputProps>
  labelProps?: Record<string, unknown>
  helperTextProps?: Record<string, unknown>
}

function resolveFieldError(
  value: string,
  validate: FormFieldProps["validate"],
  required?: boolean,
  errorMessage?: string
) {
  if (!validate) return undefined
  const opts: StringFieldValidateOpts = { validate, required, errorMessage }
  return getStringFieldValidationError(value, opts)
}

export function FormField({
  name,
  type = "text",
  label,
  placeholder,
  required,
  disabled,
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  validate,
  errorMessage,
  touched: touchedProp,
  showError = true,
  render,
  children,
  className,
  inputProps,
  onValueChange,
  items,
  rows,
  accept,
  dragAndDrop,
  multiple,
  maxSize,
  maxFiles,
  loading,
  onUpload,
}: FormFieldProps) {
  const form = useFormContext()
  const fieldId = React.useId()

  const value =
    valueProp != null
      ? String(valueProp)
      : form
        ? String(form.values[name] ?? "")
        : String(defaultValue ?? "")

  const touched = touchedProp ?? form?.touched[name] ?? false
  const contextError = form?.errors[name]
  const localError = resolveFieldError(value, validate, required, errorMessage)
  const shouldShowError = form
    ? form.validateOn === "submit"
      ? form.submitted
      : form.validateOn === "blur"
        ? touched
        : touched
    : touched
  const displayError = showError && shouldShowError ? contextError ?? localError : undefined

  const setValue = (next: string) => {
    onChangeProp?.(next)
    form?.setValue(name, next)
    onValueChange?.(next)
    if (form && validate) {
      const err = resolveFieldError(next, validate, required, errorMessage)
      if (form.validateOn === "change" || form.submitted) {
        form.setError(name, err)
      }
      if (form.validateOn === "change") form.setTouched(name, true)
    }
  }

  const handleBlur = () => {
    if (form?.validateOn === "blur") {
      form.setTouched(name, true)
      if (validate) {
        const err = resolveFieldError(value, validate, required, errorMessage)
        form.setError(name, err)
      }
    }
  }

  const shared: FormFieldRenderProps = {
    id: fieldId,
    name,
    value,
    onChange: setValue,
    onBlur: handleBlur,
    errorMessage: displayError,
    disabled: disabled ?? form?.disabled,
    required,
    placeholder,
  }

  if (render) {
    return (
      <FieldLayout className={className} label={label} htmlFor={fieldId} required={required} errorMessage={displayError}>
        {render(shared)}
      </FieldLayout>
    )
  }

  if (children) {
    return (
      <FieldLayout className={className} label={label} htmlFor={fieldId} required={required} errorMessage={displayError}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            id: fieldId,
            name,
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setValue(e.target.value)
            },
            onBlur: handleBlur,
            disabled: shared.disabled,
            required,
            placeholder,
            errorMessage: displayError,
            validate,
          })
        })}
      </FieldLayout>
    )
  }

  if (type === "select") {
    return (
      <Select
        id={fieldId}
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={shared.disabled}
        errorMessage={displayError}
        items={items ?? []}
        className={className}
        onValueChange={setValue}
      />
    )
  }

  if (type === "checkbox") {
    const checked = value === "true"
    return (
      <Checkbox
        id={fieldId}
        name={name}
        label={label}
        checked={checked}
        disabled={shared.disabled}
        errorMessage={displayError}
        className={className}
        onChange={(next) => setValue(String(next))}
      />
    )
  }

  if (type === "upload") {
    return (
      <Upload
        label={label}
        accept={accept}
        dragAndDrop={dragAndDrop}
        multiple={multiple}
        maxSize={maxSize}
        maxFiles={maxFiles}
        disabled={shared.disabled}
        loading={loading}
        errorMessage={displayError}
        className={className}
        onUpload={onUpload ?? (async () => {})}
      />
    )
  }

  if (type === "textarea") {
    return (
      <Textarea
        id={fieldId}
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={shared.disabled}
        validate={form?.validateOn === "submit" ? undefined : validate}
        errorMessage={displayError}
        className={className}
        rows={rows}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur as TextareaProps["onBlur"]}
        {...(inputProps as TextareaProps)}
      />
    )
  }

  return (
    <TextInput
      id={fieldId}
      name={name}
      type={type}
      label={label}
      value={value}
      placeholder={placeholder}
      required={required}
      disabled={shared.disabled}
      validate={form?.validateOn === "submit" ? undefined : validate}
      errorMessage={displayError}
      className={className}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur as TextInputProps["onBlur"]}
      {...inputProps}
    />
  )
}

FormField.displayName = "FormField"
