import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { InlineEdit } from "./InlineEdit"

describe("InlineEdit", () => {
  it("renders without crashing", () => {
    render(<InlineEdit defaultValue="Hello" />)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
