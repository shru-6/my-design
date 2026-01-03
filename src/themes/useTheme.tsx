"use client"

import { useState, useEffect, useCallback } from 'react'
import { generateAndApplyTheme, getDefaultThemes } from './themeUtils'
import { getThemeCategories } from './themeConfig'

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

/**
 * LocalStorage key for storing theme selections
 * 
 * ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
 * 1. src/themes/applyThemeSync.ts - STORAGE_KEY constant
 * 2. scripts/apply-theme-sync.js - STORAGE_KEY constant (standalone script, can't import)
 * 3. scripts/applyThemeSync.js - STORAGE_KEY constant
 */
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
      // Only log errors in debug mode
      if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_DEBUG__) {
        console.error('Theme application error:', err)
      }
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

  // Get available themes for a category (with dynamic discovery)
  const getAvailableThemes = useCallback(async (category: string): Promise<Record<string, ThemeMetadata>> => {
    const categories = await getThemeCategories()
    return (categories[category]?.themes || {}) as Record<string, ThemeMetadata>
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

