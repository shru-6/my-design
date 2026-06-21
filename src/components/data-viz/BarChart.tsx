import * as React from "react"
import { Chart, type ChartProps } from "./Chart"
import type { ChartDatum } from "./chartUtils"

export interface BarChartProps extends Omit<ChartProps, "type" | "data"> {
  data: ChartDatum[]
  xKey: string
  yKey: string
  stacked?: boolean
  horizontal?: boolean
}

export function BarChart({ data, xKey, yKey, stacked, horizontal, ...props }: BarChartProps) {
  return <Chart type="bar" data={data} xKey={xKey} yKey={yKey} horizontal={horizontal} stacked={stacked} {...props} />
}

BarChart.displayName = "BarChart"
