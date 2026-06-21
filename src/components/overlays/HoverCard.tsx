import * as React from "react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Icon } from "../utilities/Icon"
import { Popover, type PopoverPlacement, type PopoverProps } from "./Popover"
import { useControllableOpen } from "./useControllableOpen"

export type HoverCardTriggerProps = {
  label?: React.ReactNode
  left?: React.ReactNode
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  className?: string
}

export interface HoverCardProps extends Omit<PopoverProps, "triggerProps" | "trigger" | "closeOnOutsideClick"> {
  triggerProps?: HoverCardTriggerProps
  trigger?: React.ReactNode
  openDelay?: number
  closeDelay?: number
  placement?: PopoverPlacement
}

export function HoverCard({
  open: openProp,
  defaultOpen,
  onOpenChange,
  triggerProps,
  trigger,
  openDelay = 200,
  closeDelay = 100,
  placement = "bottom",
  offset,
  className,
  cardProps,
  children,
  ...rest
}: HoverCardProps) {
  const { label = "Hover", left, variant = "ghost", size = "md", className: triggerClassName } = triggerProps ?? {}
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const openTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
  }

  const scheduleOpen = () => {
    clearTimers()
    openTimer.current = setTimeout(() => setOpen(true), openDelay)
  }

  const scheduleClose = () => {
    clearTimers()
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay)
  }

  React.useEffect(() => clearTimers, [])

  const hoverHandlers = {
    onMouseEnter: scheduleOpen,
    onMouseLeave: scheduleClose,
    onFocus: scheduleOpen,
    onBlur: scheduleClose,
  }

  const resolvedTrigger = trigger ? (
    <span className="inline-flex" {...hoverHandlers}>
      {trigger}
    </span>
  ) : (
    <Button variant={variant} size={size} className={triggerClassName} {...hoverHandlers}>
      {left ? <Icon node={left} size="sm" /> : null}
      {label}
    </Button>
  )

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={resolvedTrigger}
      openOnClick={false}
      closeOnOutsideClick={false}
      placement={placement}
      offset={offset}
      className={cn(className)}
      cardProps={cardProps}
      {...rest}
    >
      <div {...hoverHandlers}>{children}</div>
    </Popover>
  )
}

HoverCard.displayName = "HoverCard"
