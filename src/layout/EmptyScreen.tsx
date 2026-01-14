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

export interface EmptyScreenProps {
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
  className,
}: EmptyScreenProps) {
  return (
    <Empty className={cn("py-12", className)} data-slot="empty-screen">
      {icon && <EmptyContent>{icon}</EmptyContent>}
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <div className="mt-4">{action}</div>}
    </Empty>
  )
}
