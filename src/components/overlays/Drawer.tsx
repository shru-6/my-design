import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Card, type CardProps } from "../layout/Card"
import { Overlay, type OverlayPortalContainer } from "./Overlay"
import { useControllableOpen } from "./useControllableOpen"

const drawerVariants = cva("relative flex flex-col border-border bg-card shadow-lg", {
  variants: {
    placement: {
      top: "w-full border-b",
      bottom: "w-full border-t",
      left: "h-full border-r",
      right: "h-full border-l",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
      full: "",
    },
    variant: {
      default: "rounded-none",
      sheet: "",
    },
  },
  compoundVariants: [
    { placement: "bottom", variant: "sheet", class: "rounded-t-xl" },
    { placement: "top", variant: "sheet", class: "rounded-b-xl" },
    { placement: "left", variant: "sheet", class: "rounded-r-xl" },
    { placement: "right", variant: "sheet", class: "rounded-l-xl" },
    { placement: ["top", "bottom"], size: "sm", class: "max-h-[30vh]" },
    { placement: ["top", "bottom"], size: "md", class: "max-h-[50vh]" },
    { placement: ["top", "bottom"], size: "lg", class: "max-h-[70vh]" },
    { placement: ["top", "bottom"], size: "xl", class: "max-h-[85vh]" },
    { placement: ["top", "bottom"], size: "full", class: "max-h-full" },
    { placement: ["left", "right"], size: "sm", class: "max-w-xs" },
    { placement: ["left", "right"], size: "md", class: "max-w-sm" },
    { placement: ["left", "right"], size: "lg", class: "max-w-md" },
    { placement: ["left", "right"], size: "xl", class: "max-w-lg" },
    { placement: ["left", "right"], size: "full", class: "max-w-full" },
  ],
  defaultVariants: {
    placement: "right",
    size: "md",
    variant: "default",
  },
})

export type DrawerPlacement = NonNullable<VariantProps<typeof drawerVariants>["placement"]>
export type DrawerSize = NonNullable<VariantProps<typeof drawerVariants>["size"]>
export type DrawerVariant = NonNullable<VariantProps<typeof drawerVariants>["variant"]>

const overlayAlign: Record<DrawerPlacement, string> = {
  top: "flex items-start justify-center p-0",
  bottom: "flex items-end justify-center p-0",
  left: "flex items-stretch justify-start p-0",
  right: "flex items-stretch justify-end p-0",
}

export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  showClose?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  cardProps?: Omit<CardProps, "header" | "footer" | "children">
  container?: OverlayPortalContainer
  children?: React.ReactNode
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open: openProp,
    defaultOpen,
    onOpenChange,
    showClose = true,
    header,
    footer,
    placement,
    size,
    variant,
    className,
    cardProps,
    container,
    children,
  },
  ref
) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange })
  const resolvedPlacement = placement ?? "right"

  const handleClose = React.useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const resolvedHeader =
    header || showClose ? (
      <div className="flex items-start justify-between gap-3">
        {header ? <div className="min-w-0 flex-1">{header}</div> : <span />}
        {showClose ? (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            ariaLabel="Close"
            left={<X className="h-4 w-4" />}
            onClick={handleClose}
            className="shrink-0"
          />
        ) : null}
      </div>
    ) : undefined

  return (
    <Overlay
      open={open}
      onClose={handleClose}
      container={container}
      blur
      showCloseButton={false}
      className={overlayAlign[resolvedPlacement]}
    >
      <Card
        ref={ref}
        data-slot="drawer"
        header={resolvedHeader}
        footer={footer}
        variant="surface-1"
        size="md"
        {...cardProps}
        className={cn(
          drawerVariants({ placement: resolvedPlacement, size, variant }),
          className,
          cardProps?.className
        )}
      >
        {children}
      </Card>
    </Overlay>
  )
})

Drawer.displayName = "Drawer"

export { drawerVariants }
