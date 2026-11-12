/**
 * Internal helpers shared across the layout primitives. Not exported from
 * `src/index.ts` — import by relative path (`../layout/shared`).
 *
 * Everything here existed as a verbatim copy in two or more layout components
 * before this pass; each entry names its original call sites so the next batch
 * migrating a duplicate knows it has landed in the right place.
 */

import type * as React from "react"

/**
 * `children != null` is not enough: `""`, `" "`, `false`, and `[]` all render
 * nothing but would still open a padded, bordered content region.
 * (Card, CollapsiblePanel.)
 */
export function hasNonEmptyChildren(children?: React.ReactNode): boolean {
  if (children == null || children === false) return false
  if (typeof children === "string") return children.trim().length > 0
  if (typeof children === "number") return true
  if (Array.isArray(children)) return children.some((child) => hasNonEmptyChildren(child))
  return true
}

/**
 * A bare number means CSS pixels; a string is already a CSS length.
 * (Card's `withUnit`, AspectRatio's `sizeToCss`, CollapsiblePanel's `toCssSize`.)
 */
export function sizeToCss(value: string | number | undefined): string | undefined {
  if (value == null) return undefined
  return typeof value === "number" ? `${value}px` : value
}

/**
 * Where the internal rules go in a header / content / footer surface: a rule
 * only earns its place when it actually separates two rendered regions, so an
 * empty card doesn't show a stray line. (Card, CollapsiblePanel.)
 */
export function resolveSectionBorders(regions: {
  hasHeader: boolean
  hasContent: boolean
  hasFooter: boolean
}): { headerBorderBottom: boolean; footerBorderTop: boolean } {
  const { hasHeader, hasContent, hasFooter } = regions
  return {
    headerBorderBottom: hasContent || (hasHeader && hasFooter),
    footerBorderTop: hasContent && hasHeader,
  }
}

/**
 * The gap scale, shared verbatim by Stack and Grid. Kept as literal class
 * strings (not built by template) so Tailwind's content scanner still sees
 * every class. `align` / `justify` are deliberately NOT shared: Stack's are
 * flex `items-*` / `justify-*`, Grid's are `justify-items-*` over a narrower
 * set, and unifying them would widen one component's public API to match the
 * other's for no gain.
 */
export const gapScale = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
} as const

export const columnGapScale = {
  none: "gap-x-0",
  sm: "gap-x-2",
  md: "gap-x-4",
  lg: "gap-x-6",
} as const

export const rowGapScale = {
  none: "gap-y-0",
  sm: "gap-y-2",
  md: "gap-y-4",
  lg: "gap-y-6",
} as const

export type GapScaleKey = keyof typeof gapScale
