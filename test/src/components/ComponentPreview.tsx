import React, { useMemo, useState } from "react"
import * as Components from "shru-design-system"
import { getComponentMetadata } from "../utils/componentMetadata"
import { mergePreviewProps } from "../utils/previewDefaults"
import { resolveKeywordIcon } from "../utils/iconKeywords"
import { getPreviewWrapper } from "../utils/previewConfig"
import { renderPreviewWrapper } from "../utils/previewRenderers"
import { applyInteractivePreviewProps } from "../utils/interactivePreview"
import { resolveGallerySlotProps } from "../utils/gallerySlotProps"

interface ComponentPreviewProps {
  componentName: string
  props: Record<string, any>
  onPropsChange?: (patch: Record<string, unknown>) => void
}

function toReactNode(value: unknown): React.ReactNode {
  if (typeof value !== "string") return value as React.ReactNode
  const trimmed = value.trim()
  const IconComp = resolveKeywordIcon(trimmed)
  if (!IconComp) return value
  return <IconComp className="h-4 w-4" />
}

function toRenderableNode(value: unknown): React.ReactNode {
  if (typeof value !== "string") return value as React.ReactNode
  const trimmed = value.trim()
  if (!trimmed) return value
  const iconNode = toReactNode(trimmed)
  if (iconNode !== trimmed) return iconNode
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return <span dangerouslySetInnerHTML={{ __html: trimmed }} />
  }
  return value
}

export function ComponentPreview({ componentName, props, onPropsChange }: ComponentPreviewProps) {
  const [liveProps, setLiveProps] = useState<Record<string, unknown>>({})
  const ComponentsAny = Components as unknown as Record<string, React.ComponentType<any>>
  const Component = ComponentsAny[componentName]
  const metadata = getComponentMetadata(componentName)

  const { children, ...restProps } = props
  const merged = mergePreviewProps(componentName, metadata?.defaultProps, restProps)
  const allowedPropNames = metadata ? new Set(metadata.props.map((p) => p.name)) : null
  const filtered = allowedPropNames
    ? Object.fromEntries(Object.entries(merged).filter(([key]) => allowedPropNames.has(key)))
    : merged
  const resolvedProps = useMemo(
    () => resolveGallerySlotProps(metadata, filtered),
    [metadata, filtered]
  )
  const finalProps = useMemo(() => {
    const interactive = applyInteractivePreviewProps(
      componentName,
      resolvedProps,
      liveProps,
      setLiveProps,
      onPropsChange
    )
    if (componentName === "Toast" && interactive.dismissible !== false && typeof interactive.onClose !== "function") {
      return { ...interactive, onClose: () => {} }
    }
    return interactive
  }, [componentName, resolvedProps, liveProps, onPropsChange])

  if (!Component) {
    return <div className="text-sm text-destructive">Component {componentName} not found</div>
  }

  metadata?.props
    .filter((prop) => prop.type === "reactNode")
    .forEach((prop) => {
      if (finalProps[prop.name] != null) {
        finalProps[prop.name] = toRenderableNode(finalProps[prop.name])
      }
    })

  const resolvedChildren = children != null ? toRenderableNode(children) : undefined

  const wrapper = getPreviewWrapper(componentName)
  if (wrapper) {
    const skipPortal =
      (wrapper === "parent-portal" || wrapper === "parent-portal-loading") &&
      finalProps.container === "body"

    const useWrapper =
      wrapper === "parent-portal-dialog" ||
      wrapper === "form-demo" ||
      wrapper === "form-modal-demo" ||
      wrapper === "toaster-demo" ||
      wrapper === "context-menu-demo" ||
      wrapper === "fixed-widget-relative" ||
      wrapper === "tree-view-interactive" ||
      wrapper === "modal-interactive" ||
      wrapper === "input-group" ||
      wrapper === "stack-grid" ||
      wrapper === "fab-relative" ||
      wrapper.startsWith("resizable") ||
      wrapper === "sidebar-parent" ||
      wrapper === "collapsible-panel-parent" ||
      wrapper === "app-shell-parent" ||
      wrapper === "auth-layout-compact" ||
      !skipPortal

    if (useWrapper) {
      const wrapped = renderPreviewWrapper(wrapper, {
        componentName,
        Component,
        Components: ComponentsAny,
        finalProps,
        resolvedChildren,
        toRenderableNode,
        onPropsChange,
      })
      if (wrapped != null) return wrapped
    }
  }

  return resolvedChildren != null ? (
    <Component {...finalProps}>{resolvedChildren}</Component>
  ) : (
    <Component {...finalProps} />
  )
}
