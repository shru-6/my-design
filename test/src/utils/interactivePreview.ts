/**
 * Gallery-only: wire handlers so controlled props stay interactive in preview cards.
 */
import type { Dispatch, SetStateAction } from "react"

const BINDINGS: Record<string, Record<string, string>> = {
  Toggle: { checked: "onChange" },
  Checkbox: { checked: "onChange" },
  Radio: { checked: "onChange" },
  Slider: { value: "onChange" },
  Select: { value: "onValueChange" },
  PhoneInput: { value: "onChange" },
  Dropdown: { open: "onOpenChange" },
  Pagination: { value: "onChange" },
  Stepper: { value: "onChange" },
  Tabs: { value: "onValueChange" },
  Switch: { checked: "onChange" },
  SearchInput: { value: "onChange" },
  DatePicker: { value: "onChange" },
  TimePicker: { value: "onChange" },
  DateRangePicker: { value: "onChange" },
  Collapsible: { open: "onOpenChange" },
  Accordion: { value: "onChange" },
  Drawer: { open: "onOpenChange" },
  Modal: { open: "onOpenChange" },
  AlertDialog: { open: "onOpenChange" },
  ConfirmModal: { open: "onOpenChange" },
  TriggerModal: { open: "onOpenChange" },
  FormModal: { open: "onOpenChange" },
  Popover: { open: "onOpenChange", defaultOpen: "onOpenChange" },
  HoverCard: { open: "onOpenChange", defaultOpen: "onOpenChange" },
  FixedScreenWidget: { open: "onOpenChange" },
  LoadingOverlay: { open: "onOpenChange" },
  Overlay: { open: "onOpenChange" },
  ContextMenu: { open: "onOpenChange", defaultOpen: "onOpenChange" },
}

export function applyInteractivePreviewProps(
  componentName: string,
  props: Record<string, unknown>,
  live: Record<string, unknown>,
  setLive: Dispatch<SetStateAction<Record<string, unknown>>>,
  onPropsChange?: (patch: Record<string, unknown>) => void
): Record<string, unknown> {
  const bindings = BINDINGS[componentName]
  if (!bindings) return props

  const merged = { ...props, ...live }

  for (const [prop, handler] of Object.entries(bindings)) {
    const handlerFn = (next: unknown) => {
      setLive((prev) => ({ ...prev, [prop]: next }))
      onPropsChange?.({ [prop]: next })
      const external = props[handler]
      if (typeof external === "function") (external as (v: unknown) => void)(next)
    }
    merged[handler] = handlerFn
    if (live[prop] !== undefined) {
      merged[prop] = live[prop]
    } else if (props[prop] !== undefined) {
      merged[prop] = props[prop]
    }
  }

  return merged
}
