import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Table } from "./Table"

type Row = { id: number; name: string }

describe("Table", () => {
  it("renders without crashing", () => {
    const data: Row[] = [{ id: 1, name: "Jane Doe" }]
    const { container } = render(
      <Table<Row> data={data} columns={[{ key: "name", header: "Name" }]} />
    )
    expect(container).toBeTruthy()
  })
})
