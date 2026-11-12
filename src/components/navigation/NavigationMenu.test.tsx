import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { NavigationMenu } from "./NavigationMenu"

describe("NavigationMenu", () => {
  it("renders without crashing", () => {
    render(<NavigationMenu items={[{ label: "Home", value: "home" }]} />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
})
