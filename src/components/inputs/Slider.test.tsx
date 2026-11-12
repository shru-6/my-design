import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Slider } from "./Slider"

describe("Slider", () => {
  it("renders without crashing", () => {
    render(<Slider label="Volume" />)
    expect(screen.getByRole("slider")).toBeInTheDocument()
  })
})
