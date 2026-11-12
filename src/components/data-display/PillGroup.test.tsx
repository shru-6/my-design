import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { PillGroup } from "./PillGroup"

describe("PillGroup", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <PillGroup items={[{ label: "First", value: "first" }, { label: "Second", value: "second" }]} />
    )
    expect(container).toBeTruthy()
  })
})
