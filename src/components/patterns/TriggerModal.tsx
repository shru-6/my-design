import * as React from "react"
import { Modal, type ModalProps, type ModalTriggerProps } from "../overlays/Modal"

export type TriggerModalProps = ModalProps & {
  triggerProps?: ModalTriggerProps
}

/** Modal with an optional trigger button — base for ConfirmModal and FormModal. */
export function TriggerModal({
  triggerProps,
  showClose = true,
  ...modalProps
}: TriggerModalProps) {
  return <Modal triggerProps={triggerProps} showClose={showClose} {...modalProps} />
}

TriggerModal.displayName = "TriggerModal"
