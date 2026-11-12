import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Carousel, type CarouselItem } from "./Carousel"

describe("Carousel", () => {
  it("renders without crashing", () => {
    const items: CarouselItem[] = [{ image: "https://example.com/a.png", imageAlt: "A" }]
    const { container } = render(<Carousel items={items} />)
    expect(container).toBeTruthy()
  })
})
