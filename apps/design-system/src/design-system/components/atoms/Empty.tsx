import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PackageIcon } from "lucide-react"
import { Button } from "./Button"

import { cn } from "../utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariantsConfig = {
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
    },
  },
  defaultVariants: {
    variant: "default" as const,
  },
} as const

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  emptyMediaVariantsConfig
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
  emptyMediaVariants,
}

export function EmptyShowcase() {
  const variants = Object.keys(emptyMediaVariantsConfig.variants.variant) as Array<keyof typeof emptyMediaVariantsConfig.variants.variant>
  
  return (
    <div className="space-y-6">
      {variants.map((variant) => (
        <div key={variant}>
          <h4 className="text-sm font-medium mb-3">
            {variant === "default" ? "Default Empty State" : "Empty with Icon Variant"}
          </h4>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={variant}>
                <PackageIcon className={variant === "default" ? "size-8" : undefined} />
              </EmptyMedia>
              <EmptyTitle>
                {variant === "default" ? "No items found" : "No projects"}
              </EmptyTitle>
              <EmptyDescription>
                {variant === "default" 
                  ? "You haven't added any items yet. Get started by creating a new item."
                  : "Get started by creating a new project."}
              </EmptyDescription>
            </EmptyHeader>
            {variant === "icon" && <Button className="mt-4">Create Project</Button>}
          </Empty>
        </div>
      ))}
    </div>
  )
}

