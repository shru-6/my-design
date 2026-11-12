import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Video } from "./Video"

describe("Video", () => {
  it("renders without crashing", () => {
    const { container } = render(<Video src="https://example.com/video.mp4" />)
    expect(container).toBeTruthy()
  })
})
