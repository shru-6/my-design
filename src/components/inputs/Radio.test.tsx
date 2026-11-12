import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Radio } from "./Radio"

describe("Radio", () => {
  it("renders without crashing", () => {
    render(<Radio label="Option A" />)
    expect(screen.getByRole("radio")).toBeInTheDocument()
  })
})
