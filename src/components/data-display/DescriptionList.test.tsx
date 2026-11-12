import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DescriptionList } from "./DescriptionList"

describe("DescriptionList", () => {
  it("renders without crashing", () => {
    render(<DescriptionList items={[{ label: "Name", value: "Jane Doe" }]} />)
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Jane Doe")).toBeInTheDocument()
  })
})
