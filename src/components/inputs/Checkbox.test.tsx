import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Checkbox } from "./Checkbox"

describe("Checkbox", () => {
  it("renders without crashing", () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })
})
