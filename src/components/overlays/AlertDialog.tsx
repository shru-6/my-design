import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Text } from "../data-display/Text"
import { Card } from "../layout/Card"
import { Overlay, type OverlayPortalContainer } from "./Overlay"
import { useControllableOpen } from "./useControllableOpen"

const alertDialogVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      warning: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type AlertDialogConfirmProps = {
  label: string
  onClick?: () => void
  loading?: boolean
}

export type AlertDialogCancelProps = {
  label: string
  onClick?: () => void
}

export interface AlertDialogProps extends VariantProps<typeof alertDialogVariants> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  confirmProps: AlertDialogConfirmProps
  cancelProps?: AlertDialogCancelProps
  loading?: boolean
  className?: string
  container?: OverlayPortalContainer
}

export function AlertDialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  title,
  description,
  variant,
  confirmProps,
  cancelProps,
  loading,
  className,
  container,
}: AlertDialogProps) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const busy = Boolean(loading || confirmProps?.loading)

  const handleClose = React.useCallback(() => {
    if (busy) return
    setOpen(false)
  }, [busy, setOpen])

  const confirmVariant =
    variant === "destructive" ? "destructive" : variant === "warning" ? "primary" : "primary"

  return (
    <Overlay
      open={open}
      onClose={handleClose}
      container={container}
      blur
      closeOnBackdropClick={!busy}
      className="flex items-center justify-center p-4"
    >
      <Card
        data-slot="alert-dialog"
        variant="surface-1"
        size="md"
        className={cn("relative w-full max-w-md shadow-lg", alertDialogVariants({ variant }), className)}
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              variant="outline"
              label={cancelProps?.label ?? "Cancel"}
              disabled={busy}
              onClick={() => {
                cancelProps?.onClick?.()
                handleClose()
              }}
            />
            <Button
              variant={confirmVariant}
              label={confirmProps.label}
              loading={busy}
              onClick={() => {
                confirmProps.onClick?.()
                handleClose()
              }}
            />
          </div>
        }
      >
        <div className="flex flex-col gap-2">
          <Text as="div" size="lg" weight="semibold">
            {title}
          </Text>
          {description ? (
            <Text as="div" size="sm" variant="muted">
              {description}
            </Text>
          ) : null}
        </div>
      </Card>
    </Overlay>
  )
}

AlertDialog.displayName = "AlertDialog"

export { alertDialogVariants }
