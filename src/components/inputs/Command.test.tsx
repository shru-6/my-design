import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Command } from "./Command"

describe("Command", () => {
  it("renders without crashing", () => {
    render(<Command items={[{ label: "Apple", value: "apple" }]} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
