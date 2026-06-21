"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useTheme, type ThemeSelection, type ThemeMetadata } from "../../useTheme"
import { getThemeCategories } from "../../themeConfig"

export function useThemeToggle(options?: { embedded?: boolean }) {
  const embedded = options?.embedded ?? false
  const { selectedThemes, updateTheme, resetToDefaults, isLoading, getAvailableThemes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("color")
  const [themeCategories, setThemeCategories] = useState<any>(null)
  const [categoryThemes, setCategoryThemes] = useState<Record<string, ThemeMetadata>>({})
  const [themesLoading, setThemesLoading] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    getThemeCategories().then(setThemeCategories)
  }, [])

  useEffect(() => {
    if (!embedded && !isOpen) return

    setThemesLoading(true)
    getAvailableThemes(activeCategory)
      .then(setCategoryThemes)
      .finally(() => setThemesLoading(false))
  }, [embedded, isOpen, activeCategory, getAvailableThemes])

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleThemeSelect = useCallback(
    async (category: keyof ThemeSelection, themeId: string) => {
      const currentTheme = selectedThemes[category]
      const newTheme = currentTheme === themeId ? undefined : themeId
      await updateTheme(category, newTheme)
    },
    [selectedThemes, updateTheme]
  )

  const handleResetAll = useCallback(async () => {
    await resetToDefaults()
  }, [resetToDefaults])

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev
      if (next) {
        const firstActive =
          (Object.entries(selectedThemes).find(([, value]) => value)?.[0] as string | undefined) ?? "color"
        setActiveCategory(firstActive)
      }
      return next
    })
  }, [selectedThemes])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  const categories: Array<[string, { name: string; themes: Record<string, any>; order?: number }]> = themeCategories
    ? (Object.entries(themeCategories) as Array<[string, { name: string; themes: Record<string, any>; order?: number }]>)
        .sort(([, a], [, b]) => (a.order || 0) - (b.order || 0))
    : []

  return {
    selectedThemes,
    isLoading,
    isOpen,
    activeCategory,
    categoryThemes,
    themesLoading,
    categories,
    menuRef,
    triggerRef,
    setActiveCategory,
    handleThemeSelect,
    handleResetAll,
    toggleMenu,
    closeMenu,
  }
}
