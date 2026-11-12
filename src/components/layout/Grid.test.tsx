import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Grid } from "./Grid"

describe("Grid", () => {
  it("renders without crashing", () => {
    render(
      <Grid items={["one", "two"]} columns={2} renderItem={(item) => <span>{item}</span>} />
    )
    expect(screen.getByText("one")).toBeInTheDocument()
    expect(screen.getByText("two")).toBeInTheDocument()
  })
})
