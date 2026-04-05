import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import {
  FieldLayout,
  fieldControlBlurHandler,
  fieldSurfaceVariants,
  InputAdornmentSlot,
  useSyncStringFieldValidation,
} from "./fieldPieces"

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof fieldSurfaceVariants>, "control" | "invalid"> {
  label?: React.ReactNode
  errorMessage?: string
  left?: React.ReactNode
  right?: React.ReactNode
  rightInteractive?: boolean
  validate?: boolean | ((value: string) => string | undefined)
  onValidate?: (isValid: boolean, error?: string) => void
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      errorMessage,
      left,
      right,
      rightInteractive,
      size,
      variant,
      className,
      validate,
      onValidate,
      value,
      defaultValue,
      onBlur,
      onChange,
      required,
      minLength,
      maxLength,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const [uncontrolledValue, setUncontrolledValue] = React.useState(String(defaultValue ?? ""))

    const resolvedValue = value != null ? String(value) : uncontrolledValue
    const { validationError, hasError, validationOpts } = useSyncStringFieldValidation(resolvedValue, {
      validate,
      required,
      minLength,
      maxLength,
      errorMessage,
      onValidate,
    })

    return (
      <FieldLayout
        label={label}
        htmlFor={inputId}
        required={required}
        size={size}
        errorMessage={hasError ? validationError : undefined}
      >
        <div className="relative">
          {left ? <InputAdornmentSlot side="left" node={left} /> : null}
          <input
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            onChange={(event) => {
              if (value == null) {
                setUncontrolledValue(event.target.value)
              }
              onChange?.(event)
            }}
            onBlur={fieldControlBlurHandler(validationOpts, onBlur, onValidate)}
            className={cn(
              fieldSurfaceVariants({ control: "input", size, variant, invalid: hasError }),
              left && "pl-10",
              right && "pr-10",
              className
            )}
            {...props}
          />
          {right ? <InputAdornmentSlot side="right" node={right} interactive={rightInteractive} /> : null}
        </div>
      </FieldLayout>
    )
  }
)

TextInput.displayName = "TextInput"
