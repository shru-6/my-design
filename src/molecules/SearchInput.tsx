import * as React from "react"
import { cn } from "../utils"
import { TextInput } from "../atoms/TextInput"
import { InputGroup, InputGroupControl } from "./InputGroup"
import { SearchIcon, XIcon } from "lucide-react"
import { Button } from "../atoms/Button"

export interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  debounceMs?: number
  clearable?: boolean
  icon?: React.ReactNode
  variant?: "default" | "minimal" | "filled"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SearchInput({
  placeholder = "Search...",
  value: valueProp,
  onChange,
  onSearch,
  debounceMs = 300,
  clearable = true,
  icon,
  variant = "default",
  size = "md",
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState("")
  const [debouncedValue, setDebouncedValue] = React.useState("")
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : internalValue
  const setValue = isControlled ? onChange || (() => {}) : setInternalValue

  // Debounce effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
      if (onSearch) {
        onSearch(value)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [value, debounceMs, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleClear = () => {
    setValue("")
    if (onChange) {
      onChange("")
    }
    if (onSearch) {
      onSearch("")
    }
  }

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-9 text-sm",
    lg: "h-10 text-base",
  }

  const variantClasses = {
    default: "border",
    minimal: "border-0 shadow-none bg-transparent",
    filled: "border-0 bg-muted",
  }

  const SearchIconComponent = icon || <SearchIcon className="size-4" />

  return (
    <InputGroup className={cn("relative", className)} data-slot="search-input">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        {SearchIconComponent}
      </div>
      <InputGroupControl
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={cn(
          "pl-9 pr-9",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      {clearable && value && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <XIcon className="size-3" />
        </Button>
      )}
    </InputGroup>
  )
}
