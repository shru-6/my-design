import * as React from "react"
import { Chart, type ChartBaseProps, type LineChartOptions } from "./Chart"

/** Only what a line / area chart actually reads. */
export interface LineChartProps extends ChartBaseProps, LineChartOptions {
  xKey: string
  yKey: string
}

export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(function LineChart(
  { data, xKey, yKey, curve = "linear", showPoints = true, area, ...props },
  ref
) {
  return (
    <Chart
      ref={ref}
      type={area ? "area" : "line"}
      data={data}
      xKey={xKey}
      yKey={yKey}
      curve={curve}
      showPoints={showPoints}
      area={area}
      {...props}
    />
  )
})

LineChart.displayName = "LineChart"
