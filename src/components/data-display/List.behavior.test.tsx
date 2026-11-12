import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { List, type ListItem } from "./List"

const items: ListItem[] = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
]

// Behavior coverage for the breaking change called out in
// BREAKING-FOR-DESIGN-CMS.md: flattened Stack props moved into `stackProps`,
// flattened Grid props moved into `gridProps`.
describe("List stackProps/gridProps wiring", () => {
  it("forwards stackProps to the underlying Stack when layout is 'list'", () => {
    render(
      <List items={items} layout="list" selectable stackProps={{ direction: "row", gap: "lg" }} />
    )

    const root = screen.getByRole("listbox")
    expect(root.className).toContain("flex-row")
    expect(root.className).toContain("gap-6")
  })

  it("forwards gridProps to the underlying Grid when layout is 'grid'", () => {
    render(
      <List
        items={items}
        layout="grid"
        selectable
        gridProps={{ columns: 3, rowGap: "sm" }}
      />
    )

    const root = screen.getByRole("listbox")
    expect(root.className).toContain("grid-cols-3")
  })

  it("still renders both items with stackProps/gridProps applied", () => {
    render(<List items={items} layout="list" stackProps={{ direction: "column" }} />)
    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("Banana")).toBeInTheDocument()
  })
})
