import * as React from "react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "../atoms/Alert"
import { Button } from "../atoms/Button"

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

export function SnackbarShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Snackbar Variants</h4>
        <div className="space-y-4 relative">
          <div className="relative">
            <Snackbar 
              message="Item added to cart" 
              variant="success" 
              className="relative bottom-auto left-auto translate-x-0 shadow-md"
            />
          </div>
          <div className="relative">
            <Snackbar 
              message="Failed to save" 
              variant="error" 
              action={<Button size="sm">Retry</Button>}
              className="relative bottom-auto left-auto translate-x-0 shadow-md"
            />
          </div>
          <div className="relative">
            <Snackbar 
              message="Settings saved successfully" 
              variant="default"
              className="relative bottom-auto left-auto translate-x-0 shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

