import * as React from "react"
import { Loader2Icon } from "lucide-react"
import { Button } from "./Button"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }

export function SpinnerShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Default Spinner</h4>
        <Spinner />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Different Sizes</h4>
        <div className="flex items-center gap-4">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
          <Spinner className="size-12" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">In Button</h4>
        <div className="flex gap-2">
          <Button disabled>
            <Spinner className="mr-2" />
            Loading...
          </Button>
          <Button variant="outline" disabled>
            <Spinner className="mr-2 size-4" />
            Processing
          </Button>
        </div>
      </div>
    </div>
  )
}

