import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Skeleton, TableSkeleton } from "./Skeleton"

describe("Skeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<Skeleton />)
    expect(container).toBeTruthy()
  })
})

describe("TableSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<TableSkeleton columns={3} />)
    expect(container).toBeTruthy()
  })
})
