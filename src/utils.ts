import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * The semantic token classes added in `scripts/tailwind.preset.cjs`
 * (`rounded-control-*`, `rounded-surface-*`, `rounded-pill`,
 * `duration-fast|normal|slow`, `z-sticky|dropdown|overlay|modal|toast`) are
 * custom theme keys, so stock tailwind-merge does not recognise them as
 * members of the borderRadius / transitionDuration / zIndex groups. Without
 * this, `cn("rounded-control-md", "rounded-pill")` keeps BOTH classes and the
 * winner is decided by stylesheet order — i.e. a consumer `className` could no
 * longer override a component's internal radius. Teach twMerge the groups.
 */
const RADIUS_TOKENS = [
  "control-sm",
  "control-md",
  "control-lg",
  "surface-sm",
  "surface-md",
  "surface-lg",
  "pill",
]

const ROUNDED_GROUP_IDS = [
  "rounded",
  "rounded-s",
  "rounded-e",
  "rounded-t",
  "rounded-r",
  "rounded-b",
  "rounded-l",
  "rounded-ss",
  "rounded-se",
  "rounded-ee",
  "rounded-es",
  "rounded-tl",
  "rounded-tr",
  "rounded-br",
  "rounded-bl",
]

const roundedClassGroups = Object.fromEntries(
  ROUNDED_GROUP_IDS.map((id) => [id, [{ [id]: RADIUS_TOKENS }]])
)

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      ...roundedClassGroups,
      duration: [{ duration: ["fast", "normal", "slow"] }],
      z: [{ z: ["sticky", "dropdown", "overlay", "modal", "toast"] }],
    },
  },
})

/**
 * Utility function to merge class names with Tailwind conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
