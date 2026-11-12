import * as React from "react"
import { Chart, type BarChartOptions, type ChartBaseProps } from "./Chart"

/**
 * Only what a bar chart actually reads — no pie geometry, no line options.
 *
 * There is deliberately no `stacked`: the data model is one value column
 * (`yKey`) per row, so there is no second series to stack. The prop existed on
 * the shared type and was never read by the renderer; real stacking needs a
 * multi-series data shape, which is a bigger change than a prop fix.
 */
export interface BarChartProps extends ChartBaseProps, BarChartOptions {
  xKey: string
  yKey: string
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  { data, xKey, yKey, horizontal, ...props },
  ref
) {
  return <Chart ref={ref} type="bar" data={data} xKey={xKey} yKey={yKey} horizontal={horizontal} {...props} />
})

BarChart.displayName = "BarChart"
