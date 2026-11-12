import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Tooltip } from "./Tooltip"

describe("Tooltip", () => {
  it("renders without crashing", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>
    )
    expect(screen.getByRole("button", { name: "Trigger" })).toBeInTheDocument()
  })
})
