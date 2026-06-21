import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const overlayVariants = cva(
  "inset-0 bg-background/80 transition-opacity data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
  {
    variants: {
      blur: {
        true: "backdrop-blur-sm",
        false: "",
      },
    },
    defaultVariants: {
      blur: false,
    },
  }
)

const OverlayPortalParentContext = React.createContext<HTMLElement | null>(null)

/** Portal mount target for `Overlay`: viewport body, scoped parent from `OverlayPortalScope`, a DOM node, or a ref to one. */
export type OverlayPortalContainer =
  | "body"
  | "parent"
  | HTMLElement
  | React.RefObject<HTMLElement | null>

function isPortalRef(value: unknown): value is React.RefObject<HTMLElement | null> {
  if (value === null || typeof value !== "object") return false
  if (typeof HTMLElement !== "undefined" && value instanceof HTMLElement) return false
  return "current" in value
}

function resolvePortalTarget(
  container: OverlayPortalContainer | null | undefined,
  parentHost: HTMLElement | null
): HTMLElement | null {
  if (container === undefined || container === null || container === "body") {
    return typeof document !== "undefined" ? document.body : null
  }
  if (container === "parent") {
    if (parentHost) return parentHost
    return typeof document !== "undefined" ? document.body : null
  }
  if (isPortalRef(container)) {
    return container.current
  }
  return container
}

export interface OverlayProps extends VariantProps<typeof overlayVariants> {
  open?: boolean
  onClose?: () => void
  /**
   * Portal target. Positioning is `fixed` when the resolved node is `document.body`, otherwise `absolute`.
   */
  container?: OverlayPortalContainer | null
  /** Renders a corner close control (calls `onClose`). */
  showCloseButton?: boolean
  /** When false, backdrop clicks do not call `onClose` (close button still works if shown). */
  closeOnBackdropClick?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * Wrap a region where `Overlay` with `container="parent"` should mount (creates a positioned, isolated stacking context).
 */
export function OverlayPortalScope({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [host, setHost] = React.useState<HTMLDivElement | null>(null)
  return (
    <OverlayPortalParentContext.Provider value={host}>
      <div ref={setHost} className={cn("relative isolate", className)}>
        {children}
      </div>
    </OverlayPortalParentContext.Provider>
  )
}

export function Overlay({
  open = false,
  onClose,
  container,
  blur,
  showCloseButton = false,
  closeOnBackdropClick = true,
  className,
  children,
}: OverlayProps) {
  const parentHost = React.useContext(OverlayPortalParentContext)
  const target = resolvePortalTarget(container, parentHost)

  const viewportFixed =
    typeof document !== "undefined" && target !== null && target === document.body

  const node = (
    <div
      role="presentation"
      data-state={open ? "open" : "closed"}
      aria-hidden={!open}
      className={cn(
        overlayVariants({ blur }),
        viewportFixed ? "fixed z-overlay" : "absolute z-10",
        !open && "pointer-events-none opacity-0",
        className
      )}
      onClick={(e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) onClose?.()
      }}
    >
      <div
        className="pointer-events-auto min-h-0 min-w-0 max-w-full"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      {showCloseButton && onClose ? (
        <button
          type="button"
          aria-label="Close"
          className={cn(
            "pointer-events-auto absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full",
            "border border-border bg-background text-foreground shadow-md",
            "hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <X className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
      ) : null}
    </div>
  )

  if (!open) return null

  if (!target) return null

  return createPortal(node, target)
}

Overlay.displayName = "Overlay"

export { overlayVariants }
