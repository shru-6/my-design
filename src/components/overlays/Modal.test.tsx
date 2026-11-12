import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Modal } from "./Modal"

describe("Modal", () => {
  it("renders without crashing", () => {
    render(<Modal open>Modal content</Modal>)
    expect(screen.getByText("Modal content")).toBeInTheDocument()
  })
})
