import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TriggerModal } from "./TriggerModal"

describe("TriggerModal", () => {
  it("renders without crashing", () => {
    render(
      <TriggerModal triggerProps={{ label: "Open modal" }}>
        <div>Modal body</div>
      </TriggerModal>
    )
    expect(screen.getByText("Open modal")).toBeInTheDocument()
  })
})
