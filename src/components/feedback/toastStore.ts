import * as React from "react"
import type { ToastProps } from "./Toast"

export type ToastRecord = ToastProps & { id: string }

type ToastListener = (toasts: ToastRecord[]) => void

let toasts: ToastRecord[] = []
const listeners = new Set<ToastListener>()

function emit() {
  listeners.forEach((listener) => listener([...toasts]))
}

function genId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function subscribeToasts(listener: ToastListener) {
  listeners.add(listener)
  listener([...toasts])
  return () => {
    listeners.delete(listener)
  }
}

export function dismissToast(id: string) {
  const item = toasts.find((t) => t.id === id)
  toasts = toasts.filter((t) => t.id !== id)
  item?.onClose?.()
  emit()
}

export function toast(input: Omit<ToastProps, "id">) {
  const id = genId()
  const record: ToastRecord = { id, duration: 5000, dismissible: true, ...input }
  toasts = [...toasts, record]
  emit()
  return id
}

export function clearToasts() {
  toasts = []
  emit()
}

export function useToastQueue() {
  const [items, setItems] = React.useState<ToastRecord[]>([])

  React.useEffect(() => subscribeToasts(setItems), [])

  return {
    toasts: items,
    toast,
    dismiss: dismissToast,
    clear: clearToasts,
  }
}
