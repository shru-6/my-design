import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TimePicker } from "./TimePicker"

describe("TimePicker", () => {
  it("renders without crashing", () => {
    render(<TimePicker label="Time" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
