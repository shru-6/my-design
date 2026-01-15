"use client"

import * as React from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./Resizable"
import { cn } from "../utils"

export interface ResizeContainerProps {
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
  className?: string
  maxWidth?: string | number
  maxHeight?: string | number
  containerClassName?: string
  contentClassName?: string
  padding?: number
  minScale?: number
  maxScale?: number
  fit?: "contain" | "cover" | "fill"
  showControls?: boolean
}

export function ResizeContainer({
  children,
  direction = "horizontal",
  className,
  maxWidth,
  maxHeight,
  containerClassName,
  contentClassName,
  padding,
  minScale,
  maxScale,
  fit = "contain",
  showControls,
}: ResizeContainerProps) {
  const childArray = React.Children.toArray(children)

  const containerStyle: React.CSSProperties = {}
  if (maxWidth) {
    containerStyle.maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth
  }
  if (maxHeight) {
    containerStyle.maxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
  }

  const contentStyle: React.CSSProperties = {}
  if (padding !== undefined) {
    contentStyle.padding = `${padding}px`
  }
  if (minScale !== undefined || maxScale !== undefined || fit) {
    contentStyle.transformOrigin = "top left"
    if (fit === "contain" || fit === "cover") {
      contentStyle.objectFit = fit
    }
  }

  return (
    <div
      className={cn("relative", containerClassName)}
      style={containerStyle}
      data-slot="resize-container-wrapper"
    >
      <ResizablePanelGroup
        direction={direction}
        className={cn("w-full", className)}
        data-slot="resize-container"
      >
        {childArray.map((child, index) => (
          <React.Fragment key={index}>
            <ResizablePanel defaultSize={50}>
              <div
                className={cn("w-full h-full", contentClassName)}
                style={contentStyle}
              >
                {child}
              </div>
            </ResizablePanel>
            {index < childArray.length - 1 && <ResizableHandle />}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
      {showControls && (
        <div className="absolute bottom-2 right-2 flex gap-2" data-slot="resize-controls">
          {/* Controls can be added here if needed */}
        </div>
      )}
    </div>
  )
}
