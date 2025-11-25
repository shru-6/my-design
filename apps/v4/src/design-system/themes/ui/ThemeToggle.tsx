"use client"

import { useThemeToggle, type ThemeSelection, type ThemeMetadata } from "../hooks/useThemeToggle"
import { themeCategories } from "../themeConfig.js"
import { Button } from "@/src/design-system/components/atoms/Button"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  showLabels?: boolean
}

export function ThemeToggle({ className, showLabels = true }: ThemeToggleProps) {
  const { selectedThemes, updateTheme, isLoading, getAvailableThemes } = useThemeToggle()

  const handleThemeChange = async (category: keyof ThemeSelection, themeId: string) => {
    const currentTheme = selectedThemes[category]
    const newTheme = currentTheme === themeId ? undefined : themeId
    await updateTheme(category, newTheme)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {Object.entries(themeCategories)
        .filter(([key]) => key !== 'custom') // Skip custom for now
        .map(([categoryKey, category]: [string, { name: string; themes: Record<string, ThemeMetadata> }]) => {
          const availableThemes = getAvailableThemes(categoryKey)
          const currentTheme = selectedThemes[categoryKey as keyof ThemeSelection]
          
          return (
            <div key={categoryKey} className="space-y-2">
              {showLabels && (
                <div className="text-sm font-medium text-foreground">
                  {category.name}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {Object.entries(availableThemes).map(([themeId, theme]: [string, ThemeMetadata]) => {
                  const isSelected = currentTheme === themeId
                  
                  return (
                    <Button
                      key={themeId}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleThemeChange(categoryKey as keyof ThemeSelection, themeId)}
                      disabled={isLoading}
                      className={cn(
                        "transition-all",
                        isSelected && "ring-2 ring-primary ring-offset-2"
                      )}
                    >
                      <span className="mr-1">{theme.icon}</span>
                      {theme.name}
                    </Button>
                  )
                })}
              </div>
            </div>
          )
        })}
      
      {isLoading && (
        <div className="text-sm text-muted-foreground">
          Applying theme...
        </div>
      )}
    </div>
  )
}
