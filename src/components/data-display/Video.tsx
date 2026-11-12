import * as React from "react"
import { cn } from "../../utils"

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
}

/**
 * Letterbox behind an `object-contain` video.
 *
 * This was a raw Tailwind black. A video player's letterbox is one of the few
 * surfaces that arguably wants a fixed near-black in *every* theme rather than
 * a theme-aware neutral — but there is no such token today (`base.json` has no
 * fixed-dark media colour, and `bg-foreground` inverts in a dark theme, which
 * is exactly wrong here). So this uses the neutral surface token and stays
 * theme-correct. TODO: if the design system ever grows a fixed
 * `color.media-surface`, switch to it — owner is the tokens batch, since
 * `src/tokens/` is off-limits to component passes.
 */
const videoLetterbox = "bg-muted"

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, src, width, height, style, ...props }, ref) => {
    return (
      <video
        ref={ref}
        data-slot="video"
        src={src}
        className={cn("max-w-full rounded-surface-sm object-contain", videoLetterbox, className)}
        style={{ width, height, ...style }}
        {...props}
      />
    )
  }
)

Video.displayName = "Video"
