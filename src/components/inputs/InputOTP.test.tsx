import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { InputOTP } from "./InputOTP"

describe("InputOTP", () => {
  it("renders without crashing", () => {
    // input-otp schedules a selection-sync timeout on mount; fake timers let us
    // flush it before teardown so it doesn't fire against a torn-down jsdom window.
    vi.useFakeTimers()
    const { container, unmount } = render(<InputOTP label="Verification code" />)
    expect(container).toBeTruthy()
    vi.runOnlyPendingTimers()
    unmount()
    vi.useRealTimers()
  })
})
