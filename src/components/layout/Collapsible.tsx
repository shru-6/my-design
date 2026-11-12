import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { useControllableOpen } from "../overlays/useControllableOpen"

export interface CollapsibleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Primary control label or node. */
  trigger: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  /** Optional footer below the collapsible region. */
  footer?: React.ReactNode
  /** Top border above revealed content. */
  showContentDivider?: boolean
  className?: string
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
  {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    trigger,
    children,
    disabled,
    footer,
    showContentDivider = true,
    className,
    ...props
  },
  ref
) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })

  return (
    <div ref={ref} data-slot="collapsible" data-state={open ? "open" : "closed"} className={cn("w-full", className)} {...props}>
      <Button
        variant="ghost"
        disabled={disabled}
        aria-expanded={open}
        className="h-auto w-full gap-2 px-2 py-2 text-left font-medium"
        onClick={() => setOpen(!open)}
        right={
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-fast",
              open && "rotate-90"
            )}
            aria-hidden
          />
        }
      >
        <span className="min-w-0 flex-1 truncate text-left">{trigger}</span>
      </Button>
      {open ? (
        <div className={cn("px-2 py-2 text-sm", showContentDivider && "border-t border-border")}>{children}</div>
      ) : null}
      {footer ? <div className="text-sm text-muted-foreground">{footer}</div> : null}
    </div>
  )
})

Collapsible.displayName = "Collapsible"
