import { generateAndApplyTheme, getDefaultThemes } from "./themeUtils"
import type { ThemeSelection } from "./useTheme"

export type ThemePreset = Partial<ThemeSelection>

/**
 * Merge a partial theme selection with defaults (or a base) and apply CSS variables.
 * Persists to localStorage when `persist` is true (default).
 */
export async function applyPreset(
  preset: ThemePreset,
  options?: {
    base?: ThemeSelection
    persist?: boolean
    storageKey?: string
  }
): Promise<ThemeSelection> {
  const { base, persist = true, storageKey = "design-system-theme" } = options ?? {}
  const next: ThemeSelection = { ...(base ?? getDefaultThemes()), ...preset }
  await generateAndApplyTheme(next)

  if (persist && typeof window !== "undefined") {
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  return next
}
