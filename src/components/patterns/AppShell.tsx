import * as React from "react"
import { cn } from "../../utils"

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function AppShell({ sidebar, header, footer, children, className, ...props }: AppShellProps) {
  return (
    <div className={cn("flex h-full min-h-0 w-full max-w-full overflow-hidden bg-background", className)} {...props}>
      {sidebar ? <div className="flex h-full min-h-0 shrink-0 flex-col">{sidebar}</div> : null}
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
        {header ? <div className="shrink-0">{header}</div> : null}
        <main className="relative min-h-0 flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        {footer ? <div className="shrink-0">{footer}</div> : null}
      </div>
    </div>
  )
}

AppShell.displayName = "AppShell"
