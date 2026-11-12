import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { IconButton } from "../actions/IconButton"
import { Card, type CardProps } from "../layout/Card"
import { useControllableOpen } from "../overlays/useControllableOpen"

// Persistent, non-modal page furniture: it sits above page content but must
// stay *below* real dialogs and their backdrops, so it takes the same z tier
// as menus and popovers rather than the modal tier.
const positionVariants = cva("fixed z-dropdown flex flex-col gap-2", {
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

const slideVariants = cva("transition-all duration-normal ease-out", {
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

/**
 * How long the panel stays mounted after `open` goes false, so the exit
 * transition can actually run. Kept in step with the `normal` duration token
 * that `slideVariants` uses.
 */
const EXIT_MS = 300

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

export const FixedScreenWidget = React.forwardRef<HTMLDivElement, FixedScreenWidgetProps>(
  function FixedScreenWidget(
    {
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
      style,
      ...rest
    },
    ref
  ) {
    const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
    const panelRef = React.useRef<HTMLDivElement>(null)

    /**
     * The panel is mounted for the whole of an open→closed cycle and driven by
     * `data-state`, so both the enter and the exit rules in `slideVariants`
     * actually run. It mounts in the `closed` state and is flipped to `open` on
     * the next frame (a node inserted already-open would have nothing to
     * transition from), and unmounts only once the exit transition is over —
     * a permanently mounted panel would otherwise reserve layout space and
     * shove the trigger around inside the fixed corner stack.
     */
    const [mounted, setMounted] = React.useState(open)
    const [state, setState] = React.useState<"open" | "closed">(open ? "open" : "closed")

    React.useEffect(() => {
      if (open) {
        setMounted(true)
        const frame = requestAnimationFrame(() => setState("open"))
        return () => cancelAnimationFrame(frame)
      }
      setState("closed")
      const timer = window.setTimeout(() => setMounted(false), EXIT_MS)
      return () => window.clearTimeout(timer)
    }, [open])

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

    const { header: panelHeader, className: panelClassName, ...restPanelProps } = panelProps ?? {}

    return (
      <div
        ref={ref}
        data-slot="fixed-screen-widget"
        data-state={state}
        className={cn(positionVariants({ position }), className)}
        style={{ marginLeft: offsetX, marginTop: offsetY, pointerEvents, ...style }}
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

        {mounted ? (
          <div ref={panelRef} data-state={state} aria-hidden={state === "closed"}>
            <Card
              data-state={state}
              header={
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">{panelHeader}</div>
                  <IconButton
                    ariaLabel="Close panel"
                    icon={<X />}
                    tone="muted"
                    onClick={() => setOpen(false)}
                  />
                </div>
              }
              {...restPanelProps}
              className={cn(
                "w-80 max-w-[calc(100vw-2rem)] shadow-lg",
                slideVariants({ slideFrom }),
                state === "closed" && "pointer-events-none",
                panelClassName
              )}
            >
              {children}
            </Card>
          </div>
        ) : null}
      </div>
    )
  }
)

FixedScreenWidget.displayName = "FixedScreenWidget"
