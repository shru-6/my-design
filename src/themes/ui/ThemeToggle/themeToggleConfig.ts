/**
 * Theme Toggle Configuration
 * Constants and configuration for theme toggle component
 */

// Category icon mapping
export const categoryIcons: Record<string, string> = {
  color: "🎨",
  typography: "📝",
  shape: "🔲",
  density: "📏",
  animation: "✨",
}

// Position classes
export const positionClasses = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
} as const

// Get arc configuration based on position
export function getArcConfig(position: "bottom-right" | "bottom-left" | "top-right" | "top-left") {
  switch (position) {
    case "bottom-right":
      // Open towards top-left: arc from top to left
      return { startAngle: -60, endAngle: -180, sweep: -150 }
    case "bottom-left":
      // Open towards top-right: arc from top to right
      return { startAngle: -120, endAngle: 0, sweep: 150 }
    case "top-right":
      // Open towards bottom-left: arc from bottom to left
      return { startAngle: 60, endAngle: 0, sweep: 150 }
    case "top-left":
      // Open towards bottom-right: arc from bottom to right
      return { startAngle: 120, endAngle: 0, sweep: -150 }
  }
}

