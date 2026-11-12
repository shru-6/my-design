import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../utils"
import { computeFloatingMenuStyle } from "../../utils/floatingPosition"
import { zLayerValue } from "../../utils/zIndex"
import { Button, type ButtonProps } from "../actions/Button"
import { Card, type CardProps } from "../layout/Card"
import { Icon } from "../utilities/Icon"
import { useControllableOpen } from "./useControllableOpen"
import { usePositionedPortal, withPortalVisibility } from "./usePositionedPortal"

export type PopoverPlacement = "top" | "bottom" | "left" | "right"

export type PopoverTriggerProps = {
  label?: React.ReactNode
  left?: React.ReactNode
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  className?: string
}

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  triggerProps?: PopoverTriggerProps
  trigger?: React.ReactNode
  /** When false, trigger click does not toggle (e.g. HoverCard). */
  openOnClick?: boolean
  closeOnOutsideClick?: boolean
  /** Escape closes the panel. Independent of `closeOnOutsideClick`. */
  closeOnEscape?: boolean
  placement?: PopoverPlacement
  offset?: number
  className?: string
  cardProps?: Omit<CardProps, "children">
  children?: React.ReactNode
}

function computePopoverStyle(
  trigger: HTMLElement,
  content: HTMLElement | null,
  placement: PopoverPlacement,
  offset: number
): React.CSSProperties {
  if (placement === "bottom") {
    return computeFloatingMenuStyle(trigger, content, {
      align: "start",
      sideOffset: offset,
      maxHeightCap: 480,
      minWidth: "auto",
    })
  }

  const rect = trigger.getBoundingClientRect()
  const base: React.CSSProperties = { position: "fixed", zIndex: zLayerValue("dropdown"), visibility: "visible" }

  switch (placement) {
    case "top": {
      const h = content?.offsetHeight ?? 0
      const style = computeFloatingMenuStyle(trigger, content, {
        align: "start",
        sideOffset: offset,
        maxHeightCap: 480,
        minWidth: "auto",
      })
      return { ...style, top: rect.top - offset - h }
    }
    case "left":
      return {
        ...base,
        left: rect.left - offset,
        top: rect.top + rect.height / 2,
        transform: "translate(-100%, -50%)",
      }
    case "right":
      return {
        ...base,
        left: rect.right + offset,
        top: rect.top + rect.height / 2,
        transform: "translateY(-50%)",
      }
    default:
      return base
  }
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    open: openProp,
    defaultOpen,
    onOpenChange,
    triggerProps,
    trigger,
    openOnClick = true,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    placement = "bottom",
    offset = 8,
    className,
    cardProps,
    children,
    ...rest
  },
  ref
) {
  const { label = "Open", left, variant = "outline", size = "md", className: triggerClassName } = triggerProps ?? {}
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })

  const triggerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [contentStyle, setContentStyle] = React.useState<React.CSSProperties>({ visibility: "hidden" })

  const updatePosition = React.useCallback(() => {
    const el = triggerRef.current
    const panel = contentRef.current
    if (!el) return
    setContentStyle(computePopoverStyle(el, panel, placement, offset))
  }, [placement, offset])

  /** Shared with `useFloatingMenu` — Popover only differs in its placement math. */
  const positioned = usePositionedPortal(open, updatePosition)

  React.useEffect(() => {
    if (!open || !closeOnOutsideClick) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (triggerRef.current?.contains(t) || contentRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => document.removeEventListener("pointerdown", onPointerDown, true)
  }, [open, closeOnOutsideClick, setOpen])

  React.useEffect(() => {
    if (!open || !closeOnEscape) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown, true)
    return () => document.removeEventListener("keydown", onKeyDown, true)
  }, [open, closeOnEscape, setOpen])

  const content = open ? (
    <div
      ref={contentRef}
      style={withPortalVisibility(contentStyle, positioned)}
      className="w-max max-w-xs"
    >
      <Card variant="surface-1" size="sm" {...cardProps} className={cn("shadow-md", cardProps?.className)}>
        {children}
      </Card>
    </div>
  ) : null

  return (
    <div ref={ref} className={cn("relative inline-block", className)} {...rest}>
      <div ref={triggerRef}>
        {trigger ? (
          React.isValidElement(trigger) ? (
            React.cloneElement(trigger as React.ReactElement<any>, {
              onClick: (e: unknown) => {
                ;(trigger as React.ReactElement<any>).props.onClick?.(e)
                if (openOnClick) setOpen(!open)
              },
              "aria-expanded": open,
            })
          ) : (
            trigger
          )
        ) : (
          <Button
            variant={variant}
            size={size}
            className={triggerClassName}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {left ? <Icon node={left} size="sm" /> : null}
            {label}
          </Button>
        )}
      </div>
      {typeof document !== "undefined" && content ? createPortal(content, document.body) : null}
    </div>
  )
})

Popover.displayName = "Popover"
