import * as React from "react"
import { cn } from "../utils"
import { Text } from "../atoms/Text"
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "lucide-react"

export interface StatusTextProps {
  // Text-based API
  text?: string
  status?: "success" | "error" | "warning" | "info"
  // Count/label API (alternative)
  count?: number
  label?: string
  variant?: "caption" | "body" | "heading"
  className?: string
}

const statusIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: AlertCircleIcon,
  info: AlertCircleIcon,
}

export function StatusText({
  text,
  status = "info",
  count,
  label,
  variant = "body",
  className,
}: StatusTextProps) {
  // Determine display text
  const displayText = React.useMemo(() => {
    if (text) return text
    if (count !== undefined && label) {
      const pluralizedLabel = count === 1 ? label : `${label}s`
      return `${count} ${pluralizedLabel}`
    }
    return ""
  }, [text, count, label])

  const Icon = statusIcons[status]

  const variantClasses = {
    caption: "text-xs",
    body: "text-sm",
    heading: "text-base font-medium",
  }

  return (
    <Text
      as="div"
      data-slot="status-text"
      className={cn(
        "flex items-center gap-2",
        variantClasses[variant],
        status === "success" && "text-green-600 dark:text-green-400",
        status === "error" && "text-destructive",
        status === "warning" && "text-yellow-600 dark:text-yellow-400",
        status === "info" && "text-blue-600 dark:text-blue-400",
        className
      )}
    >
      <Icon className="size-4" />
      <span>{displayText}</span>
    </Text>
  )
}
