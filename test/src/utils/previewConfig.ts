/** Gallery-only preview wrappers — keeps ComponentPreview generic. */

export type PreviewWrapper =
  | "stack-grid"
  | "fab-relative"
  | "resizable-group"
  | "resizable-panel"
  | "resizable-handle"
  | "parent-portal"
  | "parent-portal-loading"
  | "input-group"
  | "parent-portal-dialog"
  | "modal-interactive"
  | "form-demo"
  | "form-modal-demo"
  | "toaster-demo"
  | "context-menu-demo"
  | "fixed-widget-relative"
  | "sidebar-parent"
  | "collapsible-panel-parent"
  | "app-shell-parent"
  | "auth-layout-compact"
  | "resize-container-demo"
  | "tree-view-interactive"

export const previewWrapperByComponent: Record<string, PreviewWrapper> = {
  Stack: "stack-grid",
  Grid: "stack-grid",
  FAB: "fab-relative",
  ResizablePanelGroup: "resizable-group",
  ResizablePanel: "resizable-panel",
  ResizableHandle: "resizable-handle",
  Overlay: "parent-portal",
  LoadingOverlay: "parent-portal-loading",
  InputGroup: "input-group",
  Modal: "parent-portal-dialog",
  AlertDialog: "parent-portal-dialog",
  Drawer: "parent-portal-dialog",
  TriggerModal: "modal-interactive",
  ConfirmModal: "parent-portal-dialog",
  FormModal: "form-modal-demo",
  Form: "form-demo",
  Sidebar: "sidebar-parent",
  CollapsiblePanel: "collapsible-panel-parent",
  AppShell: "app-shell-parent",
  AuthLayout: "auth-layout-compact",
  Toaster: "toaster-demo",
  ContextMenu: "context-menu-demo",
  FixedScreenWidget: "fixed-widget-relative",
  ResizeContainer: "resize-container-demo",
  TreeView: "tree-view-interactive",
}

const PREVIEW_MIN_HEIGHT: Record<string, string> = {
  FormModal: "280px",
  TriggerModal: "280px",
  Modal: "240px",
  FixedScreenWidget: "220px",
  AppShell: "280px",
  HoverCard: "140px",
  Collapsible: "140px",
  CollapsiblePanel: "180px",
  Popover: "140px",
  ContextMenu: "160px",
  Toaster: "140px",
  Stepper: "160px",
  ResizeContainer: "200px",
  TreeView: "220px",
}

export function getPreviewMinHeight(componentName: string): string | undefined {
  return PREVIEW_MIN_HEIGHT[componentName]
}

export function getPreviewWrapper(componentName: string): PreviewWrapper | undefined {
  return previewWrapperByComponent[componentName]
}
