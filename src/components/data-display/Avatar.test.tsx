import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Avatar } from "./Avatar"

describe("Avatar", () => {
  it("renders without crashing", () => {
    const { container } = render(<Avatar name="Jane Doe" />)
    expect(container).toBeTruthy()
  })
})
