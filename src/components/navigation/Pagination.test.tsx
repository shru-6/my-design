import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Pagination } from "./Pagination"

describe("Pagination", () => {
  it("renders without crashing", () => {
    render(<Pagination total={50} pageSize={10} />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })
})
