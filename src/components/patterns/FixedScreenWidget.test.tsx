import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FixedScreenWidget } from "./FixedScreenWidget"

describe("FixedScreenWidget", () => {
  it("renders without crashing", () => {
    render(
      <FixedScreenWidget triggerProps={{ label: "Open widget" }}>
        <div>Panel content</div>
      </FixedScreenWidget>
    )
    expect(screen.getByText("Open widget")).toBeInTheDocument()
  })
})
