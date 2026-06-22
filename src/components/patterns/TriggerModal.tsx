import * as React from "react"
import { Button, type ButtonProps } from "../actions/Button"
import { Modal, type ModalProps } from "../overlays/Modal"
import { useControllableOpen } from "../overlays/useControllableOpen"

export type ModalTriggerProps = Pick<
  ButtonProps,
  "variant" | "size" | "className" | "disabled" | "iconOnly" | "ariaLabel"
> & {
  label?: string
  left?: React.ReactNode
}

export interface TriggerModalProps extends ModalProps {
  /** Custom trigger node — use instead of `triggerProps` for full control. */
  trigger?: React.ReactNode
  triggerProps?: ModalTriggerProps
}

/** Modal with an optional trigger — base for ConfirmModal and FormModal. */
export function TriggerModal({
  trigger,
  triggerProps,
  showClose = true,
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...modalProps
}: TriggerModalProps) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })

  const triggerNode =
    trigger ??
    (triggerProps ? (
      <Button
        variant={triggerProps.variant}
        size={triggerProps.size}
        left={triggerProps.left}
        className={triggerProps.className}
        label={triggerProps.label}
        iconOnly={triggerProps.iconOnly ?? (!triggerProps.label && Boolean(triggerProps.left))}
        disabled={triggerProps.disabled}
        ariaLabel={triggerProps.ariaLabel}
        onClick={() => setOpen(true)}
      />
    ) : null)

  return (
    <>
      {triggerNode}
      <Modal open={open} onOpenChange={setOpen} showClose={showClose} {...modalProps} />
    </>
  )
}

TriggerModal.displayName = "TriggerModal"
