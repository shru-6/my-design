"use client"

import * as React from "react"
import { cn } from "../utils"
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown 
} from "lucide-react"
import { Button } from "../atoms/Button"

export interface CollapsiblePanelProps {
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
  position?: "left" | "right" | "top" | "bottom"
  defaultOpen?: boolean
  minWidth?: string
  minHeight?: string
  keyword?: string
  className?: string
  triggerClassName?: string
  onToggle?: (isOpen: boolean) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CollapsiblePanel({
  children,
  direction = "horizontal",
  position = "right",
  defaultOpen = true,
  minWidth = "w-80",
  minHeight = "h-full",
  keyword = "",
  className,
  triggerClassName,
  onToggle,
  open: openProp,
  onOpenChange,
}: CollapsiblePanelProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  
  const isControlled = openProp !== undefined
  const isOpen = isControlled ? openProp : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen?.(newState)
    onToggle?.(newState)
  }

  const getCollapseClasses = () => {
    if (direction === "horizontal") {
      return isOpen ? minWidth : "w-0"
    } else {
      return isOpen ? minHeight : "h-0"
    }
  }

  const getTriggerIcon = () => {
    if (direction === "horizontal") {
      if (position === "left") {
        return isOpen ? ChevronLeft : ChevronRight
      } else {
        return isOpen ? ChevronRight : ChevronLeft
      }
    } else {
      if (position === "top") {
        return isOpen ? ChevronUp : ChevronDown
      } else {
        return isOpen ? ChevronDown : ChevronUp
      }
    }
  }

  const getTriggerPosition = () => {
    if (direction === "horizontal") {
      if (position === "left") {
        return isOpen
          ? "absolute -right-3 top-1/2 -translate-y-1/2"
          : "absolute -right-6 top-1/2 -translate-y-1/2"
      } else {
        return isOpen
          ? "absolute -left-3 top-1/2 -translate-y-1/2"
          : "absolute -left-6 top-1/2 -translate-y-1/2"
      }
    } else {
      if (position === "top") {
        return isOpen
          ? "absolute -bottom-3 left-1/2 -translate-x-1/2"
          : "absolute -bottom-6 left-1/2 -translate-x-1/2"
      } else {
        return isOpen
          ? "absolute -top-3 left-1/2 -translate-x-1/2"
          : "absolute -top-6 left-1/2 -translate-x-1/2"
      }
    }
  }

  const TriggerIcon = getTriggerIcon()

  return (
    <div
      className={cn(
        "relative transition-all duration-300 ease-in-out",
        getCollapseClasses(),
        className
      )}
    >
      {/* Panel Content */}
      {isOpen && (
        <div
          className={cn(
            "h-full transition-opacity duration-300",
            direction === "horizontal" ? minWidth : "w-full"
          )}
        >
          {children}
        </div>
      )}

      {/* Trigger Button */}
      <Button
        variant="ghost"
        onClick={handleToggle}
        className={cn(
          getTriggerPosition(),
          "w-6 h-6 p-0 bg-muted border border-border rounded-full",
          "flex items-center justify-center text-foreground hover:bg-accent",
          "transition-colors shadow-lg hover:scale-110 z-50",
          "min-w-0", // Override Button's min-width
          triggerClassName
        )}
        title={`${isOpen ? "Collapse" : "Expand"} ${keyword || "panel"}`}
        data-slot="collapsible-panel-trigger"
      >
        <TriggerIcon className="w-3 h-3" />
      </Button>
    </div>
  )
}
