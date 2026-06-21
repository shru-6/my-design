# Components workflow

Add or update a shipped component. Prerequisites: [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Add a new component

| Step | Action |
|------|--------|
| 1 | Implement in `src/components/{category}/ComponentName.tsx` |
| 2 | Export from `src/index.ts` (component + `ComponentNameProps`) |
| 3 | Mark ✓ in [reference/COMPONENTS.md](../reference/COMPONENTS.md) with prop summary |
| 4 | Add entry in `test/src/utils/metadata/subComponentsMap.ts` if it composes children |
| 5 | Update [reference/COMPONENT_GRAPH.md](../reference/COMPONENT_GRAPH.md) if nesting is notable |
| 6 | Gallery — see [GALLERY.md](./GALLERY.md) |
| 7 | Showcase — use in a view or Explore tab (export parity requires gallery entry; showcase keeps demo honest) |
| 8 | `npm run check` |

---

## Gallery (step 6 detail)

| File | When |
|------|------|
| `componentMetadata.ts` | Base entry for every shipped component |
| `metadata/propSchemas.ts` | Enriched own/slot props |
| `metadata/galleryPreviewProps.ts` | Extra preview-worthy props (optional) |
| `previewDefaults.ts` | Demo data (`Table` rows, `TreeView` items, …) |
| `previewConfig.ts` | Wrapper key if overlays/layout break in a card |
| `previewRenderers.tsx` | Wrapper implementation |
| `interactivePreview.ts` | Controlled binding if props panel should toggle `open` / `value` |

---

## Update an existing component

- **Prop rename / removal:** breaking change — note in changelog; update metadata + `propSchemas` + any showcase usage
- **Visual / theme-sensitive:** verify white, dark, and one tinted theme in gallery
- **Composition change:** update `subComponentsMap.ts` + `COMPONENT_GRAPH.md`
- **New optional prop:** add to `XxxProps`; add to gallery metadata if preview-worthy

---

## Internal vs public

| Name | Status |
|------|--------|
| `FieldLayout` | Internal — not exported; used inside inputs |
| `Badge`, `Tag` | Legacy — prefer `Pill` for new work |

---

## Design notes

- **FieldLayout** — internal shell for labeled inputs; public API uses `Label` + `HelperText` + control
- **Overlay defaults in gallery** — wrappers often force `container="parent"`; component default may still be `"body"` for real apps
- **Controlled overlays** — document both `open` and `onOpenChange` in metadata when exposing `open`

---

## Checklist (copy)

```
[ ] src/components/{category}/X.tsx
[ ] src/index.ts export
[ ] reference/COMPONENTS.md ✓
[ ] subComponentsMap.ts (if composes children)
[ ] COMPONENT_GRAPH.md (if notable)
[ ] componentMetadata.ts
[ ] propSchemas / galleryPreviewProps (if needed)
[ ] previewDefaults.ts (if needed)
[ ] previewConfig + previewRenderers (if overlay/layout)
[ ] interactivePreview binding (if controlled in panel)
[ ] showcase touchpoint
[ ] npm run check
```
