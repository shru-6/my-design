import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./Resizable"

describe("Resizable", () => {
  it("renders without crashing", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>Left panel</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Right panel</ResizablePanel>
      </ResizablePanelGroup>
    )
    expect(screen.getByText("Left panel")).toBeInTheDocument()
    expect(screen.getByText("Right panel")).toBeInTheDocument()
  })
})
