import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

export interface StepperProps {
  steps: Array<{
    label: string
    completed?: boolean
    active?: boolean
  }>
  className?: string
}

export function Stepper({ steps, className }: StepperProps) {
  return (
    <div
      data-slot="stepper"
      className={cn("flex items-center gap-4", className)}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full border-2",
                step.completed
                  ? "border-primary bg-primary text-primary-foreground"
                  : step.active
                  ? "border-primary text-primary"
                  : "border-muted text-muted-foreground"
              )}
            >
              {step.completed ? (
                <CheckIcon className="size-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                step.active && "font-medium text-foreground",
                !step.active && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-12",
                step.completed ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export function StepperShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Stepper</h4>
        <Stepper
          steps={[
            { label: "Step 1", completed: true },
            { label: "Step 2", active: true },
            { label: "Step 3" },
          ]}
        />
      </div>
    </div>
  )
}

