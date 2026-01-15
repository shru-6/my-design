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
  description?: string
  badge?: React.ReactNode
  actions?: React.ReactNode[]
  left?: React.ReactNode
  right?: React.ReactNode
}

export function Header({
  className,
  sticky = false,
  variant,
  heading,
  caption,
  description,
  badge,
  actions,
  left,
  right,
  children,
  ...props
}: HeaderProps) {
  const actionsContent = actions && actions.length > 0 ? actions : right

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
      {heading || caption || description || left || actionsContent || badge ? (
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {left}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {heading && <h1 className="text-lg font-semibold">{heading}</h1>}
                {badge}
              </div>
              {caption && <p className="text-sm text-muted-foreground">{caption}</p>}
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
          </div>
          {actionsContent && (
            <div className="flex items-center gap-2">
              {actionsContent}
            </div>
          )}
        </div>
      ) : (
        children
      )}
    </Box>
  )
}
