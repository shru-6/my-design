"use client"

import * as React from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./Resizable"
import { cn } from "../utils"

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
