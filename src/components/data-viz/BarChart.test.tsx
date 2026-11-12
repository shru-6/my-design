import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BarChart } from "./BarChart"

describe("BarChart", () => {
  it("renders without crashing", () => {
    render(
      <BarChart
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
