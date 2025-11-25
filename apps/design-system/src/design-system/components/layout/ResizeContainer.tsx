"use client"

import * as React from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./Resizable"
import { cn } from "@/lib/utils"

export interface ResizeContainerProps {
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
  className?: string
}

export function ResizeContainer({
  children,
  direction = "horizontal",
  className,
}: ResizeContainerProps) {
  const childArray = React.Children.toArray(children)

  return (
    <ResizablePanelGroup
      direction={direction}
      className={cn("w-full", className)}
      data-slot="resize-container"
    >
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          <ResizablePanel defaultSize={50}>
            {child}
          </ResizablePanel>
          {index < childArray.length - 1 && <ResizableHandle />}
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  )
}

export function ResizeContainerShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Resize Container</h4>
        <div className="h-64 border rounded-lg">
          <ResizeContainer direction="horizontal">
            <div className="p-4 bg-muted">Panel 1</div>
            <div className="p-4 bg-card">Panel 2</div>
          </ResizeContainer>
        </div>
      </div>
    </div>
  )
}

