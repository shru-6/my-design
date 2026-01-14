"use client"

import * as React from "react"
import { cn } from "../utils"
import { Box } from "./Box"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean
}

export function Header({
  className,
  sticky = false,
  ...props
}: HeaderProps) {
  return (
    <Box
      as="header"
      data-slot="header"
      className={cn(
        "w-full border-b bg-background",
        sticky && "sticky top-0 z-50",
        className
      )}
      {...props}
    />
  )
}
