"use client"

import * as React from "react"
import { useState } from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { Button } from "./Button"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

export function ProgressShowcase() {
  const [progress, setProgress] = useState(33)
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">Default Progress</h4>
        <Progress value={progress} />
        <div className="mt-2 text-sm text-muted-foreground">
          {progress}% complete
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Different Values</h4>
        <div className="space-y-4">
          <div>
            <Progress value={0} />
            <div className="mt-1 text-xs text-muted-foreground">0%</div>
          </div>
          <div>
            <Progress value={50} />
            <div className="mt-1 text-xs text-muted-foreground">50%</div>
          </div>
          <div>
            <Progress value={100} />
            <div className="mt-1 text-xs text-muted-foreground">100%</div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Interactive</h4>
        <Progress value={progress} />
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
            -10%
          </Button>
          <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
            +10%
          </Button>
        </div>
      </div>
    </div>
  )
}

