import * as React from "react"
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelGroupHandle,
  type ImperativePanelHandle,
  type PanelGroupProps,
  type PanelProps,
  type PanelResizeHandleProps,
} from "react-resizable-panels"
import { GripVertical } from "lucide-react"
import { cn } from "../../utils"

export const ResizablePanelGroup = React.forwardRef<ImperativePanelGroupHandle, PanelGroupProps>(
  ({ className, ...props }, ref) => (
    <PanelGroup
      ref={ref}
      className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
      {...props}
    />
  )
) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PanelGroupProps> & React.RefAttributes<ImperativePanelGroupHandle>
>
ResizablePanelGroup.displayName = "ResizablePanelGroup"

export const ResizablePanel = React.forwardRef<ImperativePanelHandle, PanelProps>((props, ref) => (
  <Panel ref={ref} {...props} />
)) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PanelProps> & React.RefAttributes<ImperativePanelHandle>
>
ResizablePanel.displayName = "ResizablePanel"

export interface ResizableHandleProps extends PanelResizeHandleProps {
  /** Visual grip in the handle track. */
  withHandle?: boolean
}

export function ResizableHandle({ className, withHandle, children, ...props }: ResizableHandleProps) {
  return (
    <PanelResizeHandle
      className={cn(
        "relative flex w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
        className
      )}
      {...props}
    >
      {children ??
        (withHandle ? (
          <span className="z-10 flex h-7 w-4 items-center justify-center rounded-sm border border-border bg-muted">
            <GripVertical className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
          </span>
        ) : null)}
    </PanelResizeHandle>
  )
}
ResizableHandle.displayName = "ResizableHandle"
