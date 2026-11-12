/**
 * Dev-only sanity check for the theme registry refactor (createThemeRegistry,
 * getThemeCategories, registerTheme). Runs once on app mount, logs pass/fail
 * to the console — this sandbox has no test runner, so this is the cheapest
 * way to catch a regression before it ships.
 */
import { createThemeRegistry, getThemeCategories, registerTheme } from 'shru-design-system'

export async function runThemeRegistrySanityCheck() {
  const results: Array<{ name: string; pass: boolean; detail?: string }> = []

  // 1. registerTheme() on the default shared registry is visible via getThemeCategories()
  await registerTheme('color', 'sanity-check-mint', {
    name: 'Sanity Check Mint',
    file: 'color/sanity-check-mint.json',
    icon: '🧪',
    description: 'temp theme for sanity check',
  })
  const defaultCategories = await getThemeCategories()
  results.push({
    name: 'registerTheme() reflected in getThemeCategories()',
    pass: !!defaultCategories.color?.themes['sanity-check-mint'],
  })

  // 2. A fresh registry instance is isolated from the default one's cache/registrations
  const isolated = createThemeRegistry()
  const isolatedCategories = await isolated.getThemeCategories()
  results.push({
    name: 'createThemeRegistry() instance is isolated (no leaked registration)',
    pass: !isolatedCategories.color?.themes['sanity-check-mint'],
  })

  // 3. Registering on one instance doesn't affect another instance
  await isolated.registerTheme('color', 'isolated-only', {
    name: 'Isolated Only',
    file: 'color/isolated-only.json',
    icon: '🧪',
    description: 'should not appear on default registry',
  })
  const defaultAfter = await getThemeCategories()
  results.push({
    name: 'registration on isolated instance does not leak into default registry',
    pass: !defaultAfter.color?.themes['isolated-only'],
  })

  const allPassed = results.every((r) => r.pass)
  console.group(`%c[theme-registry-sanity-check] ${allPassed ? 'PASS' : 'FAIL'}`, `color:${allPassed ? 'green' : 'red'};font-weight:bold`)
  results.forEach((r) => console.log(r.pass ? '✓' : '✗', r.name))
  console.groupEnd()

  return allPassed
}
