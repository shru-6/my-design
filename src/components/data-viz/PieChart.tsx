import * as React from "react"
import { Chart, type ChartBaseProps, type PieChartOptions } from "./Chart"

/** Only what a pie / donut chart actually reads — no cartesian keys. */
export interface PieChartProps extends ChartBaseProps, Omit<PieChartOptions, "valueKey"> {
  valueKey: string
}

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(function PieChart(
  { data, valueKey, labelKey, innerRadius, padAngle, startAngle, endAngle, ...props },
  ref
) {
  const isDonut = innerRadius != null && innerRadius > 0
  return (
    <Chart
      ref={ref}
      type={isDonut ? "donut" : "pie"}
      data={data}
      valueKey={valueKey}
      labelKey={labelKey}
      innerRadius={innerRadius}
      padAngle={padAngle}
      startAngle={startAngle}
      endAngle={endAngle}
      {...props}
    />
  )
})

PieChart.displayName = "PieChart"
