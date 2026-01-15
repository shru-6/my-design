import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm",
  {
    variants: {
      variant: {
        minimal: "border-0 shadow-none bg-transparent",
        filled: "bg-muted border-0",
        subtle: "bg-muted/50 border-muted",
        outlined: "bg-transparent border-2",
      },
      size: {
        xs: "gap-3 py-3 text-xs",
        sm: "gap-4 py-4 text-sm",
        md: "gap-6 py-6 text-base",
        lg: "gap-8 py-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "md",
    },
  }
)

export interface CardProps 
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode
  footer?: React.ReactNode
  maxHeight?: string | number
  maxWidth?: string | number
  contentHeight?: string | number
  interactive?: boolean
}

function Card({ 
  className, 
  variant, 
  size,
  header,
  footer,
  children,
  maxHeight,
  maxWidth,
  contentHeight,
  interactive,
  onClick,
  ...props 
}: CardProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && onClick) {
      e.stopPropagation()
      onClick(e)
    } else if (onClick) {
      onClick(e)
    }
  }

  const style: React.CSSProperties = {}
  if (maxHeight) {
    style.maxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
  }
  if (maxWidth) {
    style.maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth
  }

  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant, size }),
        interactive && "cursor-pointer",
        className
      )}
      style={style}
      onClick={handleClick}
      {...props}
    >
      {header && (
        <CardHeader className="sticky top-0 z-10 bg-card border-b">
          {header}
        </CardHeader>
      )}
      <CardContent 
        className={cn(
          "flex-1 min-h-0 overflow-auto"
        )}
        style={contentHeight ? {
          height: typeof contentHeight === "number" ? `${contentHeight}px` : contentHeight
        } : undefined}
      >
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="sticky bottom-0 z-10 bg-card border-t">
          {footer}
        </CardFooter>
      )}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
