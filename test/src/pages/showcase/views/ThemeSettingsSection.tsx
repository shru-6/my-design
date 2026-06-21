import { ThemePanel, useThemeToggle } from "shru-design-system"

/** Inline theme picker for Settings (no FAB / portal). */
export function ThemeSettingsSection() {
  const {
    selectedThemes,
    isLoading,
    activeCategory,
    categoryThemes,
    themesLoading,
    categories,
    setActiveCategory,
    handleThemeSelect,
    handleResetAll,
  } = useThemeToggle({ embedded: true })

  return (
    <ThemePanel
      categories={categories}
      selectedThemes={selectedThemes}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      categoryThemes={categoryThemes}
      themesLoading={themesLoading}
      isApplying={isLoading}
      onThemeSelect={handleThemeSelect}
      onResetAll={handleResetAll}
      showClose={false}
      className="max-h-none shadow-none"
    />
  )
}
