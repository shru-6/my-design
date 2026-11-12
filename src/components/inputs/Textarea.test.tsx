import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Textarea } from "./Textarea"

describe("Textarea", () => {
  it("renders without crashing", () => {
    render(<Textarea label="Comments" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
