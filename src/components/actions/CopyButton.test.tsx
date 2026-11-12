import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CopyButton } from "./CopyButton"

describe("CopyButton", () => {
  it("renders without crashing", () => {
    render(<CopyButton value="hello" copyLabel="Copy" />)
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
  })
})
