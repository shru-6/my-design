import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DatePicker } from "./DatePicker"

describe("DatePicker", () => {
  it("renders without crashing", () => {
    render(<DatePicker label="Date" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
