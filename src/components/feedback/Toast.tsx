import * as React from "react"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { FeedbackBody } from "./feedbackBody"
import { feedbackSurfaceVariants, type FeedbackSurfaceVariantProps } from "./feedbackSurfaceVariants"

export const toastVariants = feedbackSurfaceVariants(
  "pointer-events-auto relative flex w-full max-w-sm gap-3 rounded-surface-md border p-4 shadow-lg",
  { tone: "neutral", variant: "solid" }
)

export type ToastTone = NonNullable<FeedbackSurfaceVariantProps["tone"]>
export type ToastVariant = NonNullable<FeedbackSurfaceVariantProps["variant"]>

export type ToastAction = {
  label: string
  onClick?: () => void
}

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children">,
    FeedbackSurfaceVariantProps {
  title?: React.ReactNode
  description?: React.ReactNode
  /**
   * Auto-dismiss delay in ms.
   *
   * **Only `Toaster` reads this.** It is part of the queue record (`toast()`
   * defaults it to 5000) and `Toaster` owns the timer that calls
   * `dismissToast`. A standalone `<Toast duration={1000} />` rendered outside
   * `Toaster` does nothing with it — the component has no timer of its own,
   * deliberately, so the queue stays the single owner of toast lifetime. Drive
   * a standalone toast's lifetime from the parent instead.
   */
  duration?: number
  action?: ToastAction
  left?: React.ReactNode
  dismissible?: boolean
  onClose?: () => void
  className?: string
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      tone,
      variant,
      title,
      description,
      action,
      left,
      dismissible = true,
      onClose,
      // Destructured only so it never reaches the DOM as an unknown attribute
      // when `Toaster` spreads a whole queue record in. See the JSDoc above.
      duration: _duration,
      className,
      role = "status",
      ...props
    },
    ref
  ) => (
    <div ref={ref} role={role} className={cn(toastVariants({ tone, variant }), className)} {...props}>
      {/* Body layout shared with Alert — see feedback/feedbackBody.tsx. */}
      <FeedbackBody
        left={left}
        title={title}
        description={description}
        footer={
          action ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-0 text-current hover:bg-transparent"
              label={action.label}
              onClick={action.onClick}
            />
          ) : null
        }
        onDismiss={dismissible && onClose ? onClose : undefined}
      />
    </div>
  )
)

Toast.displayName = "Toast"
