/**
 * Single source for "is this a raw Tailwind utility instead of a semantic
 * token" — shared by scripts/dev/check.js (build-time) and eslint.config.mjs
 * (editor-time), so the two can't drift.
 *
 * Covers color, shape (radius), animation (duration), and z-index — the four
 * axes components are expected to read from tokens rather than hardcode.
 * Density/spacing is deliberately NOT enforced here yet: `gap-*`/`p-*` are
 * also legitimate for one-off layout composition (e.g. inside Stack/Grid's
 * own implementation), so a blanket regex would false-positive on those.
 * Density-token adoption is a manual review item for now, not an auto-lint.
 */
const RAW_COLOR_RE =
  /\b(?:bg|text|border|ring|fill|stroke)-(?:black|white)\b|\b(?:bg|text|border|ring|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g
const DARK_PREFIX_RE = /\bdark:/g

// rgb()/rgba() literals — e.g. a hand-written box-shadow color that will
// never adapt to a theme. Matches the class only, not the paren depth of
// arbitrary-value brackets around it.
const RAW_RGBA_RE = /rgba?\([^)]*\)/g

// rounded-{sm|md|lg|xl|2xl|3xl|full|none} or bare `rounded` — the old flat
// Tailwind radius scale. Explicitly does NOT match the new
// rounded-control-*/rounded-surface-*/rounded-pill classes.
const RAW_RADIUS_RE = /\brounded-(?:none|sm|md|lg|xl|2xl|3xl|full)\b|\brounded\b(?!-)/g

// duration-200, duration-1000, etc — the numeric Tailwind scale, not the
// duration-fast/normal/slow token classes.
const RAW_DURATION_RE = /\bduration-\d+\b/g

// z-10, z-[999], etc — arbitrary z-index instead of the sticky/dropdown/
// overlay/modal/toast token classes (which never match \d+ or [...]).
const RAW_ZINDEX_RE = /\bz-(?:\[[^\]]+\]|\d+)\b/g

module.exports = { RAW_COLOR_RE, DARK_PREFIX_RE, RAW_RGBA_RE, RAW_RADIUS_RE, RAW_DURATION_RE, RAW_ZINDEX_RE }
