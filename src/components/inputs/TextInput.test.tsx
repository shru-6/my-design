import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TextInput } from "./TextInput"

describe("TextInput", () => {
  it("renders without crashing", () => {
    render(<TextInput label="Name" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
