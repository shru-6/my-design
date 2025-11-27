import * as React from "react"
import { cn } from "../utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode
  src?: string
  alt?: string
  width?: number | string
  height?: number | string
  loading?: "lazy" | "eager"
}

/**
 * Image component - uses standard HTML img tag for library compatibility.
 * 
 * For Next.js optimization, use next/image directly in your Next.js app.
 * This component is library-compatible and works in any React environment.
 */
export function Image({
  className,
  fallback,
  alt,
  src,
  width,
  height,
  loading = "lazy",
  ...props
}: ImageProps) {
  const [hasError, setHasError] = React.useState(false)

  if (hasError && fallback) {
    return <>{fallback}</>
  }

  return (
    <img
      data-slot="image"
      className={cn("object-cover", className)}
      alt={alt || ""}
      src={src}
      width={width}
      height={height}
      loading={loading}
      onError={() => setHasError(true)}
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

