"use client"

import * as React from "react"
import { cn } from "../utils"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export function Box({
  className,
  as: Component = "div",
  ...props
}: BoxProps) {
  return (
    <Component
      data-slot="box"
      className={cn(className)}
      {...props}
    />
  )
}
