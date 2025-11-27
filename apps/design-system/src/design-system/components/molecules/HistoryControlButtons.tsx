"use client"

import { Button } from "../atoms/Button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export interface HistoryControlButtonsProps {
  className?: string
}

/**
 * History Control Buttons - Library-compatible version
 * 
 * Uses browser history API instead of Next.js router for library compatibility.
 * For Next.js apps, you can use next/navigation's useRouter directly.
 */
export function HistoryControlButtons({
  className,
}: HistoryControlButtonsProps) {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back()
    }
  }

  const handleForward = () => {
    if (typeof window !== "undefined") {
      window.history.forward()
    }
  }

  return (
    <div
      data-slot="history-control-buttons"
      className={className}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBack}
        title="Go back"
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleForward}
        title="Go forward"
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  )
}

export function HistoryControlButtonsShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">History Control Buttons</h4>
        <HistoryControlButtons />
      </div>
    </div>
  )
}

