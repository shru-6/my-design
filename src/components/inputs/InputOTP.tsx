import * as React from "react"
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import {
  FieldLayout,
  fieldControlBlurHandler,
  fieldSurfaceVariants,
  ringOffsetBackground,
  useSyncStringFieldValidation,
} from "./fieldPieces"

export interface InputOTPProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof OTPInput>,
      "maxLength" | "render" | "children" | "value" | "onChange" | "defaultValue" | "size"
    >,
    Omit<VariantProps<typeof fieldSurfaceVariants>, "control" | "invalid"> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  length?: number
  mask?: boolean
  label?: React.ReactNode
  errorMessage?: string
  validate?: boolean | ((value: string) => string | undefined)
  onValidate?: (isValid: boolean, error?: string) => void
}

export const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      id,
      label,
      errorMessage,
      length = 6,
      mask,
      size = "md",
      variant = "outline",
      className,
      validate,
      onValidate,
      value: valueProp,
      defaultValue = "",
      onChange,
      onComplete,
      disabled,
      autoFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useControllableValue<string>({
      value: valueProp,
      defaultValue,
      onChange,
    })

    const { validationOpts, validationError } = useSyncStringFieldValidation(value, {
      validate,
      required: false,
      minLength: typeof validate === "boolean" && validate ? length : undefined,
      maxLength: length,
      errorMessage,
      onValidate,
    })

    const showError = errorMessage ?? validationError
    const invalid = Boolean(showError)

    // `useId()` must run every render — never behind `??`, which would skip the
    // hook whenever `id` is supplied and change the hook count between renders.
    const generatedId = React.useId()
    const rootId = id ?? generatedId

    return (
      <FieldLayout label={label} htmlFor={rootId} size={size} errorMessage={showError}>
        <OTPInput
          ref={ref}
          id={rootId}
          data-slot="input-otp"
          maxLength={length}
          value={value}
          onChange={setValue}
          onComplete={onComplete}
          disabled={disabled}
          autoFocus={autoFocus}
          pattern={REGEXP_ONLY_DIGITS}
          inputMode="numeric"
          autoComplete="one-time-code"
          containerClassName={cn("flex gap-2", className)}
          onBlur={fieldControlBlurHandler(validationOpts, onBlur, onValidate)}
          {...props}
          render={({ slots }) => (
            <>
              {slots.map((slot, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative flex w-10 items-center justify-center rounded-control-md border font-mono tabular-nums",
                    fieldSurfaceVariants({ control: "input", size, variant, invalid }),
                    slot.isActive && cn("ring-2 ring-ring ring-offset-2", ringOffsetBackground)
                  )}
                >
                  <span className="text-foreground">
                    {mask && slot.char ? "•" : slot.char}
                    {slot.hasFakeCaret ? (
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="h-4 w-px animate-pulse bg-foreground duration-slow" />
                      </span>
                    ) : null}
                  </span>
                </div>
              ))}
            </>
          )}
        />
      </FieldLayout>
    )
  }
)

InputOTP.displayName = "InputOTP"
