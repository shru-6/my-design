"use client"

import * as React from "react"
import { cn } from "../utils"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../atoms/Empty"
import { cva, type VariantProps } from "class-variance-authority"

const emptyScreenVariants = cva(
  "py-12",
  {
    variants: {
      variant: {
        default: "",
        minimal: "py-6",
        spacious: "py-16",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface EmptyScreenProps 
  extends VariantProps<typeof emptyScreenVariants> {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function EmptyScreen({
  title = "No items",
  description,
  icon,
  action,
  variant,
  size,
  className,
}: EmptyScreenProps) {
  return (
    <Empty 
      className={cn(emptyScreenVariants({ variant, size }), className)} 
      data-slot="empty-screen"
    >
      {icon && <EmptyContent>{icon}</EmptyContent>}
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <div className="mt-4">{action}</div>}
    </Empty>
  )
}
