import * as React from "react"
import { cn } from "../utils"
import { Alert, AlertDescription } from "../atoms/Alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip"
import { InfoIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react"

export interface InfoBannerProps {
  message: string
  variant?: "info" | "warning" | "success"
  className?: string
  tooltip?: boolean
  children?: React.ReactNode
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
  tooltip = false,
  children,
}: InfoBannerProps) {
  const { icon: Icon } = variantMap[variant]

  const content = (
    <Alert
      data-slot="info-banner"
      className={cn(
        variant === "info" && "bg-primary/10 text-primary border-primary/20 [&>svg]:text-primary",
        variant === "warning" && "bg-accent/50 text-accent-foreground border-accent/30 [&>svg]:text-accent-foreground",
        variant === "success" && "bg-muted/50 text-muted-foreground border-border [&>svg]:text-muted-foreground",
        className
      )}
    >
      <Icon className="size-4" />
      <AlertDescription className="text-sm">{message}</AlertDescription>
    </Alert>
  )

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children || <Icon className="size-4" />}
          </TooltipTrigger>
          <TooltipContent>
            <p>{message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return content
}
