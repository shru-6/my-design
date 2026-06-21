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
const THEME_SYNC_EVENT = 'design-system-theme-sync'

function readStoredThemes(): ThemeSelection | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as ThemeSelection
  } catch {
    return null
  }
}

function broadcastThemeSync(themes: ThemeSelection) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(THEME_SYNC_EVENT, { detail: themes }))
}

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

  // Keep all useTheme() instances in sync (FAB toggle + inline panel, tabs, etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const applyExternal = (themes: ThemeSelection) => {
      setSelectedThemes(themes)
    }

    const onSync = (event: Event) => {
      const detail = (event as CustomEvent<ThemeSelection>).detail
      if (detail) applyExternal(detail)
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      const parsed = readStoredThemes()
      if (parsed) applyExternal(parsed)
    }

    window.addEventListener(THEME_SYNC_EVENT, onSync)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(THEME_SYNC_EVENT, onSync)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const updateTheme = useCallback(async (category: keyof ThemeSelection, themeId: string | undefined) => {
    const newThemes = {
      ...selectedThemes,
      [category]: themeId || undefined
    }
    
    setSelectedThemes(newThemes)
    broadcastThemeSync(newThemes)
    await applyTheme(newThemes)
  }, [selectedThemes, applyTheme])

  const resetToDefaults = useCallback(async () => {
    const defaults = getDefaultThemes()
    setSelectedThemes(defaults)
    broadcastThemeSync(defaults)
    await applyTheme(defaults)
  }, [applyTheme])

  const applyPresetSelection = useCallback(
    async (preset: Partial<ThemeSelection>) => {
      const next = { ...selectedThemes, ...preset }
      setSelectedThemes(next)
      broadcastThemeSync(next)
      await applyTheme(next)
    },
    [selectedThemes, applyTheme]
  )

  // Get available themes for a category (with dynamic discovery)
  const getAvailableThemes = useCallback(async (category: string): Promise<Record<string, ThemeMetadata>> => {
    const categories = await getThemeCategories()
    return (categories[category]?.themes || {}) as Record<string, ThemeMetadata>
  }, [])

  return {
    selectedThemes,
    updateTheme,
    resetToDefaults,
    applyPreset: applyPresetSelection,
    isLoading,
    error,
    getAvailableThemes
  }
}

