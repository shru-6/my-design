import * as React from "react"

/** Safety net: reveal even if the two rAFs never land (background tab, reduced motion shims). */
const REVEAL_FALLBACK_MS = 48

/**
 * The portal reveal cycle, in one place: measure → rAF → rAF → reveal, plus
 * reposition on scroll/resize, with every timer and listener cleaned up.
 *
 * `useFloatingMenu` (menus, pickers) and `Popover` (which needs its own
 * placement math and so cannot use `useFloatingMenu` wholesale) both consume
 * this rather than each keeping a copy.
 *
 * Pass a **stable** `updatePosition` (`React.useCallback`) — it is an effect
 * dependency, so an inline function re-runs the cycle every render.
 */
export function usePositionedPortal(open: boolean, updatePosition: () => void) {
  const [positioned, setPositioned] = React.useState(false)

  React.useLayoutEffect(() => {
    if (!open) {
      setPositioned(false)
      return
    }
    setPositioned(false)
    updatePosition()
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      updatePosition()
      raf2 = requestAnimationFrame(() => setPositioned(true))
    })
    const fallback = window.setTimeout(() => setPositioned(true), REVEAL_FALLBACK_MS)
    const onReposition = () => updatePosition()
    window.addEventListener("scroll", onReposition, true)
    window.addEventListener("resize", onReposition)
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.clearTimeout(fallback)
      window.removeEventListener("scroll", onReposition, true)
      window.removeEventListener("resize", onReposition)
    }
  }, [open, updatePosition])

  return positioned
}

/** Keeps a not-yet-measured surface out of sight without unmounting it. */
export function withPortalVisibility(
  style: React.CSSProperties,
  positioned: boolean
): React.CSSProperties {
  return {
    ...style,
    visibility: positioned ? style.visibility ?? "visible" : "hidden",
  }
}
