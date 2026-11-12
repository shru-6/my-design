import { describe, it, expect } from "vitest"
import { createThemeRegistry, type ThemeCategory } from "./themeConfig"

// Behavior coverage for the breaking change called out in
// BREAKING-FOR-DESIGN-CMS.md: `registerTheme()` is now async (was sync).
// Consumers that call it without `await` would previously get a synchronously
// updated registry; now they must await the returned Promise.
describe("registerTheme is async", () => {
  const emptySource = async (): Promise<Record<string, ThemeCategory>> => ({})

  it("returns a Promise rather than updating the registry synchronously", () => {
    const registry = createThemeRegistry(emptySource)
    const result = registry.registerTheme("brand", "custom", { name: "Custom", file: "brand/custom.json" })

    expect(result).toBeInstanceOf(Promise)
  })

  it("resolves with the new theme present once awaited", async () => {
    const registry = createThemeRegistry(emptySource)

    const categories = await registry.registerTheme("brand", "custom", {
      name: "Custom",
      file: "brand/custom.json",
    })

    expect(categories.brand).toBeDefined()
    expect(categories.brand.themes.custom).toMatchObject({ name: "Custom", file: "brand/custom.json" })

    const fetched = await registry.getTheme("brand", "custom")
    expect(fetched).toMatchObject({ name: "Custom" })
  })

  it("seeds from the registry's own source before adding, rather than silently using a different base set", async () => {
    const seeded: Record<string, ThemeCategory> = {
      brand: { name: "Brand", order: 10, themes: { light: { name: "Light", file: "brand/light.json" } } },
    }
    const registry = createThemeRegistry(async () => seeded)

    const categories = await registry.registerTheme("brand", "dark", { name: "Dark", file: "brand/dark.json" })

    // Both the pre-seeded theme and the newly registered one are present.
    expect(Object.keys(categories.brand.themes).sort()).toEqual(["dark", "light"])
  })
})
