"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useTheme, type ThemeSelection } from "../../useTheme"
import { getThemeCategories } from "../../themeConfig.js"

export function useThemeToggle() {
  const { selectedThemes, updateTheme, isLoading, getAvailableThemes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [themeCategories, setThemeCategories] = useState<any>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Load theme categories on mount
  useEffect(() => {
    getThemeCategories().then(setThemeCategories)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedCategory(null)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleCategoryClick = useCallback((categoryKey: string) => {
    setSelectedCategory(categoryKey)
  }, [])

  const handleThemeSelect = useCallback(async (category: keyof ThemeSelection, themeId: string) => {
    const currentTheme = selectedThemes[category]
    const newTheme = currentTheme === themeId ? undefined : themeId
    await updateTheme(category, newTheme)
  }, [selectedThemes, updateTheme])

  const handleBack = useCallback(() => {
    setSelectedCategory(null)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        setSelectedCategory(null)
      }
      return !prev
    })
  }, [])

  // Get categories (including custom)
  const categories: Array<[string, { name: string; themes: Record<string, any>; order?: number }]> = themeCategories 
    ? (Object.entries(themeCategories) as Array<[string, { name: string; themes: Record<string, any>; order?: number }]>)
        .sort(([, a], [, b]) => (a.order || 0) - (b.order || 0))
    : []

  return {
    selectedThemes,
    isLoading,
    getAvailableThemes,
    isOpen,
    selectedCategory,
    themeCategories,
    categories,
    menuRef,
    handleCategoryClick,
    handleThemeSelect,
    handleBack,
    toggleMenu,
  }
}

