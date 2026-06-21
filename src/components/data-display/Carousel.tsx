import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Image } from "./Image"
import { Text } from "./Text"

export type CarouselItem = {
  image: string
  imageAlt?: string
  content?: React.ReactNode
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[]
  autoPlay?: boolean
  loop?: boolean
  interval?: number
  showIndicators?: boolean
  showArrows?: boolean
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function Carousel({
  items = [],
  autoPlay = false,
  loop = true,
  interval = 4000,
  showIndicators = true,
  showArrows = true,
  orientation = "horizontal",
  className,
  ...rest
}: CarouselProps) {
  const [index, setIndex] = React.useState(0)
  const count = items.length

  const go = React.useCallback(
    (next: number) => {
      if (!count) return
      if (loop) setIndex(((next % count) + count) % count)
      else setIndex(Math.max(0, Math.min(count - 1, next)))
    },
    [count, loop]
  )

  React.useEffect(() => {
    if (!autoPlay || count < 2) return
    const timer = window.setInterval(() => go(index + 1), interval)
    return () => window.clearInterval(timer)
  }, [autoPlay, count, go, index, interval])

  if (!count) return null

  const item = items[index]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card",
        orientation === "vertical" ? "h-72" : "w-full",
        className
      )}
      {...rest}
    >
      <div className={cn(orientation === "vertical" ? "h-full" : "w-full")}>
        <Image src={item.image} alt={item.imageAlt ?? ""} className="h-48 w-full md:h-56" fit="cover" variant="square" />
        {item.content ? <div className="p-4">{item.content}</div> : null}
      </div>

      {showArrows && count > 1 ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-background/80"
            left={<ChevronLeft className="h-4 w-4" />}
            onClick={() => go(index - 1)}
          />
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-background/80"
            left={<ChevronRight className="h-4 w-4" />}
            onClick={() => go(index + 1)}
          />
        </>
      ) : null}

      {showIndicators && count > 1 ? (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === index ? "bg-primary" : "bg-muted-foreground/40"
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}

      <Text as="span" size="xs" variant="muted" className="sr-only">
        Slide {index + 1} of {count}
      </Text>
    </div>
  )
}

Carousel.displayName = "Carousel"
