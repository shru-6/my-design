import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Stack } from "./Stack"

describe("Stack", () => {
  it("renders without crashing", () => {
    render(
      <Stack items={["one", "two"]} renderItem={(item) => <span>{item}</span>} />
    )
    expect(screen.getByText("one")).toBeInTheDocument()
    expect(screen.getByText("two")).toBeInTheDocument()
  })
})
