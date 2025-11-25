"use client"

import * as React from "react"
import { useState } from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { Button } from "../atoms/Button"
import { ChevronDownIcon } from "lucide-react"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

export function CollapsibleShowcase() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">Default Collapsible</h4>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between space-x-4">
            <h4 className="text-sm font-semibold">
              @peduarte starred 3 repositories
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDownIcon className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="rounded-md border px-4 py-2 text-sm">
              @radix-ui/primitives
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              @radix-ui/colors
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

