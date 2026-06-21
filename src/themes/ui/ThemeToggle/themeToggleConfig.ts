/**
 * Theme Toggle Configuration
 * Constants and configuration for theme toggle component
 */

import type React from "react"
import { zLayerValue } from "../../../utils/zIndex"

export type ThemeTogglePosition = "bottom-right" | "bottom-left" | "top-right" | "top-left"

export const PANEL_WIDTH = 300

/** Preview swatches for color themes (UI hint only — not token values). */
export const colorThemeSwatches: Record<string, { background: string; accent: string }> = {
  white: { background: "#ffffff", accent: "#3b82f6" },
  dark: { background: "#111827", accent: "#818cf8" },
  ocean: { background: "#f0fdfa", accent: "#0d9488" },
  forest: { background: "#f0fdf4", accent: "#16a34a" },
  rose: { background: "#fff1f2", accent: "#e11d48" },
  midnight: { background: "#0f172a", accent: "#6366f1" },
  brand: { background: "#faf5ff", accent: "#9333ea" },
  minimal: { background: "#fafafa", accent: "#374151" },
}

export const categoryIcons: Record<string, string> = {
  color: "🎨",
  typography: "📝",
  shape: "🔲",
  density: "📏",
  animation: "✨",
  custom: "🎯",
}

export const positionClasses = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
} as const

/** Panel placement relative to the FAB corner. */
export function getPanelPlacement(position: ThemeTogglePosition): "above" | "below" {
  return position.startsWith("bottom") ? "above" : "below"
}

export function computePanelStyle(
  triggerRect: DOMRect,
  position: ThemeTogglePosition,
  gap = 12
): React.CSSProperties {
  const alignRight = position.endsWith("right")
  const alignLeft = position.endsWith("left")
  const above = getPanelPlacement(position) === "above"

  const style: React.CSSProperties = {
    position: "fixed",
    width: PANEL_WIDTH,
    maxHeight: "min(70vh, 420px)",
    zIndex: zLayerValue("modal"),
  }

  if (above) {
    style.bottom = window.innerHeight - triggerRect.top + gap
  } else {
    style.top = triggerRect.bottom + gap
  }

  if (alignRight) {
    style.right = Math.max(12, window.innerWidth - triggerRect.right)
  }

  if (alignLeft) {
    style.left = Math.max(12, triggerRect.left)
  }

  return style
}

/** @deprecated Radial menu removed — kept for backward-compatible exports. */
export function getArcConfig(position: ThemeTogglePosition) {
  switch (position) {
    case "bottom-right":
      return { startAngle: -60, endAngle: -180, sweep: -150 }
    case "bottom-left":
      return { startAngle: -120, endAngle: 0, sweep: 150 }
    case "top-right":
      return { startAngle: 60, endAngle: 0, sweep: 150 }
    case "top-left":
      return { startAngle: 120, endAngle: 0, sweep: -150 }
  }
}
