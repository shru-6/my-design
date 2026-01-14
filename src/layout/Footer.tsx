"use client"

import * as React from "react"
import { cn } from "../utils"
import { Box } from "./Box"

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export function Footer({
  className,
  ...props
}: FooterProps) {
  return (
    <Box
      as="footer"
      data-slot="footer"
      className={cn(
        "w-full border-t bg-background",
        className
      )}
      {...props}
    />
  )
}
