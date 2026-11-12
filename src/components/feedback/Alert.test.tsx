import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Alert } from "./Alert"

describe("Alert", () => {
  it("renders without crashing", () => {
    render(<Alert title="Heads up" description="Something happened" />)
    expect(screen.getByText("Heads up")).toBeInTheDocument()
  })
})
