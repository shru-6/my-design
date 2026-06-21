import * as React from "react"

export type FormValues = Record<string, unknown>
export type FormValidateOn = "submit" | "change" | "blur"

export type FormFieldRenderProps = {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
}

export type FormContextValue = {
  values: FormValues
  errors: Record<string, string | undefined>
  touched: Record<string, boolean>
  submitted: boolean
  setValue: (name: string, value: unknown) => void
  setError: (name: string, error?: string) => void
  setTouched: (name: string, touched: boolean) => void
  validateOn: FormValidateOn
  disabled?: boolean
  loading?: boolean
}

const FormContext = React.createContext<FormContextValue | null>(null)

export function useFormContext() {
  return React.useContext(FormContext)
}

export { FormContext }
