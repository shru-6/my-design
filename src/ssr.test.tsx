// @vitest-environment node
//
// No jsdom here on purpose — this runs with a real absence of `window`/
// `document`, the condition every `typeof window === "undefined"` /
// `typeof document === "undefined"` guard in the theme engine and portal
// components is written for. jsdom (the default environment for the rest
// of this suite) always provides a `window`, so it can't catch a missing
// guard the way this file can.
import { describe, it, expect } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"
import { Modal } from "./components/overlays/Modal"
import { Tooltip } from "./components/overlays/Tooltip"
import { Button } from "./components/actions/Button"
import { useTheme } from "./themes/useTheme"
import { ThemeToggle } from "./themes/ui/ThemeToggle/ThemeToggle"

describe("server-side rendering (no window/document)", () => {
  it("renders a plain component without throwing", () => {
    expect(() => renderToStaticMarkup(<Button>Click</Button>)).not.toThrow()
  })

  it("renders Modal (portal + window-reading overlay) without throwing", () => {
    expect(() => renderToStaticMarkup(<Modal open>SSR modal</Modal>)).not.toThrow()
  })

  it("renders Tooltip (portal-based trigger) without throwing", () => {
    expect(() =>
      renderToStaticMarkup(
        <Tooltip content="tip">
          <button>Trigger</button>
        </Tooltip>
      )
    ).not.toThrow()
  })

  it("renders ThemeToggle (reads document/window for sync + portal) without throwing", () => {
    expect(() => renderToStaticMarkup(<ThemeToggle />)).not.toThrow()
  })

  it("useTheme's window-reading helpers no-op instead of throwing when window is undefined", () => {
    expect(typeof window).toBe("undefined")
    function Probe() {
      useTheme()
      return null
    }
    expect(() => renderToStaticMarkup(<Probe />)).not.toThrow()
  })
})
