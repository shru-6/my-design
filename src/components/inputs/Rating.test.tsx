import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Rating } from "./Rating"

describe("Rating", () => {
  it("renders without crashing", () => {
    render(<Rating label="Rate this" />)
    expect(screen.getByRole("slider")).toBeInTheDocument()
  })
})
