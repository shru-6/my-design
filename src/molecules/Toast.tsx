import { cn } from "../utils"
import { Alert, AlertTitle, AlertDescription } from "../atoms/Alert"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "success" | "error" | "warning"
  className?: string
}

const variantMap = {
  default: "default" as const,
  success: "default" as const,
  error: "destructive" as const,
  warning: "default" as const,
}

export function Toast({
  title,
  description,
  variant = "default",
  className,
}: ToastProps) {
  return (
    <Alert
      data-slot="toast"
      variant={variantMap[variant]}
      className={cn(
        "shadow-lg",
        variant === "success" && "border-green-500",
        variant === "warning" && "border-yellow-500",
        className
      )}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}
