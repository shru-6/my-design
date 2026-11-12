import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../utils"
import { IconButton } from "../actions/IconButton"
import { Text } from "../data-display/Text"
import { Icon } from "../utilities/Icon"

/**
 * Internal shared primitive (not exported from `src/index.ts`). Import by
 * relative path: `import { FeedbackBody } from "./feedbackBody"`.
 *
 * `feedbackSurfaceVariants.ts` already owns the *surface* (tone, variant,
 * border, background) shared by Alert and Toast. This owns the other half —
 * the body layout that was duplicated verbatim between them: leading icon
 * slot, title/description through `Text`, and the absolutely-positioned
 * dismiss control in the top-right corner.
 *
 * It renders a fragment, not a wrapper: the host supplies the flex row (see
 * `alertVariants` / `toastVariants`, both of which start `flex … gap-3`).
 */
export interface FeedbackBodyProps {
  /** Leading glyph. Wrapped in `Icon`, so a bare lucide element is fine. */
  left?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  /** Free-form content below the description. */
  children?: React.ReactNode
  /** Trailing region below the content — Alert's `action` block, Toast's action button. */
  footer?: React.ReactNode
  /**
   * Renders the dismiss control when set. Omit for a non-dismissible surface —
   * the content column drops its reserved right gutter too.
   */
  onDismiss?: () => void
  dismissLabel?: string
}

export function FeedbackBody({
  left,
  title,
  description,
  children,
  footer,
  onDismiss,
  dismissLabel = "Dismiss",
}: FeedbackBodyProps) {
  return (
    <>
      {left ? (
        <span className="shrink-0 pt-0.5">
          <Icon node={left} size="md" />
        </span>
      ) : null}
      <div className={cn("flex min-w-0 flex-1 flex-col gap-1", onDismiss && "pr-6")}>
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
        {footer}
      </div>
      {onDismiss ? (
        <IconButton
          className="absolute right-2 top-2 shrink-0 text-current"
          ariaLabel={dismissLabel}
          icon={<X className="h-4 w-4" />}
          onClick={onDismiss}
        />
      ) : null}
    </>
  )
}

FeedbackBody.displayName = "FeedbackBody"
