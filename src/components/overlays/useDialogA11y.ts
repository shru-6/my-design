import * as React from "react"

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

function focusableWithin(root: HTMLElement | null): HTMLElement[] {
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el === root
  )
}

/**
 * Remembers what had focus while `open` flipped true and hands it back when it
 * flips false. Used by the modal family and by `Dropdown` (a menu is expected
 * to return focus to its trigger on close).
 *
 * `triggerRef` — a wrapper around the trigger — wins over the remembered
 * element when it holds something focusable. Safari does not focus a `<button>`
 * on click, so "whatever was focused when we opened" is not reliable on its own
 * for click-opened menus.
 */
export function useReturnFocusOnClose(
  open: boolean,
  options?: { enabled?: boolean; triggerRef?: React.RefObject<HTMLElement | null> }
) {
  const enabled = options?.enabled ?? true
  const triggerRef = options?.triggerRef
  const previous = React.useRef<HTMLElement | null>(null)
  const wasOpen = React.useRef(false)

  React.useEffect(() => {
    if (!enabled) return
    if (open) {
      if (!wasOpen.current) {
        wasOpen.current = true
        previous.current =
          typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null
      }
      return
    }
    if (!wasOpen.current) return
    wasOpen.current = false
    const remembered = previous.current
    previous.current = null
    const fromTrigger =
      triggerRef?.current?.matches?.(FOCUSABLE_SELECTOR) === true
        ? triggerRef.current
        : focusableWithin(triggerRef?.current ?? null)[0] ?? null
    const target = fromTrigger ?? remembered
    if (target && typeof target.focus === "function" && target.isConnected) target.focus()
  }, [open, enabled, triggerRef])
}

export interface UseDialogA11yOptions {
  open: boolean
  /** Called on Escape (when `closeOnEscape`). */
  onClose?: () => void
  closeOnEscape?: boolean
  /** Focused instead of the first tabbable child when the dialog opens. */
  initialFocus?: React.RefObject<HTMLElement | null>
  /** Set false to leave focus alone entirely (non-modal surfaces). */
  enabled?: boolean
}

/**
 * Minimal modal-dialog behavior: focus moves into the surface on open, Tab and
 * Shift+Tab cycle inside it, Escape closes, focus returns to whatever opened it.
 *
 * Deliberately not a full focus-trap library — it does not guard against
 * programmatic focus moves or shadow-DOM content. Attach the returned ref to
 * the dialog surface (the panel), never to the backdrop.
 */
export function useDialogA11y({
  open,
  onClose,
  closeOnEscape = true,
  initialFocus,
  enabled = true,
}: UseDialogA11yOptions) {
  const surfaceRef = React.useRef<HTMLDivElement>(null)

  useReturnFocusOnClose(open, { enabled })

  React.useEffect(() => {
    if (!enabled || !open) return
    const raf = requestAnimationFrame(() => {
      const surface = surfaceRef.current
      if (!surface) return
      if (surface.contains(document.activeElement)) return
      const target = initialFocus?.current ?? focusableWithin(surface)[0] ?? surface
      target.focus()
    })
    return () => cancelAnimationFrame(raf)
  }, [enabled, open, initialFocus])

  React.useEffect(() => {
    if (!enabled || !open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!closeOnEscape) return
        e.stopPropagation()
        onClose?.()
        return
      }
      if (e.key !== "Tab") return
      const surface = surfaceRef.current
      if (!surface) return
      const nodes = focusableWithin(surface)
      if (nodes.length === 0) {
        e.preventDefault()
        surface.focus()
        return
      }
      const first = nodes[0]!
      const last = nodes[nodes.length - 1]!
      const active = document.activeElement
      const inside = surface.contains(active)
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown, true)
    return () => document.removeEventListener("keydown", onKeyDown, true)
  }, [enabled, open, closeOnEscape, onClose])

  return surfaceRef
}
