import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "../../utils"
import { Link } from "../data-display/Link"
import { Text } from "../data-display/Text"
export interface BreadcrumbItem {
  label: React.ReactNode
  href?: string
  /** Marks the current page (renders as Text, not a link). */
  current?: boolean
}

export interface BreadcrumbProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "children"> {
  items: BreadcrumbItem[]
  /** Shown between items; default chevron. */
  separator?: React.ReactNode
  /** Collapse middle segments when items.length exceeds this (keeps first + last). */
  maxItems?: number
  className?: string
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, maxItems, className, "aria-label": ariaLabel = "Breadcrumb", ...props }, ref) => {
    const sep = separator ?? <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />

    const visible = React.useMemo(() => {
      if (!maxItems || items.length <= maxItems) return items
      const first = items[0]
      const last = items[items.length - 1]
      const middle = items.slice(1, -1)
      if (!first || !last) return items
      return [
        first,
        { label: <MoreHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />, current: false } as BreadcrumbItem,
        last,
      ]
    }, [items, maxItems])

    return (
      <nav ref={ref as React.Ref<HTMLElement>} aria-label={ariaLabel} className={cn("w-full", className)} {...props}>
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {visible.map((item, i) => {
            const isLast = i === visible.length - 1
            const isCurrent = Boolean(item.current) || isLast

            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 ? <span className="flex select-none items-center">{sep}</span> : null}
                {isCurrent || !item.href ? (
                  <Text
                    as="span"
                    size="sm"
                    variant={isCurrent ? "default" : "muted"}
                    weight={isCurrent ? "medium" : "normal"}
                    aria-current={isCurrent ? "page" : undefined}
                    className="max-w-[12rem] truncate"
                  >
                    {item.label}
                  </Text>
                ) : (
                  <Link href={item.href} variant="muted" className="max-w-[12rem] truncate">
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }
)

Breadcrumb.displayName = "Breadcrumb"
