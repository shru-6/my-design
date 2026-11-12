import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Toast } from "./Toast"

describe("Toast", () => {
  it("renders without crashing", () => {
    render(<Toast title="Saved" description="Your changes were saved" />)
    expect(screen.getByText("Saved")).toBeInTheDocument()
  })
})
