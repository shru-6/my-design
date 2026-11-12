import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Toggle } from "./Toggle"

describe("Toggle", () => {
  it("renders without crashing", () => {
    render(<Toggle label="Enable" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })
})
