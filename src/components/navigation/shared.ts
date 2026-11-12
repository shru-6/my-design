import type * as React from "react"

/**
 * Internal helpers shared by the navigation components. Not exported from
 * `src/index.ts` — consume by relative path (`import { … } from "./shared"`).
 */

/** The minimum shape every nav list in this category agrees on. */
export type NavLikeItem = {
  value?: string
  disabled?: boolean
  children?: NavLikeItem[]
}

/**
 * Stable identity for one row. `prefix` is the **full path from the root**, so
 * two same-index rows under different parents never collide (Sidebar used to
 * prefix by depth here and by parent there, which made every depth-1 child at
 * the same index share an identity).
 */
export function itemIdentity(item: { value?: string }, index: number, prefix = ""): string {
  return item.value ?? `${prefix}item-${index}`
}

/**
 * First selectable row, depth-first, using the same identity scheme the render
 * site uses. Returns `undefined` when every row is disabled — it never falls
 * back to a disabled first item.
 *
 * One copy for Sidebar / NavigationMenu / Tabs. NavigationMenu's own version
 * read `items.find(i => !i.disabled)?.value`, which is `undefined` for an
 * enabled item with no explicit `value` and silently fell through to
 * `items[0]` even when that item was disabled.
 */
export function firstEnabledValue<T extends NavLikeItem>(
  items: T[] | undefined,
  prefix = ""
): string | undefined {
  if (!items) return undefined
  for (let i = 0; i < items.length; i++) {
    const item = items[i]!
    const value = itemIdentity(item, i, prefix)
    if (!item.disabled) return value
    if (item.children?.length) {
      const nested = firstEnabledValue(item.children, `${value}-`)
      if (nested) return nested
    }
  }
  return undefined
}

/**
 * Consumer hook for navigation out of the design system's own nav chrome.
 * Given one, the component hands the click over instead of doing a full page
 * load, so React Router / Next.js links keep working.
 */
export type NavigateHandler<TItem> = (href: string, item: TItem) => void

/**
 * Button-style rows (no real anchor): call `onNavigate` when given, otherwise
 * fall back to the standalone `location.assign` behavior.
 */
export function navigateToHref<TItem>(
  href: string | undefined,
  item: TItem,
  onNavigate?: NavigateHandler<TItem>
): void {
  if (!href) return
  if (onNavigate) {
    onNavigate(href, item)
    return
  }
  if (typeof window !== "undefined") window.location.assign(href)
}

/**
 * Anchor-style rows: with no `onNavigate` the browser navigates as it always
 * did. With one, the default is suppressed and the consumer's router takes it.
 */
export function handleNavLinkClick<TItem>(
  event: React.MouseEvent,
  href: string | undefined,
  item: TItem,
  onNavigate?: NavigateHandler<TItem>
): void {
  if (!href || !onNavigate) return
  event.preventDefault()
  onNavigate(href, item)
}
