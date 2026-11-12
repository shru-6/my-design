import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ContextMenu } from "./ContextMenu"

describe("ContextMenu", () => {
  it("renders without crashing", () => {
    render(
      <ContextMenu items={[{ label: "Copy", onClick: () => {} }]}>
        <div>Right click target</div>
      </ContextMenu>
    )
    expect(screen.getByText("Right click target")).toBeInTheDocument()
  })
})
