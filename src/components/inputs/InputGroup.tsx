import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Spinner } from "../data-display/Spinner"
import { Button, type ButtonProps } from "../actions/Button"
import { Icon } from "../utilities/Icon"
import { fieldSurfaceVariants, disabledControl } from "./fieldPieces"

function isNonEmptyLead(node: React.ReactNode): boolean {
  if (node == null || node === false) return false
  if (typeof node === "string") return node.trim().length > 0
  if (Array.isArray(node)) return node.some((n) => isNonEmptyLead(n))
  return true
}

type Ctx = {
  attached: boolean
  vertical: boolean
  size: VariantProps<typeof fieldSurfaceVariants>["size"]
  variant: VariantProps<typeof fieldSurfaceVariants>["variant"]
  disabled: boolean
  invalid: boolean
  left?: React.ReactNode
  placeholder?: string
}

const InputGroupContext = React.createContext<Ctx | null>(null)

function useInputGroupContext(): Ctx | null {
  return React.useContext(InputGroupContext)
}

export interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  invalid?: boolean
  orientation?: "horizontal" | "vertical"
  /** Merge outer border and radii across direct controls (horizontal only). */
  attached?: boolean
  size?: VariantProps<typeof fieldSurfaceVariants>["size"]
  variant?: VariantProps<typeof fieldSurfaceVariants>["variant"]
  /** Leading icon/slot rendered inside `InputGroupInput` (pill shell when set, attached horizontal). */
  left?: React.ReactNode
  /** Default `placeholder` for nested `InputGroupInput` when the input omits one. */
  placeholder?: string
  className?: string
}

export function InputGroup({
  children,
  disabled = false,
  loading,
  invalid = false,
  orientation = "horizontal",
  attached = true,
  size = "md",
  variant = "outline",
  left,
  placeholder,
  className,
  ...props
}: InputGroupProps) {
  const vertical = orientation === "vertical"
  const ctx = React.useMemo<Ctx>(
    () => ({
      attached: attached && !vertical,
      vertical,
      size,
      variant,
      disabled,
      invalid,
      left,
      placeholder,
    }),
    [attached, vertical, size, variant, disabled, invalid, left, placeholder]
  )

  const pillShell = isNonEmptyLead(ctx.left) && ctx.attached && !vertical

  return (
    <InputGroupContext.Provider value={ctx}>
      <div
        data-slot="input-group"
        data-invalid={invalid || undefined}
        className={cn(
          "relative flex w-full",
          vertical ? "flex-col gap-2" : "flex-row flex-wrap items-stretch",
          !vertical &&
            ctx.attached &&
            cn(
              "overflow-hidden border bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background [&>*+*]:border-l [&>*+*]:border-border",
              pillShell ? "rounded-full" : "rounded-md",
              invalid ? "border-destructive focus-within:ring-destructive" : "border-border"
            ),
          disabled && "pointer-events-none opacity-60",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
            <Spinner size="sm" />
          </span>
        ) : null}
        {children}
      </div>
    </InputGroupContext.Provider>
  )
}

InputGroup.displayName = "InputGroup"

export interface InputGroupInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof fieldSurfaceVariants> {}

export const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  (
    {
      className,
      size: sizeProp,
      variant: variantProp,
      invalid: invalidProp,
      disabled,
      placeholder: placeholderProp,
      ...props
    },
    ref
  ) => {
    const ctx = useInputGroupContext()
    const attached = ctx?.attached ?? false
    const vertical = ctx?.vertical ?? false
    const size = sizeProp ?? ctx?.size ?? "md"
    const variant = variantProp ?? ctx?.variant ?? "outline"
    const invalid = Boolean(invalidProp ?? ctx?.invalid)
    const groupDisabled = ctx?.disabled ?? false
    const resolvedPlaceholder = placeholderProp ?? ctx?.placeholder
    const shellLead = isNonEmptyLead(ctx?.left)
    const lead = ctx?.left

    const inGroupShell = attached && !vertical

    const inputEl = (
      <input
        ref={ref}
        disabled={disabled || groupDisabled}
        placeholder={resolvedPlaceholder}
        className={cn(
          fieldSurfaceVariants({
            control: "input",
            size,
            variant,
            invalid,
          }),
          !inGroupShell && "w-full",
          inGroupShell &&
            cn(
              "min-w-0 flex-1 rounded-none border-0 bg-transparent shadow-none",
              "focus-visible:z-[1] focus-visible:ring-0 focus-visible:ring-offset-0",
              disabledControl
            ),
          inGroupShell && "rounded-none",
          shellLead && "pl-9",
          className
        )}
        {...props}
      />
    )

    if (!shellLead) {
      return inputEl
    }

    return (
      <div
        className={cn(
          "relative min-w-0",
          inGroupShell ? "flex-1" : "w-full"
        )}
      >
        <span
          className="pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 text-muted-foreground"
          aria-hidden
        >
          <Icon node={lead} size="sm" variant="muted" />
        </span>
        {inputEl}
      </div>
    )
  }
)

InputGroupInput.displayName = "InputGroupInput"

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function InputGroupAddon({ className, children, ...props }: InputGroupAddonProps) {
  const ctx = useInputGroupContext()
  const inShell = ctx?.attached && !ctx.vertical

  return (
    <span
      role="presentation"
      className={cn(
        "inline-flex shrink-0 items-center bg-muted/40 px-3 text-sm text-muted-foreground",
        inShell ? "rounded-none" : "rounded-md border border-border",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

InputGroupAddon.displayName = "InputGroupAddon"

export type InputGroupButtonProps = ButtonProps

/** Outline-style trigger sized for horizontal attached groups. */
export const InputGroupButton = React.forwardRef<HTMLButtonElement, InputGroupButtonProps>(
  ({ className, variant = "outline", size = "md", disabled, ...props }, ref) => {
    const ctx = useInputGroupContext()
    const inShell = ctx?.attached && !ctx.vertical
    const groupDisabled = ctx?.disabled ?? false

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || groupDisabled}
        className={cn(
          inShell && "shrink-0 rounded-none border-y-0 border-r-0 border-l border-border shadow-none",
          inShell && size === "sm" && "h-8",
          inShell && size === "md" && "h-10",
          inShell && size === "lg" && "h-11",
          className
        )}
        {...props}
      />
    )
  }
)

InputGroupButton.displayName = "InputGroupButton"
