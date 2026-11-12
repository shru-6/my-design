import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { HistoryControlButtons } from "./HistoryControlButtons"

describe("HistoryControlButtons", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <HistoryControlButtons onUndo={() => {}} onRedo={() => {}} onReset={() => {}} />
    )
    expect(container).toBeTruthy()
  })
})
