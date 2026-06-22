import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button, type ButtonProps } from "./Button"
import { Tooltip } from "../overlays/Tooltip"

const defaultCopyIcon = <Copy className="h-4 w-4" />
const defaultCopiedIcon = <Check className="h-4 w-4" />

export interface CopyButtonProps extends Omit<ButtonProps, "onClick" | "children" | "onCopy" | "label"> {
  /** Text or value copied to the clipboard. */
  value: string
  /** Fired after a successful clipboard write. */
  onValueCopy?: (value: string) => void
  onCopyError?: (error: unknown) => void
  /** Shown on the button before copy / when reset. Omit for icon-only (uses `copyIcon`). */
  copyLabel?: React.ReactNode
  /** Shown on the button briefly after a successful copy (label mode). */
  copiedLabel?: React.ReactNode
  /** Icon before copy / when reset (icon-only mode). */
  copyIcon?: React.ReactNode
  /** Icon briefly after a successful copy (icon-only mode). */
  copiedIcon?: React.ReactNode
  /** How long to show the copied state on the button (ms). */
  timeout?: number
  /** Wraps the button in a `Tooltip` when true. */
  tooltip?: boolean
  /** Tooltip body when idle; defaults to `copyLabel` or `"Copy"`. */
  tooltipLabel?: React.ReactNode
  /** Tooltip body after copy; defaults to `copiedLabel` or `"Copied!"`. */
  tooltipCopiedLabel?: React.ReactNode
  /** @deprecated Use `tooltipLabel`. */
  tooltipContent?: React.ReactNode
  children?: React.ReactNode
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      onValueCopy,
      onCopyError,
      copyLabel,
      copiedLabel = "Copied!",
      copyIcon = defaultCopyIcon,
      copiedIcon = defaultCopiedIcon,
      timeout = 2000,
      tooltip = true,
      tooltipLabel,
      tooltipCopiedLabel,
      tooltipContent,
      children,
      disabled,
      left,
      iconOnly,
      ariaLabel,
      ...buttonProps
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)
    const timerRef = React.useRef<ReturnType<typeof setTimeout>>()

    React.useEffect(() => () => clearTimeout(timerRef.current), [])

    const handleCopy = async () => {
      if (disabled) return
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        onValueCopy?.(value)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), timeout)
      } catch (e) {
        onCopyError?.(e)
      }
    }

    const hasCustomBody = children != null
    const hasLabel = copyLabel != null
    const useIcon = !hasCustomBody && !hasLabel

    const resolvedLeft = useIcon ? (copied ? copiedIcon : copyIcon) : left
    const resolvedIconOnly = useIcon || iconOnly
    const resolvedAriaLabel =
      ariaLabel ?? (resolvedIconOnly ? (copied ? "Copied" : "Copy") : undefined)

    const button = (
      <Button
        ref={ref}
        onClick={handleCopy}
        disabled={disabled}
        left={resolvedLeft}
        iconOnly={resolvedIconOnly}
        ariaLabel={resolvedAriaLabel}
        {...buttonProps}
      >
        {hasCustomBody ? children : hasLabel ? (copied ? copiedLabel : copyLabel) : null}
      </Button>
    )

    if (!tooltip) return button

    const idleTooltip = tooltipLabel ?? tooltipContent ?? copyLabel ?? "Copy"
    const copiedTooltip = tooltipCopiedLabel ?? copiedLabel
    const content = copied ? copiedTooltip : idleTooltip

    return (
      <Tooltip content={content} disabled={disabled}>
        {button}
      </Tooltip>
    )
  }
)

CopyButton.displayName = "CopyButton"
