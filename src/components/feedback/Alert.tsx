import * as React from "react"
import { cn } from "../../utils"
import { FeedbackBody } from "./feedbackBody"
import { feedbackSurfaceVariants, type FeedbackSurfaceVariantProps } from "./feedbackSurfaceVariants"

const alertVariants = feedbackSurfaceVariants("relative flex w-full gap-3 rounded-surface-md border p-4", {
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

    const handleDismiss = React.useCallback(() => {
      setDismissed(true)
      onClose?.()
    }, [onClose])

    if (dismissed) {
      return null
    }

    return (
      <div ref={ref} role={role} className={cn(alertVariants({ tone, variant }), className)} {...props}>
        {/* Body layout shared with Toast — see feedback/feedbackBody.tsx. */}
        <FeedbackBody
          left={left}
          title={title}
          description={description}
          footer={action ? <div className="pt-2">{action}</div> : null}
          onDismiss={dismissible ? handleDismiss : undefined}
        >
          {children}
        </FeedbackBody>
      </div>
    )
  }
)

Alert.displayName = "Alert"
export { alertVariants }
