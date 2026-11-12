import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Image } from "./Image"

describe("Image", () => {
  it("renders without crashing", () => {
    const { container } = render(<Image src="https://example.com/image.png" alt="Example" />)
    expect(container).toBeTruthy()
  })
})
