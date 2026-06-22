import * as React from "react"
import { cn } from "../../utils"
import { CopyButton } from "../actions/CopyButton"
import { Text } from "./Text"

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopy?: boolean
  filename?: string
}

export function CodeBlock({
  code = "",
  language,
  showLineNumbers = false,
  showCopy = true,
  filename,
  className,
  ...rest
}: CodeBlockProps) {
  const lines = React.useMemo(() => code.split(/\n/), [code])

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg border border-border bg-muted/40", className)}
      {...rest}
    >
      {filename != null || showCopy ? (
        <div className="flex min-h-10 items-center justify-between gap-2 border-b border-border px-4 py-2">
          {filename != null ? (
            <Text variant="muted" className="min-w-0 font-mono text-xs">
              {filename}
            </Text>
          ) : (
            <span className="min-w-0" aria-hidden />
          )}
          {showCopy ? (
            <CopyButton value={code} variant="ghost" size="sm" tooltip={false} />
          ) : null}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        {showLineNumbers ? (
          <code className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 font-mono text-foreground">
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                <span className="select-none text-right tabular-nums text-muted-foreground">{i + 1}</span>
                <span className="whitespace-pre">{line}</span>
              </React.Fragment>
            ))}
          </code>
        ) : (
          <code className="block whitespace-pre font-mono text-foreground">{code}</code>
        )}
      </pre>
      {language ? (
        <span className="sr-only">Language: {language}</span>
      ) : null}
    </div>
  )
}

CodeBlock.displayName = "CodeBlock"
