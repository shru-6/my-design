import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Card, type CardProps } from "../layout/Card"
import { useControllableOpen } from "../overlays/useControllableOpen"

const positionVariants = cva("fixed z-modal flex flex-col gap-2", {
  variants: {
    position: {
      "top-left": "left-4 top-4 items-start",
      "top-right": "right-4 top-4 items-end",
      "bottom-left": "bottom-4 left-4 items-start",
      "bottom-right": "bottom-4 right-4 items-end",
      "left-center": "left-4 top-1/2 -translate-y-1/2 items-start",
      "right-center": "right-4 top-1/2 -translate-y-1/2 items-end",
    },
  },
  defaultVariants: {
    position: "bottom-right",
  },
})

const slideVariants = cva("transition-all duration-300 ease-out", {
  variants: {
    slideFrom: {
      left: "data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-4 data-[state=closed]:opacity-0",
      right: "data-[state=open]:translate-x-0 data-[state=closed]:translate-x-4 data-[state=closed]:opacity-0",
      top: "data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-4 data-[state=closed]:opacity-0",
      bottom: "data-[state=open]:translate-y-0 data-[state=closed]:translate-y-4 data-[state=closed]:opacity-0",
    },
  },
  defaultVariants: {
    slideFrom: "right",
  },
})

export type FixedScreenWidgetPosition = NonNullable<VariantProps<typeof positionVariants>["position"]>
export type FixedScreenWidgetSlideFrom = NonNullable<VariantProps<typeof slideVariants>["slideFrom"]>

export interface FixedScreenWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  position?: FixedScreenWidgetPosition
  slideFrom?: FixedScreenWidgetSlideFrom
  trigger?: React.ReactNode
  triggerProps?: Partial<ButtonProps>
  panelProps?: Partial<CardProps>
  offsetX?: number
  offsetY?: number
  pointerEvents?: "none" | "auto"
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  children?: React.ReactNode
  className?: string
}

export function FixedScreenWidget({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  position = "bottom-right",
  slideFrom = "right",
  trigger,
  triggerProps,
  panelProps,
  offsetX = 0,
  offsetY = 0,
  pointerEvents = "auto",
  closeOnOutsideClick = true,
  closeOnEscape = true,
  children,
  className,
  ...rest
}: FixedScreenWidgetProps) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open || !closeOnOutsideClick) return
    const onPointerDown = (e: PointerEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return
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

  const panelHeader = panelProps?.header

  return (
    <div
      className={cn(positionVariants({ position }), className)}
      style={{ marginLeft: offsetX, marginTop: offsetY, pointerEvents }}
      {...rest}
    >
      {trigger ? (
        React.isValidElement(trigger) ? (
          React.cloneElement(trigger as React.ReactElement<{ onClick?: () => void }>, {
            onClick: () => setOpen(!open),
          })
        ) : (
          trigger
        )
      ) : (
        <Button variant="primary" onClick={() => setOpen(!open)} {...triggerProps}>
          {triggerProps?.label ?? "Open"}
        </Button>
      )}

      {open ? (
        <div ref={panelRef}>
          <Card
            data-state="open"
            className={cn("w-80 max-w-[calc(100vw-2rem)] shadow-lg", slideVariants({ slideFrom }))}
            {...panelProps}
            header={undefined}
          >
            <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
              {panelHeader ? <div className="min-w-0 flex-1">{panelHeader}</div> : <span />}
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label="Close panel"
                left={<X className="h-4 w-4" />}
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="p-4">{children}</div>
          </Card>
        </div>
      ) : null}
    </div>
  )
}

FixedScreenWidget.displayName = "FixedScreenWidget"
