import * as React from "react"
import { createPortal } from "react-dom"
import { Clock, X } from "lucide-react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useFloatingMenu } from "../overlays/useFloatingMenu"
import { FloatingMenuItem, floatingMenuListClass } from "../overlays/floatingMenu"
import { fieldSurfaceVariants } from "./fieldPieces"
import { TextInput, type TextInputProps } from "./TextInput"
import { formatTime, parseTimeInput } from "./dateUtils"

export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (value: Date | null) => void
  minTime?: Date
  maxTime?: Date
  disabled?: boolean
  required?: boolean
  placeholder?: string
  label?: React.ReactNode
  errorMessage?: string
  format?: "12h" | "24h"
  step?: number
  closeOnSelect?: boolean
  clearable?: boolean
  size?: VariantProps<typeof fieldSurfaceVariants>["size"]
  variant?: VariantProps<typeof fieldSurfaceVariants>["variant"]
  inputProps?: Partial<TextInputProps>
  className?: string
}

function buildTimeOptions(format: "12h" | "24h", step: number): string[] {
  const options: string[] = []
  for (let total = 0; total < 24 * 60; total += step) {
    const h = Math.floor(total / 60)
    const m = total % 60
    const d = new Date()
    d.setHours(h, m, 0, 0)
    options.push(formatTime(d, format))
  }
  return options
}

export function TimePicker({
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  placeholder = "Pick a time",
  label,
  errorMessage,
  format = "24h",
  step = 30,
  closeOnSelect = true,
  clearable = true,
  size = "md",
  variant = "outline",
  inputProps,
  className,
  ...rest
}: TimePickerProps) {
  const [internal, setInternal] = React.useState<Date | null>(defaultValue ?? null)
  const [open, setOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState("")
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const selected = isControlled ? value ?? null : internal
  const options = React.useMemo(() => buildTimeOptions(format, step), [format, step])

  const { menuStyle } = useFloatingMenu({
    open,
    onOpenChange: setOpen,
    triggerRef,
    menuRef,
    maxHeight: 224,
  })

  const setSelected = (next: Date | null) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
    setInputText(next ? formatTime(next, format) : "")
    if (closeOnSelect) setOpen(false)
  }

  React.useEffect(() => {
    setInputText(selected ? formatTime(selected, format) : "")
  }, [selected, format])

  const menu = open ? (
    <div ref={menuRef} role="listbox" style={menuStyle} className={floatingMenuListClass}>
      {options.map((option) => (
        <FloatingMenuItem
          key={option}
          role="option"
          selected={inputText === option}
          onClick={() => setSelected(parseTimeInput(option, format))}
        >
          {option}
        </FloatingMenuItem>
      ))}
    </div>
  ) : null

  return (
    <div className={cn("relative w-full", className)} {...rest}>
      <div ref={triggerRef}>
        <TextInput
          label={label}
          required={required}
          errorMessage={errorMessage}
          size={size}
          variant={variant}
          disabled={disabled}
          placeholder={placeholder}
          value={inputText}
          left={<Clock className="h-4 w-4" strokeWidth={2} />}
          right={
            clearable && selected && !disabled ? (
              <button
                type="button"
                tabIndex={-1}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Clear time"
                onClick={() => setSelected(null)}
              >
                <X className="h-4 w-4" />
              </button>
            ) : undefined
          }
          rightInteractive={clearable && Boolean(selected)}
          onFocus={() => !disabled && setOpen(true)}
          onChange={(e) => {
            const nextText = e.target.value
            setInputText(nextText)
            const parsed = parseTimeInput(nextText, format)
            if (parsed) setSelected(parsed)
            if (!nextText) setSelected(null)
          }}
          {...inputProps}
        />
      </div>
      {typeof document !== "undefined" && menu ? createPortal(menu, document.body) : null}
    </div>
  )
}

TimePicker.displayName = "TimePicker"
