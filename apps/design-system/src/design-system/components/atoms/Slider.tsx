"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const sliderOrientations = ["horizontal", "vertical"] as const

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  orientation?: typeof sliderOrientations[number]
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }

export function SliderShowcase() {
  const [value, setValue] = React.useState([50])
  return (
    <div className="space-y-6">
      {sliderOrientations.map((orientation) => (
        <div key={orientation} className={orientation === "vertical" ? "flex items-center gap-4" : "max-w-md"}>
          <h4 className="text-sm font-medium mb-3">
            {orientation.charAt(0).toUpperCase() + orientation.slice(1)} Slider
          </h4>
          {orientation === "horizontal" ? (
            <>
              <Slider
                value={value}
                onValueChange={setValue}
                max={100}
                step={1}
                orientation={orientation}
              />
              <div className="mt-2 text-sm text-muted-foreground">
                Value: {value[0]}
              </div>
            </>
          ) : (
            <div className="h-44">
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                orientation={orientation}
              />
            </div>
          )}
        </div>
      ))}
      <div className="max-w-md">
        <h4 className="text-sm font-medium mb-3">Range Slider</h4>
        <Slider
          defaultValue={[20, 80]}
          max={100}
          step={1}
        />
      </div>
      <div className="max-w-md">
        <h4 className="text-sm font-medium mb-3">Disabled</h4>
        <Slider
          defaultValue={[50]}
          disabled
        />
      </div>
    </div>
  )
}

