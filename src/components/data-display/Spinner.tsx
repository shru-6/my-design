import * as React from "react"
import { cn } from "../../utils"
import { textVariants } from "./Text"

export type SpinnerSize = "xs" | "sm" | "md" | "lg"

const sizeClass: Record<SpinnerSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

export interface SpinnerProps extends Omit<React.SVGProps<SVGSVGElement>, "children"> {
  size?: SpinnerSize
  className?: string
  label?: string
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = "md", className, label = "Loading", ...props }, ref) => (
    <svg
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(textVariants({ variant: "muted" }), "animate-spin", sizeClass[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
      />
    </svg>
  )
)

Spinner.displayName = "Spinner"
