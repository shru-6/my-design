export type PhoneCountry = {
  code: string
  label: string
  dial: string
}

/** Phone field value — `dialCode` is derived via {@link getPhoneDialCode}, not stored on the value. */
export type PhoneValue = {
  countryCode: string
  number: string
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: "US", label: "United States", dial: "+1" },
  { code: "CA", label: "Canada", dial: "+1" },
  { code: "GB", label: "United Kingdom", dial: "+44" },
  { code: "IN", label: "India", dial: "+91" },
  { code: "AU", label: "Australia", dial: "+61" },
  { code: "DE", label: "Germany", dial: "+49" },
  { code: "FR", label: "France", dial: "+33" },
  { code: "JP", label: "Japan", dial: "+81" },
  { code: "BR", label: "Brazil", dial: "+55" },
  { code: "MX", label: "Mexico", dial: "+52" },
]

export function findCountry(code: string): PhoneCountry {
  return PHONE_COUNTRIES.find((c) => c.code === code) ?? PHONE_COUNTRIES[0]
}

export function getPhoneDialCode(
  countryCode: string,
  allowed: PhoneCountry[] = PHONE_COUNTRIES
): string {
  const country = allowed.find((c) => c.code === countryCode) ?? findCountry(countryCode)
  return country.dial
}

export function toPhoneValue(country: PhoneCountry, number: string): PhoneValue {
  return {
    countryCode: country.code,
    number: number.replace(/\D/g, ""),
  }
}

export function phoneValueToString(value: PhoneValue): string {
  const country = findCountry(value.countryCode)
  return formatPhoneValue(country, value.number)
}

export function normalizePhoneValue(
  input: PhoneValue | string | undefined,
  allowed: PhoneCountry[] = PHONE_COUNTRIES
): PhoneValue {
  if (!input) return toPhoneValue(allowed[0], "")
  if (typeof input === "string") {
    const parsed = splitPhoneValue(input, allowed)
    return toPhoneValue(parsed.country, parsed.number)
  }
  const legacy = input as PhoneValue & { dialCode?: string }
  const country =
    allowed.find((c) => c.code === legacy.countryCode) ?? findCountry(legacy.countryCode)
  return {
    countryCode: country.code,
    number: legacy.number.replace(/\D/g, ""),
  }
}

export function formatPhoneValue(country: PhoneCountry, number: string): string {
  const digits = number.replace(/\D/g, "")
  return digits ? `${country.dial}${digits}` : ""
}

export function splitPhoneValue(
  value: string,
  allowed: PhoneCountry[] = PHONE_COUNTRIES,
  preferredCountryCode?: string
): { country: PhoneCountry; number: string } {
  const trimmed = value.trim()
  if (!trimmed) {
    const preferred = preferredCountryCode
      ? allowed.find((c) => c.code === preferredCountryCode)
      : undefined
    return { country: preferred ?? allowed[0], number: "" }
  }
  const match = [...allowed].sort((a, b) => b.dial.length - a.dial.length).find((c) => trimmed.startsWith(c.dial))
  if (!match) {
    const preferred = preferredCountryCode
      ? allowed.find((c) => c.code === preferredCountryCode)
      : undefined
    return { country: preferred ?? allowed[0], number: trimmed.replace(/\D/g, "") }
  }
  if (match.dial === "+1" && preferredCountryCode) {
    const preferred = allowed.find((c) => c.code === preferredCountryCode)
    if (preferred) {
      return { country: preferred, number: trimmed.slice(match.dial.length).replace(/\D/g, "") }
    }
  }
  return { country: match, number: trimmed.slice(match.dial.length).replace(/\D/g, "") }
}
