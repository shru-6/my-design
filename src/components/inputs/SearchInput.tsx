import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "../../utils"
import { Spinner } from "../data-display/Spinner"
import { TextInput, type TextInputProps } from "./TextInput"

export interface SearchInputProps
  extends Omit<TextInputProps, "onChange" | "left" | "right" | "type"> {
  /** Immediate value updates (string). */
  onChange?: (value: string) => void
  /** Debounced callback (see `debounceMs`). */
  onSearch?: (value: string) => void
  onClear?: () => void
  debounceMs?: number
  clearable?: boolean
  loading?: boolean
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      size = "md",
      variant = "outline",
      value: valueProp,
      defaultValue = "",
      onChange,
      onSearch,
      onClear,
      debounceMs = 300,
      clearable = true,
      loading = false,
      disabled,
      placeholder = "Search…",
      name,
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState(String(defaultValue ?? ""))
    const value = isControlled ? String(valueProp ?? "") : internal

    const setValue = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternal(next)
        onChange?.(next)
      },
      [isControlled, onChange]
    )

    React.useEffect(() => {
      if (!onSearch) return
      if (debounceMs <= 0) {
        onSearch(value)
        return
      }
      const t = window.setTimeout(() => onSearch(value), debounceMs)
      return () => window.clearTimeout(t)
    }, [value, debounceMs, onSearch])

    const showClear = clearable && !disabled && value.length > 0

    const handleClear = () => {
      setValue("")
      onClear?.()
      if (debounceMs <= 0) {
        onSearch?.("")
      }
    }

    return (
      <TextInput
        ref={ref}
        name={name}
        size={size}
        variant={variant}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-busy={loading || undefined}
        value={value}
        left={<Search className="h-4 w-4" strokeWidth={2} />}
        right={
          loading ? (
            <Spinner size="sm" className="pointer-events-none" />
          ) : showClear ? (
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              onClick={handleClear}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md",
                "text-muted-foreground hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : undefined
        }
        rightInteractive={showClear}
        onChange={(e) => {
          const next = e.target.value
          if (!isControlled) setInternal(next)
          onChange?.(next)
        }}
        {...props}
      />
    )
  }
)

SearchInput.displayName = "SearchInput"
