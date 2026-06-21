import * as React from "react"
import { Button, type ButtonProps } from "../actions/Button"
import { Form, type FormProps } from "../inputs/Form"
import { FormField, type FormFieldType } from "../inputs/FormField"
import { type ModalTriggerProps } from "../overlays/Modal"
import { type OverlayPortalContainer } from "../overlays/Overlay"
import { PageHeader } from "./PageHeader"
import { TriggerModal, type TriggerModalProps } from "./TriggerModal"
import { useControllableOpen } from "../overlays/useControllableOpen"

export type FormModalMode = "create" | "edit"

export type FormFieldSchema = {
  name: string
  type?: FormFieldType
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  validate?: boolean | ((value: string) => string | undefined)
  errorMessage?: string
}

export interface FormModalProps extends Omit<TriggerModalProps, "header" | "footer" | "children" | "triggerProps"> {
  triggerProps?: ModalTriggerProps
  heading: React.ReactNode
  subheading?: React.ReactNode
  left?: React.ReactNode
  mode?: FormModalMode
  fields?: FormFieldSchema[]
  formProps?: Omit<FormProps, "children" | "onSubmit" | "onCancel" | "footer">
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>
  onSubmitSuccess?: (values: Record<string, unknown>) => void
  onSubmitError?: (error: unknown) => void
  submitLabel?: string
  submittingLabel?: string
  cancelLabel?: string
  loading?: boolean
  submitDisabled?: boolean
  onCancel?: () => void
  validateOnSubmit?: boolean
  container?: OverlayPortalContainer
  submitButtonProps?: Partial<ButtonProps>
  cancelButtonProps?: Partial<ButtonProps>
  triggerModalProps?: Partial<TriggerModalProps>
  className?: string
  children?: React.ReactNode
}

export function FormModal({
  open: openProp,
  defaultOpen,
  onOpenChange,
  triggerProps,
  heading,
  subheading,
  left,
  mode = "create",
  fields,
  formProps,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  submitLabel,
  submittingLabel,
  cancelLabel = "Cancel",
  loading,
  submitDisabled,
  onCancel,
  validateOnSubmit = true,
  container,
  submitButtonProps,
  cancelButtonProps,
  triggerModalProps,
  className,
  children,
  size = "md",
  ...rest
}: FormModalProps) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const [submitting, setSubmitting] = React.useState(false)

  const busy = Boolean(loading || submitting)
  const resolvedSubmitLabel =
    busy && submittingLabel ? submittingLabel : submitLabel ?? (mode === "edit" ? "Save changes" : "Create")

  const handleClose = React.useCallback(() => {
    if (busy) return
    setOpen(false)
    onCancel?.()
  }, [busy, setOpen, onCancel])

  const handleSubmit = React.useCallback(
    async (values: Record<string, unknown>) => {
      setSubmitting(true)
      try {
        await onSubmit(values)
        onSubmitSuccess?.(values)
        setOpen(false)
      } catch (error) {
        onSubmitError?.(error)
      } finally {
        setSubmitting(false)
      }
    },
    [onSubmit, onSubmitSuccess, onSubmitError, setOpen]
  )

  const initialValues = React.useMemo(() => {
    if (formProps?.initialValues) return formProps.initialValues
    if (!fields) return {}
    return fields.reduce<Record<string, unknown>>((acc, field) => {
      acc[field.name] = ""
      return acc
    }, {})
  }, [fields, formProps?.initialValues])

  return (
    <TriggerModal
      open={open}
      onOpenChange={setOpen}
      triggerProps={triggerProps}
      container={container}
      size={size}
      showClose={!busy}
      loading={busy}
      className={className}
      header={
        <PageHeader
          heading={heading}
          subheading={subheading}
          left={left}
          variant="minimal"
        />
      }
      footer={null}
      {...triggerModalProps}
      {...rest}
    >
      <Form
        {...formProps}
        initialValues={initialValues}
        validateOn={validateOnSubmit ? "submit" : formProps?.validateOn ?? "submit"}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        submitLabel={resolvedSubmitLabel}
        cancelLabel={cancelLabel}
        loading={busy}
        disabled={submitDisabled || formProps?.disabled}
        submitButtonProps={submitButtonProps}
        cancelButtonProps={cancelButtonProps}
      >
        {children ??
          fields?.map((field) => (
            <FormField key={field.name} {...field} disabled={field.disabled ?? busy} />
          ))}
      </Form>
    </TriggerModal>
  )
}

FormModal.displayName = "FormModal"
