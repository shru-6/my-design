import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Overlay } from "./Overlay"

describe("Overlay", () => {
  it("renders without crashing", () => {
    render(<Overlay open>Overlay content</Overlay>)
    expect(screen.getByText("Overlay content")).toBeInTheDocument()
  })
})
