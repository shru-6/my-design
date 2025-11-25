import * as React from "react"
import { Button } from "../atoms/Button"
import { CopyIcon, CheckIcon } from "lucide-react"

export interface CopyButtonProps
  extends React.ComponentProps<typeof Button> {
  text: string
  onCopy?: () => void
}

export function CopyButton({
  text,
  onCopy,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    onCopy?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      data-slot="copy-button"
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      {...props}
    >
      {copied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </Button>
  )
}

export function CopyButtonShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Copy Button</h4>
        <div className="flex items-center gap-2">
          <span>Copy this text</span>
          <CopyButton text="Copy this text" onCopy={() => console.log("Copied")} />
        </div>
      </div>
    </div>
  )
}

