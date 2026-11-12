import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Breadcrumb } from "./Breadcrumb"

describe("Breadcrumb", () => {
  it("renders without crashing", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Current", current: true },
        ]}
      />
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })
})
