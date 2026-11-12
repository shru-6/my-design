import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ResizeContainer } from "./ResizeContainer"

describe("ResizeContainer", () => {
  it("renders without crashing", () => {
    render(
      <ResizeContainer>
        <div>Resizable content</div>
      </ResizeContainer>
    )
    expect(screen.getByText("Resizable content")).toBeInTheDocument()
  })
})
