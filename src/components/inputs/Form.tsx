import * as React from "react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { FormContext, type FormContextValue, type FormValues } from "./formContext"

export type { FormValues, FormFieldRenderProps, FormContextValue } from "./formContext"
export { useFormContext } from "./formContext"

export type FormValidateFn = (values: FormValues) => Record<string, string | undefined> | void
export type FormValidateOn = "submit" | "change" | "blur"
export type FormLayout = "vertical" | "horizontal" | "grid"

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "onChange"> {
  onSubmit: (values: FormValues) => void | Promise<void>
  onCancel?: () => void
  initialValues?: FormValues
  values?: FormValues
  onValuesChange?: (values: FormValues) => void
  validate?: FormValidateFn
  errors?: Record<string, string | undefined>
  validateOn?: FormValidateOn
  /** Controlled submitted flag — errors show after submit when validateOn is "submit". */
  submitted?: boolean
  onSubmittedChange?: (submitted: boolean) => void
  /** Auto-clear submitted state after N ms (e.g. reset error display). */
  resetSubmittedAfterMs?: number
  layout?: FormLayout
  columns?: 1 | 2 | 3 | 4
  submitLabel?: string
  cancelLabel?: string
  footer?: React.ReactNode
  disabled?: boolean
  loading?: boolean
  submitButtonProps?: Partial<ButtonProps>
  cancelButtonProps?: Partial<ButtonProps>
  children?: React.ReactNode
  className?: string
}

export function Form({
  onSubmit,
  onCancel,
  initialValues,
  values: valuesProp,
  onValuesChange,
  validate,
  errors: errorsProp,
  validateOn = "submit",
  submitted: submittedProp,
  onSubmittedChange,
  resetSubmittedAfterMs,
  layout = "vertical",
  columns = 1,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  footer,
  disabled,
  loading,
  submitButtonProps,
  cancelButtonProps,
  children,
  className,
  ...props
}: FormProps) {
  const [internalValues, setInternalValues] = React.useState<FormValues>(initialValues ?? {})
  const [internalErrors, setInternalErrors] = React.useState<Record<string, string | undefined>>({})
  const [touched, setTouchedState] = React.useState<Record<string, boolean>>({})
  const [internalSubmitted, setInternalSubmitted] = React.useState(false)

  const isControlled = valuesProp !== undefined
  const isSubmittedControlled = submittedProp !== undefined
  const submitted = isSubmittedControlled ? Boolean(submittedProp) : internalSubmitted

  const setSubmitted = React.useCallback(
    (next: boolean) => {
      if (!isSubmittedControlled) setInternalSubmitted(next)
      onSubmittedChange?.(next)
    },
    [isSubmittedControlled, onSubmittedChange]
  )

  React.useEffect(() => {
    if (!resetSubmittedAfterMs || !submitted) return
    const timer = window.setTimeout(() => setSubmitted(false), resetSubmittedAfterMs)
    return () => window.clearTimeout(timer)
  }, [resetSubmittedAfterMs, submitted, setSubmitted])
  const values = isControlled ? valuesProp : internalValues
  const errors = errorsProp ?? internalErrors

  const setValue = React.useCallback(
    (name: string, value: unknown) => {
      const next = { ...values, [name]: value }
      if (!isControlled) setInternalValues(next)
      onValuesChange?.(next)
    },
    [values, isControlled, onValuesChange]
  )

  const setError = React.useCallback(
    (name: string, error?: string) => {
      if (errorsProp) return
      setInternalErrors((prev) => ({ ...prev, [name]: error }))
    },
    [errorsProp]
  )

  const setTouched = React.useCallback((name: string, isTouched: boolean) => {
    setTouchedState((prev) => ({ ...prev, [name]: isTouched }))
  }, [])

  const runValidation = React.useCallback(() => {
    if (!validate) return true
    const result = validate(values) ?? {}
    if (!errorsProp) setInternalErrors(result)
    return Object.values(result).every((e) => !e)
  }, [validate, values, errorsProp])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const allTouched = Object.keys(values).reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouchedState((prev) => ({ ...prev, ...allTouched }))

    const valid = runValidation()
    if (!valid) return
    await onSubmit(values)
  }

  const ctx: FormContextValue = {
    values,
    errors,
    touched,
    submitted,
    setValue,
    setError,
    setTouched,
    validateOn,
    disabled,
    loading,
  }

  const layoutClass =
    layout === "grid"
      ? cn(
          "grid gap-4",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )
      : layout === "horizontal"
        ? "flex flex-col gap-4 sm:grid sm:grid-cols-[minmax(8rem,12rem)_1fr] sm:items-start sm:gap-x-4 sm:gap-y-4"
        : "flex flex-col gap-4"

  const defaultFooter = (
    <div className="flex flex-wrap justify-end gap-2">
      {onCancel ? (
        <Button
          type="button"
          variant="outline"
          label={cancelLabel}
          disabled={disabled || loading}
          onClick={onCancel}
          {...cancelButtonProps}
        />
      ) : null}
      <Button
        type="submit"
        variant="primary"
        label={submitLabel}
        loading={loading}
        disabled={disabled}
        {...submitButtonProps}
      />
    </div>
  )

  return (
    <FormContext.Provider value={ctx}>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={cn("w-full space-y-4", className)}
        {...props}
      >
        <div className={layoutClass}>{children}</div>
        {footer ?? defaultFooter}
      </form>
    </FormContext.Provider>
  )
}

Form.displayName = "Form"
