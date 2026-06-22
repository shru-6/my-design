# Gallery

How the `/gallery` catalog works — metadata, preview pipeline, wrappers. For consumers installing the package, gallery is dev-only; this doc is for **contributors**.

---

## Run

```bash
npm run dev   # from repo root → test/ Vite app
```

Open `/gallery` — searchable cards, props panel, theme toggle.

---

## Preview pipeline

```
componentMetadata.ts (raw entries)
        ↓
applyEnrichedPropSchemas()
  propSchemas.ts + extendedPropSchemas.ts + galleryPreviewProps.ts
        ↓
ComponentCard state (user edits in props panel)
        ↓
mergePreviewProps() ← previewDefaults.ts
        ↓
filter to metadata prop names only
        ↓
resolveGallerySlotProps()  (triggerProps.*, panelProps.*)
        ↓
applyInteractivePreviewProps()  (controlled bindings)
        ↓
preview wrapper (previewConfig → previewRenderers)
        ↓
ComponentPreview → renders shru-design-system component
```

---

## Metadata layers

| Layer | File | Role |
|-------|------|------|
| Base | `componentMetadata.ts` | All 99 components; default props, categories |
| Enriched | `metadata/propSchemas.ts` | Own vs slot props, corrected API names |
| Extended | `metadata/extendedPropSchemas.ts` | Additional components not in propSchemas |
| Preview tier | `metadata/galleryPreviewProps.ts` | ~170 curated preview props — **not** full API parity |

Merged in `applyEnrichedPropSchemas()` — first definition wins per prop name.

### Prop scope

| `scope` | Meaning |
|---------|---------|
| `own` | Component's direct API |
| `slot` | Forwarded to child (`slotTarget` or `description` with `.` e.g. `triggerProps.label`) |

### `galleryOnly`

Prop renders in preview but is excluded from generated usage snippets (`codeGenerator.ts`).

---

## Interactive preview

`test/src/utils/interactivePreview.ts` — `BINDINGS` wire props panel toggles to handlers:

```ts
Tabs: { value: "onValueChange" }
Dropdown: { open: "onOpenChange" }
Accordion: { value: "onChange" }
// etc.
```

Add a binding when the props panel should interactively control state. Omit for uncontrolled defaults (`InlineEdit` uses `defaultValue`).

---

## Preview wrappers

Registered in `previewConfig.ts`, implemented in `previewRenderers.tsx`.

| Wrapper | Components | Problem solved |
|---------|------------|----------------|
| `parent-portal-dialog` | Modal, Drawer, AlertDialog, ConfirmModal | Modal in card without viewport takeover |
| `parent-portal` | Overlay | Scoped backdrop |
| `parent-portal-loading` | LoadingOverlay | Scoped loading scrim |
| `modal-interactive` | TriggerModal | Open/close from trigger |
| `form-demo` | Form | Sample fields + submit |
| `form-modal-demo` | FormModal | Fields + modal flow |
| `tree-view-interactive` | TreeView | `onAdd` / `onDelete` / `onMove` handlers |
| `fixed-widget-relative` | FixedScreenWidget | Overflow + trigger in card |
| `app-shell-parent` | AppShell | Sidebar height in card |
| `sidebar-parent` | Sidebar | Contained sidebar layout |
| `toaster-demo` | Toaster | Toast queue in card |
| `context-menu-demo` | ContextMenu | Right-click target area |
| `stack-grid` | Stack, Grid | Layout demo context |
| `fab-relative` | FAB | Positioned FAB in card |
| `resizable-group` / `panel` / `handle` | Resizable* | Panel layout in card |
| `resize-container-demo` | ResizeContainer | Zoom/pan demo |
| `auth-layout-compact` | AuthLayout | Compact auth card |
| `input-group` | InputGroup | Attached addons visible |

### Three containment strategies

1. **`PreviewStage`** — clips in-tree `position: fixed` (FixedScreenWidget)
2. **`OverlayPortalScope` + `container="parent"`** — modals/drawers in cards
3. **Body portal** — ThemeToggle, Toaster in real apps (not gallery cards)

---

## Slot props

`gallerySlotProps.ts` maps dotted metadata names to nested objects when `description` contains `.`:

- `triggerProps.label` → `{ triggerProps: { label: value } }`

---

## Defaults & crashes

If a component crashes in gallery:

1. Add safe values in `previewDefaults.ts`
2. Ensure required props exist in metadata
3. Add wrapper if overlay escapes the card

Preview **filters** incoming props to metadata keys only — stray keys are dropped.

---

## Audit script

```bash
npm run check:metadata
```

Read-only compare of `XxxProps` in `src/` vs merged gallery metadata. Reports missing/extra props and bad `interactivePreview` bindings. **Gaps are expected** — gallery intentionally shows a subset.

---

## Showcase vs gallery

| App | Role |
|-----|------|
| **Gallery** | Per-component props playground |
| **Showcase** | Composed product demo — proves patterns |

Both must stay in sync with exports (`npm run check` gallery parity).
