import * as React from "react"
import { ChevronDown } from "lucide-react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import {
  FieldLayout,
  fieldSurfaceVariants,
  disabledControl,
  focusRing,
  focusRingOffset,
  ringOffsetBackground,
} from "./fieldPieces"
import { Icon } from "../utilities/Icon"

export interface SelectOption {
  label: React.ReactNode
  value: string
  disabled?: boolean
  group?: string
  /** When this option is selected, replaces the field-level `left` adornment (if set). */
  left?: React.ReactNode
}

export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<"select">, "size"> {
  items: SelectOption[]
  /** Leading adornment (same behavior as TextInput `left` — keyword strings resolve via Icon). */
  left?: React.ReactNode
  placeholder?: string
  label?: React.ReactNode
  errorMessage?: string
  required?: boolean
  size?: VariantProps<typeof fieldSurfaceVariants>["size"]
  variant?: VariantProps<typeof fieldSurfaceVariants>["variant"]
  className?: string
  /** @deprecated Native select has no separate popover; kept for API compatibility (no-op). */
  contentClassName?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

function optionText(label: React.ReactNode): string {
  if (typeof label === "string" || typeof label === "number") return String(label)
  return ""
}

function hasAdornment(node: React.ReactNode | undefined): boolean {
  if (node == null || node === false) return false
  if (typeof node === "string") return node.trim().length > 0
  return true
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      items,
      left,
      placeholder = "Select…",
      label,
      errorMessage,
      required,
      size = "md",
      variant = "outline",
      className,
      contentClassName: _contentClassName,
      value,
      defaultValue,
      onValueChange,
      onChange,
      disabled,
      ...selectProps
    },
    ref
  ) => {
    const generatedId = React.useId()

    const grouped = React.useMemo(() => {
      const out: { group?: string; items: SelectOption[] }[] = []
      for (const it of items) {
        const g = it.group
        const last = out[out.length - 1]
        if (last && last.group === g) {
          last.items.push(it)
        } else {
          out.push({ group: g, items: [it] })
        }
      }
      return out
    }, [items])

    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() => defaultValue ?? "")
    const currentValue = isControlled ? (value ?? "") : uncontrolledValue

    const selectedOption = React.useMemo(
      () => items.find((it) => it.value === currentValue),
      [items, currentValue]
    )

    const effectiveLeft = hasAdornment(selectedOption?.left) ? selectedOption?.left : left

    const mergedOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!isControlled) setUncontrolledValue(e.target.value)
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    return (
      <FieldLayout label={label} htmlFor={generatedId} required={required} size={size} errorMessage={errorMessage}>
        <div className="relative w-full">
          {hasAdornment(effectiveLeft) ? (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              {React.isValidElement(effectiveLeft) ? effectiveLeft : <Icon node={effectiveLeft} size="sm" variant="muted" />}
            </span>
          ) : null}
          <select
            ref={ref}
            id={generatedId}
            {...selectProps}
            aria-required={required}
            aria-invalid={Boolean(errorMessage) || undefined}
            disabled={disabled}
            {...(isControlled ? { value: value ?? "" } : { defaultValue })}
            onChange={mergedOnChange}
            className={cn(
              fieldSurfaceVariants({ control: "input", size, variant, invalid: Boolean(errorMessage) }),
              "w-full cursor-pointer appearance-none pr-9 text-left",
              hasAdornment(effectiveLeft) && "pl-10",
              focusRing,
              focusRingOffset,
              ringOffsetBackground,
              disabledControl,
              className
            )}
          >
            {placeholder ? (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            ) : null}
            {grouped.map((block, blockIndex) =>
              block.group ? (
                <optgroup key={`${block.group}-${blockIndex}`} label={block.group}>
                  {block.items.map((item) => (
                    <option key={item.value} value={item.value} disabled={item.disabled}>
                      {optionText(item.label) || item.value}
                    </option>
                  ))}
                </optgroup>
              ) : (
                block.items.map((item) => (
                  <option key={item.value} value={item.value} disabled={item.disabled}>
                    {optionText(item.label) || item.value}
                  </option>
                ))
              )
            )}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
            aria-hidden
          />
        </div>
      </FieldLayout>
    )
  }
)

Select.displayName = "Select"
