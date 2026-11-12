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

  /**
   * Dismiss timers, keyed by toast id and owned across renders.
   *
   * The previous version built a fresh timer array inside an effect that
   * depended on `visible` — a newly sliced array on every render — so pushing
   * one new toast tore down and restarted the countdown of every toast already
   * on screen. A toast could sit there indefinitely as long as new ones kept
   * arriving. Timers are now created once per toast and only cleared when that
   * toast actually leaves the queue.
   */
  const timers = React.useRef(new Map<string, number>())
  const visibleRef = React.useRef(visible)
  visibleRef.current = visible

  // Keyed on membership, not array identity — a re-render that produces the
  // same ids in the same order is a no-op.
  const visibleKey = visible.map((item) => item.id).join("|")

  React.useEffect(() => {
    const current = visibleRef.current
    const liveIds = new Set(current.map((item) => item.id))

    for (const [id, handle] of timers.current) {
      if (!liveIds.has(id)) {
        clearTimeout(handle)
        timers.current.delete(id)
      }
    }

    for (const item of current) {
      if (!item.duration || item.duration <= 0) continue
      if (timers.current.has(item.id)) continue
      timers.current.set(
        item.id,
        window.setTimeout(() => {
          timers.current.delete(item.id)
          dismissToast(item.id)
        }, item.duration)
      )
    }
  }, [visibleKey])

  // Unmount only — the per-toast cleanup above handles everything else.
  React.useEffect(() => {
    const handles = timers.current
    return () => {
      handles.forEach((handle) => clearTimeout(handle))
      handles.clear()
    }
  }, [])

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
