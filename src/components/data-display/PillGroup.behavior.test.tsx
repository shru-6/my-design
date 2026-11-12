import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { PillGroup, type PillItem } from "./PillGroup"

// Behavior coverage for the breaking change called out in
// BREAKING-FOR-DESIGN-CMS.md: `onRemove` is now `(value, next) => void` and
// PillGroup no longer mutates/removes from its own copy of `items` — the
// parent owns applying `next`.
describe("PillGroup onRemove", () => {
  const items: PillItem[] = [
    { label: "Alpha", value: "alpha" },
    { label: "Beta", value: "beta" },
    { label: "Gamma", value: "gamma" },
  ]

  it("calls onRemove with (value, next) and next drops the removed pill, leaving the rest untouched", () => {
    const onRemove = vi.fn()

    render(<PillGroup items={items} removable onRemove={onRemove} />)

    const removeBeta = screen.getByRole("button", { name: "Remove Beta" })
    fireEvent.click(removeBeta)

    expect(onRemove).toHaveBeenCalledTimes(1)
    const [value, next] = onRemove.mock.calls[0]
    expect(value).toBe("beta")
    expect(next).toEqual([
      { label: "Alpha", value: "alpha" },
      { label: "Gamma", value: "gamma" },
    ])
  })

  it("does not remove the pill itself when no parent re-render applies `next` — items stays the single source of truth", () => {
    const onRemove = vi.fn()

    render(<PillGroup items={items} removable onRemove={onRemove} />)

    fireEvent.click(screen.getByRole("button", { name: "Remove Beta" }))

    // Parent never applied `next` as new `items`, so the pill is still there —
    // PillGroup must not self-remove from its own copy of `items`.
    expect(screen.getByText("Beta")).toBeInTheDocument()
  })

  it("uses removeLabel for a non-string label instead of announcing [object Object]", () => {
    const nodeItems: PillItem[] = [
      { label: <strong>Rich</strong>, value: "rich", removeLabel: "Rich label" },
    ]
    render(<PillGroup items={nodeItems} removable onRemove={() => {}} />)

    expect(screen.getByRole("button", { name: "Remove Rich label" })).toBeInTheDocument()
  })
})
