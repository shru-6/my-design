import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Dropdown } from "./Dropdown"

describe("Dropdown", () => {
  it("renders without crashing", () => {
    render(
      <Dropdown
        items={[{ label: "Option 1", onClick: () => {} }]}
        triggerProps={{ label: "Open menu" }}
      />
    )
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument()
  })
})
