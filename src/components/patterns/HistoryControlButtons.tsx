import * as React from "react"
import { Undo2, Redo2, RotateCcw } from "lucide-react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
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
  showLabels?: boolean
  /** When false, icon-only buttons render without hover tooltips. Default true. */
  showTooltips?: boolean
  undoButtonProps?: Partial<ButtonProps>
  redoButtonProps?: Partial<ButtonProps>
  resetButtonProps?: Partial<ButtonProps>
  className?: string
}

function wrapWithTooltip(show: boolean, content: string, node: React.ReactElement) {
  if (!show) return node
  return <Tooltip content={content}>{node}</Tooltip>
}

export function HistoryControlButtons({
  canUndo = true,
  canRedo = true,
  canReset = true,
  onUndo,
  onRedo,
  onReset,
  showUndo = true,
  showRedo = true,
  showLabels = false,
  showTooltips = false,
  undoButtonProps,
  redoButtonProps,
  resetButtonProps,
  className,
  ...rest
}: HistoryControlButtonsProps) {
  return (
    <div className={cn("inline-flex items-center gap-1", className)} {...rest}>
      {showUndo
        ? wrapWithTooltip(
            showTooltips,
            "Undo",
            <Button
              variant="outline"
              size="sm"
              disabled={!canUndo}
              left={<Undo2 className="h-4 w-4" />}
              label={showLabels ? "Undo" : undefined}
              iconOnly={!showLabels}
              ariaLabel="Undo"
              onClick={onUndo}
              {...undoButtonProps}
            />
          )
        : null}
      {showRedo
        ? wrapWithTooltip(
            showTooltips,
            "Redo",
            <Button
              variant="outline"
              size="sm"
              disabled={!canRedo}
              left={<Redo2 className="h-4 w-4" />}
              label={showLabels ? "Redo" : undefined}
              iconOnly={!showLabels}
              ariaLabel="Redo"
              onClick={onRedo}
              {...redoButtonProps}
            />
          )
        : null}
      {onReset
        ? wrapWithTooltip(
            showTooltips,
            "Reset",
            <Button
              variant="ghost"
              size="sm"
              disabled={!canReset}
              left={<RotateCcw className="h-4 w-4" />}
              label={showLabels ? "Reset" : undefined}
              iconOnly={!showLabels}
              ariaLabel="Reset"
              onClick={onReset}
              {...resetButtonProps}
            />
          )
        : null}
    </div>
  )
}

HistoryControlButtons.displayName = "HistoryControlButtons"
