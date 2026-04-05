import * as React from "react"
import { createPortal } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const overlayVariants = cva(
  "inset-0 z-40 bg-background/80 transition-opacity data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
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

export interface OverlayProps extends VariantProps<typeof overlayVariants> {
  open?: boolean
  onClose?: () => void
  container?: HTMLElement | null
  /** When false, uses absolute positioning so the overlay can be scoped to a positioned ancestor (e.g. previews). Default: true (fixed, viewport-relative). */
  fixed?: boolean
  className?: string
  children?: React.ReactNode
}

export function Overlay({
  open = false,
  onClose,
  container,
  blur,
  fixed = true,
  className,
  children,
}: OverlayProps) {
  const node = (
    <div
      role="presentation"
      data-state={open ? "open" : "closed"}
      aria-hidden={!open}
      className={cn(
        overlayVariants({ blur }),
        fixed ? "fixed" : "absolute",
        !open && "pointer-events-none opacity-0",
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      {children}
    </div>
  )

  if (!open) return null

  if (container) {
    return createPortal(node, container)
  }

  return typeof document !== "undefined" ? createPortal(node, document.body) : null
}

export { overlayVariants }
