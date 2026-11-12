import { describe, it, expect, vi } from "vitest"
import { render, act } from "@testing-library/react"
import { InputOTP } from "./InputOTP"

describe("InputOTP", () => {
  it("renders without crashing", () => {
    // input-otp schedules a selection-sync timeout on mount; fake timers let us
    // flush it before teardown so it doesn't fire against a torn-down jsdom window.
    // Flushing it has to happen inside act() — it drives a React state update
    // (the library's own internal selection sync), and running it outside act()
    // produced a real "not wrapped in act()" warning on every run.
    vi.useFakeTimers()
    let container!: HTMLElement
    let unmount!: () => void
    act(() => {
      ;({ container, unmount } = render(<InputOTP label="Verification code" />))
    })
    expect(container).toBeTruthy()
    act(() => {
      vi.runOnlyPendingTimers()
    })
    act(() => {
      unmount()
    })
    vi.useRealTimers()
  })
})
