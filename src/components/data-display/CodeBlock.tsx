import * as React from "react"
import { WrapText } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { IconButton } from "../actions/IconButton"
import { CopyButton } from "../actions/CopyButton"
import { useControllableValue } from "../../utils/useControllableValue"
import { Text } from "./Text"

const codeBlockVariants = cva("relative flex min-h-0 flex-col overflow-hidden rounded-surface-md border", {
  variants: {
    variant: {
      default: "border-border bg-muted/40",
      surface: "border-border bg-card shadow-sm",
      inset: "border-border/60 bg-muted/30",
      ghost: "border-transparent bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type CodeBlockVariant = NonNullable<VariantProps<typeof codeBlockVariants>["variant"]>

export interface CodeBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof codeBlockVariants> {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopy?: boolean
  /** Renders a wrap toggle beside copy — when on, long lines wrap instead of scrolling horizontally. */
  showWrapToggle?: boolean
  wrap?: boolean
  defaultWrap?: boolean
  onWrapChange?: (wrap: boolean) => void
  filename?: string
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  {
    code = "",
    language,
    showLineNumbers = false,
    showCopy = true,
    showWrapToggle = false,
    wrap: wrapProp,
    defaultWrap = false,
    onWrapChange,
    filename,
    variant,
    className,
    ...props
  },
  ref
) {
  // `wrap` is a controllable value like any other — see utils/useControllableValue.
  const [wrap, setWrap] = useControllableValue<boolean>({
    value: wrapProp,
    defaultValue: defaultWrap,
    onChange: onWrapChange,
  })

  const lines = React.useMemo(() => code.split(/\n/), [code])
  const lineClassName = cn(
    "font-mono text-foreground",
    wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
  )
  const showToolbar = filename != null || showCopy || showWrapToggle

  return (
    <div ref={ref} className={cn(codeBlockVariants({ variant }), className)} {...props}>
      {showToolbar ? (
        <div className="flex min-h-10 shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-2">
          {filename != null ? (
            <Text variant="muted" className="min-w-0 font-mono text-xs">
              {filename}
            </Text>
          ) : (
            <span className="min-w-0" aria-hidden />
          )}
          <div className="flex shrink-0 items-center gap-1">
            {showWrapToggle ? (
              <IconButton
                ariaLabel={wrap ? "Disable word wrap" : "Enable word wrap"}
                aria-pressed={wrap}
                icon={<WrapText className="h-4 w-4" />}
                className={cn(wrap && "bg-muted text-foreground")}
                onClick={() => setWrap(!wrap)}
              />
            ) : null}
            {showCopy ? (
              <CopyButton value={code} variant="ghost" size="sm" tooltip={false} />
            ) : null}
          </div>
        </div>
      ) : null}
      <pre className="min-h-0 flex-1 overflow-auto p-4 text-sm leading-relaxed">
        {showLineNumbers ? (
          <code className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                <span className="select-none text-right tabular-nums text-muted-foreground">{i + 1}</span>
                <span className={lineClassName}>{line}</span>
              </React.Fragment>
            ))}
          </code>
        ) : (
          <code className={cn("block", lineClassName)}>{code}</code>
        )}
      </pre>
      {language ? (
        <span className="sr-only">Language: {language}</span>
      ) : null}
    </div>
  )
})

CodeBlock.displayName = "CodeBlock"

export { codeBlockVariants }
