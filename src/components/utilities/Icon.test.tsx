import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Star } from "lucide-react"
import { Icon } from "./Icon"

describe("Icon", () => {
  it("renders without crashing", () => {
    const { container } = render(<Icon node={<Star />} alt="star icon" />)
    expect(container).toBeTruthy()
  })
})
