import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Card, type CardProps } from "../layout/Card"
import { Overlay, type OverlayPortalContainer } from "./Overlay"
import { useControllableOpen } from "./useControllableOpen"

const modalSurfaceVariants = cva("relative w-full shadow-lg", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-[calc(100%-2rem)]",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const modalOverlayLayout = cva("flex justify-center p-4", {
  variants: {
    align: {
      center: "items-center",
      top: "items-start pt-16",
    },
  },
  defaultVariants: {
    align: "center",
  },
})

export type ModalSize = NonNullable<VariantProps<typeof modalSurfaceVariants>["size"]>
export type ModalAlign = NonNullable<VariantProps<typeof modalOverlayLayout>["align"]>

export interface ModalProps
  extends VariantProps<typeof modalSurfaceVariants>,
    VariantProps<typeof modalOverlayLayout> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
  showClose?: boolean
  /** When true, backdrop clicks do not close the dialog. */
  loading?: boolean
  minHeight?: string | number
  maxHeight?: string | number
  className?: string
  overlayClassName?: string
  cardProps?: Omit<CardProps, "header" | "footer" | "children" | "minHeight" | "maxHeight">
  /** Portal target for the backdrop — use `parent` inside `OverlayPortalScope` for scoped previews. */
  container?: OverlayPortalContainer
  children?: React.ReactNode
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open: openProp,
    defaultOpen,
    onOpenChange,
    onClose,
    header,
    footer,
    showClose = true,
    loading,
    size,
    align,
    minHeight,
    maxHeight,
    className,
    overlayClassName,
    cardProps,
    container,
    children,
  },
  ref
) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })

  const handleClose = React.useCallback(() => {
    setOpen(false)
    onClose?.()
  }, [setOpen, onClose])

  return (
    <Overlay
      open={open}
      onClose={handleClose}
      container={container}
      blur
      showCloseButton={showClose}
      closeOnBackdropClick={!loading}
      className={cn(modalOverlayLayout({ align }), overlayClassName)}
    >
      <Card
        ref={ref}
        data-slot="modal"
        header={header}
        footer={footer}
        minHeight={minHeight}
        maxHeight={maxHeight}
        {...cardProps}
        className={cn(modalSurfaceVariants({ size }), className, cardProps?.className)}
      >
        {children}
      </Card>
    </Overlay>
  )
})

Modal.displayName = "Modal"

export { modalSurfaceVariants, modalOverlayLayout }
