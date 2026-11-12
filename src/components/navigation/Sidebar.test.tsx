import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Sidebar } from "./Sidebar"

describe("Sidebar", () => {
  it("renders without crashing", () => {
    render(<Sidebar items={[{ label: "Dashboard", value: "dashboard" }]} />)
    expect(screen.getByRole("complementary")).toBeInTheDocument()
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })
})
