"use client"

import { Button } from "../atoms/Button"
import { UndoIcon, RedoIcon, RotateCcwIcon } from "lucide-react"
import { cn } from "../utils"

export interface HistoryControlButtonsProps {
  canUndo?: boolean
  canRedo?: boolean
  isDirty?: boolean
  onUndo?: () => void
  onRedo?: () => void
  onReset?: () => void
  className?: string
  showLabels?: boolean
}

/**
 * History Control Buttons - Undo/Redo/Reset controls
 * 
 * Provides undo, redo, and reset functionality for application state.
 * State management should be handled by the parent component.
 */
export function HistoryControlButtons({
  canUndo = false,
  canRedo = false,
  isDirty = false,
  onUndo,
  onRedo,
  onReset,
  className,
  showLabels = false,
}: HistoryControlButtonsProps) {
  return (
    <div
      data-slot="history-control-buttons"
      className={cn("flex items-center gap-1", className)}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onUndo}
        disabled={!canUndo || !onUndo}
        title="Undo (Ctrl+Z)"
      >
        <UndoIcon className="size-4" />
        {showLabels && (
          <span className="sr-only ml-2">Undo</span>
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRedo}
        disabled={!canRedo || !onRedo}
        title="Redo (Ctrl+Shift+Z)"
      >
        <RedoIcon className="size-4" />
        {showLabels && (
          <span className="sr-only ml-2">Redo</span>
        )}
      </Button>
      {onReset && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          disabled={!isDirty}
          title="Reset changes"
        >
          <RotateCcwIcon className="size-4" />
          {showLabels && (
            <span className="sr-only ml-2">Reset</span>
          )}
        </Button>
      )}
    </div>
  )
}
