import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Text } from "../data-display/Text"

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function paginationWindow(current: number, totalPages: number, siblingCount: number): (number | "ellipsis")[] {
  if (totalPages <= 0) return []
  const totalNumbers = siblingCount * 2 + 3
  if (totalPages <= totalNumbers) return range(1, totalPages)

  const left = Math.max(2, current - siblingCount)
  const right = Math.min(totalPages - 1, current + siblingCount)
  const showLeftEllipsis = left > 2
  const showRightEllipsis = right < totalPages - 1

  const items: (number | "ellipsis")[] = [1]
  if (showLeftEllipsis) items.push("ellipsis")
  items.push(...range(left, right))
  if (showRightEllipsis) items.push("ellipsis")
  items.push(totalPages)
  return items
}

export interface PaginationProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "children" | "onChange"> {
  /** Total number of records (not pages). */
  total: number
  pageSize?: number
  /** 1-based current page. */
  value?: number
  defaultValue?: number
  onChange?: (page: number) => void
  /** Precomputed page count; if omitted, derived from total / pageSize. */
  pageCount?: number
  siblingCount?: number
  showFirstLast?: boolean
  disabled?: boolean
  className?: string
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      total,
      pageSize = 10,
      value,
      defaultValue = 1,
      onChange,
      pageCount: pageCountProp,
      siblingCount = 1,
      showFirstLast = true,
      disabled,
      className,
      "aria-label": ariaLabel = "Pagination",
      ...props
    },
    ref
  ) => {
    const pageCount = Math.max(1, pageCountProp ?? Math.ceil(total / Math.max(1, pageSize)))
    const isControlled = value !== undefined
    const [internalPage, setInternalPage] = React.useState(() =>
      Math.min(Math.max(1, defaultValue), pageCount)
    )

    React.useEffect(() => {
      if (!isControlled) {
        setInternalPage((p) => Math.min(Math.max(1, p), pageCount))
      }
    }, [isControlled, pageCount])

    const current = isControlled ? Math.min(Math.max(1, value!), pageCount) : internalPage

    const setPage = (next: number) => {
      const clamped = Math.min(Math.max(1, next), pageCount)
      if (!isControlled) setInternalPage(clamped)
      onChange?.(clamped)
    }

    const windowItems = paginationWindow(current, pageCount, siblingCount)

    return (
      <nav
        ref={ref as React.Ref<HTMLElement>}
        aria-label={ariaLabel}
        className={cn("flex flex-wrap items-center justify-center gap-1", className)}
        {...props}
      >
        {showFirstLast ? (
          <Button
            variant="outline"
            size="sm"
            iconOnly
            aria-label="First page"
            disabled={disabled || current <= 1}
            onClick={() => setPage(1)}
            left={<ChevronsLeft className="h-4 w-4" />}
          />
        ) : null}
        <Button
          variant="outline"
          size="sm"
          iconOnly
          aria-label="Previous page"
          disabled={disabled || current <= 1}
          onClick={() => setPage(current - 1)}
          left={<ChevronLeft className="h-4 w-4" />}
        />

        {windowItems.map((item, i) =>
          item === "ellipsis" ? (
            <Text key={`e-${i}`} as="span" size="sm" variant="muted" className="px-1">
              …
            </Text>
          ) : (
            <Button
              key={item}
              variant={item === current ? "primary" : "outline"}
              size="sm"
              disabled={disabled}
              aria-label={`Page ${item}`}
              aria-current={item === current ? "page" : undefined}
              onClick={() => setPage(item)}
              className="min-w-9 px-2"
            >
              {item}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          iconOnly
          aria-label="Next page"
          disabled={disabled || current >= pageCount}
          onClick={() => setPage(current + 1)}
          left={<ChevronRight className="h-4 w-4" />}
        />
        {showFirstLast ? (
          <Button
            variant="outline"
            size="sm"
            iconOnly
            aria-label="Last page"
            disabled={disabled || current >= pageCount}
            onClick={() => setPage(pageCount)}
            left={<ChevronsRight className="h-4 w-4" />}
          />
        ) : null}
      </nav>
    )
  }
)

Pagination.displayName = "Pagination"
