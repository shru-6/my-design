import * as React from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "./Modal"
import { Button } from "../atoms/Button"

export interface FormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  onSubmit: (data: any) => void
  children: React.ReactNode
  submitLabel?: string
  cancelLabel?: string
}

export function FormModal({
  open,
  onOpenChange,
  title,
  onSubmit,
  children,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}: FormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    onSubmit(data)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent data-slot="form-modal">
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          {children}
          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
