import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import {
  FieldLayout,
  fieldControlBlurHandler,
  fieldSurfaceVariants,
  useSyncStringFieldValidation,
} from "./fieldPieces"

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    Omit<VariantProps<typeof fieldSurfaceVariants>, "control" | "invalid"> {
  label?: React.ReactNode
  errorMessage?: string
  validate?: boolean | ((value: string) => string | undefined)
  onValidate?: (isValid: boolean, error?: string) => void
  resize?: "none" | "vertical" | "horizontal" | "both"
}

function getResizeClass(resize: TextareaProps["resize"]) {
  if (resize === "none") return "resize-none"
  if (resize === "vertical") return "resize-y"
  if (resize === "horizontal") return "resize-x"
  return "resize"
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      errorMessage,
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
      resize = "vertical",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const textareaId = id ?? generatedId
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
        htmlFor={textareaId}
        required={required}
        size={size}
        errorMessage={hasError ? validationError : undefined}
      >
        <textarea
          ref={ref}
          id={textareaId}
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
            fieldSurfaceVariants({ control: "textarea", size, variant, invalid: hasError }),
            getResizeClass(resize),
            className
          )}
          {...props}
        />
      </FieldLayout>
    )
  }
)

Textarea.displayName = "Textarea"
