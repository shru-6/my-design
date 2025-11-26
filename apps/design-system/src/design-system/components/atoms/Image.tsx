import * as React from "react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"

export interface ImageProps
  extends React.ComponentProps<typeof NextImage> {
  fallback?: React.ReactNode
}

export function Image({
  className,
  fallback,
  alt,
  ...props
}: ImageProps) {
  const [hasError, setHasError] = React.useState(false)

  if (hasError && fallback) {
    return <>{fallback}</>
  }

  return (
    <NextImage
      data-slot="image"
      className={cn("object-cover", className)}
      alt={alt || ""}
      onError={() => setHasError(true)}
      priority={false}
      loading="lazy"
      {...props}
    />
  )
}

export function ImageShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Image with fallback</h4>
        <div className="w-32 h-32 border rounded-lg overflow-hidden">
          <Image
            src="/placeholder.png"
            alt="Placeholder"
            width={128}
            height={128}
            fallback={<div className="w-full h-full bg-muted flex items-center justify-center">No image</div>}
          />
        </div>
      </div>
    </div>
  )
}

