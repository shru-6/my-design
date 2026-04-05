import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { disabledControl } from "./fieldPieces"
import { ControlErrorMessage, ControlLabelStack } from "./fieldPieces"

const switchVariants = cva(
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

const thumbVariants = cva(
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

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "onCheckedChange" | "onChange">,
    VariantProps<typeof switchVariants> {
  default?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: string
  onChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
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
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const switchId = id ?? generatedId
    const isControlled = checked !== undefined && onChange != null
    const resolvedDefault = defaultState ?? defaultChecked
    return (
      <div className="space-y-1">
        <label htmlFor={switchId} className="flex items-start gap-2">
          <SwitchPrimitive.Root
            ref={ref}
            id={switchId}
            className={cn(switchVariants({ size }), className)}
            checked={isControlled ? checked : undefined}
            defaultChecked={isControlled ? resolvedDefault : checked ?? resolvedDefault}
            onCheckedChange={(next) => onChange?.(next)}
            {...props}
          >
            <SwitchPrimitive.Thumb className={thumbVariants({ size })} />
          </SwitchPrimitive.Root>
          <ControlLabelStack label={label} description={description} />
        </label>
        <ControlErrorMessage message={errorMessage} />
      </div>
    )
  }
)

Switch.displayName = "Switch"
