import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { textVariants } from "../data-display/Text"
import { Radio, type RadioProps } from "./Radio"
import { ControlErrorMessage } from "./fieldPieces"

export interface RadioGroupItem {
  label: React.ReactNode
  value: string
  description?: React.ReactNode
  disabled?: boolean
}

const groupVariants = cva("space-y-2", {
  variants: {
    orientation: {
      horizontal: "flex flex-row flex-wrap gap-x-4 gap-y-2 space-y-0",
      vertical: "",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<"fieldset">, "onChange"> {
  items: RadioGroupItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name?: string
  required?: boolean
  disabled?: boolean
  orientation?: VariantProps<typeof groupVariants>["orientation"]
  size?: RadioProps["size"]
  errorMessage?: string
  /** Group caption; rendered as `<legend>` for fieldset accessibility. */
  heading?: React.ReactNode
  className?: string
}

export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      items,
      value,
      defaultValue,
      onChange,
      name: nameProp,
      required,
      disabled,
      orientation,
      size,
      errorMessage,
      heading,
      className,
      ...props
    },
    ref
  ) => {
    const generatedName = React.useId().replace(/:/g, "")
    const name = nameProp ?? `radio-group-${generatedName}`
    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState(defaultValue ?? "")
    const selected = isControlled ? (value ?? "") : internal

    const setValue = (next: string) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    }

    return (
      <fieldset
        ref={ref}
        className={cn(
          "space-y-2",
          disabled && "cursor-not-allowed opacity-60",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {heading ? (
          <legend className={cn(textVariants({ size: "sm", weight: "medium" }), "mb-2")}>
            {heading}
            {required ? <span className="text-destructive"> *</span> : null}
          </legend>
        ) : null}
        <div className={cn(groupVariants({ orientation }))}>
          {items.map((item) => (
            <Radio
              key={item.value}
              name={name}
              value={item.value}
              checked={selected === item.value}
              onChange={(checked) => {
                if (checked) setValue(item.value)
              }}
              label={item.label}
              description={item.description}
              disabled={disabled || item.disabled}
              size={size}
              required={required}
            />
          ))}
        </div>
        <ControlErrorMessage message={errorMessage} />
      </fieldset>
    )
  }
)

RadioGroup.displayName = "RadioGroup"
