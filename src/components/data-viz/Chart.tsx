import * as React from "react"
import { cn } from "../../utils"
import {
  CHART_COLORS,
  describeArc,
  maxOf,
  readKey,
  readNumber,
  sumOf,
  type ChartDatum,
} from "./chartUtils"

export type ChartType = "bar" | "line" | "area" | "pie" | "donut" | "scatter"

export interface ChartProps extends React.SVGAttributes<SVGSVGElement> {
  type: ChartType
  data: ChartDatum[]
  xKey?: string
  yKey?: string
  valueKey?: string
  labelKey?: string
  responsive?: boolean
  legend?: boolean
  tooltip?: boolean
  grid?: boolean
  config?: Record<string, { label?: string; color?: string }>
  height?: number | string
  width?: number | string
  innerRadius?: number
  horizontal?: boolean
  stacked?: boolean
  area?: boolean
  showPoints?: boolean
  className?: string
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

function BarChartSvg({ data, xKey = "label", yKey = "value", horizontal }: ChartProps) {
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
              <text x={PAD - 6} y={y + h / 2} textAnchor="end" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">
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
            <text x={x + barSize / 2} y={VIEW_H - PAD + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function LineChartSvg({ data, xKey = "label", yKey = "value", area, showPoints }: ChartProps) {
  const max = maxOf(data, yKey) || 1
  const innerW = VIEW_W - PAD * 2
  const innerH = VIEW_H - PAD * 2
  const points = data.map((row, index) => {
    const x = PAD + (index / Math.max(data.length - 1, 1)) * innerW
    const y = VIEW_H - PAD - (readNumber(row, yKey) / max) * innerH
    return { x, y }
  })
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ")
  const areaPath = `${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")} L ${points[points.length - 1]?.x ?? PAD} ${VIEW_H - PAD} L ${points[0]?.x ?? PAD} ${VIEW_H - PAD} Z`

  return (
    <g>
      <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2" points={polyline} />
      {area ? <path d={areaPath} fill="hsl(var(--primary))" opacity={0.15} /> : null}
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

function PieChartSvg({ data, valueKey = "value", labelKey = "label", innerRadius = 0 }: ChartProps) {
  const total = sumOf(data, valueKey) || 1
  const cx = VIEW_W / 2
  const cy = VIEW_H / 2
  const radius = Math.min(VIEW_W, VIEW_H) / 2 - 24
  let cursor = 0

  return (
    <g>
      {data.map((row, index) => {
        const value = readNumber(row, valueKey)
        const angle = (value / total) * 360
        const start = cursor
        const end = cursor + angle
        cursor = end
        const color = CHART_COLORS[index % CHART_COLORS.length]
        const path = describeArc(cx, cy, radius, start, end)
        return (
          <g key={index}>
            <path d={`${path} L ${cx} ${cy} Z`} fill={color} />
            {innerRadius > 0 ? <circle cx={cx} cy={cy} r={innerRadius} fill="hsl(var(--background))" /> : null}
          </g>
        )
      })}
      {data.map((row, index) => (
        <text key={`label-${index}`} x={PAD} y={PAD + index * 14} className="fill-foreground text-[10px]">
          {readKey(row, labelKey)} ({readNumber(row, valueKey)})
        </text>
      ))}
    </g>
  )
}

function ScatterChartSvg({ data, xKey = "x", yKey = "y" }: ChartProps) {
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

export function Chart({
  type,
  data,
  xKey,
  yKey,
  valueKey,
  labelKey,
  responsive = true,
  legend = false,
  grid = true,
  height = 240,
  width = "100%",
  innerRadius,
  horizontal,
  area,
  showPoints,
  className,
  ...props
}: ChartProps) {
  const chartProps: ChartProps = {
    type,
    data,
    xKey,
    yKey,
    valueKey,
    labelKey,
    horizontal,
    area: type === "area" || area,
    showPoints,
    innerRadius: type === "donut" ? innerRadius ?? 40 : innerRadius,
  }

  return (
    <div className={cn("w-full", className)} style={{ width, height: typeof height === "number" ? `${height}px` : height }}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" height="100%" role="img" aria-label="Chart" {...props}>
        {grid && type !== "pie" && type !== "donut" ? <GridLines /> : null}
        {type === "bar" ? <BarChartSvg {...chartProps} /> : null}
        {type === "line" || type === "area" ? <LineChartSvg {...chartProps} /> : null}
        {type === "scatter" ? <ScatterChartSvg {...chartProps} /> : null}
        {type === "pie" || type === "donut" ? <PieChartSvg {...chartProps} innerRadius={type === "donut" ? innerRadius ?? 40 : 0} /> : null}
      </svg>
      {legend ? (
        <div className="mt-2 flex flex-wrap gap-3">
          {data.map((row, index) => (
            <div key={index} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
              {readKey(row, labelKey ?? xKey ?? "label")}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

Chart.displayName = "Chart"
