import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Menubar } from "./Menubar"

describe("Menubar", () => {
  it("renders without crashing", () => {
    render(
      <Menubar
        menus={[
          {
            label: "File",
            value: "file",
            items: [{ label: "New", onClick: () => {} }],
          },
        ]}
      />
    )
    expect(screen.getByRole("menubar")).toBeInTheDocument()
    expect(screen.getByText("File")).toBeInTheDocument()
  })
})
