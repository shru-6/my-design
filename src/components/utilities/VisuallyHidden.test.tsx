import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { VisuallyHidden } from "./VisuallyHidden"

describe("VisuallyHidden", () => {
  it("renders without crashing", () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    expect(screen.getByText("Hidden text")).toBeInTheDocument()
  })
})
