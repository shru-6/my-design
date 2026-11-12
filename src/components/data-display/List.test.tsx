import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { List } from "./List"

describe("List", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <List items={[{ label: "First item", value: "first" }, { label: "Second item", value: "second" }]} />
    )
    expect(container).toBeTruthy()
  })
})
