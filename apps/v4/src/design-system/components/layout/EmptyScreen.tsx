"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "../atoms/Empty"
import { Button } from "../atoms/Button"
import { PackageIcon } from "lucide-react"

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

export function EmptyScreenShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Empty Screen</h4>
        <EmptyScreen
          title="No items found"
          description="Get started by creating your first item"
          icon={<PackageIcon className="size-12 text-muted-foreground" />}
          action={<Button>Create Item</Button>}
        />
      </div>
    </div>
  )
}

