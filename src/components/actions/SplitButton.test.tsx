import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SplitButton } from "./SplitButton"

describe("SplitButton", () => {
  it("renders without crashing", () => {
    render(
      <SplitButton menuItems={[{ label: "Option 1" }, { label: "Option 2" }]}>
        Action
      </SplitButton>
    )
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument()
  })
})
