import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Label } from "./Label"

describe("Label", () => {
  it("renders without crashing", () => {
    render(<Label>Field label</Label>)
    expect(screen.getByText("Field label")).toBeInTheDocument()
  })
})
