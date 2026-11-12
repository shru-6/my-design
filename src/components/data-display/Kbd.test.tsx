import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Kbd, KbdGroup } from "./Kbd"

describe("Kbd", () => {
  it("renders without crashing", () => {
    render(<Kbd>Ctrl</Kbd>)
    expect(screen.getByText("Ctrl")).toBeInTheDocument()
  })
})

describe("KbdGroup", () => {
  it("renders without crashing", () => {
    render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    )
    expect(screen.getByText("K")).toBeInTheDocument()
  })
})
