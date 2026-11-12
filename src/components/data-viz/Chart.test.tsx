import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Chart } from "./Chart"

describe("Chart", () => {
  it("renders without crashing", () => {
    render(
      <Chart
        type="bar"
        data={[
          { x: "a", y: 1 },
          { x: "b", y: 2 },
        ]}
        xKey="x"
        yKey="y"
      />
    )
    expect(screen.getByRole("img", { name: "Chart" })).toBeInTheDocument()
  })
})
