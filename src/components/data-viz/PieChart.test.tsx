import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PieChart } from "./PieChart"

describe("PieChart", () => {
  it("renders without crashing", () => {
    render(
      <PieChart
        data={[
          { label: "a", value: 1 },
          { label: "b", value: 2 },
        ]}
        valueKey="value"
        labelKey="label"
      />
    )
    expect(screen.getByRole("img", { name: "Chart" })).toBeInTheDocument()
  })
})
