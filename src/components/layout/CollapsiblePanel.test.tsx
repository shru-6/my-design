import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CollapsiblePanel } from "./CollapsiblePanel"

describe("CollapsiblePanel", () => {
  it("renders without crashing", () => {
    render(
      <CollapsiblePanel>
        <div>Panel content</div>
      </CollapsiblePanel>
    )
    expect(screen.getByText("Panel content")).toBeInTheDocument()
  })
})
