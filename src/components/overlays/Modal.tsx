import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Spinner } from "../data-display/Spinner"
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

export type ModalSize = NonNullable<VariantProps<typeof modalSurfaceVariants>["size"]>

export type ModalTriggerProps = {
  label?: string
  left?: React.ReactNode
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  className?: string
}

export interface ModalProps extends VariantProps<typeof modalSurfaceVariants> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  triggerProps?: ModalTriggerProps
  header?: React.ReactNode
  footer?: React.ReactNode
  showClose?: boolean
  loading?: boolean
  minHeight?: string | number
  maxHeight?: string | number
  className?: string
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
    triggerProps,
    header,
    footer,
    showClose = true,
    loading,
    size,
    minHeight,
    maxHeight,
    className,
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

  const resolvedFooter =
    footer ??
    (loading ? (
      <div className="flex justify-end">
        <Spinner size="sm" />
      </div>
    ) : null)

  const dialog = (
    <Overlay
      open={open}
      onClose={handleClose}
      container={container}
      blur
      showCloseButton={showClose}
      closeOnBackdropClick={!loading}
      className="flex items-center justify-center p-4"
    >
      <Card
        ref={ref}
        data-slot="modal"
        header={header}
        footer={resolvedFooter}
        minHeight={minHeight}
        maxHeight={maxHeight}
        variant="surface-1"
        size="md"
        {...cardProps}
        className={cn(modalSurfaceVariants({ size }), className, cardProps?.className)}
      >
        {children}
      </Card>
    </Overlay>
  )

  if (!triggerProps) return dialog

  return (
    <>
      <Button
        variant={triggerProps.variant ?? "primary"}
        size={triggerProps.size}
        left={triggerProps.left}
        className={triggerProps.className}
        label={triggerProps.label ?? "Open"}
        onClick={() => setOpen(true)}
      />
      {dialog}
    </>
  )
})

Modal.displayName = "Modal"

export { modalSurfaceVariants }
