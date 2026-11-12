import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "./InputGroup"

describe("InputGroup", () => {
  it("renders without crashing", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Amount" />
      </InputGroup>
    )
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument()
  })
})

describe("InputGroupInput", () => {
  it("renders without crashing", () => {
    render(<InputGroupInput placeholder="Email" />)
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
  })
})

describe("InputGroupAddon", () => {
  it("renders without crashing", () => {
    render(<InputGroupAddon>$</InputGroupAddon>)
    expect(screen.getByText("$")).toBeInTheDocument()
  })
})

describe("InputGroupButton", () => {
  it("renders without crashing", () => {
    render(<InputGroupButton>Go</InputGroupButton>)
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument()
  })
})
