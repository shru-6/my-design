import * as React from "react"

/**
 * The one controlled/uncontrolled pattern for value-holding components
 * (Checkbox, Radio, Slider, Toggle, Dropdown's selection, etc.) — sibling to
 * useControllableOpen, same shape, generalized past just `open`/boolean.
 *
 * Single predicate: controlled whenever `value !== undefined`, regardless of
 * whether `onChange` is also passed. (Components that gated on
 * `value !== undefined && onChange != null` would silently ignore a
 * controlled value with no handler — e.g. `<Checkbox checked />` alone was
 * user-togglable. That variant is intentionally not supported here.)
 */
export function useControllableValue<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue: T
  onChange?: (next: T) => void
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? (valueProp as T) : uncontrolled

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [value, setValue] as const
}
