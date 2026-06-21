import { useState } from "react"
import { Card, Button, PillGroup, Text } from "shru-design-system"
import { ComponentMetadata } from "../utils/componentMetadata"
import { getPreviewDefaults } from "../utils/previewDefaults"
import { generateUsageCode } from "../utils/codeGenerator"
import { PropsPanel } from "./PropsPanel"
import { ComponentPreview } from "./ComponentPreview"
import { PreviewStage } from "./PreviewStage"

interface ComponentCardProps {
  metadata: ComponentMetadata
}

type CardTab = "preview" | "props" | "details"

const TABS: { id: CardTab; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "props", label: "Props" },
  { id: "details", label: "Details" },
]

const OVERFLOW_VISIBLE_COMPONENTS = new Set([
  "AppShell",
  "TriggerModal",
  "FormModal",
  "Modal",
  "Dropdown",
  "Popover",
  "HoverCard",
  "ContextMenu",
  "FixedScreenWidget",
  "FAB",
])

export function ComponentCard({ metadata }: ComponentCardProps) {
  const [activeTab, setActiveTab] = useState<CardTab>("preview")
  const [copied, setCopied] = useState(false)

  const initialProps: Record<string, any> = { ...getPreviewDefaults(metadata.name) }
  metadata.props.forEach((prop) => {
    if (prop.defaultValue !== undefined && initialProps[prop.name] === undefined) {
      initialProps[prop.name] = prop.defaultValue
    }
  })

  const [props, setProps] = useState<Record<string, any>>(initialProps)

  const code = generateUsageCode(metadata.name, props, props.children, metadata.props)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="flex h-full min-h-0 w-full flex-col overflow-hidden">
      <div className="shrink-0 space-y-3 border-b border-border px-4 pb-3 pt-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <Text as="h3" size="base" weight="semibold">
              {metadata.name}
            </Text>
            {metadata.description ? (
              <Text as="p" size="xs" variant="muted" className="line-clamp-2">
                {metadata.description}
              </Text>
            ) : null}
          </div>
          <PillGroup
            size="sm"
            variant="outline"
            items={[{ label: metadata.category, value: metadata.category }]}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              size="sm"
              variant={activeTab === tab.id ? "primary" : "outline"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {activeTab === "preview" && (
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
            <PreviewStage
              className="min-h-0 flex-1"
              overflowVisible={OVERFLOW_VISIBLE_COMPONENTS.has(metadata.name)}
            >
              <ComponentPreview
                componentName={metadata.name}
                props={props}
                onPropsChange={(patch) => setProps((current) => ({ ...current, ...patch }))}
              />
            </PreviewStage>

            <div className="shrink-0 rounded-md border border-border bg-muted/40 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <Text as="span" size="sm" weight="medium">
                  Usage code
                </Text>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="m-0 max-h-36 overflow-auto rounded bg-background p-3 font-mono text-xs">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "props" && (
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <PropsPanel metadata={metadata} props={props} onPropsChange={setProps} />
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-3 overflow-y-auto p-4 text-sm">
            <div className="grid grid-cols-2 gap-2 rounded-md border border-border bg-muted/40 p-4">
              <Text as="span" size="sm" variant="muted">
                Category
              </Text>
              <Text as="span" size="sm" weight="medium">
                {metadata.category}
              </Text>
              <Text as="span" size="sm" variant="muted">
                Props count
              </Text>
              <Text as="span" size="sm" weight="medium">
                {metadata.props.length}
              </Text>
              {metadata.subComponents && metadata.subComponents.length > 0 && (
                <>
                  <Text as="span" size="sm" variant="muted">
                    Sub-components
                  </Text>
                  <PillGroup
                    size="sm"
                    variant="outline"
                    items={metadata.subComponents.map((sub) => ({
                      label: sub,
                      value: sub,
                    }))}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
