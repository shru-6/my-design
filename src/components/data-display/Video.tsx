import * as React from "react"
import { cn } from "../../utils"

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
}

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, src, width, height, style, ...props }, ref) => {
    return (
      <video
        ref={ref}
        data-slot="video"
        src={src}
        className={cn("max-w-full rounded-md bg-black object-contain", className)}
        style={{ width, height, ...style }}
        {...props}
      />
    )
  }
)

Video.displayName = "Video"
