import * as React from "react"
import { Maximize2, Minimize2 } from "lucide-react"
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
  /**
   * When true, shows a control to enter/exit native fullscreen on the image (wrapper element).
   */
  allowFullscreen?: boolean
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
      allowFullscreen = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [loaded, setLoaded] = React.useState(false)
    const [failed, setFailed] = React.useState(false)
    const shellRef = React.useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = React.useState(false)

    React.useEffect(() => {
      const onChange = () => {
        setIsFullscreen(document.fullscreenElement === shellRef.current)
      }
      document.addEventListener("fullscreenchange", onChange)
      return () => document.removeEventListener("fullscreenchange", onChange)
    }, [])

    const toggleFullscreen = React.useCallback(() => {
      const el = shellRef.current
      if (!el) return
      void (async () => {
        try {
          if (document.fullscreenElement === el) {
            await document.exitFullscreen()
          } else {
            await el.requestFullscreen()
          }
        } catch {
          // Unsupported or denied
        }
      })()
    }, [])

    if (!src || failed) {
      if (fallback) return <>{fallback}</>
      return <Skeleton variant="card" width={width} height={height} className={className} />
    }

    const img = (
      <img
        ref={ref}
        src={src}
        alt={alt ?? ""}
        width={width}
        height={height}
        className={cn(
          imageVariants({ fit, variant }),
          className,
          placeholder !== "none" && !loaded && "sr-only",
          isFullscreen && "max-h-full max-w-full object-contain"
        )}
        loading={loadingStrategy}
        style={{ objectPosition: position, ...style }}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        {...props}
      />
    )

    const inner = (
      <>
        {placeholder === "skeleton" && !loaded ? (
          <Skeleton variant="card" width={width} height={height} className={className} />
        ) : null}
        {img}
      </>
    )

    if (!allowFullscreen) {
      return <>{inner}</>
    }

    return (
      <div
        ref={shellRef}
        className={cn("group/image relative inline-block max-w-full", isFullscreen && "flex h-full w-full items-center justify-center bg-background")}
      >
        {inner}
        {loaded ? (
          <button
            type="button"
            className={cn(
              "absolute bottom-1.5 right-1.5 z-10 rounded-md border border-border bg-background/90 p-1.5 text-foreground shadow-sm backdrop-blur-sm",
              "opacity-0 transition-opacity hover:bg-background group-hover/image:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "motion-reduce:opacity-100"
            )}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={(e) => {
              e.stopPropagation()
              toggleFullscreen()
            }}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Maximize2 className="h-4 w-4" aria-hidden />}
          </button>
        ) : null}
      </div>
    )
  }
)

Image.displayName = "Image"
