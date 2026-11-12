# Testing

Automated safety net under `src/**/*.test.tsx` — vitest + React Testing Library + jsdom. Separate from the manual visual gallery in `test/` (see [GALLERY.md](./GALLERY.md)), which is for eyeballing, not assertions.

---

## Running

```bash
npm run test         # vitest run — CI mode, exits non-zero on failure
npm run test:watch   # vitest — watch mode for local dev
```

Config: `vitest.config.ts` (jsdom environment, globals on, setup file `src/test-utils/setupTests.ts`).

---

## Conventions

- **Colocated.** `Button.tsx` → `Button.test.tsx`, next to it, same directory. No `__tests__/` folders — matches the repo's flat per-component layout.
- **One file per source `.tsx` file.** When a file exports more than one component (`Pill.tsx` → `Pill`/`Badge`/`Tag`, `Skeleton.tsx` → `Skeleton`/`TableSkeleton`, `Kbd.tsx` → `Kbd`/`KbdGroup`, `Resizable.tsx` → `ResizablePanelGroup`/`ResizablePanel`/`ResizableHandle`, `InputGroup.tsx` → `InputGroup`/`InputGroupInput`/`InputGroupAddon`/`InputGroupButton`), all of them are tested in that one file.
- **Smoke tests** (`ComponentName.test.tsx`): one "renders without crashing" case per exported component, minimal required props, no behavior assertions beyond "it mounted and shows what you'd expect." Every one of the 99 shipped components (the same count `npm run check`'s export-parity gate tracks) has one.
- **Behavior tests** (`ComponentName.behavior.test.tsx`): a separate file, used only where a component has a specific contract worth locking in — a breaking-change fix, a signature, a documented edge case. Keeps the smoke-test file skimmable and the behavior coverage easy to find. Current behavior suites:
  - `data-display/PillGroup.behavior.test.tsx` — `onRemove(value, next)` signature; `items` is never self-mutated
  - `data-display/Table.behavior.test.tsx` — `onRowClick`'s second argument is the row's true index in `data`, not the sorted-view index; duplicate-row selection isolation
  - `data-display/List.behavior.test.tsx` — `stackProps` / `gridProps` reach the underlying `Stack` / `Grid`
  - `themes/themeConfig.behavior.test.tsx` — `registerTheme()` returns a `Promise` and resolves with the registered theme present
- **No provider wrapper needed.** There is no `ThemeProvider` — components read CSS variables / `document`, not React context — so `render()` straight from RTL is enough.
- **jsdom gaps are stubbed once**, in `src/test-utils/setupTests.ts` (`matchMedia`, `ResizeObserver`, `IntersectionObserver`, `scrollIntoView`, pointer capture) — add to that file rather than re-stubbing per test.

## What's excluded from the build

- `tsconfig.json` excludes `src/**/*.test.ts(x)` and `src/test-utils/` — `tsup`'s `dts` build and any `tsc` run never type-check or bundle test files into `dist/`.
- `eslint.config.mjs` ignores the same two globs — test files don't need the `no-raw-tailwind-color` token-usage rule that `src/components/**` enforces.
- A separate `tsconfig.test.json` (extends the base config) gives editors/`tsc` the `vitest/globals` and `@testing-library/jest-dom` types for files under those same globs.

---

## Gaps / next steps

- **No CI yet.** `npm run test` isn't wired into a GitHub Actions workflow — right now it only runs locally. See the repo plan in [RELEASE.md](./RELEASE.md) / the top-level project notes for the proposed `.github/workflows/ci.yml` (lint + check + test on push/PR).
- **Smoke-only for most components.** Only the four contracts above have dedicated behavior coverage. `BREAKING-FOR-DESIGN-CMS.md` documents many more fixed behaviors (controlled/uncontrolled rules on `Checkbox`/`Radio`/`Toggle`/`Slider`, `Select` `id`/`htmlFor`, `Dropdown` controlled-`open`, `Sidebar`/`NavigationMenu` nested-value identity, `Overlay`'s focus trap, `Chart` prop reshaping, etc.) that have smoke coverage only — worth promoting to behavior tests opportunistically as each area gets touched again.
- **No coverage reporting configured.** `vitest run --coverage` works once `@vitest/coverage-v8` is added as a devDependency, but no threshold is enforced yet.
