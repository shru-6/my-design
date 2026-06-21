import * as React from "react"
import { cn } from "../../utils"
import { Card } from "../layout/Card"
import { Text } from "../data-display/Text"

export interface AuthLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  logo?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function AuthLayout({ title, subtitle, logo, footer, children, className, ...props }: AuthLayoutProps) {
  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-muted/30 p-4", className)} {...props}>
      <Card className="w-full max-w-md p-6 shadow-sm">
        <div className="mb-6 space-y-2 text-center">
          {logo ? <div className="mb-2 flex justify-center">{logo}</div> : null}
          {title ? (
            <Text as="div" size="xl" weight="semibold">
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text as="p" size="sm" variant="muted">
              {subtitle}
            </Text>
          ) : null}
        </div>
        <div className="space-y-4">{children}</div>
        {footer ? (
          <div className="mt-6 border-t border-border pt-4 text-center text-sm text-muted-foreground">{footer}</div>
        ) : null}
      </Card>
    </div>
  )
}

AuthLayout.displayName = "AuthLayout"
