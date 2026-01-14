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
