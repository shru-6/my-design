interface PreviewStageProps {
  children: React.ReactNode
  className?: string
  /** Allow menus/modals portaled to body to extend outside the card. */
  overflowVisible?: boolean
}

/**
 * Preview viewport inside a gallery card. Uses `isolate` only — no transform — so
 * portaled overlays (Dropdown, Popover) position correctly against the trigger.
 * In-card fixed UI should use `OverlayPortalScope` + `container="parent"`.
 */
export function PreviewStage({
  children,
  className = "",
  overflowVisible = false,
}: PreviewStageProps) {
  return (
    <div
      className={`relative isolate flex min-h-[7rem] items-center justify-center rounded-lg border border-border bg-muted/40 p-4 ${overflowVisible ? "overflow-visible" : "overflow-hidden"} ${className}`}
    >
      {children}
    </div>
  )
}
