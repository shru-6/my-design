/**
 * Theme Discovery Utility
 * Scans token directory to discover available theme files
 * Allows users to add new token files that will automatically appear in ThemeToggle
 */

import { registerTheme, getThemeCategories } from './themeConfig.js'

/**
 * Discover themes by attempting to load token files
 * Scans common theme patterns and registers them if found
 */
export async function discoverTokenFiles() {
  const tokensBase = typeof window !== 'undefined' && window.__THEME_TOKENS_BASE__ 
    ? window.__THEME_TOKENS_BASE__ 
    : '/tokens'
  
  const discovered = []
  const knownCategories = ['color', 'typography', 'shape', 'density', 'animation', 'custom']
  
  // Common theme names to try (users can add more)
  const commonThemeNames = {
    color: ['white', 'dark', 'blue', 'green', 'purple', 'red', 'orange'],
    typography: ['sans', 'serif', 'mono'],
    shape: ['smooth', 'sharp', 'rounded'],
    density: ['comfortable', 'compact', 'spacious'],
    animation: ['gentle', 'brisk', 'none'],
    custom: ['brand', 'minimal', 'corporate']
  }
  
  // Try to discover themes by attempting to fetch them
  for (const category of knownCategories) {
    const themeNames = commonThemeNames[category] || []
    
    for (const themeName of themeNames) {
      const themePath = `${tokensBase}/themes/${category}/${themeName}.json`
      
      try {
        const response = await fetch(themePath, { method: 'HEAD' })
        if (response.ok) {
          // File exists, try to load metadata
          try {
            const data = await fetch(themePath).then(r => r.json())
            
            // Register if not already registered
            const categories = await getThemeCategories()
            if (!categories[category]?.themes[themeName]) {
              registerTheme(category, themeName, {
                name: data.name || themeName.charAt(0).toUpperCase() + themeName.slice(1),
                file: `${category}/${themeName}.json`,
                icon: data.icon || '🎨',
                description: data.description || `${category} theme: ${themeName}`
              })
              
              discovered.push({ category, themeName, path: themePath })
            }
          } catch (e) {
            // File exists but couldn't parse - might be valid, register anyway
            if (!categories[category]?.themes[themeName]) {
              registerTheme(category, themeName, {
                name: themeName.charAt(0).toUpperCase() + themeName.slice(1),
                file: `${category}/${themeName}.json`,
                icon: '🎨',
                description: `${category} theme: ${themeName}`
              })
            }
          }
        }
      } catch (e) {
        // File doesn't exist or can't be accessed - skip
      }
    }
  }
  
  return discovered
}

/**
 * Scan a specific category directory for theme files
 * Useful for discovering user-added themes
 */
export async function scanCategory(category) {
  const tokensBase = typeof window !== 'undefined' && window.__THEME_TOKENS_BASE__ 
    ? window.__THEME_TOKENS_BASE__ 
    : '/tokens'
  
  const discovered = []
  
  // Try common theme names
  const commonNames = ['blue', 'green', 'purple', 'red', 'orange', 'yellow', 'pink', 'teal', 'indigo', 'violet']
  
  for (const name of commonNames) {
    const themePath = `${tokensBase}/themes/${category}/${name}.json`
    
    try {
      const response = await fetch(themePath, { method: 'HEAD' })
      if (response.ok) {
        const data = await fetch(themePath).then(r => r.json())
        
        const categories = await getThemeCategories()
        if (!categories[category]?.themes[name]) {
          registerTheme(category, name, {
            name: data.name || name.charAt(0).toUpperCase() + name.slice(1),
            file: `${category}/${name}.json`,
            icon: data.icon || '🎨',
            description: data.description || `${category} theme: ${name}`
          })
          
          discovered.push({ category, name, path: themePath })
        }
      }
    } catch (e) {
      // Skip
    }
  }
  
  return discovered
}

/**
 * Register a theme from a token file
 * Call this when you add a new token file to make it appear in ThemeToggle
 */
export async function registerThemeFromFile(category, themeId, filePath) {
  const tokensBase = typeof window !== 'undefined' && window.__THEME_TOKENS_BASE__ 
    ? window.__THEME_TOKENS_BASE__ 
    : '/tokens'
  
  try {
    const fullPath = filePath.startsWith('/') ? filePath : `${tokensBase}/themes/${filePath}`
    const data = await fetch(fullPath).then(r => r.json())
    
    registerTheme(category, themeId, {
      name: data.name || themeId.charAt(0).toUpperCase() + themeId.slice(1),
      file: filePath,
      icon: data.icon || '🎨',
      description: data.description || `${category} theme: ${themeId}`
    })
    
    return { success: true, themeId, category }
  } catch (error) {
    console.error(`Failed to register theme from ${filePath}:`, error)
    throw error
  }
}

