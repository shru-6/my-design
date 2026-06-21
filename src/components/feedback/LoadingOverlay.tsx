import * as React from "react"
import { cn } from "../../utils"
import { Spinner } from "../data-display/Spinner"
import { Overlay, type OverlayProps } from "../overlays/Overlay"

export interface LoadingOverlayProps {
  open: boolean
  message?: React.ReactNode
  blur?: boolean
  className?: string
  container?: OverlayProps["container"]
  /** Spinner size; defaults scale with typical overlay use. */
  spinnerSize?: React.ComponentProps<typeof Spinner>["size"]
}

export function LoadingOverlay({
  open,
  message,
  blur = false,
  className,
  container,
  spinnerSize = "lg",
}: LoadingOverlayProps) {
  return (
    <Overlay
      open={open}
      blur={blur}
      closeOnBackdropClick={false}
      container={container}
      className={cn("flex items-center justify-center p-6", className)}
    >
      <div className="flex max-w-sm flex-col items-center gap-3 text-center">
        <Spinner size={spinnerSize} />
        {message != null && message !== "" ? (
          <div className="text-sm text-muted-foreground">{message}</div>
        ) : null}
      </div>
    </Overlay>
  )
}

LoadingOverlay.displayName = "LoadingOverlay"
