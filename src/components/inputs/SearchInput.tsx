import * as React from "react"
import { Search, X } from "lucide-react"
import { useControllableValue } from "../../utils/useControllableValue"
import { IconButton } from "../actions/IconButton"
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
    const [value, setValue] = useControllableValue<string>({
      value: valueProp === undefined ? undefined : String(valueProp ?? ""),
      defaultValue: String(defaultValue ?? ""),
      onChange,
    })

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
            <IconButton
              tabIndex={-1}
              disabled={disabled}
              onClick={handleClear}
              tone="muted"
              icon={<X strokeWidth={2} />}
              ariaLabel="Clear search"
            />
          ) : undefined
        }
        rightInteractive={showClear}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    )
  }
)

SearchInput.displayName = "SearchInput"
