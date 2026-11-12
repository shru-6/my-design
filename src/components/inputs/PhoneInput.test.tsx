import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PhoneInput } from "./PhoneInput"

describe("PhoneInput", () => {
  it("renders without crashing", () => {
    render(<PhoneInput label="Phone" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
