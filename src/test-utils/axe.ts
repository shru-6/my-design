import axe from "axe-core"

/**
 * Runs axe-core against a rendered subtree and throws a readable failure
 * listing every violation (rule id + affected nodes) if any are found.
 * Used by the overlays/navigation a11y suite — the components that just
 * gained real dialog/menu semantics in the theme-engine refactor
 * (role="dialog", focus trap, Escape, role="menuitem") are the highest-risk
 * surface for regressions here.
 */
export async function expectNoA11yViolations(container: Element): Promise<void> {
  const results = await axe.run(container, {
    // jsdom has no layout engine — color-contrast needs real rendering and
    // always false-positives here.
    rules: { "color-contrast": { enabled: false } },
  })

  if (results.violations.length > 0) {
    const detail = results.violations
      .map((v) => `- [${v.id}] ${v.help} (${v.nodes.length} node(s))`)
      .join("\n")
    throw new Error(`axe found ${results.violations.length} accessibility violation(s):\n${detail}`)
  }
}
