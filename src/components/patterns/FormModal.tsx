import * as React from "react"
import { Button, type ButtonProps } from "../actions/Button"
import { Form, type FormProps } from "../inputs/Form"
import { FormField, type FormFieldProps, type FormFieldType } from "../inputs/FormField"
import { useFormContext, type FormFieldRenderProps } from "../inputs/formContext"
import { type SelectOption } from "../inputs/Select"
import { type ModalTriggerProps } from "./TriggerModal"
import { type OverlayPortalContainer } from "../overlays/Overlay"
import { PageHeader } from "./PageHeader"
import { TriggerModal, type TriggerModalProps } from "./TriggerModal"
import { useControllableOpen } from "../overlays/useControllableOpen"

export type FormModalMode = "create" | "edit"

export type FormFieldChangeHelpers = {
  values: Record<string, unknown>
  setValue: (name: string, value: unknown) => void
}

/** Passed to `FormFieldSchema.render` / `renderAfter` — form helpers plus field metadata. */
export type FormFieldSchemaRenderHelpers = FormFieldChangeHelpers & {
  name: string
  field: FormFieldRenderProps
  errorMessage?: string
  disabled?: boolean
}

export type FormFieldSchema = {
  name: string
  type?: FormFieldType
  label?: React.ReactNode
  placeholder?: string | ((values: Record<string, unknown>) => string)
  required?: boolean
  disabled?: boolean
  validate?: boolean | ((value: string) => string | undefined)
  errorMessage?: string | ((values: Record<string, unknown>) => string | undefined)
  /** Select options — static array or derived from current form values. */
  items?: SelectOption[] | ((values: Record<string, unknown>) => SelectOption[])
  /** Hide the field unless this returns true. */
  showWhen?: (values: Record<string, unknown>) => boolean
  /** Side effects after value change (e.g. reset dependent fields). */
  onValueChange?: (value: string, helpers: FormFieldChangeHelpers) => void
  rows?: number
  /** Upload field options when `type="upload"`. */
  accept?: string
  dragAndDrop?: boolean
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  loading?: boolean
  onUpload?: (files: File[], helpers: FormFieldChangeHelpers) => void | Promise<void>
  /**
   * Full custom field UI — replaces auto-render for this schema row.
   * Receives form helpers and the resolved field control props.
   */
  render?: (helpers: FormFieldSchemaRenderHelpers) => React.ReactNode
  /**
   * Renders below the auto-rendered control (e.g. VariablePills under a textarea).
   * Ignored when `render` is set.
   */
  renderAfter?: (helpers: FormFieldSchemaRenderHelpers) => React.ReactNode
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

function resolvePlaceholder(
  placeholder: FormFieldSchema["placeholder"],
  values: Record<string, unknown>
): string | undefined {
  if (placeholder == null) return undefined
  return typeof placeholder === "function" ? placeholder(values) : placeholder
}

function resolveErrorMessage(
  errorMessage: FormFieldSchema["errorMessage"],
  values: Record<string, unknown>
): string | undefined {
  if (errorMessage == null) return undefined
  return typeof errorMessage === "function" ? errorMessage(values) : errorMessage
}

function SchemaFieldRow({
  field,
  busy,
}: {
  field: FormFieldSchema
  busy: boolean
}) {
  const form = useFormContext()
  const values = form?.values ?? {}

  if (field.showWhen && !field.showWhen(values)) return null

  const items = typeof field.items === "function" ? field.items(values) : field.items
  const placeholder = resolvePlaceholder(field.placeholder, values)
  const resolvedError = resolveErrorMessage(field.errorMessage, values)
  const disabled = field.disabled ?? busy

  const {
    showWhen: _showWhen,
    onValueChange,
    onUpload,
    placeholder: _placeholder,
    items: _items,
    errorMessage: _errorMessage,
    render,
    renderAfter,
    ...fieldProps
  } = field

  const changeHelpers: FormFieldChangeHelpers = {
    values: form?.values ?? values,
    setValue: form?.setValue.bind(form) ?? (() => {}),
  }

  if (render) {
    return (
      <FormField
        name={field.name}
        label={field.label}
        disabled={disabled}
        errorMessage={resolvedError}
        render={(fieldControl) =>
          render({
            ...changeHelpers,
            name: field.name,
            field: fieldControl,
            errorMessage: resolvedError,
            disabled,
          })
        }
      />
    )
  }

  const props: FormFieldProps = {
    ...fieldProps,
    placeholder,
    items,
    disabled,
    errorMessage: resolvedError,
    onValueChange: onValueChange
      ? (value) => onValueChange(value, changeHelpers)
      : undefined,
    onUpload: onUpload
      ? (files) => onUpload(files, changeHelpers)
      : undefined,
  }

  const row = <FormField {...props} />

  if (!renderAfter) return row

  const fieldControl: FormFieldRenderProps = {
    id: `${field.name}-field`,
    name: field.name,
    value: String(form?.values[field.name] ?? ""),
    disabled,
    errorMessage: resolvedError,
    onChange: (value) => form?.setValue(field.name, value),
    onBlur: () => form?.setTouched(field.name, true),
  }

  return (
    <React.Fragment key={field.name}>
      {row}
      {renderAfter({
        ...changeHelpers,
        name: field.name,
        field: fieldControl,
        errorMessage: resolvedError,
        disabled,
      })}
    </React.Fragment>
  )
}

function FormModalFields({
  fields,
  busy,
}: {
  fields: FormFieldSchema[]
  busy: boolean
}) {
  return (
    <>
      {fields.map((field) => (
        <SchemaFieldRow key={field.name} field={field} busy={busy} />
      ))}
    </>
  )
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
      if (field.type === "checkbox") acc[field.name] = "false"
      else if (field.type === "upload") acc[field.name] = ""
      else acc[field.name] = ""
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
        {fields?.length ? <FormModalFields fields={fields} busy={busy} /> : null}
        {children}
      </Form>
    </TriggerModal>
  )
}

FormModal.displayName = "FormModal"
