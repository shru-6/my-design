import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Separator } from "../layout/Separator"

export const pageFooterVariants = cva("w-full", {
  variants: {
    variant: {
      default: "border-t border-border bg-background px-4 py-3",
      minimal: "px-4 py-2 text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface PageFooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageFooterVariants> {
  left?: React.ReactNode
  right?: React.ReactNode
  sticky?: boolean
  separator?: boolean
  children?: React.ReactNode
  className?: string
}

export function PageFooter({
  left,
  right,
  sticky,
  separator,
  variant,
  className,
  children,
  ...props
}: PageFooterProps) {
  return (
    <footer
      className={cn(
        pageFooterVariants({ variant }),
        sticky && "sticky bottom-0 z-sticky bg-background/95 backdrop-blur",
        className
      )}
      {...props}
    >
      {separator ? <Separator className="mb-3" /> : null}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        {left ? <div className="min-w-0">{left}</div> : null}
        {children ? <div className="min-w-0 flex-1">{children}</div> : null}
        {right ? <div className="ml-auto shrink-0">{right}</div> : null}
      </div>
    </footer>
  )
}

PageFooter.displayName = "PageFooter"
