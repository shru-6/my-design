/**
 * Theme Toggle Utilities
 * Pure utility functions for theme toggle component
 */

/**
 * Simple polar to cartesian conversion
 */
export function getPositionOnArc(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  }
}

