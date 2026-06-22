import * as React from "react"
import {
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { useControllableOpen } from "../overlays/useControllableOpen"

/** Side the panel shrinks toward when closed. */
export type CollapsiblePanelCloseDirection = "left" | "right" | "top" | "bottom"

export type CollapsiblePanelCrossAxis = "full" | "parent" | "viewport"
export type CollapsiblePanelVariant = "default" | "inset"
export type CollapsiblePanelTriggerPlacement = "none" | "header" | "floater"
export type CollapsiblePanelTriggerVariant = "default" | "pill"

const ICON_RAIL_WIDTH: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "var(--control-height-sm, 2rem)",
  md: "var(--control-height-md, 2.5rem)",
  lg: "var(--control-height-lg, 2.75rem)",
}

const collapsiblePanelRootVariants = cva("relative shrink-0 transition-[width,height] duration-200 ease-in-out", {
  variants: {
    closeDirection: {
      left: "",
      right: "",
      top: "w-full min-w-0",
      bottom: "w-full min-w-0",
    },
    crossAxis: {
      full: "",
      parent: "",
      viewport: "",
    },
  },
  compoundVariants: [
    { closeDirection: ["left", "right"], crossAxis: "full", class: "h-full min-h-0" },
    { closeDirection: ["left", "right"], crossAxis: "parent", class: "h-full min-h-0" },
    { closeDirection: ["left", "right"], crossAxis: "viewport", class: "min-h-screen" },
    { closeDirection: ["top", "bottom"], crossAxis: "full", class: "w-full" },
    { closeDirection: ["top", "bottom"], crossAxis: "parent", class: "w-full min-w-0" },
  ],
  defaultVariants: {
    closeDirection: "left",
    crossAxis: "parent",
  },
})

const collapsiblePanelSurfaceVariants = cva("flex h-full w-full overflow-hidden border-border bg-background", {
  variants: {
    closeDirection: {
      left: "flex-col border-r",
      right: "flex-col border-l border-r-0",
      top: "flex-col border-b",
      bottom: "flex-col border-t",
    },
    variant: {
      default: "bg-background",
      inset: "bg-muted/30",
    },
  },
  defaultVariants: {
    closeDirection: "left",
    variant: "default",
  },
})

/** Seam-adjacent floater — derived from close direction + cross-axis centering. */
const floaterTriggerVariants = cva("absolute z-10", {
  variants: {
    closeDirection: {
      left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
      right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
      top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
      bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
    },
  },
  defaultVariants: {
    closeDirection: "left",
  },
})

export interface CollapsiblePanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Side the panel collapses toward — width shrinks for `left`/`right`, height for `top`/`bottom`. */
  closeDirection?: CollapsiblePanelCloseDirection
  /** Expanded size on the collapse axis. */
  size?: string | number
  /**
   * Collapsed size on the collapse axis.
   * Default when omitted: `0` for `triggerPlacement` `none` / `floater`; icon-rail width for `header`.
   */
  collapsedSize?: string | number
  /** Cross-axis sizing — height when collapsing horizontally, width when collapsing vertically. */
  crossAxis?: CollapsiblePanelCrossAxis
  trigger?: React.ReactNode
  triggerPlacement?: CollapsiblePanelTriggerPlacement
  /** Floater toggle surface — `pill` matches compact seam handles in editor layouts. */
  triggerVariant?: CollapsiblePanelTriggerVariant
  toggleButtonProps?: Partial<ButtonProps>
  header?: React.ReactNode
  footer?: React.ReactNode
  scrollable?: boolean
  variant?: CollapsiblePanelVariant
  surfaceClassName?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
  children?: React.ReactNode
}

function toCssSize(value: string | number, fallback: string): string {
  return typeof value === "number" ? `${value}px` : value
}

function isHorizontalClose(closeDirection: CollapsiblePanelCloseDirection): boolean {
  return closeDirection === "left" || closeDirection === "right"
}

function isCollapsedSizeZero(resolved: string): boolean {
  const trimmed = resolved.trim()
  if (trimmed === "0" || trimmed === "0px") return true
  const parsed = Number.parseFloat(trimmed)
  return Number.isFinite(parsed) && parsed === 0
}

function resolveCollapsedSize(
  collapsedSize: string | number | undefined,
  triggerPlacement: CollapsiblePanelTriggerPlacement,
  toggleButtonProps?: Partial<ButtonProps>
): string {
  if (collapsedSize !== undefined) {
    return typeof collapsedSize === "number" ? `${collapsedSize}px` : collapsedSize
  }
  if (triggerPlacement === "header") {
    const buttonSize = toggleButtonProps?.size ?? "sm"
    return ICON_RAIL_WIDTH[buttonSize]
  }
  return "0px"
}

function defaultToggleIcon(closeDirection: CollapsiblePanelCloseDirection, open: boolean): React.ReactNode {
  switch (closeDirection) {
    case "left":
      return open ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />
    case "right":
      return open ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />
    case "top":
      return open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
    case "bottom":
      return open ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />
  }
}

function mergeTrigger(
  trigger: React.ReactNode | undefined,
  onToggle: () => void,
  closeDirection: CollapsiblePanelCloseDirection,
  open: boolean,
  triggerVariant: CollapsiblePanelTriggerVariant = "default",
  toggleButtonProps?: Partial<ButtonProps>
) {
  if (trigger != null) {
    if (React.isValidElement(trigger)) {
      return React.cloneElement(trigger as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
        onClick: (event: React.MouseEvent) => {
          ;(trigger.props as { onClick?: React.MouseEventHandler }).onClick?.(event)
          onToggle()
        },
      })
    }
    return trigger
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      ariaLabel={open ? "Collapse panel" : "Expand panel"}
      left={defaultToggleIcon(closeDirection, open)}
      onClick={onToggle}
      {...toggleButtonProps}
      className={cn(
        triggerVariant === "pill" &&
          "h-6 w-6 rounded-full border border-border bg-muted text-foreground shadow-md hover:bg-accent",
        toggleButtonProps?.className
      )}
    />
  )
}

export const CollapsiblePanel = React.forwardRef<HTMLDivElement, CollapsiblePanelProps>(function CollapsiblePanel(
  {
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    closeDirection = "left",
    size = "16rem",
    collapsedSize,
    crossAxis = "parent",
    trigger,
    triggerPlacement = "none",
    triggerVariant = "default",
    toggleButtonProps,
    header,
    footer,
    scrollable = true,
    variant = "default",
    className,
    surfaceClassName,
    contentClassName,
    headerClassName,
    footerClassName,
    children,
    style,
    ...props
  },
  ref
) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const horizontalClose = isHorizontalClose(closeDirection)
  const resolvedCollapsed = resolveCollapsedSize(collapsedSize, triggerPlacement, toggleButtonProps)
  const axisSize = open ? toCssSize(size, "16rem") : resolvedCollapsed
  const collapsedToZero = isCollapsedSizeZero(resolvedCollapsed)

  const showHeaderTrigger = triggerPlacement === "header"
  const showFloaterTrigger = triggerPlacement === "floater"
  const showHeaderRow =
    Boolean(header || showHeaderTrigger) && (open || showHeaderTrigger || !collapsedToZero)
  const hideContent = !open && (collapsedToZero || showHeaderTrigger)

  const toggle = () => setOpen(!open)
  const triggerNode = mergeTrigger(trigger, toggle, closeDirection, open, triggerVariant, toggleButtonProps)

  const axisStyle: React.CSSProperties = horizontalClose ? { width: axisSize } : { height: axisSize }

  return (
    <div
      ref={ref}
      data-state={open ? "open" : "closed"}
      data-close-direction={closeDirection}
      className={cn(collapsiblePanelRootVariants({ closeDirection, crossAxis }), className)}
      style={{ ...axisStyle, ...style }}
      {...props}
    >
      <div className={cn(collapsiblePanelSurfaceVariants({ closeDirection, variant }), surfaceClassName)}>
        {showHeaderRow ? (
          <div
            className={cn(
              "flex shrink-0 items-center gap-2 border-b border-border px-2 py-2",
              !open && showHeaderTrigger && "justify-center px-1",
              headerClassName
            )}
          >
            {open && header ? <div className="min-w-0 flex-1 truncate">{header}</div> : null}
            {showHeaderTrigger ? triggerNode : null}
          </div>
        ) : null}

        <div
          className={cn(
            "min-h-0 min-w-0 flex-1",
            scrollable && "overflow-auto",
            hideContent && "pointer-events-none opacity-0",
            contentClassName
          )}
          aria-hidden={hideContent || undefined}
        >
          {children}
        </div>

        {footer && open ? (
          <div className={cn("shrink-0 border-t border-border px-2 py-2 text-sm text-muted-foreground", footerClassName)}>
            {footer}
          </div>
        ) : null}
      </div>

      {showFloaterTrigger ? (
        <div className={floaterTriggerVariants({ closeDirection })}>{triggerNode}</div>
      ) : null}
    </div>
  )
})

CollapsiblePanel.displayName = "CollapsiblePanel"

export { collapsiblePanelRootVariants, collapsiblePanelSurfaceVariants, floaterTriggerVariants }
