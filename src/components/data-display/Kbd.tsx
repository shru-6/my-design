import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const kbdVariants = cva(
  "inline-flex items-center rounded border border-border bg-muted font-mono text-muted-foreground shadow-sm",
  {
    variants: {
      size: {
        sm: "h-5 px-1.5 text-[10px]",
        md: "h-6 px-2 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ size, className, children, ...props }, ref) => (
  <kbd ref={ref} className={cn(kbdVariants({ size }), className)} {...props}>
    {children}
  </kbd>
))

Kbd.displayName = "Kbd"

export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("inline-flex items-center gap-1", className)} {...props} />
))

KbdGroup.displayName = "KbdGroup"
