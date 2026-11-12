import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AlertDialog } from "./AlertDialog"

describe("AlertDialog", () => {
  it("renders without crashing", () => {
    render(
      <AlertDialog
        open
        title="Delete item?"
        confirmProps={{ label: "Confirm" }}
      />
    )
    expect(screen.getByText("Delete item?")).toBeInTheDocument()
  })
})
