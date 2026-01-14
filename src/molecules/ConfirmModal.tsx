import * as React from "react"
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "./Modal"
import { Button } from "../atoms/Button"

export interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
}

export function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent data-slot="confirm-modal">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button variant={variant === "destructive" ? "destructive" : "default"} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
