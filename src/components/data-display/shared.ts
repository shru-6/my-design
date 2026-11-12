/**
 * Internal helpers shared across the data-display components. Not exported
 * from `src/index.ts` — import by relative path (`./shared`, or
 * `../data-display/shared` from another category).
 *
 * Sibling of `layout/shared.ts`; same rule applies — everything here existed
 * as a verbatim copy in two or more components before this pass, and each
 * entry names its original call sites.
 */

export type AvatarSizeKey = "xs" | "sm" | "md" | "lg" | "xl"

/** `Icon`'s size scale, keyed by avatar size — Avatar maps 1:1 onto it. */
export type AvatarIconSize = "xs" | "sm" | "md" | "lg" | "xl"

type AvatarSizeSpec = {
  /** Fixed square box — a single avatar. */
  box: string
  /** Same height, but width grows with content — the `+N` overflow chip. */
  overflowBox: string
  text: string
  icon: AvatarIconSize
}

/**
 * The avatar size scale. Was duplicated between `Avatar`'s cva (`h-10 w-10
 * text-sm`) and `AvatarGroup`'s overflow chip (`h-10 min-w-[2.5rem] text-sm`),
 * which drifted independently. Literal class strings, not templates, so
 * Tailwind's content scanner still sees every class.
 */
export const avatarSizeScale: Record<AvatarSizeKey, AvatarSizeSpec> = {
  xs: { box: "h-6 w-6", overflowBox: "h-6 min-w-[1.5rem]", text: "text-[10px]", icon: "xs" },
  sm: { box: "h-8 w-8", overflowBox: "h-8 min-w-[2rem]", text: "text-xs", icon: "sm" },
  md: { box: "h-10 w-10", overflowBox: "h-10 min-w-[2.5rem]", text: "text-sm", icon: "md" },
  lg: { box: "h-12 w-12", overflowBox: "h-12 min-w-[3rem]", text: "text-base", icon: "lg" },
  xl: { box: "h-16 w-16", overflowBox: "h-16 min-w-[4rem]", text: "text-lg", icon: "xl" },
}

/** Avatar shape → radius token. A round avatar is a `pill`; a square one is a small media surface. */
export const avatarShapeRadius = {
  circle: "rounded-pill",
  square: "rounded-surface-sm",
} as const

export type AvatarShapeKey = keyof typeof avatarShapeRadius
