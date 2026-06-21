import * as React from "react"
import { Button, type ButtonProps } from "../actions/Button"
import { type ModalTriggerProps } from "../overlays/Modal"
import { type OverlayPortalContainer } from "../overlays/Overlay"
import { PageHeader } from "./PageHeader"
import { TriggerModal, type TriggerModalProps } from "./TriggerModal"
import { useControllableOpen } from "../overlays/useControllableOpen"

export type ConfirmModalIntent = "default" | "destructive" | "delete" | "save" | "warning"

export type ConfirmModalConfirmProps = {
  label: string
  onClick?: () => void
  loading?: boolean
}

export type ConfirmModalCancelProps = {
  label: string
  onClick?: () => void
}

const intentButtonVariant: Record<ConfirmModalIntent, ButtonProps["variant"]> = {
  default: "primary",
  destructive: "destructive",
  delete: "destructive",
  save: "primary",
  warning: "primary",
}

export interface ConfirmModalProps extends Omit<TriggerModalProps, "header" | "footer" | "children" | "triggerProps"> {
  triggerProps?: ModalTriggerProps
  heading: React.ReactNode
  description?: React.ReactNode
  left?: React.ReactNode
  intent?: ConfirmModalIntent
  confirmProps: ConfirmModalConfirmProps
  cancelProps?: ConfirmModalCancelProps
  loading?: boolean
  container?: OverlayPortalContainer
  triggerModalProps?: Partial<TriggerModalProps>
  className?: string
}

export function ConfirmModal({
  open: openProp,
  defaultOpen,
  onOpenChange,
  triggerProps,
  heading,
  description,
  left,
  intent = "default",
  confirmProps,
  cancelProps,
  loading,
  container,
  triggerModalProps,
  className,
  size = "md",
  ...rest
}: ConfirmModalProps) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const busy = Boolean(loading || confirmProps?.loading)

  const handleClose = React.useCallback(() => {
    if (busy) return
    setOpen(false)
  }, [busy, setOpen])

  const handleConfirm = React.useCallback(async () => {
    await confirmProps.onClick?.()
    handleClose()
  }, [confirmProps, handleClose])

  const handleCancel = React.useCallback(() => {
    cancelProps?.onClick?.()
    handleClose()
  }, [cancelProps, handleClose])

  return (
    <TriggerModal
      open={open}
      onOpenChange={setOpen}
      triggerProps={triggerProps}
      container={container}
      size={size}
      showClose={false}
      loading={busy}
      className={className}
      header={
        <PageHeader
          heading={heading}
          description={description}
          left={left}
          variant="minimal"
        />
      }
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            label={cancelProps?.label ?? "Cancel"}
            disabled={busy}
            onClick={handleCancel}
          />
          <Button
            type="button"
            variant={intentButtonVariant[intent]}
            label={confirmProps.label}
            loading={busy}
            onClick={handleConfirm}
          />
        </div>
      }
      {...triggerModalProps}
      {...rest}
    />
  )
}

ConfirmModal.displayName = "ConfirmModal"
