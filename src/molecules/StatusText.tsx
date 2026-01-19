import * as React from "react"
import { cn } from "../utils"
import { Text } from "../atoms/Text"
import { Badge } from "../atoms/Badge"
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "lucide-react"

export interface StatusTextProps {
  // Text-based API
  text?: string
  status?: "success" | "error" | "warning" | "info"
  // Count/label API (alternative)
  count?: number
  label?: string
  variant?: "caption" | "body" | "heading" | "badge"
  formatText?: (text: string, count?: number, label?: string) => string
  className?: string
  // Element type for HTML validation (default: "div", can be "span", "p", etc.)
  as?: "div" | "span" | "p"
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
  formatText,
  className,
  as = "div",
}: StatusTextProps) {
  // Determine display text
  const displayText = React.useMemo(() => {
    let baseText = ""
    if (text) {
      baseText = text
    } else if (count !== undefined && label) {
      const pluralizedLabel = count === 1 ? label : `${label}s`
      baseText = `${count} ${pluralizedLabel}`
    }
    
    // Apply custom formatting if provided
    if (formatText) {
      return formatText(baseText, count, label)
    }
    
    return baseText
  }, [text, count, label, formatText])

  const Icon = statusIcons[status]

  const variantClasses = {
    caption: "text-xs",
    body: "text-sm",
    heading: "text-base font-medium",
    badge: "",
  }

  // Badge variant
  if (variant === "badge") {
    const badgeVariantMap = {
      success: "default" as const,
      error: "destructive" as const,
      warning: "outline" as const,
      info: "secondary" as const,
    }

    return (
      <Badge
        variant={badgeVariantMap[status]}
        data-slot="status-text"
        className={cn("flex items-center gap-1.5", className)}
      >
        <Icon className="size-3" />
        <span>{displayText}</span>
      </Badge>
    )
  }

  // Text variant
  return (
    <Text
      as={as}
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
