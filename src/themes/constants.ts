/**
 * Shared constants for theme persistence and cross-instance sync.
 * Single source of truth — import from here instead of redeclaring.
 * (useTheme.tsx and applyThemeSync.ts used to each keep their own copy of STORAGE_KEY.)
 */
export const STORAGE_KEY = 'design-system-theme'
export const THEME_SYNC_EVENT = 'design-system-theme-sync'
