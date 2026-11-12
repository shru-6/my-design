import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Overlay } from "./Overlay"
import { Modal } from "./Modal"
import { Drawer } from "./Drawer"
import { AlertDialog } from "./AlertDialog"
import { Popover } from "./Popover"
import { HoverCard } from "./HoverCard"
import { Tooltip } from "./Tooltip"
import { expectNoA11yViolations } from "../../test-utils/axe"

// The overlay family just gained real dialog/focus-trap semantics in the
// theme-engine refactor (role="dialog", aria-modal, Escape, focus return).
// This is the highest-risk surface for a11y regressions, so it gets an
// automated axe pass rather than relying on manual verification only.
describe("overlays a11y (axe)", () => {
  it("Overlay with dialog semantics has no violations", async () => {
    render(
      <Overlay open dialog dialogLabel="Example dialog">
        <p>Overlay content</p>
      </Overlay>
    )
    await expectNoA11yViolations(document.body)
  })

  it("Modal has no violations", async () => {
    render(<Modal open ariaLabel="Example modal">Modal content</Modal>)
    expectModalRendered()
    await expectNoA11yViolations(document.body)
  })

  it("Drawer has no violations", async () => {
    render(<Drawer open ariaLabel="Example drawer">Drawer content</Drawer>)
    await expectNoA11yViolations(document.body)
  })

  it("AlertDialog has no violations", async () => {
    render(<AlertDialog open title="Delete item?" confirmProps={{ label: "Confirm" }} />)
    await expectNoA11yViolations(document.body)
  })

  it("Popover has no violations", async () => {
    render(<Popover open>Popover content</Popover>)
    await expectNoA11yViolations(document.body)
  })

  it("HoverCard has no violations", async () => {
    render(<HoverCard open>HoverCard content</HoverCard>)
    await expectNoA11yViolations(document.body)
  })

  it("Tooltip trigger has no violations", async () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>
    )
    await expectNoA11yViolations(document.body)
  })

  function expectModalRendered() {
    screen.getByText("Modal content")
  }
})
