import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Text, type TextProps, textVariants } from "./Text"

const pillSurfaceVariants = cva("", {
  variants: {
    appearance: {
      solid: "",
      subtle: "",
      outline: "",
      ghost: "",
    },
    size: {
      sm: "h-5 px-2",
      md: "h-6 px-2.5",
    },
    tone: {
      neutral: "",
      info: "",
      success: "",
      warning: "",
      danger: "",
    },
    shape: {
      rounded: "rounded-md",
      pill: "rounded-full",
    },
    selected: {
      true: "ring-2 ring-primary/40",
      false: "",
    },
  },
  compoundVariants: [
    { appearance: "solid", tone: "neutral", class: "border border-foreground bg-foreground text-background" },
    { appearance: "subtle", tone: "neutral", class: "border border-border bg-muted text-foreground" },
    { appearance: "outline", tone: "neutral", class: "border border-border text-foreground" },
    { appearance: "ghost", tone: "neutral", class: "text-foreground" },
    { appearance: "solid", tone: "info", class: "border border-info bg-info text-info-foreground" },
    { appearance: "subtle", tone: "info", class: "border border-info/30 bg-info/15 text-info" },
    { appearance: "outline", tone: "info", class: "border border-info/50 text-info" },
    { appearance: "ghost", tone: "info", class: "text-info" },
    { appearance: "solid", tone: "success", class: "border border-success bg-success text-success-foreground" },
    { appearance: "subtle", tone: "success", class: "border border-success/30 bg-success/15 text-success" },
    { appearance: "outline", tone: "success", class: "border border-success/50 text-success" },
    { appearance: "ghost", tone: "success", class: "text-success" },
    { appearance: "solid", tone: "warning", class: "border border-warning bg-warning text-warning-foreground" },
    { appearance: "subtle", tone: "warning", class: "border border-warning/30 bg-warning/20 text-warning" },
    { appearance: "outline", tone: "warning", class: "border border-warning/50 text-warning" },
    { appearance: "ghost", tone: "warning", class: "text-warning" },
    { appearance: "solid", tone: "danger", class: "border border-destructive bg-destructive text-destructive-foreground" },
    { appearance: "subtle", tone: "danger", class: "border border-destructive/30 bg-destructive/15 text-destructive" },
    { appearance: "outline", tone: "danger", class: "border border-destructive/50 text-destructive" },
    { appearance: "ghost", tone: "danger", class: "text-destructive" },
  ],
  defaultVariants: {
    appearance: "subtle",
    size: "md",
    tone: "neutral",
    shape: "pill",
    selected: false,
  },
})

const pillTextSize: Record<NonNullable<VariantProps<typeof pillSurfaceVariants>["size"]>, TextProps["size"]> = {
  sm: "xs",
  md: "sm",
}

export interface PillProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    VariantProps<typeof pillSurfaceVariants> {
  as?: "span" | "button"
  /**
   * Typography (`Text` `variant`). Separate from `appearance`: shell uses solid/subtle/outline/ghost;
   * text uses default/muted/subtle/code/danger/outline.
   */
  variant?: VariantProps<typeof textVariants>["variant"]
  left?: React.ReactNode
  right?: React.ReactNode
  /** Renders a dismiss control (e.g. filter chips). */
  onRemove?: () => void
  dot?: boolean
  selected?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

export const Pill = React.forwardRef<HTMLElement, PillProps>(
  (
    {
      as = "span",
      appearance,
      size,
      tone,
      shape,
      selected,
      variant,
      left,
      right,
      onRemove,
      dot,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? "md"
    const removeBtn =
      onRemove && !disabled ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className={cn(
            "-mr-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
            "text-current opacity-70 hover:opacity-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          )}
          aria-label="Remove"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      ) : undefined

    const mergedRight =
      removeBtn != null || right != null ? (
        <>
          {right}
          {removeBtn}
        </>
      ) : undefined

    return (
      <Text
        ref={ref as React.ForwardedRef<HTMLElement>}
        as={as}
        className={cn(
          pillSurfaceVariants({ appearance, size, tone, shape, selected }),
          onRemove && !disabled && "pr-1",
          className
        )}
        variant={variant ?? "default"}
        size={pillTextSize[resolvedSize]}
        weight="medium"
        left={left}
        right={mergedRight}
        disabled={disabled}
        {...props}
      >
        {dot ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" /> : null}
        {children}
      </Text>
    )
  }
)

Pill.displayName = "Pill"

/** @deprecated Use `Pill`; kept for compatibility. */
export const Badge = React.forwardRef<HTMLElement, PillProps>(function Badge(props, ref) {
  return <Pill ref={ref} {...props} />
})
Badge.displayName = "Badge"

export type TagSurfaceVariant = "solid" | "subtle" | "outline"

export interface TagProps
  extends Omit<PillProps, "children" | "appearance" | "as" | "right" | "variant"> {
  label: React.ReactNode
  /** Maps to Pill `appearance` (solid / subtle / outline). */
  variant?: TagSurfaceVariant
}

/** @deprecated Prefer `<Pill onRemove={…}>` or plain `Pill` with `children`. */
export const Tag = React.forwardRef<HTMLElement, TagProps>(function Tag(
  { label, onRemove, variant = "subtle", left, disabled, className, ...props },
  ref
) {
  return (
    <Pill
      ref={ref}
      as="span"
      appearance={variant}
      left={left}
      onRemove={onRemove}
      disabled={disabled}
      className={className}
      {...props}
    >
      {label}
    </Pill>
  )
})
Tag.displayName = "Tag"

export { pillSurfaceVariants as pillVariants }
export { pillSurfaceVariants as badgeVariants }

export type BadgeProps = PillProps
