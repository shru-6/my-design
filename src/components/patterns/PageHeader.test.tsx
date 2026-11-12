import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PageHeader } from "./PageHeader"

describe("PageHeader", () => {
  it("renders without crashing", () => {
    render(<PageHeader heading="Page title" />)
    expect(screen.getByText("Page title")).toBeInTheDocument()
  })
})
