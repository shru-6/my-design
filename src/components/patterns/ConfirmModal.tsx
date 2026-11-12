import * as React from "react"
import { Button, type ButtonProps } from "../actions/Button"
import { type ModalTriggerProps } from "./TriggerModal"
import { type OverlayPortalContainer } from "../overlays/Overlay"
import { PageHeader } from "./PageHeader"
import { Stack } from "../layout/Stack"
import { TriggerModal, type TriggerModalProps } from "./TriggerModal"
import { useControllableOpen } from "../overlays/useControllableOpen"

/**
 * What the confirm button is for. Each intent has its own look:
 *
 * - `default` — brand primary, neutral confirmation.
 * - `save` — solid success tone, a commit that creates or persists something.
 * - `warning` — solid warning tone, reversible but consequential (discard drafts,
 *   overwrite, sign everyone out).
 * - `destructive` — solid destructive, data loss.
 * - `delete` — documented alias of `destructive`, for the common "delete this
 *   record" case. Identical styling on purpose; both are the loudest stop.
 */
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

/**
 * `variant` picks the Button shape/behavior; `className` re-tones it with the
 * semantic status tokens for the intents the base Button has no variant for
 * (`success`, `warning`). Theme owns the colors — these are token classes, not
 * per-component color props.
 */
const intentConfirmButton: Record<ConfirmModalIntent, { variant: ButtonProps["variant"]; className?: string }> = {
  default: { variant: "primary" },
  save: {
    variant: "primary",
    className: "bg-success text-success-foreground hover:bg-success/90",
  },
  warning: {
    variant: "primary",
    className: "bg-warning text-warning-foreground hover:bg-warning/90",
  },
  destructive: { variant: "destructive" },
  delete: { variant: "destructive" },
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

export const ConfirmModal = React.forwardRef<HTMLDivElement, ConfirmModalProps>(function ConfirmModal(
  {
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
  },
  ref
) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const confirmButton = intentConfirmButton[intent]
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
      ref={ref}
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
        <Stack
          direction="row"
          gap="sm"
          wrap
          justify="end"
          items={["cancel", "confirm"] as const}
          getItemKey={(slot) => slot}
          renderItem={(slot) =>
            slot === "cancel" ? (
              <Button
                type="button"
                variant="outline"
                label={cancelProps?.label ?? "Cancel"}
                disabled={busy}
                onClick={handleCancel}
              />
            ) : (
              <Button
                type="button"
                variant={confirmButton.variant}
                className={confirmButton.className}
                label={confirmProps.label}
                loading={busy}
                onClick={handleConfirm}
              />
            )
          }
        />
      }
      {...triggerModalProps}
      {...rest}
    />
  )
})

ConfirmModal.displayName = "ConfirmModal"
