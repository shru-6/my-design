import * as React from "react"
import { Button } from "../atoms/Button"
import { CopyIcon, CheckIcon } from "lucide-react"

export interface CopyButtonProps
  extends React.ComponentProps<typeof Button> {
  text?: string
  getText?: () => string
  onCopy?: () => void
  stopPropagation?: boolean
}

export function CopyButton({
  text,
  getText,
  onCopy,
  stopPropagation = true,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      e.stopPropagation()
    }
    const textToCopy = getText ? getText() : text || ""
    if (!textToCopy) return

    await navigator.clipboard.writeText(textToCopy)
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
      stopPropagation={stopPropagation}
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
