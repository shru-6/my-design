"use client"

import * as React from "react"
import { cn } from "../utils"
import { Box } from "./Box"
import { cva, type VariantProps } from "class-variance-authority"

const headerVariants = cva(
  "w-full bg-background",
  {
    variants: {
      variant: {
        default: "border-b",
        bordered: "border-b-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface HeaderProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  sticky?: boolean
  heading?: string
  caption?: string
  left?: React.ReactNode
  right?: React.ReactNode
}

export function Header({
  className,
  sticky = false,
  variant,
  heading,
  caption,
  left,
  right,
  children,
  ...props
}: HeaderProps) {
  return (
    <Box
      as="header"
      data-slot="header"
      className={cn(
        headerVariants({ variant }),
        sticky && "sticky top-0 z-50",
        className
      )}
      {...props}
    >
      {heading || caption || left || right ? (
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {left}
            <div>
              {heading && <h1 className="text-lg font-semibold">{heading}</h1>}
              {caption && <p className="text-sm text-muted-foreground">{caption}</p>}
            </div>
          </div>
          {right}
        </div>
      ) : (
        children
      )}
    </Box>
  )
}
