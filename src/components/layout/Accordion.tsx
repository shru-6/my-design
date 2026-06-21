import * as React from "react"
import { cn } from "../../utils"
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

export function Accordion({
  items = [],
  type = "single",
  value,
  defaultValue,
  onChange,
  className,
  ...props
}: AccordionProps) {
  const multiple = type === "multiple"
  const initial = asArray(multiple, defaultValue)
  const [internal, setInternal] = React.useState<string[]>(initial)
  const isControlled = value !== undefined
  const openValues = asArray(multiple, isControlled ? value : internal)

  const setOpen = (panel: string, nextOpen: boolean) => {
    let next: string[]
    if (multiple) {
      if (nextOpen) next = [...new Set([...openValues, panel])]
      else next = openValues.filter((v) => v !== panel)
    } else {
      next = nextOpen ? [panel] : []
    }
    if (!isControlled) setInternal(next)
    onChange?.(multiple ? next : (next[0] ?? ""))
  }

  return (
    <div className={cn("w-full divide-y divide-border rounded-md border border-border", className)} {...props}>
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
          <div key={item.value} className="px-2 py-1 first:pt-2 last:pb-2">
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
}

Accordion.displayName = "Accordion"
