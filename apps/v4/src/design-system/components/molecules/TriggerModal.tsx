import * as React from "react"
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "./Modal"
import { Button } from "../atoms/Button"

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

export function TriggerModalShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Trigger Modal</h4>
        <TriggerModal
          trigger={<Button>Open Modal</Button>}
          title="Modal Title"
          footer={<Button>Close</Button>}
        >
          <div className="p-4">Modal content goes here</div>
        </TriggerModal>
      </div>
    </div>
  )
}

