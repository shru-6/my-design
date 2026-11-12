import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PageFooter } from "./PageFooter"

describe("PageFooter", () => {
  it("renders without crashing", () => {
    render(<PageFooter left="Left content" />)
    expect(screen.getByText("Left content")).toBeInTheDocument()
  })
})
