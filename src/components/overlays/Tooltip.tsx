import * as React from "react"
import { createPortal } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const tooltipContentVariants = cva(
  [
    "z-toast overflow-visible rounded-md px-3 py-1.5 text-xs shadow-md",
    "transition-opacity ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        inverted: "bg-foreground text-background",
        info: "border border-info/40 bg-info/15 text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tooltipArrowVariants = cva("pointer-events-none absolute h-2 w-2 rotate-45", {
  variants: {
    variant: {
      default: "bg-primary",
      inverted: "bg-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

/** Info variant: border triangles (rotate-45 + border-r/b looked “down” on every side). */
const INFO_ARROW: Record<TooltipPlacement, string> = {
  top:
    "bottom-[-5px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-solid border-t-info/50",
  bottom:
    "top-[-5px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[5px] border-solid border-b-info/50",
  left:
    "right-[-5px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[5px] border-solid border-l-info/50",
  right:
    "left-[-5px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-solid border-r-info/50",
}

export type TooltipPlacement = "top" | "bottom" | "left" | "right"

const ARROW_PLACEMENT: Record<TooltipPlacement, string> = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2",
  left: "right-[-4px] top-1/2 -translate-y-1/2",
  right: "left-[-4px] top-1/2 -translate-y-1/2",
}

export interface TooltipProps {
  content: React.ReactNode
  disabled?: boolean
  children: React.ReactNode
  placement?: TooltipPlacement
  /** Opacity fade-in length (ms). */
  transitionDuration?: number
  className?: string
  variant?: VariantProps<typeof tooltipContentVariants>["variant"]
  /**
   * When true, you can move onto the tooltip; close is deferred briefly so the pointer can cross the gap.
   * When false, leaving the trigger closes immediately (`pointer-events-none` on the tooltip).
   */
  keepOpenOnContentHover?: boolean
  /**
   * When true, try alternate sides so the tooltip stays inside the viewport (window edges).
   */
  autoPlacement?: boolean
  /** Extra horizontal offset (px) after placement. */
  xOffset?: number
  /** Extra vertical offset (px) after placement. */
  yOffset?: number
  /** Max width (`number` = px, or CSS length string). Omit for default (~20rem). */
  maxWidth?: number | string
  /** When false, hides the placement arrow. */
  showArrow?: boolean
}

function tooltipArrowClass(
  placement: TooltipPlacement,
  variant: VariantProps<typeof tooltipContentVariants>["variant"]
) {
  if (variant === "info") {
    return cn("pointer-events-none absolute", INFO_ARROW[placement])
  }
  return cn(tooltipArrowVariants({ variant }), ARROW_PLACEMENT[placement])
}

type Coords = { top: number; left: number }

const HIDDEN: Coords = { top: -9999, left: -9999 }

/** Time to move through the gap between trigger and portaled tooltip before we close. */
const CONTENT_HOVER_CLOSE_DELAY_MS = 160

const VIEWPORT_PADDING = 8

function clampToViewport(left: number, top: number, w: number, h: number): Coords {
  const p = VIEWPORT_PADDING
  const vw = window.innerWidth
  const vh = window.innerHeight
  const maxLeft = Math.max(p, vw - w - p)
  const maxTop = Math.max(p, vh - h - p)
  return {
    left: Math.min(Math.max(left, p), maxLeft),
    top: Math.min(Math.max(top, p), maxTop),
  }
}

function fitsInViewport(left: number, top: number, w: number, h: number): boolean {
  const p = VIEWPORT_PADDING
  const vw = typeof window !== "undefined" ? window.innerWidth : 0
  const vh = typeof window !== "undefined" ? window.innerHeight : 0
  return left >= p && top >= p && left + w <= vw - p && top + h <= vh - p
}

function flipPlacement(p: TooltipPlacement): TooltipPlacement {
  switch (p) {
    case "top":
      return "bottom"
    case "bottom":
      return "top"
    case "left":
      return "right"
    case "right":
      return "left"
  }
}

function placementCandidates(preferred: TooltipPlacement): TooltipPlacement[] {
  const flip = flipPlacement(preferred)
  const rest = (["top", "bottom", "left", "right"] as const).filter((x) => x !== preferred && x !== flip)
  return [preferred, flip, rest[0], rest[1]]
}

function pickPlacementAndCoords(
  trigger: DOMRect,
  preferred: TooltipPlacement,
  w: number,
  h: number,
  gap: number,
  autoPlacement: boolean,
  xOffset: number,
  yOffset: number
): { placement: TooltipPlacement; coords: Coords } {
  const order = autoPlacement ? placementCandidates(preferred) : [preferred]
  for (const p of order) {
    const c = placeTooltip(trigger, p, w, h, gap)
    const left = c.left + xOffset
    const top = c.top + yOffset
    if (!autoPlacement || fitsInViewport(left, top, w, h)) {
      return { placement: p, coords: { left, top } }
    }
  }
  const c = placeTooltip(trigger, preferred, w, h, gap)
  return {
    placement: preferred,
    coords: clampToViewport(c.left + xOffset, c.top + yOffset, w, h),
  }
}

function placeTooltip(
  trigger: DOMRect,
  placement: TooltipPlacement,
  w: number,
  h: number,
  offset = 6
): Coords {
  switch (placement) {
    case "top":
      return {
        top: trigger.top - h - offset,
        left: trigger.left + trigger.width / 2 - w / 2,
      }
    case "bottom":
      return {
        top: trigger.bottom + offset,
        left: trigger.left + trigger.width / 2 - w / 2,
      }
    case "left":
      return {
        top: trigger.top + trigger.height / 2 - h / 2,
        left: trigger.left - w - offset,
      }
    case "right":
      return {
        top: trigger.top + trigger.height / 2 - h / 2,
        left: trigger.right + offset,
      }
  }
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    for (const ref of refs) {
      if (ref == null) continue
      if (typeof ref === "function") ref(node)
      else (ref as React.MutableRefObject<T | null>).current = node
    }
  }
}

export function Tooltip({
  content,
  disabled,
  children,
  placement = "top",
  transitionDuration = 200,
  className,
  variant,
  keepOpenOnContentHover = true,
  autoPlacement = false,
  xOffset = 0,
  yOffset = 0,
  maxWidth,
  showArrow = true,
}: TooltipProps) {
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const floatingRef = React.useRef<HTMLDivElement | null>(null)
  const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = React.useState(false)
  const [entered, setEntered] = React.useState(false)
  const [coords, setCoords] = React.useState<Coords>(HIDDEN)
  const [resolvedPlacement, setResolvedPlacement] = React.useState<TooltipPlacement>(placement)
  const id = React.useId()
  const tooltipId = `tooltip-${id}`

  const maxWidthCss =
    maxWidth !== undefined && maxWidth !== null && maxWidth !== ""
      ? typeof maxWidth === "number"
        ? `${maxWidth}px`
        : String(maxWidth)
      : undefined

  React.useLayoutEffect(() => {
    if (!open) setResolvedPlacement(placement)
  }, [placement, open])

  const clearCloseTimer = React.useCallback(() => {
    if (hideTimeoutRef.current != null) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  const hide = React.useCallback(() => {
    clearCloseTimer()
    setOpen(false)
    setEntered(false)
    setCoords(HIDDEN)
  }, [clearCloseTimer])

  const scheduleClose = React.useCallback(() => {
    clearCloseTimer()
    hideTimeoutRef.current = window.setTimeout(() => {
      hideTimeoutRef.current = null
      hide()
    }, CONTENT_HOVER_CLOSE_DELAY_MS)
  }, [hide, clearCloseTimer])

  const show = React.useCallback(() => {
    clearCloseTimer()
    if (!disabled) setOpen(true)
  }, [disabled, clearCloseTimer])

  React.useEffect(() => () => clearCloseTimer(), [clearCloseTimer])

  const onTriggerPointerLeave = React.useCallback(
    (e: React.PointerEvent, childHandler?: (ev: React.PointerEvent) => void) => {
      childHandler?.(e)
      if (keepOpenOnContentHover) {
        const next = e.relatedTarget
        if (next instanceof Node && floatingRef.current?.contains(next)) return
        scheduleClose()
      } else {
        hide()
      }
    },
    [keepOpenOnContentHover, scheduleClose, hide]
  )

  const updatePosition = React.useCallback(() => {
    const trigger = triggerRef.current
    const float = floatingRef.current
    if (!trigger || !float) return
    const rect = trigger.getBoundingClientRect()
    const { width, height } = float.getBoundingClientRect()
    const { placement: resolved, coords: next } = pickPlacementAndCoords(
      rect,
      placement,
      width,
      height,
      6,
      autoPlacement,
      xOffset,
      yOffset
    )
    setResolvedPlacement(resolved)
    setCoords(next)
  }, [placement, autoPlacement, xOffset, yOffset])

  React.useLayoutEffect(() => {
    if (!open) return
    updatePosition()
    const onScrollOrResize = () => updatePosition()
    window.addEventListener("scroll", onScrollOrResize, true)
    window.addEventListener("resize", onScrollOrResize)
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true)
      window.removeEventListener("resize", onScrollOrResize)
    }
  }, [open, updatePosition, content, placement, maxWidthCss])

  /** One rAF so the first paint is opacity-0, then we toggle class → transition runs. */
  React.useLayoutEffect(() => {
    if (!open) return
    setEntered(false)
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [open])

  const bindTrigger = (el: HTMLElement | null) => {
    triggerRef.current = el
  }

  const trigger =
    React.isValidElement(children) && typeof children !== "string" ? (
      React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        ref: mergeRefs(
          bindTrigger,
          (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref
        ),
        onPointerEnter: (e: React.PointerEvent) => {
          ;(children as React.ReactElement<{ onPointerEnter?: (ev: React.PointerEvent) => void }>).props.onPointerEnter?.(e)
          show()
        },
        onPointerLeave: (e: React.PointerEvent) => {
          onTriggerPointerLeave(
            e,
            (children as React.ReactElement<{ onPointerLeave?: (ev: React.PointerEvent) => void }>).props.onPointerLeave
          )
        },
        onFocus: (e: React.FocusEvent) => {
          ;(children as React.ReactElement<{ onFocus?: (ev: React.FocusEvent) => void }>).props.onFocus?.(e)
          show()
        },
        onBlur: (e: React.FocusEvent) => {
          ;(children as React.ReactElement<{ onBlur?: (ev: React.FocusEvent) => void }>).props.onBlur?.(e)
          hide()
        },
        "aria-describedby": open ? tooltipId : undefined,
      } as Record<string, unknown>)
    ) : (
      <span
        ref={bindTrigger}
        className="inline-flex"
        onPointerEnter={show}
        onPointerLeave={(e) => onTriggerPointerLeave(e)}
        onFocus={show}
        onBlur={hide}
        aria-describedby={open ? tooltipId : undefined}
      >
        {children}
      </span>
    )

  const portal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={floatingRef}
            id={tooltipId}
            role="tooltip"
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transitionDuration: `${transitionDuration}ms`,
              ...(maxWidthCss ? { maxWidth: maxWidthCss } : {}),
            }}
            className={cn(
              tooltipContentVariants({ variant }),
              maxWidthCss ? "max-w-none" : "max-w-xs",
              entered ? "opacity-100" : "opacity-0",
              !keepOpenOnContentHover && "pointer-events-none",
              className
            )}
            onPointerEnter={keepOpenOnContentHover ? show : undefined}
            onPointerLeave={keepOpenOnContentHover ? scheduleClose : undefined}
          >
            {content}
            {showArrow ? (
              <div className={tooltipArrowClass(resolvedPlacement, variant)} aria-hidden />
            ) : null}
          </div>,
          document.body
        )
      : null

  return (
    <>
      {trigger}
      {portal}
    </>
  )
}

/** No-op wrapper kept for apps that still wrap trees with a provider. */
Tooltip.displayName = "Tooltip"

export function TooltipProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

TooltipProvider.displayName = "TooltipProvider"

export type TooltipProviderProps = { children?: React.ReactNode }

export { tooltipContentVariants, tooltipArrowVariants }
