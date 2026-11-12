import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Table, type TableColumn } from "./Table"

interface Row {
  name: string
  age: number
}

const data: Row[] = [
  { name: "Charlie", age: 40 },
  { name: "Alice", age: 20 },
  { name: "Bob", age: 30 },
]

const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: true },
]

// Behavior coverage for the breaking change called out in
// BREAKING-FOR-DESIGN-CMS.md: `onRowClick`'s second argument is always the
// row's true index in `data`, even when the visible/sorted order differs
// (it used to silently fall back to the sorted-view index).
describe("Table onRowClick true-index behavior", () => {
  it("reports the row's index in the original `data` array after sorting reorders the view", () => {
    const onRowClick = vi.fn()

    render(
      <Table
        data={data}
        columns={columns}
        sortable
        defaultSortKey="name"
        defaultSortDirection="asc"
        onRowClick={onRowClick}
      />
    )

    // Sorted ascending by name: Alice (data index 1), Bob (data index 2), Charlie (data index 0).
    const aliceRow = screen.getByText("Alice").closest("tr")!
    fireEvent.click(aliceRow)
    expect(onRowClick).toHaveBeenLastCalledWith(data[1], 1)

    const charlieRow = screen.getByText("Charlie").closest("tr")!
    fireEvent.click(charlieRow)
    expect(onRowClick).toHaveBeenLastCalledWith(data[0], 0)
  })

  it("selecting one of several identical primitive rows does not select every duplicate (default getRowId is the true index)", () => {
    const dupData: Row[] = [
      { name: "Same", age: 1 },
      { name: "Same", age: 1 },
      { name: "Same", age: 1 },
    ]
    const onSelectionChange = vi.fn()

    render(
      <Table data={dupData} columns={columns} selectable onSelectionChange={onSelectionChange} />
    )

    const checkboxes = screen.getAllByRole("checkbox")
    expect(checkboxes).toHaveLength(dupData.length + 1) // + select-all header checkbox

    fireEvent.click(checkboxes[1]) // first data row

    expect(onSelectionChange).toHaveBeenCalledTimes(1)
    expect(onSelectionChange).toHaveBeenCalledWith([0])
  })
})
