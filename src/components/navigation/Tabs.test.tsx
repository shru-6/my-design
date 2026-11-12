import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Tabs } from "./Tabs"

describe("Tabs", () => {
  it("renders without crashing", () => {
    render(
      <Tabs
        items={[
          { label: "Tab 1", value: "tab1", content: "Content 1" },
          { label: "Tab 2", value: "tab2", content: "Content 2" },
        ]}
      />
    )
    expect(screen.getByRole("tablist")).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument()
  })
})
