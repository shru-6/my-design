import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

export interface DescriptionItem {
  label: React.ReactNode
  value: React.ReactNode
}

const descriptionListVariants = cva("", {
  variants: {
    // These used to be two empty strings with the real classes living in a
    // ternary at the call site — the cva claimed to own a variant it didn't.
    layout: {
      horizontal: "grid grid-cols-[minmax(8rem,auto)_1fr] sm:grid-cols-[minmax(10rem,auto)_1fr]",
      vertical: "flex flex-col",
    },
    size: {
      sm: "gap-x-4 gap-y-1 text-sm",
      md: "gap-x-6 gap-y-2 text-sm",
    },
  },
  defaultVariants: {
    layout: "vertical",
    size: "md",
  },
})

export interface DescriptionListProps
  extends Omit<React.HTMLAttributes<HTMLDListElement>, "children">,
    VariantProps<typeof descriptionListVariants> {
  items: readonly DescriptionItem[]
}

export const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, items, layout = "vertical", size, ...props }, ref) => {
    const isHorizontal = layout === "horizontal"

    return (
      <dl
        ref={ref}
        data-slot="description-list"
        className={cn(descriptionListVariants({ layout, size }), className)}
        {...props}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <dt
              className={cn(
                "font-medium text-foreground",
                isHorizontal ? "col-start-1 py-1" : "pt-2 first:pt-0",
                !isHorizontal && "border-b border-border pb-1"
              )}
            >
              {item.label}
            </dt>
            <dd
              className={cn(
                "min-w-0 text-muted-foreground",
                isHorizontal ? "col-start-2 py-1" : "pb-2 last:pb-0"
              )}
            >
              {item.value}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    )
  }
)

DescriptionList.displayName = "DescriptionList"
export { descriptionListVariants }
