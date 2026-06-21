import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { disabledControl } from "./fieldPieces"
import { ControlErrorMessage, ControlLabelStack } from "./fieldPieces"

export const toggleVariants = cva(
  `peer inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-colors ${disabledControl} data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:border-border`,
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const toggleThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0.5",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role" | "size">,
    VariantProps<typeof toggleVariants> {
  default?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: string
  onChange?: (checked: boolean) => void
  checked?: boolean
  defaultChecked?: boolean
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      size,
      label,
      description,
      errorMessage,
      className,
      onChange,
      id,
      checked,
      default: defaultState,
      defaultChecked,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const toggleId = id ?? generatedId
    const resolvedDefault = defaultState ?? defaultChecked ?? false
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState(() => Boolean(resolvedDefault))
    const on = isControlled ? Boolean(checked) : internalChecked
    const readOnly = isControlled && !onChange

    return (
      <div className="space-y-1">
        <label htmlFor={toggleId} className="flex items-start gap-2">
          <button
            ref={ref}
            type="button"
            role="switch"
            id={toggleId}
            aria-checked={on}
            disabled={disabled}
            data-state={on ? "checked" : "unchecked"}
            className={cn(toggleVariants({ size }), className)}
            onClick={(e) => {
              onClick?.(e)
              if (readOnly || disabled) return
              const next = !on
              if (!isControlled) setInternalChecked(next)
              onChange?.(next)
            }}
            {...props}
          >
            <span data-state={on ? "checked" : "unchecked"} className={toggleThumbVariants({ size })} />
          </button>
          <ControlLabelStack label={label} description={description} />
        </label>
        <ControlErrorMessage message={errorMessage} />
      </div>
    )
  }
)

Toggle.displayName = "Toggle"
