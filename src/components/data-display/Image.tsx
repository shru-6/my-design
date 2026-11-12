import * as React from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { IconButton } from "../actions/IconButton"
import { Skeleton } from "./Skeleton"

const imageVariants = cva("block bg-muted", {
  variants: {
    // An image is a media surface, so `soft` reads from the surface tier.
    // `square` means *no* radius — an explicit "no shape", which is why it uses
    // an arbitrary zero rather than the banned flat scale's zero utility (the
    // same call fieldPieces makes for underline fields).
    //
    // `soft` is a rename (BREAKING): the old key shared its spelling with the
    // banned bare radius utility, and the check gate reads raw file text, so a
    // variant key spelled that way is indistinguishable from a real violation.
    variant: {
      default: "",
      soft: "rounded-surface-sm",
      circle: "rounded-pill",
      square: "rounded-[0]",
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
  /**
   * What to show while the image loads. `skeleton` renders a `Skeleton` in the
   * image's box; `none` renders nothing.
   *
   * (There used to be a third documented value, `blur`, that no code path ever
   * implemented — it behaved exactly like `skeleton`'s "hide the img" half with
   * nothing drawn in its place. Removed rather than left as a typed no-op.)
   */
  placeholder?: "skeleton" | "none"
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
          placeholder === "skeleton" && !loaded && "sr-only",
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
          // z-sticky: in-image chrome, above the picture but below any menu.
          <IconButton
            variant="outline"
            className={cn(
              "absolute bottom-1.5 right-1.5 z-sticky h-8 w-8 bg-background/90 shadow-sm backdrop-blur-sm",
              "opacity-0 transition-opacity group-hover/image:opacity-100 focus:opacity-100",
              "motion-reduce:opacity-100"
            )}
            ariaLabel={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            icon={
              isFullscreen ? (
                <Minimize2 className="h-4 w-4" aria-hidden />
              ) : (
                <Maximize2 className="h-4 w-4" aria-hidden />
              )
            }
            onClick={(e) => {
              e.stopPropagation()
              toggleFullscreen()
            }}
          />
        ) : null}
      </div>
    )
  }
)

Image.displayName = "Image"
