"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../molecules/Collapsible"
import { cn } from "../utils"
import { ChevronDownIcon } from "lucide-react"

export interface CollapsiblePanelProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function CollapsiblePanel({
  title,
  children,
  defaultOpen = false,
  className,
}: CollapsiblePanelProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn("border rounded-lg", className)}
    >
      <CollapsibleTrigger
        data-slot="collapsible-panel-trigger"
        className="flex w-full items-center justify-between p-4"
      >
        <span className="font-medium">{title}</span>
        <ChevronDownIcon
          className={cn(
            "size-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent data-slot="collapsible-panel-content" className="p-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
