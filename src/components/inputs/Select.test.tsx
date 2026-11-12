import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Select } from "./Select"

describe("Select", () => {
  it("renders without crashing", () => {
    render(
      <Select
        label="Choice"
        items={[
          { label: "One", value: "one" },
          { label: "Two", value: "two" },
        ]}
      />
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })
})
