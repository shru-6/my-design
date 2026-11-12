import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ErrorBoundary } from "./ErrorBoundary"

describe("ErrorBoundary", () => {
  it("renders without crashing", () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText("Safe content")).toBeInTheDocument()
  })
})
