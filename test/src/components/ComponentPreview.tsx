import React from 'react'
import * as Components from 'shru-design-system'
import { Search, Plus, Check, X, Star, Heart, User, Settings, Info, AlertTriangle, Loader2, Bell } from 'lucide-react'
import { getComponentMetadata } from '../utils/componentMetadata'

interface ComponentPreviewProps {
  componentName: string
  props: Record<string, any>
}

const keywordIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  plus: Plus,
  check: Check,
  x: X,
  star: Star,
  heart: Heart,
  user: User,
  settings: Settings,
  info: Info,
  warning: AlertTriangle,
  loader: Loader2,
  bell: Bell,
}

function toReactNode(value: unknown): React.ReactNode {
  if (typeof value !== 'string') return value as React.ReactNode
  const trimmed = value.trim()
  const IconComp = keywordIconMap[trimmed.toLowerCase()]
  if (!IconComp) return value
  return <IconComp className="h-4 w-4" />
}

function toRenderableNode(value: unknown): React.ReactNode {
  if (typeof value !== 'string') {
    return value as React.ReactNode
  }

  const trimmed = value.trim()
  if (!trimmed) return value

  // Icon keyword support first
  const iconNode = toReactNode(trimmed)
  if (iconNode !== trimmed) return iconNode

  // JSX-like snippets typed in metadata panel should render in preview
  if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
    return <span dangerouslySetInnerHTML={{ __html: trimmed }} />
  }

  return value
}

export function ComponentPreview({ componentName, props }: ComponentPreviewProps) {
  const [overlayHost, setOverlayHost] = React.useState<HTMLDivElement | null>(null)
  const ComponentsAny = Components as any
  const Component = ComponentsAny[componentName] as React.ComponentType<any>

  if (!Component) {
    return <div style={{ color: 'hsl(var(--destructive))' }}>Component {componentName} not found</div>
  }

  const metadata = getComponentMetadata(componentName)
  // Process props: merge metadata defaultProps for any missing keys
  const { children, ...restProps } = props
  const defaultProps = metadata?.defaultProps ?? {}
  const finalProps: Record<string, any> = { ...defaultProps, ...restProps }

  // Convert configured reactNode keyword props into actual React nodes.
  metadata?.props
    .filter((prop) => prop.type === 'reactNode')
    .forEach((prop) => {
      if (finalProps[prop.name] != null) {
        finalProps[prop.name] = toRenderableNode(finalProps[prop.name])
      }
    })

  const resolvedChildren = children != null ? toRenderableNode(children) : undefined

  // Sidebar requires SidebarProvider for useSidebar context
  if (componentName === 'Sidebar') {
    const SidebarProvider = ComponentsAny.SidebarProvider
    if (SidebarProvider) {
      return (
        <SidebarProvider>
          <Component {...finalProps} />
        </SidebarProvider>
      )
    }
  }

  // ChartContainer: without config and children, Recharts throws. Show placeholder.
  if (componentName === 'ChartContainer') {
    const hasConfig = finalProps.config != null && typeof finalProps.config === 'object' && Object.keys(finalProps.config).length > 0
    const hasChildren = finalProps.children != null && (Array.isArray(finalProps.children) ? finalProps.children.length > 0 : true)
    if (!hasConfig || !hasChildren) {
      return (
        <div
          style={{
            minWidth: 200,
            minHeight: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'hsl(var(--muted))',
            borderRadius: '0.5rem',
            color: 'hsl(var(--muted-foreground))',
            fontSize: '0.875rem',
          }}
        >
          Chart requires config and chart components
        </div>
      )
    }
  }

  if (componentName === "Stack" || componentName === "Grid") {
    const { items: itemsProp, renderItem: renderItemProp, children: _ch, ...layoutRest } = finalProps
    const items = Array.isArray(itemsProp) ? itemsProp : ["A", "B", "C"]
    const renderItem =
      typeof renderItemProp === "function"
        ? renderItemProp
        : (item: unknown, _i: number) => (
            <div className="rounded border border-border bg-background p-2 text-center text-sm tabular-nums">
              {String(item)}
            </div>
          )
    return <Component {...layoutRest} items={items} renderItem={renderItem} />
  }

  // FAB uses fixed positioning by design; force in-card positioning for preview.
  if (componentName === "FAB") {
    const previewFabProps = {
      ...finalProps,
      className: `${finalProps.className ?? ""} absolute bottom-2 right-2 z-10`,
    }
    return (
      <div className="relative h-20 w-full">
        <Component {...previewFabProps} />
      </div>
    )
  }

  if (componentName === "Overlay") {
    const overlayBody =
      resolvedChildren ?? (
        <div className="mx-auto mt-10 max-w-[220px] rounded-lg border border-border bg-background p-3 text-center text-sm shadow-md">
          Overlay content
        </div>
      )
    return (
      <div
        ref={setOverlayHost}
        className="relative isolate h-44 w-full overflow-hidden rounded-md border border-border bg-muted/20"
      >
        <p className="pointer-events-none p-2 text-[10px] text-muted-foreground">
          Scoped preview (portal into this box, absolute inset)
        </p>
        {overlayHost ? (
          <Component
            {...finalProps}
            fixed={false}
            container={overlayHost}
            open={finalProps.open !== false}
            onClose={finalProps.onClose ?? (() => {})}
          >
            {overlayBody}
          </Component>
        ) : null}
      </div>
    )
  }

  if (componentName === "ResizablePanelGroup") {
    const Group = ComponentsAny.ResizablePanelGroup
    const Panel = ComponentsAny.ResizablePanel
    const Handle = ComponentsAny.ResizableHandle
    const { className: groupClass, ...groupRest } = finalProps
    return (
      <Group
        {...groupRest}
        className={`min-h-[104px] w-full max-w-full rounded-md border border-border ${groupClass ?? ""}`}
      >
        <Panel defaultSize={33} minSize={10} className="flex items-center justify-center bg-muted/25 text-xs text-muted-foreground">
          A
        </Panel>
        <Handle withHandle />
        <Panel defaultSize={67} minSize={10} className="flex items-center justify-center bg-muted/40 text-xs text-muted-foreground">
          B
        </Panel>
      </Group>
    )
  }

  if (componentName === "ResizablePanel") {
    const Group = ComponentsAny.ResizablePanelGroup
    const Panel = ComponentsAny.ResizablePanel
    const Handle = ComponentsAny.ResizableHandle
    return (
      <Group
        direction="horizontal"
        className="min-h-[104px] w-full max-w-full rounded-md border border-border"
      >
        <Component
          {...finalProps}
          defaultSize={finalProps.defaultSize ?? 40}
          minSize={finalProps.minSize ?? 10}
          className={`flex items-center justify-center bg-muted/25 text-xs ${finalProps.className ?? ""}`}
        >
          {resolvedChildren ?? "Panel"}
        </Component>
        <Handle withHandle />
        <Panel defaultSize={60} minSize={10} className="flex items-center justify-center bg-muted/40 text-xs text-muted-foreground">
          B
        </Panel>
      </Group>
    )
  }

  if (componentName === "ResizableHandle") {
    const Group = ComponentsAny.ResizablePanelGroup
    const Panel = ComponentsAny.ResizablePanel
    return (
      <Group direction="horizontal" className="min-h-[104px] w-full max-w-full rounded-md border border-border">
        <Panel defaultSize={40} minSize={10} className="flex items-center justify-center bg-muted/25 text-xs text-muted-foreground">
          A
        </Panel>
        <Component {...finalProps} withHandle={finalProps.withHandle !== false} />
        <Panel defaultSize={60} minSize={10} className="flex items-center justify-center bg-muted/40 text-xs text-muted-foreground">
          B
        </Panel>
      </Group>
    )
  }

  // Render component
  return resolvedChildren != null ? (
    <Component {...finalProps}>{resolvedChildren}</Component>
  ) : (
    <Component {...finalProps} />
  )
}
