import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../utils"
import { Text } from "../data-display/Text"
import { Button } from "../actions/Button"

/** Between vertical steps (padding on each item, not gap on list). */
const STEP_VERTICAL_ITEM_PAD = "pb-5 last:pb-0"
/** Label line ↔ description line (both orientations). */
const STEP_LABEL_GAP = "gap-2"

export type StepStatus = "complete" | "current" | "upcoming" | "error"

export interface StepItem {
  label: React.ReactNode
  description?: React.ReactNode
  optional?: boolean
  status?: StepStatus
}

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  steps: StepItem[]
  value?: number
  defaultValue?: number
  onChange?: (step: number) => void
  orientation?: "horizontal" | "vertical"
  allowBack?: boolean
  /**
   * Horizontal layout only: space between equal-width step columns.
   * - `none` — no gutter; columns still share width equally (`flex-1`).
   * - `md` — even gap between columns (`gap-4`).
   */
  horizontalGap?: "none" | "md"
}

function resolveStatus(step: StepItem, index: number, active: number): StepStatus {
  if (step.status) return step.status
  if (index < active) return "complete"
  if (index === active) return "current"
  return "upcoming"
}

function StepCircle({
  index,
  status,
  onChange,
  allowBack,
}: {
  index: number
  status: StepStatus
  onChange?: (step: number) => void
  allowBack: boolean
}) {
  const circleClass =
    status === "complete"
      ? "border-primary bg-primary text-primary-foreground"
      : status === "current"
        ? "border-primary bg-background text-primary ring-2 ring-ring ring-offset-2 ring-offset-background"
        : status === "error"
          ? "border-destructive bg-destructive/10 text-destructive"
          : "border-border bg-muted/40 text-muted-foreground"

  const canClick =
    onChange && (status === "current" || (status === "complete" && allowBack))

  const inner =
    status === "complete" ? (
      <Check className="h-4 w-4" strokeWidth={2.5} />
    ) : (
      <span className="text-sm font-semibold tabular-nums">{index + 1}</span>
    )

  if (onChange) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-9 w-9 shrink-0 rounded-full border-2 p-0",
          circleClass,
          !canClick && "pointer-events-none cursor-default hover:bg-transparent"
        )}
        aria-current={status === "current" ? "step" : undefined}
        onClick={() => canClick && onChange(index)}
      >
        {inner}
      </Button>
    )
  }

  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold tabular-nums",
        circleClass
      )}
      aria-current={status === "current" ? "step" : undefined}
    >
      {status === "complete" ? <Check className="h-4 w-4" strokeWidth={2.5} /> : index + 1}
    </div>
  )
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps = [],
      value,
      defaultValue = 0,
      onChange,
      orientation = "horizontal",
      allowBack = true,
      horizontalGap = "none",
      className,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultValue)
    const isControlled = value !== undefined
    const active = isControlled ? value! : internal

    const setStep = (next: number) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    }

    const stepChange = onChange ? (i: number) => setStep(i) : undefined

    return (
      <div ref={ref} role="navigation" aria-label="Progress" className={cn("w-full", className)} {...props}>
        {orientation === "vertical" ? (
          <ol className="relative flex list-none flex-col">
            {steps.length > 1 ? (
              <div
                className="pointer-events-none absolute bottom-5 left-[1.125rem] top-[1.125rem] w-px -translate-x-1/2 bg-border"
                aria-hidden
              />
            ) : null}
            {steps.map((step, index) => {
              const status = resolveStatus(step, index, active)
              return (
                <li key={index} className={cn("relative z-[1] flex gap-3", STEP_VERTICAL_ITEM_PAD)}>
                  <div className="flex shrink-0 flex-col items-center">
                    <StepCircle
                      index={index}
                      status={status}
                      onChange={stepChange}
                      allowBack={allowBack}
                    />
                  </div>
                  <div className={cn("flex min-w-0 flex-col pt-1.5", STEP_LABEL_GAP)}>
                    <Text as="div" size="sm" weight="medium" className="block leading-tight">
                      {step.label}
                      {step.optional ? (
                        <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
                      ) : null}
                    </Text>
                    {step.description ? (
                      <Text as="div" size="2xs" variant="muted" className="block w-full leading-snug">
                        {step.description}
                      </Text>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>
        ) : (
          <ol className="relative flex w-full list-none flex-row items-start gap-0">
            {steps.length > 1 ? (
              <div
                className="pointer-events-none absolute inset-x-0 top-[1.125rem] h-0.5 -translate-y-1/2 bg-border"
                style={{
                  left: `${100 / steps.length / 2}%`,
                  right: `${100 / steps.length / 2}%`,
                }}
                aria-hidden
              />
            ) : null}
            {steps.map((step, index) => {
              const status = resolveStatus(step, index, active)
              return (
                <li
                  key={index}
                  className={cn(
                    "relative z-[1] flex min-h-0 min-w-0 flex-1 basis-0 flex-col items-center text-center",
                    horizontalGap === "md" && index > 0 && "ml-4",
                    STEP_LABEL_GAP
                  )}
                >
                  <div className="flex w-full items-center justify-center">
                    <StepCircle
                      index={index}
                      status={status}
                      onChange={stepChange}
                      allowBack={allowBack}
                    />
                  </div>
                  <div className={cn("flex w-full flex-col items-center px-1", STEP_LABEL_GAP)}>
                    <Text as="div" size="sm" weight="medium" className="block w-full leading-tight">
                      {step.label}
                      {step.optional ? (
                        <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
                      ) : null}
                    </Text>
                    {step.description ? (
                      <Text as="div" size="2xs" variant="muted" className="block w-full leading-snug">
                        {step.description}
                      </Text>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    )
  }
)

Stepper.displayName = "Stepper"
