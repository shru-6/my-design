import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Navbar } from "./Navbar"

describe("Navbar", () => {
  it("renders without crashing", () => {
    render(<Navbar items={[{ label: "Home", href: "/" }]} />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
})
