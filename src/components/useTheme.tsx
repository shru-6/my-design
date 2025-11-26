"use client"

import { useState, useEffect, useCallback } from 'react'
import { generateAndApplyTheme } from './themeUtils.js'
import { getDefaultThemes } from './themeUtils.js'
import { themeCategories } from './themeConfig.js'

export type ThemeSelection = {
  color?: string
  typography?: string
  shape?: string
  density?: string
  animation?: string
  custom?: string
}

export type ThemeMetadata = {
  name: string
  file: string
  icon: string
  description: string
}

const STORAGE_KEY = 'design-system-theme'

/**
 * Hook for managing design system theme switching
 */
export function useTheme() {
  // Initialize with defaults (for SSR compatibility)
  const [selectedThemes, setSelectedThemes] = useState<ThemeSelection>(getDefaultThemes())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Define applyTheme before useEffect uses it
  const applyTheme = useCallback(async (themes: ThemeSelection) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await generateAndApplyTheme(themes)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(themes))
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply theme'
      setError(errorMessage)
      console.error('Theme application error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load from localStorage on client mount (after hydration)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setSelectedThemes(parsed)
          // Apply the loaded theme
          applyTheme(parsed)
        } catch {
          // If parse fails, use defaults and apply them
          const defaults = getDefaultThemes()
          setSelectedThemes(defaults)
          applyTheme(defaults)
        }
      } else {
        // No stored theme, apply defaults
        const defaults = getDefaultThemes()
        applyTheme(defaults)
      }
    }
  }, [applyTheme]) // Include applyTheme in deps

  const updateTheme = useCallback(async (category: keyof ThemeSelection, themeId: string | undefined) => {
    const newThemes = {
      ...selectedThemes,
      [category]: themeId || undefined
    }
    
    setSelectedThemes(newThemes)
    await applyTheme(newThemes)
  }, [selectedThemes, applyTheme])

  const resetToDefaults = useCallback(async () => {
    const defaults = getDefaultThemes()
    setSelectedThemes(defaults)
    await applyTheme(defaults)
  }, [applyTheme])

  // Get available themes for a category
  const getAvailableThemes = useCallback((category: string): Record<string, ThemeMetadata> => {
    return (themeCategories[category as keyof typeof themeCategories]?.themes || {}) as Record<string, ThemeMetadata>
  }, [])

  return {
    selectedThemes,
    updateTheme,
    resetToDefaults,
    isLoading,
    error,
    getAvailableThemes
  }
}

