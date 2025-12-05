"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "./Modal"
import { Button } from "../atoms/Button"
import { Form } from "./Form"
import { FormInput } from "./FormInput"

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
  const form = useForm({
    defaultValues: {},
  })

  const handleSubmit = form.handleSubmit(onSubmit)

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent data-slot="form-modal">
        <Form {...form}>
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
        </Form>
      </ModalContent>
    </Modal>
  )
}

export function FormModalShowcase() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Form Modal</h4>
        <Button onClick={() => setOpen(true)}>Open Form Modal</Button>
        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="Create Account"
          onSubmit={(data) => {
            console.log("Submitted:", data)
            setOpen(false)
          }}
        >
          <div className="space-y-4 p-4">
            <FormInput label="Name" />
            <FormInput label="Email" />
          </div>
        </FormModal>
      </div>
    </div>
  )
}

