import * as React from "react"
import { Button, type ButtonProps } from "./Button"
import { Tooltip } from "../overlays/Tooltip"

export interface CopyButtonProps extends Omit<ButtonProps, "onClick" | "children" | "onCopy" | "label"> {
  /** Text or value copied to the clipboard. */
  value: string
  /** Fired after a successful clipboard write. */
  onValueCopy?: (value: string) => void
  onCopyError?: (error: unknown) => void
  /** Shown on the button before copy / when reset. */
  copyLabel?: React.ReactNode
  /** Shown on the button briefly after a successful copy. */
  copiedLabel?: React.ReactNode
  /** How long to show `copiedLabel` on the button (ms). */
  timeout?: number
  /** Wraps the button in a `Tooltip` when true. */
  tooltip?: boolean
  /** Tooltip body when idle; defaults to `copyLabel`. */
  tooltipLabel?: React.ReactNode
  /** Tooltip body after copy; defaults to `copiedLabel`. */
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
      copyLabel = "Copy",
      copiedLabel = "Copied!",
      timeout = 2000,
      tooltip = true,
      tooltipLabel,
      tooltipCopiedLabel,
      tooltipContent,
      children,
      disabled,
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

    const button = (
      <Button ref={ref} onClick={handleCopy} disabled={disabled} {...buttonProps}>
        {children ?? (copied ? copiedLabel : copyLabel)}
      </Button>
    )

    if (!tooltip) return button

    const idleTooltip = tooltipLabel ?? tooltipContent ?? copyLabel
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
