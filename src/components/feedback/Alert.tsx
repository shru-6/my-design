import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Text } from "../data-display/Text"
import { Icon } from "../utilities/Icon"
import { feedbackSurfaceVariants, type FeedbackSurfaceVariantProps } from "./feedbackSurfaceVariants"

const alertVariants = feedbackSurfaceVariants("relative flex w-full gap-3 rounded-lg border p-4", {
  tone: "neutral",
  variant: "subtle",
})

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    FeedbackSurfaceVariantProps {
  title?: React.ReactNode
  description?: React.ReactNode
  left?: React.ReactNode
  action?: React.ReactNode
  dismissible?: boolean
  /** Called after the alert is dismissed (including via the close control). */
  onClose?: () => void
  className?: string
  children?: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      tone,
      variant,
      title,
      description,
      left,
      action,
      dismissible,
      onClose,
      className,
      children,
      role = "alert",
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false)

    if (dismissed) {
      return null
    }

    const handleDismiss = () => {
      setDismissed(true)
      onClose?.()
    }

    return (
      <div ref={ref} role={role} className={cn(alertVariants({ tone, variant }), className)} {...props}>
        {left ? (
          <span className="shrink-0 pt-0.5">
            <Icon node={left} size="md" />
          </span>
        ) : null}
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          {title ? (
            <Text as="div" size="sm" weight="semibold">
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text as="div" size="sm" className="text-current opacity-80">
              {description}
            </Text>
          ) : null}
          {children}
          {action ? <div className="pt-2">{action}</div> : null}
        </div>
        {dismissible ? (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Dismiss"
            className="absolute right-2 top-2 h-8 w-8 shrink-0 text-current"
            onClick={handleDismiss}
            left={<X className="h-4 w-4" />}
          />
        ) : null}
      </div>
    )
  }
)

Alert.displayName = "Alert"
export { alertVariants }
