import * as React from "react"
import { Chart, type ChartProps } from "./Chart"
import type { ChartDatum } from "./chartUtils"

export interface PieChartProps extends Omit<ChartProps, "type" | "data"> {
  data: ChartDatum[]
  valueKey: string
  labelKey?: string
  innerRadius?: number
  padAngle?: number
  startAngle?: number
  endAngle?: number
}

export function PieChart({ data, valueKey, labelKey, innerRadius, ...props }: PieChartProps) {
  const isDonut = innerRadius != null && innerRadius > 0
  return (
    <Chart
      type={isDonut ? "donut" : "pie"}
      data={data}
      valueKey={valueKey}
      labelKey={labelKey}
      innerRadius={innerRadius}
      {...props}
    />
  )
}

PieChart.displayName = "PieChart"
