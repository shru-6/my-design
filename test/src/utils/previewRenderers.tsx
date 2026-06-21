import React, { useEffect, useState } from "react"
import {
  addTreeNodeChild,
  addTreeNodeSibling,
  deleteTreeNode,
  moveTreeNode,
  type TreeAddRelation,
  type TreeItem,
  type TreeMovePosition,
} from "shru-design-system"
import type { PreviewWrapper } from "../utils/previewConfig"

type ComponentsBag = Record<string, React.ComponentType<any>>

export interface PreviewRenderContext {
  componentName: string
  Component: React.ComponentType<any>
  Components: ComponentsBag
  finalProps: Record<string, any>
  resolvedChildren: React.ReactNode | undefined
  toRenderableNode: (value: unknown) => React.ReactNode
  onPropsChange?: (patch: Record<string, unknown>) => void
}

function renderStackGrid(ctx: PreviewRenderContext) {
  const { Component, finalProps } = ctx
  const { items: itemsProp, renderItem: renderItemProp, children: _ch, ...layoutRest } = finalProps
  const items = Array.isArray(itemsProp) ? itemsProp : ["A", "B", "C"]
  const renderItem =
    typeof renderItemProp === "function"
      ? renderItemProp
      : (_item: unknown, _i: number) => (
          <div className="rounded border border-border bg-background p-2 text-center text-sm tabular-nums">
            {String(_item)}
          </div>
        )
  return <Component {...layoutRest} items={items} renderItem={renderItem} />
}

function renderFabRelative(ctx: PreviewRenderContext) {
  const { Component, finalProps } = ctx
  return (
    <div className="relative h-20 w-full">
      <Component
        {...finalProps}
        className={`${finalProps.className ?? ""} absolute bottom-2 right-2 z-10`}
      />
    </div>
  )
}

function renderSidebarParent(ctx: PreviewRenderContext) {
  const { Component, finalProps } = ctx
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-md border border-border">
      <Component {...finalProps} container="parent" heightMode="parent" />
    </div>
  )
}

function renderAppShellParent(ctx: PreviewRenderContext) {
  const { Component, Components, finalProps } = ctx
  const Text = Components.Text
  const Navbar = Components.Navbar
  const Sidebar = Components.Sidebar
  return (
    <div className="relative mx-auto h-56 w-full max-w-full overflow-hidden rounded-md border border-border bg-background">
      <Component
        {...finalProps}
        className={`${finalProps.className ?? ""} h-full min-h-0 w-full min-w-0 max-w-full`}
        sidebar={
          finalProps.sidebar ??
          (Sidebar ? (
            <Sidebar
              items={[
                { label: "Home", value: "home" },
                { label: "Set", value: "settings" },
              ]}
              defaultValue="home"
              container="parent"
              heightMode="parent"
              width="4.5rem"
              collapsedWidth="4.5rem"
              className="[&_button]:px-1.5 [&_span]:sr-only"
            />
          ) : (
            <div className="w-14 shrink-0 border-r border-border bg-muted/30 p-2 text-[10px]">Nav</div>
          ))
        }
        header={
          finalProps.header ??
          (Navbar ? (
            <Navbar logo="App" items={[{ label: "Docs", href: "#" }]} className="min-w-0 px-2 py-1.5 text-sm" />
          ) : (
            <div className="border-b border-border px-2 py-1.5 text-xs font-medium">Header</div>
          ))
        }
      >
        {finalProps.children ?? (Text ? <Text size="sm">Main content area</Text> : "Main content")}
      </Component>
    </div>
  )
}

function renderAuthLayoutCompact(ctx: PreviewRenderContext) {
  const { Component, finalProps } = ctx
  return (
    <div className="relative h-56 w-full overflow-auto rounded-md border border-border">
      <Component {...finalProps} className={`${finalProps.className ?? ""} min-h-0`} />
    </div>
  )
}

function renderResizableGroup(ctx: PreviewRenderContext) {
  const { Components, finalProps } = ctx
  const Group = Components.ResizablePanelGroup
  const Panel = Components.ResizablePanel
  const Handle = Components.ResizableHandle
  const { className: groupClass, ...groupRest } = finalProps
  return (
    <Group
      {...groupRest}
      className={`min-h-[104px] w-full max-w-full rounded-md border border-border ${groupClass ?? ""}`}
    >
      <Panel
        defaultSize={33}
        minSize={10}
        className="flex items-center justify-center bg-muted/25 text-xs text-muted-foreground"
      >
        A
      </Panel>
      <Handle withHandle />
      <Panel
        defaultSize={67}
        minSize={10}
        className="flex items-center justify-center bg-muted/40 text-xs text-muted-foreground"
      >
        B
      </Panel>
    </Group>
  )
}

function renderResizablePanel(ctx: PreviewRenderContext) {
  const { Component, Components, finalProps, resolvedChildren } = ctx
  const Group = Components.ResizablePanelGroup
  const Panel = Components.ResizablePanel
  const Handle = Components.ResizableHandle
  return (
    <Group direction="horizontal" className="min-h-[104px] w-full max-w-full rounded-md border border-border">
      <Component
        {...finalProps}
        defaultSize={finalProps.defaultSize ?? 40}
        minSize={finalProps.minSize ?? 10}
        className={`flex items-center justify-center bg-muted/25 text-xs ${finalProps.className ?? ""}`}
      >
        {resolvedChildren ?? "Panel"}
      </Component>
      <Handle withHandle />
      <Panel
        defaultSize={60}
        minSize={10}
        className="flex items-center justify-center bg-muted/40 text-xs text-muted-foreground"
      >
        B
      </Panel>
    </Group>
  )
}

function renderResizableHandle(ctx: PreviewRenderContext) {
  const { Component, Components, finalProps } = ctx
  const Group = Components.ResizablePanelGroup
  const Panel = Components.ResizablePanel
  return (
    <Group direction="horizontal" className="min-h-[104px] w-full max-w-full rounded-md border border-border">
      <Panel
        defaultSize={40}
        minSize={10}
        className="flex items-center justify-center bg-muted/25 text-xs text-muted-foreground"
      >
        A
      </Panel>
      <Component {...finalProps} withHandle={finalProps.withHandle !== false} />
      <Panel
        defaultSize={60}
        minSize={10}
        className="flex items-center justify-center bg-muted/40 text-xs text-muted-foreground"
      >
        B
      </Panel>
    </Group>
  )
}

function renderParentPortal(ctx: PreviewRenderContext) {
  const { Component, Components, finalProps, resolvedChildren } = ctx
  const Scope = Components.OverlayPortalScope as React.ComponentType<{
    children: React.ReactNode
    className?: string
  }>
  const { container: _c, ...rest } = finalProps
  return (
    <Scope className="min-h-32 w-full overflow-hidden rounded-md border border-border bg-muted/20">
      <div className="p-3 text-xs text-muted-foreground">
        Scoped preview — toggle <code className="rounded bg-muted px-1">open</code> to see overlay in this region.
      </div>
      {resolvedChildren != null ? (
        <Component {...rest} container="parent">
          {resolvedChildren}
        </Component>
      ) : (
        <Component {...rest} container="parent" />
      )}
    </Scope>
  )
}

function renderParentPortalLoading(ctx: PreviewRenderContext) {
  const { Component, Components, finalProps } = ctx
  const Scope = Components.OverlayPortalScope as React.ComponentType<{
    children: React.ReactNode
    className?: string
  }>
  const { container: _lc, ...loadingRest } = finalProps
  return (
    <Scope className="relative min-h-40 w-full overflow-hidden rounded-md border border-border bg-muted/20">
      <div className="p-3 text-xs text-muted-foreground">
        Toggle <code className="rounded bg-muted px-1">open</code> to preview the loading overlay in this region.
      </div>
      <Component {...loadingRest} container="parent" />
    </Scope>
  )
}

function renderInputGroup(ctx: PreviewRenderContext) {
  const { Components, finalProps } = ctx
  const IG = Components.InputGroup
  const IGI = Components.InputGroupInput
  const IGB = Components.InputGroupButton
  const {
    children: _igChildren,
    actionLabel = "Go",
    placeholder = "Search…",
    ...igRest
  } = finalProps
  return (
    <IG {...igRest} placeholder={placeholder}>
      <IGI aria-label="Search" defaultValue="" />
      <IGB variant="secondary" label={actionLabel} />
    </IG>
  )
}

function renderParentPortalDialog(ctx: PreviewRenderContext) {
  const { Component, Components, finalProps, resolvedChildren } = ctx
  const Scope = Components.OverlayPortalScope as React.ComponentType<{
    children: React.ReactNode
    className?: string
  }>
  const { triggerProps: _tp, container: _c, ...rest } = finalProps
  const dialogProps = {
    ...rest,
    container: rest.container ?? "parent",
    open: rest.open ?? true,
    triggerProps: undefined,
  }
  return (
    <Scope className="relative min-h-48 w-full overflow-hidden rounded-md border border-border bg-muted/20">
      <div className="p-3 text-xs text-muted-foreground">
        Dialog preview — toggle <code className="rounded bg-muted px-1">open</code> in Props.
      </div>
      {resolvedChildren != null ? (
        <Component {...dialogProps}>{resolvedChildren}</Component>
      ) : (
        <Component {...dialogProps} />
      )}
    </Scope>
  )
}

function ModalInteractivePreview({
  Component,
  Components,
  finalProps,
  resolvedChildren,
  onPropsChange,
}: {
  Component: React.ComponentType<any>
  Components: ComponentsBag
  finalProps: Record<string, any>
  resolvedChildren: React.ReactNode | undefined
  onPropsChange?: (patch: Record<string, unknown>) => void
}) {
  const [open, setOpen] = React.useState(Boolean(finalProps.open ?? false))
  const Button = Components.Button

  React.useEffect(() => {
    if (finalProps.open !== undefined) setOpen(Boolean(finalProps.open))
  }, [finalProps.open])

  const { triggerProps, container: _c, open: _o, onOpenChange, ...rest } = finalProps

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    onPropsChange?.({ open: next })
    onOpenChange?.(next)
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {Button ? (
          <Button
            variant={(triggerProps?.variant as string) ?? "primary"}
            size={(triggerProps?.size as string) ?? "sm"}
            label={triggerProps?.label ?? "Open modal"}
            onClick={() => handleOpenChange(true)}
          />
        ) : null}
        <span className="text-xs text-muted-foreground">Modal portals to viewport — not clipped by card</span>
      </div>
      <Component
        {...rest}
        container="body"
        open={open}
        onOpenChange={handleOpenChange}
        triggerProps={undefined}
      >
        {resolvedChildren ?? rest.children}
      </Component>
    </div>
  )
}

function renderModalInteractive(ctx: PreviewRenderContext) {
  return (
    <ModalInteractivePreview
      Component={ctx.Component}
      Components={ctx.Components}
      finalProps={ctx.finalProps}
      resolvedChildren={ctx.resolvedChildren}
      onPropsChange={ctx.onPropsChange}
    />
  )
}

function renderFormDemo(ctx: PreviewRenderContext) {
  const { Component, Components, finalProps } = ctx
  const FormField = Components.FormField
  const { children: _ch, onSubmit, onCancel, ...formRest } = finalProps
  return (
    <Component
      {...formRest}
      validateOn="submit"
      onSubmit={onSubmit ?? (() => {})}
      onCancel={onCancel}
      initialValues={{ email: "" }}
    >
      {FormField ? (
        <FormField
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
          validate
        />
      ) : null}
    </Component>
  )
}

function FormModalInteractivePreview({
  Component,
  Components,
  finalProps,
  onPropsChange,
}: {
  Component: React.ComponentType<any>
  Components: ComponentsBag
  finalProps: Record<string, any>
  onPropsChange?: (patch: Record<string, unknown>) => void
}) {
  const [open, setOpen] = React.useState(Boolean(finalProps.open ?? false))
  const Button = Components.Button

  React.useEffect(() => {
    if (finalProps.open !== undefined) setOpen(Boolean(finalProps.open))
  }, [finalProps.open])

  const { children: _ch, fields, onSubmit, triggerProps, container: _c, open: _o, onOpenChange, ...rest } =
    finalProps

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    onPropsChange?.({ open: next })
    onOpenChange?.(next)
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {Button ? (
          <Button
            variant={(triggerProps?.variant as string) ?? "primary"}
            size={(triggerProps?.size as string) ?? "sm"}
            label={triggerProps?.label ?? "Open form modal"}
            onClick={() => handleOpenChange(true)}
          />
        ) : null}
        <span className="text-xs text-muted-foreground">Submit empty form to see email validation</span>
      </div>
      <Component
        {...rest}
        container="body"
        open={open}
        onOpenChange={handleOpenChange}
        triggerProps={undefined}
        heading={rest.heading ?? "Create item"}
        fields={
          fields ?? [
            { name: "name", label: "Name", required: true, validate: true },
            { name: "email", type: "email", label: "Email", required: true, validate: true },
          ]
        }
        onSubmit={onSubmit ?? (() => {})}
      />
    </div>
  )
}

function renderFormModalDemo(ctx: PreviewRenderContext) {
  return (
    <FormModalInteractivePreview
      Component={ctx.Component}
      Components={ctx.Components}
      finalProps={ctx.finalProps}
      onPropsChange={ctx.onPropsChange}
    />
  )
}

function renderToasterDemo(ctx: PreviewRenderContext) {
  const { Component, Components, finalProps } = ctx
  const Button = Components.Button
  const toast = (Components as ComponentsBag & { toast?: (opts: Record<string, unknown>) => void }).toast
  return (
    <div className="flex w-full flex-col items-center gap-3">
      {Button && toast ? (
        <Button
          variant="outline"
          size="sm"
          label="Show toast"
          onClick={() =>
            toast({
              title: "Gallery preview",
              description: "Toast appears in the app Toaster (bottom-right).",
            })
          }
        />
      ) : null}
      <Component {...finalProps} />
      <span className="text-center text-xs text-muted-foreground">
        Click the button — toast renders via the app-level Toaster.
      </span>
    </div>
  )
}

function renderContextMenuDemo(ctx: PreviewRenderContext) {
  const { Component, finalProps, resolvedChildren } = ctx
  return (
    <Component {...finalProps}>
      {resolvedChildren ?? (
        <div className="rounded-md border border-dashed border-border bg-background px-6 py-8 text-center text-sm text-muted-foreground">
          Right-click here
        </div>
      )}
    </Component>
  )
}

function renderFixedWidgetRelative(ctx: PreviewRenderContext) {
  const { Component, finalProps, resolvedChildren } = ctx
  return (
    <div className="relative min-h-52 w-full overflow-visible rounded-md border border-border bg-muted/20 p-3">
      <Component
        {...finalProps}
        className={`${finalProps.className ?? ""} !absolute inset-3`}
        position={finalProps.position ?? "bottom-right"}
      >
        {resolvedChildren ?? "Panel content"}
      </Component>
    </div>
  )
}

function TreeViewInteractivePreview({
  Component,
  finalProps,
}: {
  Component: React.ComponentType<any>
  finalProps: Record<string, any>
}) {
  const [items, setItems] = useState<TreeItem[]>(finalProps.items ?? [])
  const [expandedIds, setExpandedIds] = useState<string[]>(
    finalProps.expandedIds ?? finalProps.defaultExpandedIds ?? []
  )
  const [selectedId, setSelectedId] = useState<string | undefined>(
    finalProps.selectedId ?? finalProps.defaultSelectedId
  )

  useEffect(() => {
    if (Array.isArray(finalProps.items)) setItems(finalProps.items)
  }, [finalProps.items])

  return (
    <Component
      {...finalProps}
      items={items}
      selectedId={selectedId}
      onSelect={setSelectedId}
      expandedIds={expandedIds}
      onExpandedChange={setExpandedIds}
      draggable={finalProps.draggable ?? true}
      allowAddSibling={finalProps.allowAddSibling ?? true}
      allowAddChild={finalProps.allowAddChild ?? true}
      allowDelete={finalProps.allowDelete ?? true}
      onMove={({
        draggedId,
        targetId,
        position,
      }: {
        draggedId: string
        targetId: string
        position: TreeMovePosition
      }) => setItems((current) => moveTreeNode(current, draggedId, targetId, position))}
      onAdd={({ targetId, relation }: { targetId: string; relation: TreeAddRelation }) => {
        const node: TreeItem = {
          id: `node-${Date.now()}`,
          label: relation === "child" ? "New folder" : "New request",
          kind: relation === "child" ? "folder" : "file",
          ...(relation === "child" ? { children: [] } : {}),
        }
        setItems((current) =>
          relation === "child"
            ? addTreeNodeChild(current, targetId, node)
            : addTreeNodeSibling(current, targetId, node)
        )
        if (relation === "child") {
          setExpandedIds((current) => [...new Set([...current, targetId])])
        }
      }}
      onDelete={(id: string) => setItems((current) => deleteTreeNode(current, id))}
    />
  )
}

function renderTreeViewInteractive(ctx: PreviewRenderContext) {
  const { Component, finalProps } = ctx
  return <TreeViewInteractivePreview Component={Component} finalProps={finalProps} />
}

function renderResizeContainerDemo(ctx: PreviewRenderContext) {
  const { Component, finalProps } = ctx
  return (
    <Component {...finalProps} className={`w-full ${finalProps.className ?? ""}`}>
      <div className="rounded-md border border-border bg-background p-4 text-center text-sm">
        Resize me with zoom controls above
      </div>
    </Component>
  )
}

const RENDERERS: Record<PreviewWrapper, (ctx: PreviewRenderContext) => React.ReactNode> = {
  "stack-grid": renderStackGrid,
  "fab-relative": renderFabRelative,
  "resizable-group": renderResizableGroup,
  "resizable-panel": renderResizablePanel,
  "resizable-handle": renderResizableHandle,
  "parent-portal": renderParentPortal,
  "parent-portal-loading": renderParentPortalLoading,
  "input-group": renderInputGroup,
  "parent-portal-dialog": renderParentPortalDialog,
  "modal-interactive": renderModalInteractive,
  "form-demo": renderFormDemo,
  "form-modal-demo": renderFormModalDemo,
  "toaster-demo": renderToasterDemo,
  "context-menu-demo": renderContextMenuDemo,
  "fixed-widget-relative": renderFixedWidgetRelative,
  "tree-view-interactive": renderTreeViewInteractive,
  "resize-container-demo": renderResizeContainerDemo,
  "sidebar-parent": renderSidebarParent,
  "app-shell-parent": renderAppShellParent,
  "auth-layout-compact": renderAuthLayoutCompact,
}

export function renderPreviewWrapper(
  wrapper: PreviewWrapper,
  ctx: PreviewRenderContext
): React.ReactNode | null {
  const render = RENDERERS[wrapper]
  return render ? render(ctx) : null
}
