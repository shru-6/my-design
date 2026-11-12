import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { RadioGroup } from "./RadioGroup"

describe("RadioGroup", () => {
  it("renders without crashing", () => {
    render(
      <RadioGroup
        heading="Pick one"
        items={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
        ]}
      />
    )
    expect(screen.getAllByRole("radio")).toHaveLength(2)
  })
})
