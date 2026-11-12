import * as React from "react"

/**
 * `useLayoutEffect` fires a React warning ("does nothing on the server")
 * whenever a component using it is rendered with `react-dom/server` — the
 * exact case a consumer app's Next.js/Remix SSR pass hits for any component
 * in the tree, not just ones they render server-only on purpose. `Tooltip`,
 * `usePositionedPortal`, `Command`, and `ThemeToggle` all use
 * `useLayoutEffect` for pre-paint measurement that only matters once
 * mounted client-side, so the standard swap applies: `useEffect` under SSR
 * (a no-op there anyway), the real `useLayoutEffect` once `window` exists.
 * Internal — not exported from `src/index.ts`.
 */
export const useIsomorphicLayoutEffect: typeof React.useLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect
