import { cn } from "@/lib/utils"
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

export function ToastShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Toast Variants</h4>
        <div className="space-y-2">
          <Toast title="Success" description="Operation completed" variant="success" />
          <Toast title="Error" description="Something went wrong" variant="error" />
          <Toast title="Warning" description="Please review" variant="warning" />
        </div>
      </div>
    </div>
  )
}

