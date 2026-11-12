import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FAB } from "./FAB"

describe("FAB", () => {
  it("renders without crashing", () => {
    render(<FAB left={<span>+</span>} ariaLabel="Add item" />)
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument()
  })
})
