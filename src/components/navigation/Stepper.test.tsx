import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Stepper } from "./Stepper"

describe("Stepper", () => {
  it("renders without crashing", () => {
    render(
      <Stepper
        steps={[{ label: "Step 1" }, { label: "Step 2" }]}
      />
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByText("Step 1")).toBeInTheDocument()
  })
})
