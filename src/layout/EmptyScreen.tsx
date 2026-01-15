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
import { AlertCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const emptyScreenVariants = cva(
  "py-12",
  {
    variants: {
      variant: {
        default: "",
        minimal: "py-6",
        spacious: "py-16",
        error: "py-12",
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
  const errorIcon = variant === "error" ? (
    icon || <AlertCircleIcon className="size-12 text-destructive" />
  ) : icon

  return (
    <Empty 
      className={cn(
        emptyScreenVariants({ variant, size }), 
        variant === "error" && "text-destructive",
        className
      )} 
      data-slot="empty-screen"
    >
      {errorIcon && <EmptyContent>{errorIcon}</EmptyContent>}
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <div className="mt-4">{action}</div>}
    </Empty>
  )
}
