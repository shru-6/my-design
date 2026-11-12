import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Progress } from "./Progress"

describe("Progress", () => {
  it("renders without crashing", () => {
    render(<Progress value={50} />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
})
