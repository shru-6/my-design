import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Separator } from "./Separator"

describe("Separator", () => {
  it("renders without crashing", () => {
    const { container } = render(<Separator />)
    expect(container).toBeTruthy()
    expect(container.querySelector('[data-slot="separator"]')).toBeInTheDocument()
  })
})
