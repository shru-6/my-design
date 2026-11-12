import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DateRangePicker } from "./DateRangePicker"

describe("DateRangePicker", () => {
  it("renders without crashing", () => {
    render(<DateRangePicker label="Date range" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
