import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormModal } from "./FormModal"

describe("FormModal", () => {
  it("renders without crashing", () => {
    render(
      <FormModal
        heading="Create item"
        onSubmit={() => {}}
        triggerProps={{ label: "Open form" }}
      />
    )
    expect(screen.getByText("Open form")).toBeInTheDocument()
  })
})
