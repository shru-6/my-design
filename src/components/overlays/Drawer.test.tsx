import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Drawer } from "./Drawer"

describe("Drawer", () => {
  it("renders without crashing", () => {
    render(<Drawer open>Drawer content</Drawer>)
    expect(screen.getByText("Drawer content")).toBeInTheDocument()
  })
})
