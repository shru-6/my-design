import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Text } from "./Text"

describe("Text", () => {
  it("renders without crashing", () => {
    render(<Text>Hello world</Text>)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })
})
