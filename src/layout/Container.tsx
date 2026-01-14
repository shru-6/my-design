"use client"

import * as React from "react"
import { cn } from "../utils"
import { Box } from "./Box"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

export function Container({
  className,
  maxWidth = "xl",
  ...props
}: ContainerProps) {
  return (
    <Box
      data-slot="container"
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        maxWidth === "sm" && "max-w-screen-sm",
        maxWidth === "md" && "max-w-screen-md",
        maxWidth === "lg" && "max-w-screen-lg",
        maxWidth === "xl" && "max-w-screen-xl",
        maxWidth === "2xl" && "max-w-screen-2xl",
        maxWidth === "full" && "max-w-full",
        className
      )}
      {...props}
    />
  )
}
