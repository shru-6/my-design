import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Collapsible } from "./Collapsible"

describe("Collapsible", () => {
  it("renders without crashing", () => {
    render(
      <Collapsible trigger="Toggle">
        <div>Hidden content</div>
      </Collapsible>
    )
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument()
  })
})
