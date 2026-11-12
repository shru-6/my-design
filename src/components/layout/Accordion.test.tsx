import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Accordion } from "./Accordion"

describe("Accordion", () => {
  it("renders without crashing", () => {
    render(
      <Accordion
        items={[{ value: "item-1", label: "Section 1", content: "Section content" }]}
      />
    )
    expect(screen.getByText("Section 1")).toBeInTheDocument()
  })
})
