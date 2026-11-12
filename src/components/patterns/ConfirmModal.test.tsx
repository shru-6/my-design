import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ConfirmModal } from "./ConfirmModal"

describe("ConfirmModal", () => {
  it("renders without crashing", () => {
    render(
      <ConfirmModal
        heading="Are you sure?"
        confirmProps={{ label: "Confirm", onClick: () => {} }}
        triggerProps={{ label: "Open confirm" }}
      />
    )
    expect(screen.getByText("Open confirm")).toBeInTheDocument()
  })
})
