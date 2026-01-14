import * as React from "react"
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "./Modal"

export interface TriggerModalProps {
  trigger: React.ReactNode
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function TriggerModal({
  trigger,
  title,
  children,
  footer,
}: TriggerModalProps) {
  return (
    <Modal>
      <ModalTrigger asChild data-slot="trigger-modal">
        {trigger}
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        {children}
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  )
}
