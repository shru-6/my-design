import * as React from "react"
import { TriggerModal } from "./TriggerModal"
import { Button } from "../atoms/Button"

export interface ConfirmModalProps {
  // Controlled API
  open?: boolean
  onOpenChange?: (open: boolean) => void
  // Uncontrolled API
  triggerLabel?: string
  triggerProps?: React.ComponentProps<typeof Button>
  stopPropagation?: boolean
  icon?: React.ReactNode
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
  icon,
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
  ...props
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

  const footer = (
    <>
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
    </>
  )

  return (
    <TriggerModal
      open={isOpen && showModal}
      onOpenChange={setIsOpen}
      triggerLabel={triggerLabel}
      triggerProps={triggerProps}
      icon={icon}
      stopPropagation={stopPropagation}
      title={title}
      description={description || text}
      footer={footer}
      showCloseButton={false}
      className="data-slot-confirm-modal"
      {...props}
    >
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </TriggerModal>
  )
}
