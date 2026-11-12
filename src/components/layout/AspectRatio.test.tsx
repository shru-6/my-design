import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AspectRatio } from "./AspectRatio"

describe("AspectRatio", () => {
  it("renders without crashing", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>Media content</div>
      </AspectRatio>
    )
    expect(screen.getByText("Media content")).toBeInTheDocument()
  })
})
