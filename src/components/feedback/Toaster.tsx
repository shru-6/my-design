import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../utils"
import { Toast } from "./Toast"
import { dismissToast, subscribeToasts, type ToastRecord } from "./toastStore"

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

const positionClasses: Record<ToasterPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
}

export interface ToasterProps {
  position?: ToasterPosition
  maxVisible?: number
  className?: string
}

export function Toaster({ position = "bottom-right", maxVisible = 5, className }: ToasterProps) {
  const [items, setItems] = React.useState<ToastRecord[]>([])

  React.useEffect(() => subscribeToasts(setItems), [])

  const visible = items.slice(-maxVisible)

  React.useEffect(() => {
    const timers = visible.map((item) => {
      if (!item.duration || item.duration <= 0) return null
      return window.setTimeout(() => dismissToast(item.id), item.duration)
    })
    return () => timers.forEach((t) => t != null && clearTimeout(t))
  }, [visible])

  if (typeof document === "undefined") return null

  return createPortal(
    <div
      aria-live="polite"
      aria-relevant="additions"
      className={cn(
        "pointer-events-none fixed z-toast flex w-full max-w-sm flex-col gap-2",
        positionClasses[position],
        className
      )}
    >
      {visible.map((item) => (
        <Toast
          key={item.id}
          {...item}
          onClose={() => dismissToast(item.id)}
        />
      ))}
    </div>,
    document.body
  )
}

Toaster.displayName = "Toaster"

export { toast, dismissToast, clearToasts } from "./toastStore"
