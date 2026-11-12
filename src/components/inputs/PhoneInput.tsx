import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { Dropdown, type DropdownProps } from "../navigation/Dropdown"
import { FieldLayout, disabledSurfaceStyles } from "./fieldPieces"
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

/**
 * The shell owns the field chrome (border, background, focus ring); the inner
 * TextInput stays `ghost` so the two never paint the same border twice. This is
 * where the public `variant` prop lands.
 */
const phoneShellVariants = cva(
  "flex w-full items-stretch overflow-hidden focus-within:ring-2 focus-within:ring-ring",
  {
    variants: {
      variant: {
        outline: "rounded-control-md border border-border bg-background shadow-sm",
        filled: "rounded-control-md border border-transparent bg-muted",
        ghost: "rounded-control-md border border-transparent bg-transparent",
        // Arbitrary zero rather than the flat Tailwind scale's zero utility:
        // that scale is banned, and an underline field is an explicit "no
        // shape" anyway, not a themeable radius.
        underline: "rounded-[0] border-0 border-b border-border",
      },
    },
    defaultVariants: { variant: "outline" },
  }
)

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

export const PhoneInput = React.forwardRef<HTMLDivElement, PhoneInputProps>(
  (
    {
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
    },
    ref
  ) => {
    const allowed = React.useMemo(() => {
      if (!allowedCountries?.length) return PHONE_COUNTRIES
      return PHONE_COUNTRIES.filter((c) => allowedCountries.includes(c.code))
    }, [allowedCountries])

    const initial = normalizePhoneValue(
      defaultValue ?? toPhoneValue(findCountry(defaultCountry), ""),
      allowed
    )
    const [rawValue, setValue] = useControllableValue<PhoneValue>({
      value,
      defaultValue: initial,
      onChange,
    })
    const resolved = normalizePhoneValue(rawValue, allowed)
    const country = React.useMemo(
      () => allowed.find((c) => c.code === resolved.countryCode) ?? findCountry(resolved.countryCode),
      [allowed, resolved.countryCode]
    )

    const emit = (nextCountry: PhoneCountry, nextNumber: string) => {
      setValue(toPhoneValue(nextCountry, nextNumber))
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
      <div ref={ref} className={cn("w-full", disabled && disabledSurfaceStyles, className)} {...rest}>
        <FieldLayout label={label} required={required} errorMessage={errorMessage}>
          <div className={phoneShellVariants({ variant })}>
            <Dropdown
              items={countryItems}
              triggerProps={{
                label: `${country.code} · ${country.dial}`,
                variant: "ghost",
                size,
                className: "shrink-0 rounded-[0] border-0 border-r border-border",
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
)

PhoneInput.displayName = "PhoneInput"
