import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AppShell } from "./AppShell"

describe("AppShell", () => {
  it("renders without crashing", () => {
    render(<AppShell>Main content</AppShell>)
    expect(screen.getByText("Main content")).toBeInTheDocument()
  })
})
