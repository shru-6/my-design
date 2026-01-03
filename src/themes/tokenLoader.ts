/**
 * Embedded token loader
 *
 * Why this exists:
 * - At runtime we cannot rely on `/public/tokens` being served by the host app.
 * - We embed a copy of the token JSONs so theme generation always has a fallback.
 *
 * Duplication notice:
 * - Source of truth for tokens during development lives in `scripts/tokens`.
 * - We copy that folder to `src/tokens` at build time so it can be bundled.
 * - If you change token JSON files, update BOTH `scripts/tokens/*` and `src/tokens/*`
 *   (or re-run the copy step) to keep the embedded and published assets in sync.
 */

import baseTokens from "../tokens/base.json"
import paletteTokens from "../tokens/palettes.json"

import colorDark from "../tokens/themes/color/dark.json"
import colorWhite from "../tokens/themes/color/white.json"
import typographySans from "../tokens/themes/typography/sans.json"
import typographySerif from "../tokens/themes/typography/serif.json"
import shapeSmooth from "../tokens/themes/shape/smooth.json"
import shapeSharp from "../tokens/themes/shape/sharp.json"
import densityComfortable from "../tokens/themes/density/comfortable.json"
import densityCompact from "../tokens/themes/density/compact.json"
import animationGentle from "../tokens/themes/animation/gentle.json"
import animationBrisk from "../tokens/themes/animation/brisk.json"
import customBrand from "../tokens/themes/custom/brand.json"
import customMinimal from "../tokens/themes/custom/minimal.json"

// Sentinel used by theme utilities to pick the embedded map instead of network fetch
export const EMBEDDED_TOKEN_BASE = "__EMBEDDED__"

// Map of normalized token paths → JSON content (kept small and explicit for clarity)
export const EMBEDDED_TOKENS: Record<string, any> = {
  "base.json": baseTokens,
  "palettes.json": paletteTokens,
  "themes/color/dark.json": colorDark,
  "themes/color/white.json": colorWhite,
  "themes/typography/sans.json": typographySans,
  "themes/typography/serif.json": typographySerif,
  "themes/shape/smooth.json": shapeSmooth,
  "themes/shape/sharp.json": shapeSharp,
  "themes/density/comfortable.json": densityComfortable,
  "themes/density/compact.json": densityCompact,
  "themes/animation/gentle.json": animationGentle,
  "themes/animation/brisk.json": animationBrisk,
  "themes/custom/brand.json": customBrand,
  "themes/custom/minimal.json": customMinimal,
}

/**
 * Normalize a token path so everything uses the same keys
 * Examples:
 *  - "/tokens/base.json"   -> "base.json"
 *  - "tokens/themes/x.json" -> "themes/x.json"
 */
export function normalizeTokenPath(path: string): string {
  return path.replace(/^\/?tokens\//, "")
}

/**
 * Get an embedded token by normalized path (returns undefined if not found)
 */
export function getEmbeddedToken(normalizedPath: string) {
  return EMBEDDED_TOKENS[normalizedPath]
}

