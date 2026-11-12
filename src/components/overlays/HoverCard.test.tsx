import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HoverCard } from "./HoverCard"

describe("HoverCard", () => {
  it("renders without crashing", () => {
    render(<HoverCard open>HoverCard content</HoverCard>)
    expect(screen.getByText("HoverCard content")).toBeInTheDocument()
  })
})
