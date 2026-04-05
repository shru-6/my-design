import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Skeleton } from "./Skeleton"

const imageVariants = cva("block bg-muted", {
  variants: {
    variant: {
      default: "",
      rounded: "rounded-md",
      circle: "rounded-full",
      square: "rounded-none",
    },
    fit: {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    },
  },
  defaultVariants: {
    variant: "default",
    fit: "cover",
  },
})

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "placeholder">,
    VariantProps<typeof imageVariants> {
  fallback?: React.ReactNode
  placeholder?: "blur" | "skeleton" | "none"
  loadingStrategy?: "lazy" | "eager"
  position?: string
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fit,
      variant,
      fallback,
      placeholder = "none",
      loadingStrategy,
      position,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [loaded, setLoaded] = React.useState(false)
    const [failed, setFailed] = React.useState(false)

    if (!src || failed) {
      if (fallback) return <>{fallback}</>
      return <Skeleton variant="card" width={width} height={height} className={className} />
    }

    return (
      <>
        {placeholder === "skeleton" && !loaded ? (
          <Skeleton variant="card" width={width} height={height} className={className} />
        ) : null}
        <img
          ref={ref}
          src={src}
          alt={alt ?? ""}
          width={width}
          height={height}
          className={cn(imageVariants({ fit, variant }), className, placeholder !== "none" && !loaded && "sr-only")}
          loading={loadingStrategy}
          style={{ objectPosition: position, ...style }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          {...props}
        />
      </>
    )
  }
)

Image.displayName = "Image"
