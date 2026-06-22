import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Text } from "../data-display/Text"
import { Icon } from "../utilities/Icon"

const tabsListVariants = cva("inline-flex h-10 items-center gap-1 rounded-md text-muted-foreground", {
  variants: {
    variant: {
      default: "bg-muted/50 p-1",
      underline: "h-auto gap-0 border-b border-border bg-transparent p-0",
      pill: "h-auto flex-wrap gap-2 bg-transparent p-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow-sm",
        underline:
          "rounded-none border-b-2 border-transparent px-3 pb-2 pt-1 aria-selected:border-primary aria-selected:text-foreground",
        pill:
          "rounded-full border border-transparent px-3 py-1.5 aria-selected:border-border aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TabItem {
  label: React.ReactNode
  value: string
  left?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  /** Panel body (`ReactNode` only — compose `Icon` or other nodes yourself). */
  content?: React.ReactNode
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
  variant?: VariantProps<typeof tabsListVariants>["variant"]
  className?: string
  listClassName?: string
  /** Applied to the active tab panel wrapper — use `flex min-h-0 flex-1 flex-col` for editor layouts. */
  panelClassName?: string
  contentClassName?: string
}

function firstEnabledValue(items: TabItem[]): string | undefined {
  return items.find((i) => !i.disabled)?.value ?? items[0]?.value
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      orientation = "horizontal",
      variant = "default",
      className,
      listClassName,
      panelClassName,
      contentClassName,
      value,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const autoDefault = value === undefined && defaultValue === undefined ? firstEnabledValue(items) : undefined
    const initial = defaultValue ?? autoDefault ?? ""
    const [internal, setInternal] = React.useState(initial)
    const isControlled = value !== undefined
    const active = isControlled ? value! : internal

    const setTab = (next: string) => {
      if (!isControlled) setInternal(next)
      onValueChange?.(next)
    }

    const enabledValues = React.useMemo(() => items.filter((i) => !i.disabled).map((i) => i.value), [items])
    const tabIds = React.useId()

    const onTabListKeyDown = (e: React.KeyboardEvent) => {
      const horizontal = orientation === "horizontal"
      const prevKey = horizontal ? "ArrowLeft" : "ArrowUp"
      const nextKey = horizontal ? "ArrowRight" : "ArrowDown"
      if (![prevKey, nextKey, "Home", "End"].includes(e.key)) return
      const idx = enabledValues.indexOf(active)
      if (idx < 0 && enabledValues.length) {
        e.preventDefault()
        setTab(enabledValues[0]!)
        return
      }
      let nextIdx = idx
      if (e.key === prevKey) nextIdx = Math.max(0, idx - 1)
      else if (e.key === nextKey) nextIdx = Math.min(enabledValues.length - 1, idx + 1)
      else if (e.key === "Home") nextIdx = 0
      else if (e.key === "End") nextIdx = enabledValues.length - 1
      if (nextIdx !== idx && enabledValues[nextIdx]) {
        e.preventDefault()
        setTab(enabledValues[nextIdx]!)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(orientation === "vertical" && "flex gap-4", className)}
        {...props}
      >
        <div
          role="tablist"
          aria-orientation={orientation}
          aria-label="Tabs"
          onKeyDown={onTabListKeyDown}
          className={cn(
            tabsListVariants({ variant }),
            orientation === "vertical" && "flex h-auto min-w-[10rem] flex-col items-stretch",
            listClassName
          )}
        >
          {items.map((item) => {
            const selected = active === item.value
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                id={`${tabIds}-tab-${item.value}`}
                aria-selected={selected}
                aria-controls={`${tabIds}-panel-${item.value}`}
                tabIndex={selected ? 0 : -1}
                disabled={item.disabled}
                className={cn(tabsTriggerVariants({ variant }))}
                onClick={() => !item.disabled && setTab(item.value)}
              >
                {item.left ? (
                  <span className="inline-flex shrink-0 text-muted-foreground">
                    <Icon node={item.left} size="sm" />
                  </span>
                ) : null}
                <span>{item.label}</span>
                {item.badge != null ? (
                  <Text as="span" size="2xs" variant="muted" className="tabular-nums">
                    {item.badge}
                  </Text>
                ) : null}
              </button>
            )
          })}
        </div>
        {items.map((item) => {
          const selected = active === item.value
          if (!selected) return null
          return (
            <div
              key={item.value}
              role="tabpanel"
              id={`${tabIds}-panel-${item.value}`}
              aria-labelledby={`${tabIds}-tab-${item.value}`}
              className={cn(
                "mt-3 min-h-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                orientation === "vertical" && "mt-0 flex-1",
                panelClassName
              )}
            >
              {item.content != null ? (
                <div className={cn("text-sm leading-relaxed text-foreground", contentClassName)}>
                  {item.content}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }
)

Tabs.displayName = "Tabs"
