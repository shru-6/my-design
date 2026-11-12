import * as React from "react"
import { createPortal } from "react-dom"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { useControllableValue } from "../../utils/useControllableValue"
import { IconButton } from "../actions/IconButton"
import { useFloatingMenu } from "../overlays/useFloatingMenu"
import { floatingMenuSurfaceClass } from "../overlays/floatingMenu"
import { fieldSurfaceVariants } from "./fieldPieces"
import { TextInput, type TextInputProps } from "./TextInput"
import { Calendar, type CalendarProps } from "./Calendar"
import { formatDate, parseDateInput, startOfDay } from "./dateUtils"

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (value: Date | null) => void
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  required?: boolean
  placeholder?: string
  label?: React.ReactNode
  errorMessage?: string
  format?: string
  locale?: string
  closeOnSelect?: boolean
  clearable?: boolean
  size?: VariantProps<typeof fieldSurfaceVariants>["size"]
  variant?: VariantProps<typeof fieldSurfaceVariants>["variant"]
  inputProps?: Partial<TextInputProps>
  calendarProps?: Partial<CalendarProps>
  className?: string
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabled,
      required,
      placeholder = "Pick a date",
      label,
      errorMessage,
      format = "PP",
      locale,
      closeOnSelect = true,
      clearable = true,
      size = "md",
      variant = "outline",
      inputProps,
      calendarProps,
      className,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [inputText, setInputText] = React.useState("")
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const menuRef = React.useRef<HTMLDivElement>(null)

    const [selected, setSelectedValue] = useControllableValue<Date | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange,
    })

    const { menuStyle } = useFloatingMenu({
      open,
      onOpenChange: setOpen,
      triggerRef,
      menuRef,
      maxHeight: 360,
    })

    const setSelected = (next: Date | null) => {
      setSelectedValue(next)
      setInputText(next ? formatDate(next, format) : "")
    }

    React.useEffect(() => {
      setInputText(selected ? formatDate(selected, format) : "")
    }, [selected, format])

    const menu = open ? (
      <div ref={menuRef} style={menuStyle} className={floatingMenuSurfaceClass}>
        <Calendar
          value={selected}
          onChange={(next) => {
            const date = next instanceof Date ? startOfDay(next) : null
            setSelected(date)
            if (closeOnSelect) setOpen(false)
          }}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          locale={locale}
          selectionMode="single"
          {...calendarProps}
        />
      </div>
    ) : null

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...rest}>
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
            left={<CalendarIcon className="h-4 w-4" strokeWidth={2} />}
            right={
              clearable && selected && !disabled ? (
                <IconButton
                  tabIndex={-1}
                  tone="muted"
                  icon={<X />}
                  ariaLabel="Clear date"
                  onClick={() => setSelected(null)}
                />
              ) : undefined
            }
            rightInteractive={clearable && Boolean(selected)}
            onFocus={() => !disabled && setOpen(true)}
            onChange={(e) => {
              const nextText = e.target.value
              setInputText(nextText)
              const parsed = parseDateInput(nextText)
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
)

DatePicker.displayName = "DatePicker"
