import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { disabledControl } from "./fieldPieces"
import { ControlErrorMessage, ControlLabelStack } from "./fieldPieces"

const radioVariants = cva(
  `inline-flex items-center justify-center rounded-full border border-border bg-background transition-colors ${disabledControl}`,
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
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const radioId = id ?? generatedId
    const resolvedDefault = defaultState ?? defaultChecked
    const [internalChecked, setInternalChecked] = React.useState(Boolean(checked ?? resolvedDefault))
    const isControlled = checked !== undefined && onChange != null
    const resolvedChecked = isControlled ? checked : internalChecked

    return (
      <div className="space-y-1">
        <label htmlFor={radioId} className="flex items-start gap-2">
          <span className={cn(radioVariants({ size, selected: resolvedChecked }), className)}>
            <input
              ref={ref}
              id={radioId}
              type="radio"
              className="sr-only"
              checked={isControlled ? checked : undefined}
              defaultChecked={isControlled ? resolvedDefault : checked ?? resolvedDefault}
              onChange={(event) => {
                if (!isControlled) {
                  setInternalChecked(event.target.checked)
                }
                onChange?.(event.target.checked)
              }}
              {...props}
            />
            {resolvedChecked ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
          </span>
          <ControlLabelStack label={label} description={description} />
        </label>
        <ControlErrorMessage message={errorMessage} />
      </div>
    )
  }
)

Radio.displayName = "Radio"
