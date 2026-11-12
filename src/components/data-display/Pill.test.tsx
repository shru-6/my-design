import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Pill, Badge, Tag } from "./Pill"

describe("Pill", () => {
  it("renders without crashing", () => {
    render(<Pill>Pill label</Pill>)
    expect(screen.getByText("Pill label")).toBeInTheDocument()
  })
})

describe("Badge", () => {
  it("renders without crashing", () => {
    render(<Badge>Badge label</Badge>)
    expect(screen.getByText("Badge label")).toBeInTheDocument()
  })
})

describe("Tag", () => {
  it("renders without crashing", () => {
    render(<Tag label="Tag label" />)
    expect(screen.getByText("Tag label")).toBeInTheDocument()
  })
})
