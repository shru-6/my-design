/**
 * Z-index layer values — keep in sync with scripts/tokens/base.json `z.*` and tailwind preset.
 * Use Tailwind classes (`z-overlay`, etc.) in components when possible; use these for inline styles.
 */
export const zLayers = {
  sticky: 10,
  dropdown: 20,
  overlay: 40,
  modal: 50,
  toast: 60,
} as const

export type ZLayer = keyof typeof zLayers

export function zLayerValue(layer: ZLayer): number {
  return zLayers[layer]
}

/** Local stacking inside OverlayPortalScope (`container="parent"`). */
export const zScoped = {
  overlay: 10,
  surface: 20,
  control: 30,
} as const
