import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Form } from "./Form"

describe("Form", () => {
  it("renders without crashing", () => {
    render(<Form onSubmit={() => {}} />)
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
  })
})
