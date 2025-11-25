"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }

export function AspectRatioShowcase() {
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">16:9 Aspect Ratio</h4>
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <span className="text-muted-foreground">16:9</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  )
}

