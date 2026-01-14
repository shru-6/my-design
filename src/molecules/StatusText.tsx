import * as React from "react"
import { cn } from "../utils"
import { Text } from "../atoms/Text"
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "lucide-react"

export interface StatusTextProps {
  text: string
  status: "success" | "error" | "warning" | "info"
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
  status,
  className,
}: StatusTextProps) {
  const Icon = statusIcons[status]

  return (
    <Text
      as="div"
      data-slot="status-text"
      className={cn(
        "flex items-center gap-2",
        status === "success" && "text-green-600 dark:text-green-400",
        status === "error" && "text-destructive",
        status === "warning" && "text-yellow-600 dark:text-yellow-400",
        status === "info" && "text-blue-600 dark:text-blue-400",
        className
      )}
    >
      <Icon className="size-4" />
      <span>{text}</span>
    </Text>
  )
}
