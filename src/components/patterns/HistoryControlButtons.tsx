import * as React from "react"
import { Undo2, Redo2, RotateCcw } from "lucide-react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { IconButton } from "../actions/IconButton"
import { Stack } from "../layout/Stack"
import { Tooltip } from "../overlays/Tooltip"

export interface HistoryControlButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  canUndo?: boolean
  canRedo?: boolean
  canReset?: boolean
  onUndo?: () => void
  onRedo?: () => void
  onReset?: () => void
  /** When false, hides the undo control (e.g. reset-only toolbar). Default true. */
  showUndo?: boolean
  /** When false, hides the redo control. Default true. */
  showRedo?: boolean
  /** Render visible text labels next to each icon instead of icon-only controls. Default false. */
  showLabels?: boolean
  /** When false, icon-only buttons render without hover tooltips. Default true. */
  showTooltips?: boolean
  undoButtonProps?: Partial<ButtonProps>
  redoButtonProps?: Partial<ButtonProps>
  resetButtonProps?: Partial<ButtonProps>
  className?: string
}

type HistoryControl = {
  key: "undo" | "redo" | "reset"
  label: string
  icon: React.ReactNode
  variant: ButtonProps["variant"]
  disabled: boolean
  onClick?: () => void
  overrides?: Partial<ButtonProps>
}

export const HistoryControlButtons = React.forwardRef<HTMLDivElement, HistoryControlButtonsProps>(
  function HistoryControlButtons(
    {
      canUndo = true,
      canRedo = true,
      canReset = true,
      onUndo,
      onRedo,
      onReset,
      showUndo = true,
      showRedo = true,
      showLabels = false,
      showTooltips = true,
      undoButtonProps,
      redoButtonProps,
      resetButtonProps,
      className,
      children: _ignoredChildren,
      ...rest
    },
    ref
  ) {
    const controls: HistoryControl[] = [
      showUndo
        ? {
            key: "undo" as const,
            label: "Undo",
            icon: <Undo2 />,
            variant: "outline" as const,
            disabled: !canUndo,
            onClick: onUndo,
            overrides: undoButtonProps,
          }
        : null,
      showRedo
        ? {
            key: "redo" as const,
            label: "Redo",
            icon: <Redo2 />,
            variant: "outline" as const,
            disabled: !canRedo,
            onClick: onRedo,
            overrides: redoButtonProps,
          }
        : null,
      onReset
        ? {
            key: "reset" as const,
            label: "Reset",
            icon: <RotateCcw />,
            variant: "ghost" as const,
            disabled: !canReset,
            onClick: onReset,
            overrides: resetButtonProps,
          }
        : null,
    ].filter(Boolean) as HistoryControl[]

    // One render path for all three controls — they only differ by icon, label,
    // variant and handler. `showLabels` picks Button (visible text) vs the
    // shared internal IconButton (icon-only).
    const renderControl = (control: HistoryControl) => {
      const {
        label: overrideLabel,
        left: overrideIcon,
        right: _right,
        children: _children,
        href: _href,
        iconOnly: _iconOnly,
        ariaLabel: overrideAriaLabel,
        ...overrides
      } = control.overrides ?? {}

      const icon = overrideIcon ?? control.icon
      const ariaLabel = overrideAriaLabel ?? overrideLabel ?? control.label

      const node = showLabels ? (
        <Button
          variant={control.variant}
          size="sm"
          disabled={control.disabled}
          left={icon}
          label={overrideLabel ?? control.label}
          ariaLabel={ariaLabel}
          onClick={control.onClick}
          {...overrides}
        />
      ) : (
        <IconButton
          variant={control.variant}
          size="sm"
          disabled={control.disabled}
          icon={icon}
          ariaLabel={ariaLabel}
          onClick={control.onClick}
          {...overrides}
        />
      )

      // A labelled control names itself; only the icon-only form needs the tip.
      if (!showTooltips || showLabels) return node
      return <Tooltip content={ariaLabel}>{node}</Tooltip>
    }

    return (
      <Stack
        ref={ref as React.ForwardedRef<HTMLElement>}
        direction="row"
        gap="sm"
        align="center"
        className={cn("inline-flex", className)}
        items={controls}
        getItemKey={(control) => control.key}
        renderItem={renderControl}
        {...rest}
      />
    )
  }
)

HistoryControlButtons.displayName = "HistoryControlButtons"
