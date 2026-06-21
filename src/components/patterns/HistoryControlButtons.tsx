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
  undoButtonProps?: Partial<ButtonProps>
  redoButtonProps?: Partial<ButtonProps>
  resetButtonProps?: Partial<ButtonProps>
  className?: string
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
  undoButtonProps,
  redoButtonProps,
  resetButtonProps,
  className,
  ...rest
}: HistoryControlButtonsProps) {
  return (
    <div className={cn("inline-flex items-center gap-1", className)} {...rest}>
      {showUndo ? (
        <Tooltip content="Undo">
          <Button
            variant="outline"
            size="sm"
            disabled={!canUndo}
            left={<Undo2 className="h-4 w-4" />}
            label={showLabels ? "Undo" : undefined}
            iconOnly={!showLabels}
            aria-label="Undo"
            onClick={onUndo}
            {...undoButtonProps}
          />
        </Tooltip>
      ) : null}
      {showRedo ? (
        <Tooltip content="Redo">
          <Button
            variant="outline"
            size="sm"
            disabled={!canRedo}
            left={<Redo2 className="h-4 w-4" />}
            label={showLabels ? "Redo" : undefined}
            iconOnly={!showLabels}
            aria-label="Redo"
            onClick={onRedo}
            {...redoButtonProps}
          />
        </Tooltip>
      ) : null}
      {onReset ? (
        <Tooltip content="Reset">
          <Button
            variant="ghost"
            size="sm"
            disabled={!canReset}
            left={<RotateCcw className="h-4 w-4" />}
            label={showLabels ? "Reset" : undefined}
            iconOnly={!showLabels}
            aria-label="Reset"
            onClick={onReset}
            {...resetButtonProps}
          />
        </Tooltip>
      ) : null}
    </div>
  )
}

HistoryControlButtons.displayName = "HistoryControlButtons"
