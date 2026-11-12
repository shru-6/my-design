import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Popover } from "./Popover"

describe("Popover", () => {
  it("renders without crashing", () => {
    render(<Popover open>Popover content</Popover>)
    expect(screen.getByText("Popover content")).toBeInTheDocument()
  })
})
