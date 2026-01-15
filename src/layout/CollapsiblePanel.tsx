"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../molecules/Collapsible"
import { cn } from "../utils"
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, ChevronLeftIcon } from "lucide-react"

export interface CollapsiblePanelProps {
  title?: string
  label?: string
  keyword?: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  direction?: "horizontal" | "vertical"
  triggerPosition?: "left" | "right" | "top" | "bottom"
  minWidth?: string | number
  minHeight?: string | number
  triggerClassName?: string
  contentClassName?: string
  customTrigger?: React.ReactNode
}

export function CollapsiblePanel({
  title,
  label,
  keyword,
  children,
  defaultOpen = false,
  className,
  direction = "vertical",
  triggerPosition = "top",
  minWidth,
  minHeight,
  triggerClassName,
  contentClassName,
  customTrigger,
}: CollapsiblePanelProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  const displayText = title || label || keyword || ""

  // Determine icon based on direction and position
  const getIcon = () => {
    if (direction === "horizontal") {
      return open ? ChevronLeftIcon : ChevronRightIcon
    }
    // vertical
    if (triggerPosition === "bottom") {
      return open ? ChevronUpIcon : ChevronDownIcon
    }
    // top (default)
    return open ? ChevronDownIcon : ChevronDownIcon
  }

  const Icon = getIcon()

  // Trigger position classes
  const triggerPositionClasses = {
    top: "flex-col",
    bottom: "flex-col-reverse",
    left: "flex-row",
    right: "flex-row-reverse",
  }

  const containerClasses = cn(
    "border rounded-lg",
    direction === "horizontal" && "flex",
    direction === "vertical" && "flex flex-col",
    className
  )

  const triggerClasses = cn(
    "flex items-center justify-between p-4 transition-colors hover:bg-muted/50",
    triggerPositionClasses[triggerPosition],
    triggerClassName
  )

  const contentClasses = cn(
    direction === "horizontal" && "flex-1",
    contentClassName
  )

  const style: React.CSSProperties = {}
  if (minWidth) {
    style.minWidth = typeof minWidth === "number" ? `${minWidth}px` : minWidth
  }
  if (minHeight) {
    style.minHeight = typeof minHeight === "number" ? `${minHeight}px` : minHeight
  }

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={containerClasses}
      style={style}
    >
      {customTrigger ? (
        <CollapsibleTrigger asChild>
          {customTrigger}
        </CollapsibleTrigger>
      ) : (
        <CollapsibleTrigger
          data-slot="collapsible-panel-trigger"
          className={triggerClasses}
        >
          <span className="font-medium">{displayText}</span>
          <Icon
            className={cn(
              "size-4 transition-transform",
              open && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
      )}
      <CollapsibleContent 
        data-slot="collapsible-panel-content" 
        className={cn("p-4", contentClasses)}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
