"use client"

import { Button } from "../atoms/Button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export interface HistoryControlButtonsProps {
  className?: string
}

export function HistoryControlButtons({
  className,
}: HistoryControlButtonsProps) {
  const router = useRouter()

  return (
    <div
      data-slot="history-control-buttons"
      className={className}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        title="Go back"
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.forward()}
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

