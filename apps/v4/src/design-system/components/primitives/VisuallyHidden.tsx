"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "../atoms/Button"
import { SearchIcon } from "lucide-react"

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function VisuallyHidden({
  className,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span
      data-slot="primitive-visually-hidden"
      className={cn(
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        "clip-[rect(0,0,0,0)]",
        className
      )}
      {...props}
    />
  )
}

export function VisuallyHiddenShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Visually Hidden</h4>
        <Button>
          <VisuallyHidden>Screen reader only text</VisuallyHidden>
          <SearchIcon className="size-4" />
        </Button>
        <p className="text-sm text-muted-foreground mt-2">Button above has visually hidden text for screen readers</p>
      </div>
    </div>
  )
}

