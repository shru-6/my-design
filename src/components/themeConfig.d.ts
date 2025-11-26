export interface ThemeMetadata {
  name: string
  file: string
  icon: string
  description: string
}

export interface ThemeCategory {
  name: string
  order: number
  themes: Record<string, ThemeMetadata>
}

export const themeCategories: Record<string, ThemeCategory>

export function getThemeFilePath(category: string, themeId: string): string | null
export function getThemesForCategory(category: string): Record<string, ThemeMetadata>
export function getTheme(category: string, themeId: string): ThemeMetadata | null

