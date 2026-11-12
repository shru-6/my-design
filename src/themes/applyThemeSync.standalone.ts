/**
 * Entry point for the standalone pre-hydration bundle (dist/apply-theme-sync.global.js).
 * Built separately (see tsup.config.ts) so a consumer can inline it into a
 * next/script `beforeInteractive` tag — the only way to actually run before
 * first paint in a framework that server-renders the shell. Running
 * applyThemeSync() from a React component (client-side) is always too late;
 * hydration itself happens after the browser's already painted once.
 */
import { applyThemeSync } from './applyThemeSync'

applyThemeSync()
