import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Link } from "./Link"

describe("Link", () => {
  it("renders without crashing", () => {
    render(<Link href="https://example.com">Go to example</Link>)
    expect(screen.getByRole("link", { name: "Go to example" })).toBeInTheDocument()
  })
})
