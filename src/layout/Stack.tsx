"use client"

import * as React from "react"
import { cn } from "../utils"
import { Box } from "./Box"

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column"
  spacing?: "none" | "sm" | "md" | "lg"
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around"
}

export function Stack({
  className,
  direction = "column",
  spacing = "md",
  align,
  justify,
  ...props
}: StackProps) {
  return (
    <Box
      data-slot="stack"
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        spacing === "sm" && (direction === "row" ? "gap-2" : "space-y-2"),
        spacing === "md" && (direction === "row" ? "gap-4" : "space-y-4"),
        spacing === "lg" && (direction === "row" ? "gap-6" : "space-y-6"),
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        align === "stretch" && "items-stretch",
        justify === "start" && "justify-start",
        justify === "center" && "justify-center",
        justify === "end" && "justify-end",
        justify === "between" && "justify-between",
        justify === "around" && "justify-around",
        className
      )}
      {...props}
    />
  )
}
