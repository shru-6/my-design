import * as React from "react"
import { Check, Pencil, X } from "lucide-react"
import { cn } from "../../utils"
import { focusRing } from "./fieldPieces"
import { Text } from "../data-display/Text"

export interface InlineEditProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange" | "defaultValue"> {
  value?: string
  defaultValue?: string
  onSave?: (value: string) => void
  onCancel?: () => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  validate?: boolean | ((value: string) => string | undefined)
  editTrigger?: "click" | "doubleClick"
  saveOnBlur?: boolean
  saveOnEnter?: boolean
  className?: string
}

const inlineInputClass = cn(
  "m-0 min-w-[4ch] max-w-full rounded-sm border-0 border-b border-transparent bg-transparent p-0 text-sm leading-5 text-foreground shadow-none outline-none",
  "transition-colors placeholder:text-muted-foreground",
  "hover:border-border/60 focus:border-border focus:bg-muted/30",
  focusRing
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
  required,
  validate,
  editTrigger = "click",
  saveOnBlur = false,
  saveOnEnter = true,
  className,
  ...rest
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [internal, setInternal] = React.useState(defaultValue)
  const [draft, setDraft] = React.useState(defaultValue)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined
  const displayValue = isControlled ? value : internal

  React.useEffect(() => {
    if (!editing) setDraft(displayValue)
  }, [displayValue, editing])

  const startEdit = () => {
    if (disabled) return
    setDraft(displayValue)
    setEditing(true)
  }

  const cancel = () => {
    setDraft(displayValue)
    setEditing(false)
    onCancel?.()
  }

  const save = () => {
    if (!validateDraft(draft, validate, required)) return
    if (!isControlled) setInternal(draft)
    onSave?.(draft)
    setEditing(false)
  }

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
          className={inlineInputClass}
          style={{ width: `${fieldWidthChars(draft, placeholder)}ch` }}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveOnBlur ? save : undefined}
          onKeyDown={(e) => {
            if (saveOnEnter && e.key === "Enter") {
              e.preventDefault()
              save()
            }
            if (e.key === "Escape") {
              e.preventDefault()
              cancel()
            }
          }}
        />
        <button
          type="button"
          aria-label="Save"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-primary hover:bg-muted"
          onClick={save}
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Cancel"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-muted"
          onClick={cancel}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </span>
    )
  }

  return (
    <span className={cn("inline-flex max-w-full items-center", className)} {...rest}>
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "group inline-flex max-w-full items-center gap-1 rounded-sm px-0.5 py-0 text-left leading-5 transition-colors hover:bg-muted/50",
          disabled && "pointer-events-none opacity-50"
        )}
        onClick={editTrigger === "click" ? startEdit : undefined}
        onDoubleClick={editTrigger === "doubleClick" ? startEdit : undefined}
      >
        <Text as="span" size="sm" className="truncate leading-5">
          {displayValue || <span className="text-muted-foreground">{placeholder}</span>}
        </Text>
        {!disabled ? (
          <Pencil className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-70" />
        ) : null}
      </button>
    </span>
  )
}

InlineEdit.displayName = "InlineEdit"
