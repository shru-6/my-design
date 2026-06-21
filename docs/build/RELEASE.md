# Release

Ship a version to npm. Run from repo root.

---

## Pre-release

```bash
npm run check
```

All gates must pass:

| Gate | What it verifies |
|------|------------------|
| **Build** | `tsup` compiles `src/index.ts` → `dist/` |
| **styles.css** | Copied to `dist/styles.css` |
| **Export parity** | Every ✓ in [reference/COMPONENTS.md](../reference/COMPONENTS.md) is exported from `src/index.ts` |
| **Gallery parity** | Every export (except exempt) has gallery metadata |
| **Spec ↔ gallery** | Shipped spec matches gallery entries |
| **Token sync** | `scripts/tokens/` matches `src/tokens/` |
| **Semantic tokens** | No raw Tailwind palette classes in `src/components/` |

Optional:

```bash
npm run check:metadata   # informational — gallery prop subset vs XxxProps
cd test && npm run build # test app production build
```

---

## Build

```bash
npm run build
```

Steps:

1. `node scripts/copy-tokens.js` — sync tokens to `src/tokens/` + `public/tokens/`
2. `tsup` — ESM + CJS + `.d.ts` to `dist/`
3. `node scripts/copy-styles.js` — `styles.css` into `dist/`

---

## Version & publish

1. Bump `version` in `package.json`
2. Update changelog (breaking prop renames, new components, theme changes)
3. `npm publish` — `prepublishOnly` runs `npm run check` automatically

**Published files** (`package.json` `files`): `dist/`, `scripts/` (init, preset, tokens tooling).

---

## Post-release smoke test

In a clean app:

```bash
npm install shru-design-system@<version>
npx shru-design-system-init
```

Verify styles, preset, and one component render with theme toggle.

---

## Consumer upgrades

When a release has breaking changes, document migration in changelog and add notes to `use/INSTALL.md` or a future `use/UPGRADE.md`.
