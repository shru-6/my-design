import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { disabledControl, peerFocusRing, ringOffsetBackground } from "./fieldPieces"
import { ControlErrorMessage, ControlLabelStack } from "./fieldPieces"

const checkboxVariants = cva(
  `inline-flex items-center justify-center rounded border border-border bg-background text-primary ${ringOffsetBackground} transition-colors ${disabledControl}`,
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

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange" | "defaultChecked">,
    VariantProps<typeof checkboxVariants> {
  default?: boolean
  indeterminate?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: string
  onChange?: (checked: boolean) => void
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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
      indeterminate,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const checkboxId = id ?? generatedId
    const isControlled = checked !== undefined && onChange != null
    const resolvedDefault = Boolean(defaultState ?? checked)
    const [internalChecked, setInternalChecked] = React.useState(resolvedDefault)
    const resolvedChecked = isControlled ? Boolean(checked) : internalChecked
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate)
      }
    }, [indeterminate])

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    return (
      <div className="space-y-1">
        <div className="flex items-start gap-2">
          <label htmlFor={checkboxId} className="inline-flex shrink-0 cursor-pointer">
            <input
              ref={inputRef}
              id={checkboxId}
              type="checkbox"
              className="peer sr-only"
              checked={isControlled ? Boolean(checked) : undefined}
              defaultChecked={isControlled ? undefined : resolvedDefault}
              onChange={(event) => {
                if (!isControlled) {
                  setInternalChecked(event.target.checked)
                }
                onChange?.(event.target.checked)
              }}
              {...props}
            />
            <span
              aria-hidden="true"
              className={cn(
                checkboxVariants({ size }),
                peerFocusRing,
                resolvedChecked && "border-primary bg-primary text-primary-foreground",
                className
              )}
            >
              {indeterminate || resolvedChecked ? (
                <span className="text-[11px] leading-none">{indeterminate ? "−" : "✓"}</span>
              ) : null}
            </span>
          </label>
          <ControlLabelStack as="label" htmlFor={checkboxId} label={label} description={description} />
        </div>
        <ControlErrorMessage message={errorMessage} />
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"
