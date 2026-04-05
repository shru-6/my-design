import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const tooltipContentVariants = cva(
  [
    "z-[60] max-w-xs overflow-visible rounded-md px-3 py-1.5 text-xs shadow-md",
    "transition-opacity duration-200 ease-out",
    "opacity-0 data-[state=delayed-open]:opacity-100 data-[state=instant-open]:opacity-100 data-[state=closed]:opacity-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        inverted: "bg-foreground text-background",
        info: "border border-info/40 bg-info/15 text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tooltipArrowVariants = cva("", {
  variants: {
    variant: {
      default: "fill-primary",
      inverted: "fill-foreground",
      info: "fill-info/35",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TooltipPlacement = "top" | "bottom" | "left" | "right"

export interface TooltipProps {
  content: React.ReactNode
  openDelay?: number
  disabled?: boolean
  children: React.ReactNode
  placement?: TooltipPlacement
  className?: string
  variant?: VariantProps<typeof tooltipContentVariants>["variant"]
}

export function Tooltip({
  content,
  openDelay = 300,
  disabled,
  children,
  placement = "top",
  className,
  variant,
}: TooltipProps) {
  const trigger = React.isValidElement(children) ? (
    children
  ) : (
    <span className="inline-flex">{children}</span>
  )

  return (
    <TooltipPrimitive.Provider delayDuration={openDelay} skipDelayDuration={200}>
      <TooltipPrimitive.Root delayDuration={openDelay}>
        <TooltipPrimitive.Trigger asChild disabled={disabled}>
          {trigger}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={placement}
            sideOffset={6}
            className={cn(tooltipContentVariants({ variant }), className)}
          >
            {content}
            <TooltipPrimitive.Arrow
              width={11}
              height={5}
              className={cn(tooltipArrowVariants({ variant }))}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export const TooltipProvider = TooltipPrimitive.Provider
export type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>
export { tooltipContentVariants, tooltipArrowVariants }
