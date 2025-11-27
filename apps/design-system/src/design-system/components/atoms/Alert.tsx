import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { InfoIcon, AlertCircleIcon } from "lucide-react"

import { cn } from "../utils"

const alertVariantsConfig = {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive:
        "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
    },
  },
  defaultVariants: {
    variant: "default" as const,
  },
} as const

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  alertVariantsConfig
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }

export function AlertShowcase() {
  const variants = Object.keys(alertVariantsConfig.variants.variant) as Array<keyof typeof alertVariantsConfig.variants.variant>
  const variantIcons = {
    default: InfoIcon,
    destructive: AlertCircleIcon,
  }
  const variantTitles = {
    default: "Heads up!",
    destructive: "Error",
  }
  const variantDescriptions = {
    default: "You can add components to your app using the cli.",
    destructive: "Your session has expired. Please log in again.",
  }
  
  return (
    <div className="space-y-6 max-w-md">
      {variants.map((variant) => {
        const Icon = variantIcons[variant]
        return (
          <div key={variant}>
            <h4 className="text-sm font-medium mb-3">
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Alert
            </h4>
            <Alert variant={variant}>
              <Icon />
              <AlertTitle>{variantTitles[variant]}</AlertTitle>
              <AlertDescription>
                {variantDescriptions[variant]}
              </AlertDescription>
            </Alert>
          </div>
        )
      })}
    </div>
  )
}

