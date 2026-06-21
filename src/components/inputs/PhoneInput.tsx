import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Dropdown, type DropdownProps } from "../navigation/Dropdown"
import { FieldLayout } from "./fieldPieces"
import { fieldSurfaceVariants } from "./fieldPieces"
import { TextInput, type TextInputProps } from "./TextInput"
import {
  findCountry,
  normalizePhoneValue,
  PHONE_COUNTRIES,
  toPhoneValue,
  type PhoneCountry,
  type PhoneValue,
} from "./phoneCountries"

export type { PhoneValue } from "./phoneCountries"
export { getPhoneDialCode } from "./phoneCountries"

export interface PhoneInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: PhoneValue
  defaultValue?: PhoneValue
  onChange?: (value: PhoneValue) => void
  defaultCountry?: string
  allowedCountries?: string[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  label?: React.ReactNode
  errorMessage?: string
  validate?: boolean | ((value: PhoneValue) => string | undefined)
  onValidate?: (isValid: boolean, error?: string) => void
  size?: VariantProps<typeof fieldSurfaceVariants>["size"]
  variant?: VariantProps<typeof fieldSurfaceVariants>["variant"]
  inputProps?: Partial<TextInputProps>
  dropdownProps?: Partial<DropdownProps>
  className?: string
}

export function PhoneInput({
  value,
  defaultValue,
  onChange,
  defaultCountry = "US",
  allowedCountries,
  placeholder = "Phone number",
  disabled,
  required,
  label,
  errorMessage,
  validate,
  onValidate,
  size = "md",
  variant = "outline",
  inputProps,
  dropdownProps,
  className,
  ...rest
}: PhoneInputProps) {
  const allowed = React.useMemo(() => {
    if (!allowedCountries?.length) return PHONE_COUNTRIES
    return PHONE_COUNTRIES.filter((c) => allowedCountries.includes(c.code))
  }, [allowedCountries])

  const initial = normalizePhoneValue(
    defaultValue ?? toPhoneValue(findCountry(defaultCountry), ""),
    allowed
  )
  const [internal, setInternal] = React.useState<PhoneValue>(initial)

  const isControlled = value !== undefined
  const resolved = normalizePhoneValue(isControlled ? value : internal, allowed)
  const country = React.useMemo(
    () => allowed.find((c) => c.code === resolved.countryCode) ?? findCountry(resolved.countryCode),
    [allowed, resolved.countryCode]
  )

  const emit = (nextCountry: PhoneCountry, nextNumber: string) => {
    const next = toPhoneValue(nextCountry, nextNumber)
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const validateString =
    validate === undefined
      ? undefined
      : typeof validate === "function"
        ? (raw: string) => validate(normalizePhoneValue({ ...resolved, number: raw }, allowed))
        : validate

  const countryItems = allowed.map((c) => ({
    label: `${c.label} (${c.dial})`,
    value: c.code,
    onClick: () => emit(c, resolved.number),
  }))

  return (
    <div className={cn("w-full", disabled && "pointer-events-none opacity-50", className)} {...rest}>
      <FieldLayout label={label} required={required} errorMessage={errorMessage}>
        <div className="flex w-full items-stretch overflow-hidden rounded-md border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring">
          <Dropdown
            items={countryItems}
            triggerProps={{
              label: `${country.code} · ${country.dial}`,
              variant: "ghost",
              size,
              className: "shrink-0 rounded-none border-0 border-r border-border",
            }}
            {...dropdownProps}
          />
          <div className="min-w-0 flex-1">
            <TextInput
              required={required}
              size={size}
              variant="ghost"
              disabled={disabled}
              placeholder={placeholder}
              value={resolved.number}
              validate={validateString}
              onValidate={onValidate}
              inputMode="tel"
              autoComplete="tel-national"
              className="border-0 shadow-none focus-visible:ring-0"
              onChange={(e) => {
                const next = e.target.value.replace(/[^\d\s()-]/g, "")
                emit(country, next)
              }}
              {...inputProps}
            />
          </div>
        </div>
      </FieldLayout>
    </div>
  )
}

PhoneInput.displayName = "PhoneInput"
