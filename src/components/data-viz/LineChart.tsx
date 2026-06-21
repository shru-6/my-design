import * as React from "react"
import { Chart, type ChartProps } from "./Chart"
import type { ChartDatum } from "./chartUtils"

export interface LineChartProps extends Omit<ChartProps, "type" | "data"> {
  data: ChartDatum[]
  xKey: string
  yKey: string
  curve?: "linear" | "monotone" | "step"
  showPoints?: boolean
  area?: boolean
}

export function LineChart({ data, xKey, yKey, curve: _curve = "linear", showPoints = true, area, ...props }: LineChartProps) {
  return (
    <Chart
      type={area ? "area" : "line"}
      data={data}
      xKey={xKey}
      yKey={yKey}
      showPoints={showPoints}
      area={area}
      {...props}
    />
  )
}

LineChart.displayName = "LineChart"
