import * as React from "react"
import { cn } from "../utils"
import { Alert, AlertDescription } from "../atoms/Alert"
import { InfoIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react"

export interface InfoBannerProps {
  message: string
  variant?: "info" | "warning" | "success"
  className?: string
}

const variantMap = {
  info: { variant: "default" as const, icon: InfoIcon },
  warning: { variant: "default" as const, icon: AlertCircleIcon },
  success: { variant: "default" as const, icon: CheckCircleIcon },
}

export function InfoBanner({
  message,
  variant = "info",
  className,
}: InfoBannerProps) {
  const { icon: Icon } = variantMap[variant]

  return (
    <Alert
      data-slot="info-banner"
      className={cn(
        variant === "info" && "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
        variant === "warning" && "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
        variant === "success" && "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
        className
      )}
    >
      <Icon className="size-4" />
      <AlertDescription className="text-sm">{message}</AlertDescription>
    </Alert>
  )
}
