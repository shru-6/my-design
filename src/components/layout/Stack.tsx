import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    direction: "column",
    gap: "md",
    wrap: false,
  },
})

export type StackRootTag = "div" | "ul" | "ol"

export interface StackProps<T = unknown>
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    VariantProps<typeof stackVariants> {
  /** Semantic wrapper (`ul` / `ol` for lists). Default `div`. */
  as?: StackRootTag
  className?: string
  items: readonly T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getItemKey?: (item: T, index: number) => React.Key
}

const StackInner = <T,>(
  {
    as = "div",
    direction,
    gap,
    align,
    justify,
    wrap,
    className,
    items,
    renderItem,
    getItemKey,
    ...props
  }: StackProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const Comp = as as React.ElementType
  return (
    <Comp
      ref={ref}
      data-slot="stack"
      className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={getItemKey?.(item, index) ?? index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </Comp>
  )
}

export const Stack = Object.assign(
  React.forwardRef(StackInner) as <T>(
    props: StackProps<T> & React.RefAttributes<HTMLElement>
  ) => React.ReactElement | null,
  { displayName: "Stack" }
)
export { stackVariants }
