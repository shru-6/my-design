import * as React from "react"
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalTrigger } from "./Modal"
import { Button } from "../atoms/Button"
import { cn } from "../utils"

export interface ConfirmModalProps {
  // Controlled API
  open?: boolean
  onOpenChange?: (open: boolean) => void
  // Uncontrolled API
  triggerLabel?: string
  triggerProps?: React.ComponentProps<typeof Button>
  stopPropagation?: boolean
  text?: string
  // Common props
  title: string
  description?: string
  onConfirm: () => void | Promise<void>
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive" | "delete" | "save" | "warning"
  // Loading and error states
  loading?: boolean
  error?: string
  showModal?: boolean
}

export function ConfirmModal({
  open: openProp,
  onOpenChange,
  triggerLabel,
  triggerProps,
  stopPropagation = true,
  text,
  title,
  description,
  onConfirm,
  confirmLabel,
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
  error,
  showModal = true,
}: ConfirmModalProps) {
  const [open, setOpen] = React.useState(openProp ?? false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const isControlled = openProp !== undefined
  const isOpen = isControlled ? openProp : open
  const setIsOpen = isControlled ? onOpenChange : setOpen

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      await onConfirm()
      setIsOpen?.(false)
    } catch (err) {
      console.error("Confirm action error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getVariantConfig = () => {
    switch (variant) {
      case "delete":
      case "destructive":
        return {
          buttonVariant: "destructive" as const,
          defaultConfirmLabel: "Delete",
        }
      case "save":
        return {
          buttonVariant: "default" as const,
          defaultConfirmLabel: "Save",
        }
      case "warning":
        return {
          buttonVariant: "default" as const,
          defaultConfirmLabel: "Continue",
        }
      default:
        return {
          buttonVariant: "default" as const,
          defaultConfirmLabel: "Confirm",
        }
    }
  }

  const { buttonVariant, defaultConfirmLabel } = getVariantConfig()
  const finalConfirmLabel = confirmLabel || defaultConfirmLabel
  const isLoading = loading || isSubmitting

  const modalContent = (
    <Modal open={isOpen && showModal} onOpenChange={setIsOpen}>
      <ModalContent data-slot="confirm-modal">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
          {text && <ModalDescription>{text}</ModalDescription>}
        </ModalHeader>
        {error && (
          <div className="px-6">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
        <ModalFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen?.(false)}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button 
            variant={buttonVariant} 
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : finalConfirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  if (triggerLabel) {
    return (
      <Modal open={isOpen && showModal} onOpenChange={setIsOpen}>
        <ModalTrigger asChild>
          <Button {...triggerProps} stopPropagation={stopPropagation}>{triggerLabel}</Button>
        </ModalTrigger>
        {modalContent}
      </Modal>
    )
  }

  return modalContent
}
