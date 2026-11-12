import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { AvatarGroup } from "./AvatarGroup"

describe("AvatarGroup", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <AvatarGroup items={[{ name: "Jane Doe" }, { name: "John Smith" }]} />
    )
    expect(container).toBeTruthy()
  })
})
