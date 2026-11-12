import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HelperText } from "./HelperText"

describe("HelperText", () => {
  it("renders without crashing", () => {
    render(<HelperText>Some helper text</HelperText>)
    expect(screen.getByText("Some helper text")).toBeInTheDocument()
  })
})
