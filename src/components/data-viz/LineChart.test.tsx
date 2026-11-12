import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { LineChart } from "./LineChart"

describe("LineChart", () => {
  it("renders without crashing", () => {
    render(
      <LineChart
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
