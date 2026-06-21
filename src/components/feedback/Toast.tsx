import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Text } from "../data-display/Text"
import { Icon } from "../utilities/Icon"
import { feedbackSurfaceVariants, type FeedbackSurfaceVariantProps } from "./feedbackSurfaceVariants"

export const toastVariants = feedbackSurfaceVariants(
  "pointer-events-auto relative flex w-full max-w-sm gap-3 rounded-lg border p-4 shadow-lg",
  { tone: "neutral", variant: "solid" }
)

export type ToastTone = NonNullable<FeedbackSurfaceVariantProps["tone"]>
export type ToastVariant = NonNullable<FeedbackSurfaceVariantProps["variant"]>

export type ToastAction = {
  label: string
  onClick?: () => void
}

export interface ToastProps extends FeedbackSurfaceVariantProps {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  duration?: number
  action?: ToastAction
  left?: React.ReactNode
  dismissible?: boolean
  onClose?: () => void
  className?: string
}

export function Toast({
  tone,
  variant,
  title,
  description,
  action,
  left,
  dismissible = true,
  onClose,
  className,
}: ToastProps) {
  return (
    <div role="status" className={cn(toastVariants({ tone, variant }), className)}>
      {left ? (
        <span className="shrink-0 pt-0.5">
          <Icon node={left} size="md" />
        </span>
      ) : null}
      <div className="min-w-0 flex-1 flex flex-col gap-1 pr-6">
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
        {action ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto px-0 text-current hover:bg-transparent"
            label={action.label}
            onClick={action.onClick}
          />
        ) : null}
      </div>
      {dismissible && onClose ? (
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Dismiss"
          className="absolute right-2 top-2 h-8 w-8 shrink-0 text-current"
          onClick={onClose}
          left={<X className="h-4 w-4" />}
        />
      ) : null}
    </div>
  )
}

Toast.displayName = "Toast"
