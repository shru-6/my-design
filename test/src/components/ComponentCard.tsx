import { useState } from "react";
import { Card, Button, PillGroup } from "shru-design-system";
import { ComponentMetadata } from "../utils/componentMetadata";
import { generateUsageCode } from "../utils/codeGenerator";
import { PropsPanel } from "./PropsPanel";
import { ComponentPreview } from "./ComponentPreview";

interface ComponentCardProps {
  metadata: ComponentMetadata;
}

export function ComponentCard({ metadata }: ComponentCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "props" | "details">(
    "preview",
  );
  const [copied, setCopied] = useState(false);

  // Initialize props from metadata defaults
  const initialProps: Record<string, any> = {};
  metadata.props.forEach((prop) => {
    if (prop.defaultValue !== undefined) {
      initialProps[prop.name] = prop.defaultValue;
    }
  });

  const [props, setProps] = useState<Record<string, any>>(initialProps);

  const code = generateUsageCode(
    metadata.name,
    props,
    props.children,
    metadata.props,
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      className="h-full"
      header={
        <div className="space-y-3">
          <h3 className="font-semibold leading-none">{metadata.name}</h3>
          <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-border bg-muted/40 p-6">
            <ComponentPreview componentName={metadata.name} props={props} />
          </div>
        </div>
      }
    >
      <div className="mb-4 flex gap-2">
        <button
          className={`rounded-md border px-3 py-1.5 text-sm ${activeTab === "preview" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border"}`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
        <button
          className={`rounded-md border px-3 py-1.5 text-sm ${activeTab === "props" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border"}`}
          onClick={() => setActiveTab("props")}
        >
          Props
        </button>
        <button
          className={`rounded-md border px-3 py-1.5 text-sm ${activeTab === "details" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border"}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
      </div>

      {activeTab === "preview" && (
        <div className="mt-4">
          <div className="relative rounded-md border border-border bg-muted/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Usage Code</span>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? "✓ Copied" : "Copy"}
              </Button>
            </div>
            <pre className="m-0 overflow-auto rounded bg-background p-3 font-mono text-sm">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === "props" && (
        <PropsPanel
          metadata={metadata}
          props={props}
          onPropsChange={setProps}
        />
      )}

      {activeTab === "details" && (
        <div className="mt-4">
          <div className="space-y-3 rounded-md border border-border bg-muted/40 p-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">{metadata.category}</span>
              <span className="text-muted-foreground">Props Count</span>
              <span className="font-medium">{metadata.props.length}</span>
              {metadata.subComponents && metadata.subComponents.length > 0 && (
                <>
                  <div className="text-muted-foreground">
                    Sub-components
                  </div>
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
        </div>
      )}
    </Card>
  );
}
