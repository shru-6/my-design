import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SearchInput } from "./SearchInput"

describe("SearchInput", () => {
  it("renders without crashing", () => {
    render(<SearchInput />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
