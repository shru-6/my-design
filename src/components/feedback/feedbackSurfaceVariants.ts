import { cva } from "class-variance-authority"

const toneCompoundVariants = [
  { tone: "neutral" as const, variant: "solid" as const, class: "border-transparent bg-muted text-foreground" },
  { tone: "neutral" as const, variant: "outline" as const, class: "border-border" },
  { tone: "info" as const, variant: "solid" as const, class: "border-transparent bg-info text-info-foreground" },
  { tone: "info" as const, variant: "subtle" as const, class: "border-info/30 bg-info/10 text-info" },
  { tone: "info" as const, variant: "outline" as const, class: "border-info/40 text-info" },
  { tone: "success" as const, variant: "solid" as const, class: "border-transparent bg-success text-success-foreground" },
  { tone: "success" as const, variant: "subtle" as const, class: "border-success/30 bg-success/10 text-success" },
  { tone: "success" as const, variant: "outline" as const, class: "border-success/40 text-success" },
  { tone: "warning" as const, variant: "solid" as const, class: "border-transparent bg-warning text-warning-foreground" },
  { tone: "warning" as const, variant: "subtle" as const, class: "border-warning/30 bg-warning/10 text-warning" },
  { tone: "warning" as const, variant: "outline" as const, class: "border-warning/40 text-warning" },
  { tone: "danger" as const, variant: "solid" as const, class: "border-transparent bg-destructive text-destructive-foreground" },
  { tone: "danger" as const, variant: "subtle" as const, class: "border-destructive/30 bg-destructive/10 text-destructive" },
  { tone: "danger" as const, variant: "outline" as const, class: "border-destructive/40 text-destructive" },
]

const feedbackVariantOptions = {
  tone: {
    neutral: "",
    info: "",
    success: "",
    warning: "",
    danger: "",
  },
  variant: {
    solid: "",
    subtle: "bg-muted/40",
    outline: "bg-background",
  },
} as const

export type FeedbackTone = keyof typeof feedbackVariantOptions.tone
export type FeedbackVariant = keyof typeof feedbackVariantOptions.variant

export function feedbackSurfaceVariants(
  base: string,
  defaultVariants: { tone: FeedbackTone; variant: FeedbackVariant }
) {
  return cva(base, {
    variants: feedbackVariantOptions,
    compoundVariants: toneCompoundVariants,
    defaultVariants,
  })
}

export type FeedbackSurfaceVariantProps = {
  tone?: FeedbackTone
  variant?: FeedbackVariant
}
