import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmptyState } from "./EmptyState"

describe("EmptyState", () => {
  it("renders without crashing", () => {
    render(<EmptyState title="No items" description="Nothing to show here" />)
    expect(screen.getByText("No items")).toBeInTheDocument()
  })
})
