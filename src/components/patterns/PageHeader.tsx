import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Text } from "../data-display/Text"
import { Pill } from "../data-display/Pill"
import { Separator } from "../layout/Separator"
import { Icon } from "../utilities/Icon"

const pageHeaderVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "rounded-lg border border-border bg-card/40 px-4 py-3",
      minimal: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof pageHeaderVariants> {
  heading?: React.ReactNode
  subheading?: React.ReactNode
  description?: React.ReactNode
  badge?: React.ReactNode
  actions?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  sticky?: boolean
  separator?: boolean
  className?: string
  children?: React.ReactNode
}

export function PageHeader({
  heading,
  subheading,
  description,
  badge,
  actions,
  left,
  right,
  sticky,
  separator,
  variant,
  className,
  children,
  ...props
}: PageHeaderProps) {
  const resolvedRight = right ?? actions

  return (
    <div
      data-slot="page-header"
      className={cn(
        pageHeaderVariants({ variant }),
        sticky && "sticky top-0 z-sticky bg-background/95 backdrop-blur",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {left ? (
            <span className="shrink-0 pt-0.5 text-muted-foreground">
              <Icon node={left} size="md" />
            </span>
          ) : null}
          <div className="min-w-0 flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              {heading ? (
                <Text as="div" size="lg" weight="semibold">
                  {heading}
                </Text>
              ) : null}
              {badge ? (
                typeof badge === "string" ? (
                  <Pill appearance="subtle">{badge}</Pill>
                ) : (
                  badge
                )
              ) : null}
            </div>
            {subheading ? (
              <Text as="div" size="sm" weight="medium" variant="muted">
                {subheading}
              </Text>
            ) : null}
            {description ? (
              <Text as="div" size="sm" variant="muted">
                {description}
              </Text>
            ) : null}
            {children}
          </div>
        </div>
        {resolvedRight ? <div className="flex shrink-0 flex-wrap items-center gap-2">{resolvedRight}</div> : null}
      </div>
      {separator ? <Separator className="mt-3" /> : null}
    </div>
  )
}

PageHeader.displayName = "PageHeader"

export { pageHeaderVariants }
