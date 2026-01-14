import * as React from "react"
import { cn } from "../utils"
import { Alert, AlertDescription } from "../atoms/Alert"

export interface SnackbarProps {
  message: string
  action?: React.ReactNode
  variant?: "default" | "success" | "error"
  className?: string
}

const variantMap = {
  default: "default" as const,
  success: "default" as const,
  error: "destructive" as const,
}

export function Snackbar({
  message,
  action,
  variant = "default",
  className,
}: SnackbarProps) {
  return (
    <Alert
      data-slot="snackbar"
      variant={variantMap[variant]}
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 shadow-lg flex items-center gap-4",
        variant === "success" && "border-green-500",
        className
      )}
    >
      <AlertDescription>{message}</AlertDescription>
      {action && <div>{action}</div>}
    </Alert>
  )
}
