import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { disabledControl, disabledSurfaceStyles } from "./fieldPieces"
import { ControlErrorMessage, ControlLabelStack } from "./fieldPieces"

const radioVariants = cva(
  `inline-flex items-center justify-center rounded-pill border border-border bg-background transition-colors ${disabledControl}`,
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      selected: {
        true: "border-primary",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
    },
  }
)

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange">,
    VariantProps<typeof radioVariants> {
  default?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: string
  onChange?: (checked: boolean) => void
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size,
      checked,
      default: defaultState,
      defaultChecked,
      onChange,
      className,
      id,
      label,
      description,
      errorMessage,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const radioId = id ?? generatedId
    const [resolvedChecked, setChecked] = useControllableValue<boolean>({
      value: checked === undefined ? undefined : Boolean(checked),
      defaultValue: Boolean(defaultState ?? defaultChecked),
      onChange,
    })

    return (
      <div className="space-y-1">
        <label
          htmlFor={radioId}
          className={cn("flex items-start gap-2", disabled && disabledSurfaceStyles)}
        >
          <span className={cn(radioVariants({ size, selected: resolvedChecked }), className)}>
            <input
              ref={ref}
              id={radioId}
              type="radio"
              className="sr-only"
              checked={resolvedChecked}
              onChange={(event) => setChecked(event.target.checked)}
              {...props}
              disabled={disabled}
            />
            {resolvedChecked ? <span className="h-2 w-2 rounded-pill bg-primary" /> : null}
          </span>
          <ControlLabelStack label={label} description={description} />
        </label>
        <ControlErrorMessage message={errorMessage} />
      </div>
    )
  }
)

Radio.displayName = "Radio"
