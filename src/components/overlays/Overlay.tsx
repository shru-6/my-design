import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { zScoped } from "../../utils/zIndex"
import { IconButton } from "../actions/IconButton"
import { useDialogA11y } from "./useDialogA11y"

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

export interface OverlayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "role" | "onClick">,
    VariantProps<typeof overlayVariants> {
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
  /**
   * Treat the content surface as a modal dialog: `role` + `aria-modal`, focus
   * moves in on open, Tab cycles inside it, focus returns to the opener on
   * close. Off by default — a bare backdrop stays `role="presentation"`.
   */
  dialog?: boolean
  /** `alertdialog` for a confirm / destroy prompt. Ignored unless `dialog`. */
  dialogRole?: "dialog" | "alertdialog"
  /** Accessible name for the dialog surface. Ignored unless `dialog`. */
  dialogLabel?: string
  /** Escape closes. Ignored unless `dialog`. */
  closeOnEscape?: boolean
  /** Focused on open instead of the surface's first tabbable child. Ignored unless `dialog`. */
  initialFocus?: React.RefObject<HTMLElement | null>
  /** Applied to the content surface (the panel), not the backdrop. */
  contentClassName?: string
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

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(function Overlay(
  {
    open = false,
    onClose,
    container,
    blur,
    showCloseButton = false,
    closeOnBackdropClick = true,
    dialog = false,
    dialogRole = "dialog",
    dialogLabel,
    closeOnEscape = true,
    initialFocus,
    contentClassName,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const parentHost = React.useContext(OverlayPortalParentContext)
  const target = resolvePortalTarget(container, parentHost)

  const viewportFixed =
    typeof document !== "undefined" && target !== null && target === document.body

  /**
   * Only a viewport-level overlay is actually modal. A `container="parent"`
   * overlay is an embedded panel (gallery cards render several of them open at
   * once) — it keeps the dialog role, but must not claim `aria-modal`, seize
   * focus, or swallow Escape for the whole document.
   */
  const modal = dialog && viewportFixed

  const surfaceRef = useDialogA11y({
    open,
    onClose,
    closeOnEscape,
    initialFocus,
    enabled: modal,
  })

  const node = (
    <div
      ref={ref}
      role="presentation"
      data-state={open ? "open" : "closed"}
      aria-hidden={!open}
      className={cn(
        overlayVariants({ blur }),
        // Backdrops read the overlay layer: the token class at viewport scope,
        // the OverlayPortalScope-local value when mounted inside a card.
        viewportFixed ? "fixed z-overlay" : "absolute",
        !open && "pointer-events-none opacity-0",
        className
      )}
      style={viewportFixed ? style : { zIndex: zScoped.overlay, ...style }}
      onClick={(e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) onClose?.()
      }}
      {...rest}
    >
      <div
        ref={surfaceRef}
        role={dialog ? dialogRole : undefined}
        aria-modal={modal ? true : undefined}
        aria-label={dialog ? dialogLabel : undefined}
        tabIndex={dialog ? -1 : undefined}
        className={cn("pointer-events-auto min-h-0 min-w-0 max-w-full outline-none", contentClassName)}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      {showCloseButton && onClose ? (
        <IconButton
          variant="outline"
          shape="round"
          ariaLabel="Close"
          icon={<X className="h-4 w-4" strokeWidth={2} aria-hidden />}
          className="pointer-events-auto absolute right-4 top-4 h-9 w-9 shadow-md"
          style={{ zIndex: zScoped.surface }}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        />
      ) : null}
    </div>
  )

  if (!open) return null

  if (!target) return null

  return createPortal(node, target)
})

Overlay.displayName = "Overlay"

export { overlayVariants }
