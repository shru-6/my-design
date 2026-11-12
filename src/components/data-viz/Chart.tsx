import * as React from "react"
import { cn } from "../../utils"
import {
  CHART_COLORS,
  buildAreaPath,
  buildLinePath,
  describeArc,
  maxOf,
  readKey,
  readNumber,
  sumOf,
  type ChartDatum,
  type ChartPoint,
  type LineCurve,
} from "./chartUtils"

export type ChartType = "bar" | "line" | "area" | "pie" | "donut" | "scatter"

/**
 * Everything every chart type shares. The root element is the wrapper `<div>`,
 * so `...props` (and `className`) land there; anything meant for the `<svg>`
 * goes through `svgProps` rather than falling through onto the element as an
 * unknown DOM attribute.
 */
export interface ChartBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  data: ChartDatum[]
  /** Draw horizontal grid rules behind cartesian charts. Ignored by pie / donut. */
  grid?: boolean
  /** Render a swatch + label row under the plot. */
  legend?: boolean
  height?: number | string
  width?: number | string
  className?: string
  /** Pass-through to the underlying `<svg>` (e.g. a better `aria-label`). */
  svgProps?: React.SVGAttributes<SVGSVGElement>
}

/** Keys for the charts plotted on an x / y pair. */
export interface CartesianKeyProps {
  xKey?: string
  yKey?: string
}

export interface BarChartOptions {
  /** Lay the bars out along the x axis instead of up the y axis. */
  horizontal?: boolean
}

export interface LineChartOptions {
  /** Fill the region under the line. Implied by `type="area"`. */
  area?: boolean
  showPoints?: boolean
  /** Interpolation between points. `monotone` smooths without overshooting. */
  curve?: LineCurve
}

export interface PieChartOptions {
  valueKey?: string
  labelKey?: string
  /** Radius of the hole, in viewBox units. Anything above 0 makes it a donut. */
  innerRadius?: number
  /** Gap between adjacent slices, in degrees. */
  padAngle?: number
  /** Sweep the slices between these two angles (degrees, 0 = 12 o'clock). */
  startAngle?: number
  endAngle?: number
}

/**
 * The polymorphic entry point. `Chart` dispatches on `type`, so it accepts the
 * union of every renderer's options; the type-specific wrappers (`BarChart`,
 * `LineChart`, `PieChart`) expose only the subset that applies to them.
 */
export interface ChartProps
  extends ChartBaseProps,
    CartesianKeyProps,
    BarChartOptions,
    LineChartOptions,
    PieChartOptions {
  type: ChartType
}

const VIEW_W = 400
const VIEW_H = 240
const PAD = 36

function GridLines() {
  return (
    <g className="text-border" stroke="currentColor" strokeWidth="1">
      {[0, 1, 2, 3, 4].map((i) => {
        const y = PAD + ((VIEW_H - PAD * 2) / 4) * i
        return <line key={i} x1={PAD} x2={VIEW_W - PAD} y1={y} y2={y} opacity={0.35} />
      })}
    </g>
  )
}

/* -------------------------------------------------------------------------
 * Renderers. Each takes only the props it actually reads, and none of them
 * extends an SVG attribute type or spreads a rest object — a renderer has no
 * DOM surface of its own, so there is nothing to leak onto the elements.
 * ---------------------------------------------------------------------- */

type BarSvgProps = { data: ChartDatum[]; xKey: string; yKey: string; horizontal?: boolean }

function BarChartSvg({ data, xKey, yKey, horizontal }: BarSvgProps) {
  const max = maxOf(data, yKey) || 1
  const innerW = VIEW_W - PAD * 2
  const innerH = VIEW_H - PAD * 2
  const barGap = 8
  const barSize = (innerW - barGap * (data.length - 1)) / Math.max(data.length, 1)

  return (
    <g>
      {data.map((row, index) => {
        const value = readNumber(row, yKey)
        const label = readKey(row, xKey)
        const color = CHART_COLORS[index % CHART_COLORS.length]
        if (horizontal) {
          const w = (value / max) * innerW
          const y = PAD + index * (innerH / data.length)
          const h = innerH / data.length - barGap
          return (
            <g key={index}>
              <rect x={PAD} y={y} width={w} height={h} fill={color} rx={4} />
              <text
                x={PAD - 6}
                y={y + h / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {label}
              </text>
            </g>
          )
        }
        const h = (value / max) * innerH
        const x = PAD + index * (barSize + barGap)
        const y = VIEW_H - PAD - h
        return (
          <g key={index}>
            <rect x={x} y={y} width={barSize} height={h} fill={color} rx={4} />
            <text
              x={x + barSize / 2}
              y={VIEW_H - PAD + 14}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

type LineSvgProps = {
  data: ChartDatum[]
  xKey: string
  yKey: string
  area?: boolean
  showPoints?: boolean
  curve: LineCurve
}

function LineChartSvg({ data, xKey, yKey, area, showPoints, curve }: LineSvgProps) {
  const max = maxOf(data, yKey) || 1
  const innerW = VIEW_W - PAD * 2
  const innerH = VIEW_H - PAD * 2
  const baseline = VIEW_H - PAD
  const points: ChartPoint[] = data.map((row, index) => {
    const x = PAD + (index / Math.max(data.length - 1, 1)) * innerW
    const y = baseline - (readNumber(row, yKey) / max) * innerH
    return { x, y }
  })
  const linePath = buildLinePath(points, curve)

  return (
    <g>
      {area ? <path d={buildAreaPath(points, baseline, curve)} fill="hsl(var(--primary))" opacity={0.15} /> : null}
      <path d={linePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      {showPoints
        ? points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill="hsl(var(--primary))" />)
        : null}
      {data.map((row, index) => (
        <text
          key={index}
          x={points[index]?.x ?? PAD}
          y={VIEW_H - PAD + 14}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          {readKey(row, xKey)}
        </text>
      ))}
    </g>
  )
}

type PieSvgProps = {
  data: ChartDatum[]
  valueKey: string
  labelKey: string
  innerRadius: number
  padAngle: number
  startAngle: number
  endAngle: number
}

function PieChartSvg({ data, valueKey, labelKey, innerRadius, padAngle, startAngle, endAngle }: PieSvgProps) {
  const total = sumOf(data, valueKey) || 1
  const cx = VIEW_W / 2
  const cy = VIEW_H / 2
  const radius = Math.min(VIEW_W, VIEW_H) / 2 - 24
  const sweep = endAngle - startAngle
  let cursor = startAngle

  return (
    <g>
      {data.map((row, index) => {
        const value = readNumber(row, valueKey)
        const angle = (value / total) * sweep
        const start = cursor
        const end = cursor + angle
        cursor = end
        // Halve the pad at each edge so the visible gap between two slices is
        // `padAngle`, and never let it eat a slice smaller than the gap.
        const inset = Math.min(padAngle / 2, Math.max(angle / 2 - 0.01, 0))
        const color = CHART_COLORS[index % CHART_COLORS.length]
        const path = describeArc(cx, cy, radius, start + inset, end - inset)
        return <path key={index} d={`${path} L ${cx} ${cy} Z`} fill={color} />
      })}
      {innerRadius > 0 ? <circle cx={cx} cy={cy} r={innerRadius} fill="hsl(var(--background))" /> : null}
      {data.map((row, index) => (
        <text key={`label-${index}`} x={PAD} y={PAD + index * 14} className="fill-foreground text-[10px]">
          {readKey(row, labelKey)} ({readNumber(row, valueKey)})
        </text>
      ))}
    </g>
  )
}

type ScatterSvgProps = { data: ChartDatum[]; xKey: string; yKey: string }

function ScatterChartSvg({ data, xKey, yKey }: ScatterSvgProps) {
  const maxX = maxOf(data, xKey) || 1
  const maxY = maxOf(data, yKey) || 1
  const innerW = VIEW_W - PAD * 2
  const innerH = VIEW_H - PAD * 2
  return (
    <g>
      {data.map((row, index) => {
        const x = PAD + (readNumber(row, xKey) / maxX) * innerW
        const y = VIEW_H - PAD - (readNumber(row, yKey) / maxY) * innerH
        return <circle key={index} cx={x} cy={y} r={4} fill={CHART_COLORS[index % CHART_COLORS.length]} />
      })}
    </g>
  )
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(function Chart(
  {
    type,
    data,
    xKey,
    yKey,
    valueKey = "value",
    labelKey = "label",
    legend = false,
    grid = true,
    height = 240,
    width = "100%",
    innerRadius,
    padAngle = 0,
    startAngle = 0,
    endAngle = 360,
    horizontal,
    area,
    showPoints,
    curve = "linear",
    className,
    style,
    svgProps,
    ...props
  },
  ref
) {
  const isPie = type === "pie" || type === "donut"
  // Scatter plots default to numeric x / y keys; the categorical charts read a
  // label column. Resolved here so every renderer gets a concrete string.
  const resolvedXKey = xKey ?? (type === "scatter" ? "x" : "label")
  const resolvedYKey = yKey ?? (type === "scatter" ? "y" : "value")

  return (
    <div
      ref={ref}
      data-slot="chart"
      className={cn("w-full", className)}
      style={{ ...style, width, height: typeof height === "number" ? `${height}px` : height }}
      {...props}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        width="100%"
        height="100%"
        role="img"
        aria-label="Chart"
        {...svgProps}
      >
        {grid && !isPie ? <GridLines /> : null}
        {type === "bar" ? (
          <BarChartSvg data={data} xKey={resolvedXKey} yKey={resolvedYKey} horizontal={horizontal} />
        ) : null}
        {type === "line" || type === "area" ? (
          <LineChartSvg
            data={data}
            xKey={resolvedXKey}
            yKey={resolvedYKey}
            area={type === "area" || area}
            showPoints={showPoints}
            curve={curve}
          />
        ) : null}
        {type === "scatter" ? <ScatterChartSvg data={data} xKey={resolvedXKey} yKey={resolvedYKey} /> : null}
        {isPie ? (
          <PieChartSvg
            data={data}
            valueKey={valueKey}
            labelKey={labelKey}
            innerRadius={type === "donut" ? innerRadius ?? 40 : 0}
            padAngle={padAngle}
            startAngle={startAngle}
            endAngle={endAngle}
          />
        ) : null}
      </svg>
      {legend ? (
        <div className="mt-2 flex flex-wrap gap-3">
          {data.map((row, index) => (
            <div key={index} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="h-2 w-2 rounded-pill"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              {readKey(row, isPie ? labelKey : resolvedXKey)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
})

Chart.displayName = "Chart"
