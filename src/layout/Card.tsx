import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

export const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col rounded-lg border shadow-sm overflow-hidden",
  {
    variants: {
      variant: {
        minimal: "border-0 shadow-none bg-transparent",
        filled: "bg-muted border-0 text-muted-foreground",
        subtle: "bg-muted/30 border-muted/50 text-foreground",
        outlined: "bg-background border-border text-foreground",
      },
      size: {
        xs: "gap-0",
        sm: "gap-0",
        md: "gap-0",
        lg: "gap-0",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "md",
    },
  }
)

const cardSizeVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

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
        interactive && "cursor-pointer transition-all hover:shadow-md",
        className
      )}
      style={style}
      onClick={handleClick}
      {...props}
    >
      {header && (
        <CardHeader size={size}>
          {header}
        </CardHeader>
      )}
      <CardContent 
        size={size}
        style={contentHeight ? {
          height: typeof contentHeight === "number" ? `${contentHeight}px` : contentHeight
        } : undefined}
      >
        {children}
      </CardContent>
      {footer && (
        <CardFooter size={size}>
          {footer}
        </CardFooter>
      )}
    </div>
  )
}

function CardHeader({ 
  className, 
  size, 
  left,
  right,
  children,
  ...props 
}: React.ComponentProps<"div"> & { 
  size?: "xs" | "sm" | "md" | "lg" | null
  left?: React.ReactNode
  right?: React.ReactNode
}) {
  const sizePadding = {
    xs: "py-1.5 px-2",
    sm: "py-2 px-3",
    md: "py-3 px-4",
    lg: "py-4 px-6",
  }
  
  const effectiveSize = size || "md"
  
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex items-center justify-between",
        "sticky top-0 z-10 bg-card/95 backdrop-blur-sm",
        sizePadding[effectiveSize],
        cardSizeVariants({ size: effectiveSize }),
        className
      )}
      {...props}
    >
      {left && <div data-slot="card-header-left" className="w-fit">{left}</div>}
      {children && <div data-slot="card-header-content" className="w-full">{children}</div>}
      {right && <div data-slot="card-header-right" className="w-fit">{right}</div>}
    </div>
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

function CardContent({ className, size, ...props }: React.ComponentProps<"div"> & { size?: "xs" | "sm" | "md" | "lg" | null }) {
  const sizePadding = {
    xs: "py-2.5 px-3",
    sm: "py-3 px-4",
    md: "py-4 px-6",
    lg: "py-5 px-8",
  }
  
  const effectiveSize = size || "md"
  
  return (
    <div
      data-slot="card-content"
      className={cn(
        // Add scrollable content styles by default (can be overridden)
        "flex-1 min-h-0 overflow-auto",
        sizePadding[effectiveSize],
        cardSizeVariants({ size: effectiveSize }),
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ 
  className, 
  size, 
  left,
  right,
  children,
  ...props 
}: React.ComponentProps<"div"> & { 
  size?: "xs" | "sm" | "md" | "lg" | null
  left?: React.ReactNode
  right?: React.ReactNode
}) {
  const sizePadding = {
    xs: "py-2.5 px-3 [.border-t]:pt-2.5",
    sm: "py-3 px-4 [.border-t]:pt-3",
    md: "py-4 px-6 [.border-t]:pt-4",
    lg: "py-5 px-8 [.border-t]:pt-5",
  }
  
  const effectiveSize = size || "md"
  
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between",
        "sticky bottom-0 z-10 bg-card/95 backdrop-blur-sm",
        sizePadding[effectiveSize],
        cardSizeVariants({ size: effectiveSize }),
        className
      )}
      {...props}
    >
      {left !== undefined || right !== undefined ? (
        <>
          {left && <div data-slot="card-footer-left">{left}</div>}
          {children && <div data-slot="card-footer-content">{children}</div>}
          {right && <div data-slot="card-footer-right">{right}</div>}
        </>
      ) : (
        children
      )}
    </div>
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
