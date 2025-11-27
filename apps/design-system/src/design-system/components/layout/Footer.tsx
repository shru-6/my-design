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

export function FooterShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Footer</h4>
        <Footer className="p-4">
          <div className="text-center text-sm text-muted-foreground">© 2024 Design System</div>
        </Footer>
      </div>
    </div>
  )
}

