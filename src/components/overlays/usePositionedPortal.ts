import * as React from "react"

/** Waits for layout + menu measurement before revealing portaled overlays (avoids position flicker). */
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
    const onReposition = () => updatePosition()
    window.addEventListener("scroll", onReposition, true)
    window.addEventListener("resize", onReposition)
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.removeEventListener("scroll", onReposition, true)
      window.removeEventListener("resize", onReposition)
    }
  }, [open, updatePosition])

  return positioned
}

export function withPortalVisibility(
  style: React.CSSProperties,
  positioned: boolean
): React.CSSProperties {
  return {
    ...style,
    visibility: positioned ? style.visibility ?? "visible" : "hidden",
  }
}
