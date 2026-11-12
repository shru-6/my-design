import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { CodeBlock } from "./CodeBlock"

describe("CodeBlock", () => {
  it("renders without crashing", () => {
    const { container } = render(<CodeBlock code="const x = 1" />)
    expect(container).toBeTruthy()
  })
})
