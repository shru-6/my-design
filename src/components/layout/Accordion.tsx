import * as React from "react"
import { cn } from "../../utils"
import { disabledSurface } from "../inputs/fieldPieces"
import { useControllableValue } from "../../utils/useControllableValue"
import { Spinner } from "../data-display/Spinner"
import { Icon } from "../utilities/Icon"
import { Collapsible } from "./Collapsible"

export interface AccordionItem {
  value: string
  label: React.ReactNode
  content: React.ReactNode
  left?: React.ReactNode
  disabled?: boolean
  loading?: boolean
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  items: AccordionItem[]
  type?: "single" | "multiple"
  /** Selected panel value(s). */
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (next: string | string[]) => void
  className?: string
}

function asArray(multiple: boolean, v: string | string[] | undefined): string[] {
  if (v == null) return []
  if (multiple) return Array.isArray(v) ? v : typeof v === "string" && v ? [v] : []
  if (typeof v === "string" && v) return [v]
  if (Array.isArray(v)) return v.length ? [v[0]!] : []
  return []
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { items = [], type = "single", value, defaultValue, onChange, className, ...props },
  ref
) {
  const multiple = type === "multiple"
  const [selection, setSelection] = useControllableValue<string | string[]>({
    value,
    defaultValue: defaultValue ?? (multiple ? [] : ""),
    onChange,
  })
  const openValues = asArray(multiple, selection)

  const setOpen = (panel: string, nextOpen: boolean) => {
    let next: string[]
    if (multiple) {
      if (nextOpen) next = [...new Set([...openValues, panel])]
      else next = openValues.filter((v) => v !== panel)
    } else {
      next = nextOpen ? [panel] : []
    }
    setSelection(multiple ? next : (next[0] ?? ""))
  }

  return (
    <div
      ref={ref}
      data-slot="accordion"
      className={cn("w-full divide-y divide-border rounded-surface-md border border-border", className)}
      {...props}
    >
      {items.map((item) => {
        const open = openValues.includes(item.value)
        const trigger = (
          <span className="flex min-w-0 items-center gap-2">
            {item.left ? <Icon node={item.left} size="sm" /> : null}
            <span className="min-w-0 flex-1">{item.label}</span>
            {item.loading ? <Spinner size="sm" /> : null}
          </span>
        )

        return (
          <div
            key={item.value}
            // A disabled row is a `<div>`, not a `<button disabled>`, so the
            // whole row (revealed content included) reads its dimming from the
            // attribute-driven `disabledSurface` token. The trigger inside is
            // still a real disabled button for keyboard/AT, but it must not
            // dim a second time — 0.6 × 0.6 is far fainter than either alone.
            data-disabled={item.disabled ? "true" : undefined}
            className={cn(
              "px-2 py-1 first:pt-2 last:pb-2",
              disabledSurface,
              "data-[disabled=true]:[&_button]:opacity-100"
            )}
          >
            <Collapsible
              open={open}
              onOpenChange={(o) => setOpen(item.value, o)}
              trigger={trigger}
              disabled={item.disabled}
              showContentDivider={false}
              className="border-0"
            >
              {item.content}
            </Collapsible>
          </div>
        )
      })}
    </div>
  )
})

Accordion.displayName = "Accordion"
