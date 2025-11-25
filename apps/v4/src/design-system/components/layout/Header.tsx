"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Box } from "./Box"
import { Button } from "../atoms/Button"

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

export function HeaderShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Header</h4>
        <Header className="p-4">
          <div className="flex items-center justify-between">
            <h3>Page Header</h3>
            <Button size="sm">Action</Button>
          </div>
        </Header>
      </div>
    </div>
  )
}

