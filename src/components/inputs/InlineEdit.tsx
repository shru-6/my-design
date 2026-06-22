import * as React from "react"
import { Check, Pencil, X } from "lucide-react"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Text } from "../data-display/Text"
import { disabledControl, focusRing } from "./fieldPieces"

export interface InlineEditProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange" | "defaultValue"> {
  value?: string
  defaultValue?: string
  onSave?: (value: string) => void | Promise<void>
  onCancel?: () => void
  placeholder?: string
  disabled?: boolean
  /** Disables editing controls while a save is in progress (use with async `onSave` or control externally). */
  loading?: boolean
  required?: boolean
  validate?: boolean | ((value: string) => string | undefined)
  editTrigger?: "click" | "doubleClick"
  saveOnBlur?: boolean
  saveOnEnter?: boolean
  saveButtonProps?: Partial<ButtonProps>
  cancelButtonProps?: Partial<ButtonProps>
  className?: string
}

const inlineInputClass = cn(
  "m-0 min-w-[4ch] max-w-full rounded-sm border-0 border-b border-transparent bg-transparent p-0 text-sm leading-5 text-foreground shadow-none outline-none",
  "transition-colors placeholder:text-muted-foreground",
  "hover:border-border/60 focus:border-border focus:bg-muted/30",
  focusRing,
  disabledControl
)

function fieldWidthChars(value: string, placeholder: string, min = 4) {
  return Math.min(40, Math.max(min, value.length || placeholder.length || min))
}

function validateDraft(value: string, validate: InlineEditProps["validate"], required?: boolean) {
  if (!validate) return true
  if (typeof validate === "function") return !validate(value)
  if (required && value.trim().length === 0) return false
  return true
}

export function InlineEdit({
  value,
  defaultValue = "",
  onSave,
  onCancel,
  placeholder = "Click to edit",
  disabled,
  loading,
  required,
  validate,
  editTrigger = "click",
  saveOnBlur = false,
  saveOnEnter = true,
  saveButtonProps,
  cancelButtonProps,
  className,
  ...rest
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [internal, setInternal] = React.useState(defaultValue)
  const [draft, setDraft] = React.useState(defaultValue)
  const [saving, setSaving] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined
  const displayValue = isControlled ? value : internal
  const busy = Boolean(loading || saving)
  const locked = Boolean(disabled || busy)

  React.useEffect(() => {
    if (!editing) setDraft(displayValue)
  }, [displayValue, editing])

  const startEdit = () => {
    if (locked) return
    setDraft(displayValue)
    setEditing(true)
  }

  const cancel = () => {
    if (busy) return
    setDraft(displayValue)
    setEditing(false)
    onCancel?.()
  }

  const save = React.useCallback(async () => {
    if (busy) return
    if (!validateDraft(draft, validate, required)) return

    const result = onSave?.(draft)
    if (result != null && typeof (result as Promise<void>).then === "function") {
      setSaving(true)
      try {
        await result
        if (!isControlled) setInternal(draft)
        setEditing(false)
      } finally {
        setSaving(false)
      }
      return
    }

    if (!isControlled) setInternal(draft)
    setEditing(false)
  }, [busy, draft, isControlled, onSave, required, validate])

  if (editing) {
    return (
      <span className={cn("inline-flex max-w-full items-center gap-0.5", className)} {...rest}>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          required={required}
          placeholder={placeholder}
          autoFocus
          disabled={busy}
          aria-busy={busy || undefined}
          className={inlineInputClass}
          style={{ width: `${fieldWidthChars(draft, placeholder)}ch` }}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveOnBlur && !busy ? () => void save() : undefined}
          onKeyDown={(e) => {
            if (busy) return
            if (saveOnEnter && e.key === "Enter") {
              e.preventDefault()
              void save()
            }
            if (e.key === "Escape") {
              e.preventDefault()
              cancel()
            }
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          ariaLabel="Save"
          loading={busy}
          left={<Check className="h-3.5 w-3.5" />}
          onClick={() => void save()}
          {...saveButtonProps}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          ariaLabel="Cancel"
          disabled={busy}
          left={<X className="h-3.5 w-3.5" />}
          onClick={cancel}
          {...cancelButtonProps}
        />
      </span>
    )
  }

  return (
    <span className={cn("inline-flex max-w-full items-center", className)} {...rest}>
      <button
        type="button"
        disabled={locked}
        aria-busy={busy || undefined}
        className={cn(
          "group inline-flex max-w-full items-center gap-1 rounded-sm px-0.5 py-0 text-left leading-5 transition-colors hover:bg-muted/50",
          locked && "pointer-events-none opacity-50"
        )}
        onClick={editTrigger === "click" ? startEdit : undefined}
        onDoubleClick={editTrigger === "doubleClick" ? startEdit : undefined}
      >
        <Text as="span" size="sm" className="truncate leading-5">
          {displayValue || <span className="text-muted-foreground">{placeholder}</span>}
        </Text>
        {!locked ? (
          <Pencil className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-70" />
        ) : null}
      </button>
    </span>
  )
}

InlineEdit.displayName = "InlineEdit"
