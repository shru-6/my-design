import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormField } from "./FormField"

describe("FormField", () => {
  it("renders without crashing", () => {
    render(<FormField name="email" label="Email" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
