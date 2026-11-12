import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TreeView, type TreeItem } from "./TreeView"

describe("TreeView", () => {
  it("renders without crashing", () => {
    const items: TreeItem[] = [
      { id: "root", label: "Root", children: [{ id: "child", label: "Child" }] },
    ]
    render(<TreeView items={items} />)
    expect(screen.getByText("Root")).toBeInTheDocument()
  })
})
