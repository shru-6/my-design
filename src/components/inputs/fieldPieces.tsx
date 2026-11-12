/**
 * Field UI glue: layout stack, text-control surface, validation helpers, adornments, interaction tokens.
 * Single place for shared field behavior + primitives (see docs/CSS_ARCHITECTURE.md).
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Text, textVariants } from "../data-display/Text"
import { Icon, type IconProps } from "../utilities/Icon"
import { HelperText } from "./HelperText"
import { Label, type LabelProps } from "./Label"

// --- Interaction tokens (focus + disabled; used by fields, buttons, controls) ---

export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
export const focusRingOffset = "focus-visible:ring-offset-2"
export const focusRingDestructive = "focus-visible:ring-destructive"
export const peerFocusRing =
  "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
/** Unified disabled: no pointer, dimmed, not-allowed cursor (fields, buttons, thumbs). */
export const disabledControl =
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none"

/** The visual half of a disabled state, with no selector attached. */
const disabledLook = "cursor-not-allowed opacity-60 pointer-events-none"

/**
 * `disabledControl`'s sibling for things that are NOT real form controls —
 * rows, list items, panels, chips, wrappers. A `<div>` has no `:disabled`
 * pseudo-class, so this keys off the accessible/state attributes instead:
 * set `data-disabled="true"` and/or `aria-disabled="true"` on the same element.
 * Use `disabledSurfaceStyles` when the call site already branches in JS.
 */
export const disabledSurface = [
  "data-[disabled=true]:cursor-not-allowed",
  "data-[disabled=true]:opacity-60",
  "data-[disabled=true]:pointer-events-none",
  "aria-disabled:cursor-not-allowed",
  "aria-disabled:opacity-60",
  "aria-disabled:pointer-events-none",
].join(" ")

/** Same look as `disabledSurface`, applied unconditionally — for `cond && …`. */
export const disabledSurfaceStyles = disabledLook

export const ringOffsetBackground = "ring-offset-background"

// --- String field validation (TextInput / Textarea) ---

export type StringFieldValidateOpts = {
  validate?: boolean | ((value: string) => string | undefined)
  required?: boolean
  minLength?: number
  maxLength?: number
  errorMessage?: string
}

export function getStringFieldValidationError(
  value: string,
  opts: StringFieldValidateOpts
): string | undefined {
  if (!opts.validate) return undefined
  if (typeof opts.validate === "function") return opts.validate(value)

  if (opts.required && value.trim().length === 0) return opts.errorMessage ?? "This field is required."
  if (opts.minLength != null && value.length < opts.minLength) {
    return opts.errorMessage ?? `Minimum length is ${opts.minLength}.`
  }
  if (opts.maxLength != null && value.length > opts.maxLength) {
    return opts.errorMessage ?? `Maximum length is ${opts.maxLength}.`
  }
  return undefined
}

/** Params for wired validation + `onValidate` sync (TextInput / Textarea). */
export type StringFieldControlValidationParams = {
  validate?: boolean | ((value: string) => string | undefined)
  required?: boolean
  minLength?: number
  maxLength?: number
  errorMessage?: string
  onValidate?: (isValid: boolean, error?: string) => void
}

/** Derives error, syncs `onValidate` on value/error changes, returns opts for blur. */
export function useSyncStringFieldValidation(
  value: string,
  params: StringFieldControlValidationParams
) {
  const { validate, required, minLength, maxLength, errorMessage, onValidate } = params

  const validationOpts = React.useMemo<StringFieldValidateOpts>(
    () => ({ validate, required, minLength, maxLength, errorMessage }),
    [validate, required, minLength, maxLength, errorMessage]
  )

  const validationError = React.useMemo(
    () => getStringFieldValidationError(value, validationOpts),
    [value, validationOpts]
  )

  React.useEffect(() => {
    if (validate) {
      onValidate?.(!validationError, validationError)
    }
  }, [validate, validationError, onValidate])

  return {
    validationError,
    hasError: Boolean(validationError),
    validationOpts,
  }
}

/** Composes consumer `onBlur` with blur-time `onValidate` when `validate` is enabled. */
export function fieldControlBlurHandler<E extends HTMLInputElement | HTMLTextAreaElement>(
  validationOpts: StringFieldValidateOpts,
  userOnBlur: React.FocusEventHandler<E> | undefined,
  onValidate: ((isValid: boolean, error?: string) => void) | undefined
): React.FocusEventHandler<E> {
  return (event) => {
    userOnBlur?.(event)
    if (validationOpts.validate) {
      const nextError = getStringFieldValidationError(event.currentTarget.value, validationOpts)
      onValidate?.(!nextError, nextError)
    }
  }
}

// --- Shared TextInput / Textarea chrome ---

const fieldSurfaceBase = `w-full rounded-control-md border bg-background text-foreground transition-colors placeholder:text-muted-foreground ${focusRing} ${disabledControl}`

/**
 * The one height source for anything that has to line up with a field: reads the
 * same `--control-height-*` custom properties `fieldSurfaceVariants` uses, so a
 * density theme moves buttons, addons and inputs together instead of one of them.
 */
export const controlHeightClass: Record<"sm" | "md" | "lg", string> = {
  sm: "h-[var(--control-height-sm,2rem)]",
  md: "h-[var(--control-height-md,2.5rem)]",
  lg: "h-[var(--control-height-lg,2.75rem)]",
}

/** Radius rides the size tier, the same way `Button`'s size variant does. */
export const controlRadiusClass: Record<"sm" | "md" | "lg", string> = {
  sm: "rounded-control-sm",
  md: "rounded-control-md",
  lg: "rounded-control-lg",
}

/** Sibling of `controlHeightClass` for the matching horizontal padding. */
export const controlPaddingClass: Record<"sm" | "md" | "lg", string> = {
  sm: "px-[var(--control-padding-sm,0.625rem)]",
  md: "px-[var(--control-padding-md,0.75rem)]",
  lg: "px-[var(--control-padding-lg,0.875rem)]",
}

export const fieldSurfaceVariants = cva(fieldSurfaceBase, {
  variants: {
    control: {
      input: "",
      textarea: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    variant: {
      outline: "border-border",
      filled: "border-transparent bg-muted",
      ghost: "border-transparent bg-transparent",
      // Arbitrary zero rather than the flat Tailwind scale's zero utility:
      // that scale is banned, and an underline field is an explicit "no
      // shape" anyway, not a themeable radius.
      underline: "rounded-[0] border-0 border-b border-border px-0",
    },
    invalid: {
      true: `border-destructive ${focusRingDestructive}`,
      false: "",
    },
  },
  compoundVariants: [
    {
      control: "input",
      size: "sm",
      class: `${controlHeightClass.sm} text-sm ${controlPaddingClass.sm}`,
    },
    {
      control: "input",
      size: "md",
      class: `${controlHeightClass.md} text-sm ${controlPaddingClass.md}`,
    },
    {
      control: "input",
      size: "lg",
      class: `${controlHeightClass.lg} text-base ${controlPaddingClass.lg}`,
    },
    {
      control: "textarea",
      size: "sm",
      class: `text-sm ${controlPaddingClass.sm} py-2`,
    },
    {
      control: "textarea",
      size: "md",
      class: `text-sm ${controlPaddingClass.md} py-2.5`,
    },
    {
      control: "textarea",
      size: "lg",
      class: `text-base ${controlPaddingClass.lg} py-3`,
    },
  ],
  defaultVariants: {
    control: "input",
    size: "md",
    variant: "outline",
    invalid: false,
  },
})

export type FieldSurfaceProps = VariantProps<typeof fieldSurfaceVariants>

// --- Layout: label → control → error ---

export interface FieldLayoutProps {
  className?: string
  label?: React.ReactNode
  htmlFor?: string
  required?: boolean
  size?: LabelProps["size"]
  errorMessage?: string
  children: React.ReactNode
}

export function FieldLayout({
  className,
  label,
  htmlFor,
  required,
  size,
  errorMessage,
  children,
}: FieldLayoutProps) {
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label ? (
        <Label htmlFor={htmlFor} required={required} size={size}>
          {label}
        </Label>
      ) : null}
      {children}
      <ControlErrorMessage message={errorMessage} />
    </div>
  )
}

// --- Control label / description (checkbox, radio, switch) ---

export function ControlLabelStack(props: {
  label?: React.ReactNode
  description?: React.ReactNode
  as?: "span" | "label"
  htmlFor?: string
  className?: string
}) {
  const { label, description, as: Comp = "span", htmlFor, className } = props
  if (!label && !description) return null
  return (
    <Comp htmlFor={Comp === "label" ? htmlFor : undefined} className={cn("grid gap-0.5 leading-tight", className)}>
      {label ? (
        <Text as="span" size="sm" weight="medium">
          {label}
        </Text>
      ) : null}
      {description ? (
        <Text as="span" size="xs" variant="muted">
          {description}
        </Text>
      ) : null}
    </Comp>
  )
}

export function ControlErrorMessage(props: { message?: string }) {
  const { message } = props
  if (!message) return null
  return <HelperText tone="error">{message}</HelperText>
}

const adornmentPosition: Record<"left" | "right", string> = {
  left: "absolute inset-y-0 left-0 flex items-center pl-3",
  right: "absolute inset-y-0 right-0 flex items-center pr-3",
}

export function InputAdornmentSlot(props: {
  side: "left" | "right"
  node: React.ReactNode
  iconSize?: IconProps["size"]
  /** Set true for clickable controls (e.g. clear). Icons default to non-interactive. */
  interactive?: boolean
}) {
  const { side, node, iconSize = "sm", interactive = false } = props
  return (
    <span
      className={cn(
        adornmentPosition[side],
        interactive ? "pointer-events-auto" : "pointer-events-none",
        textVariants({ variant: "muted" })
      )}
    >
      {React.isValidElement(node) ? node : <Icon node={node} size={iconSize} />}
    </span>
  )
}
