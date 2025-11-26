"use client"

import React, { useState, useRef, useEffect } from "react"
import { useTheme, type ThemeSelection, type ThemeMetadata } from "./useTheme"
import { themeCategories } from "./themeConfig.js"

// Simple cn utility
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export interface ThemeToggleProps {
  className?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

// Category icon mapping
const categoryIcons: Record<string, string> = {
  color: "🎨",
  typography: "📝",
  shape: "🔲",
  density: "📏",
  animation: "✨",
}

// Simple polar to cartesian conversion
function getPositionOnArc(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  }
}

export function ThemeToggle({ 
  className,
  position = "bottom-right"
}: ThemeToggleProps) {
  const { selectedThemes, updateTheme, isLoading, getAvailableThemes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey)
  }

  const handleThemeSelect = async (category: keyof ThemeSelection, themeId: string) => {
    const currentTheme = selectedThemes[category]
    const newTheme = currentTheme === themeId ? undefined : themeId
    await updateTheme(category, newTheme)
  }

  const handleBack = () => {
    setSelectedCategory(null)
  }

  // Get categories (excluding custom)
  const categories = Object.entries(themeCategories)
    .filter(([key]) => key !== 'custom')
    .sort(([, a], [, b]) => a.order - b.order)

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  }

  return (
    <div 
      ref={menuRef}
      className={cn("fixed z-50", positionClasses[position], className)}
    >
      {/* Main Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) {
            setSelectedCategory(null)
          }
        }}
        className={cn(
          "w-14 h-14 rounded-full bg-primary text-primary-foreground",
          "shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center",
          "hover:scale-110 active:scale-95",
          isOpen && "rotate-90"
        )}
        aria-label="Theme settings"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.15l.22.38a2 2 0 0 1 0 2.73l-.22.38a2 2 0 0 0 2.15 2.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.15l-.22-.38a2 2 0 0 1 0-2.73l.22-.38a2 2 0 0 0-2.15-2.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {/* Radial Menu */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          {!selectedCategory ? (
            <CategoryRing
              categories={categories}
              onCategoryClick={handleCategoryClick}
              selectedThemes={selectedThemes}
            />
          ) : (
            <ThemeRing
              category={selectedCategory}
              themes={getAvailableThemes(selectedCategory)}
              selectedTheme={selectedThemes[selectedCategory as keyof ThemeSelection]}
              onThemeSelect={(themeId) => handleThemeSelect(selectedCategory as keyof ThemeSelection, themeId)}
              onBack={handleBack}
              isLoading={isLoading}
            />
          )}
        </div>
      )}
    </div>
  )
}

// Category Ring Component
interface CategoryRingProps {
  categories: Array<[string, { name: string; themes: Record<string, ThemeMetadata> }]>
  onCategoryClick: (categoryKey: string) => void
  selectedThemes: ThemeSelection
}

function CategoryRing({
  categories,
  onCategoryClick,
  selectedThemes,
}: CategoryRingProps) {
  const radius = 65 // Distance from button center - close but not overlapping
  const startAngle = -90 // Start from top
  const totalItems = categories.length
  // Better spacing: use totalItems + 0.5 to give more space between items
  const angleStep = 90 / (totalItems + 0.5) // Quarter circle divided evenly
  const buttonSize = 40 // Smaller button size to prevent overlap
  const svgSize = (radius + buttonSize / 2) * 2

  return (
    <div className="absolute inset-0 animate-in fade-in zoom-in-95 duration-200">
      {/* Simple arc guide line - centered on button */}
      <svg
        className="absolute pointer-events-none opacity-20"
        width={svgSize}
        height={svgSize}
        style={{
          left: `-${svgSize / 2}px`,
          top: `-${svgSize / 2}px`,
        }}
      >
        <path
          d={`M ${svgSize / 2} ${svgSize / 2 - radius} A ${radius} ${radius} 0 0 1 ${svgSize / 2 + radius} ${svgSize / 2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="text-foreground"
        />
      </svg>

      {/* Category Buttons */}
      {categories.map(([categoryKey, category], index) => {
        const angle = startAngle + angleStep * (index + 0.75) // Start slightly offset
        const pos = getPositionOnArc(angle, radius)
        const hasSelection = selectedThemes[categoryKey as keyof ThemeSelection]

        return (
          <button
            key={categoryKey}
            onClick={() => onCategoryClick(categoryKey)}
            className={cn(
              "absolute rounded-full",
              "bg-background border-2 shadow-lg",
              "flex items-center justify-center text-lg",
              "pointer-events-auto",
              "transition-all duration-200",
              "animate-in fade-in zoom-in-95",
              hasSelection
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:scale-110"
            )}
            style={{
              width: `${buttonSize}px`,
              height: `${buttonSize}px`,
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: `translate(-50%, -50%)`,
              animationDelay: `${index * 50}ms`,
            }}
            aria-label={category.name}
            title={category.name}
          >
            {categoryIcons[categoryKey] || "⚙️"}
          </button>
        )
      })}
    </div>
  )
}

// Theme Ring Component
interface ThemeRingProps {
  category: string
  themes: Record<string, ThemeMetadata>
  selectedTheme?: string
  onThemeSelect: (themeId: string) => void
  onBack: () => void
  isLoading: boolean
}

function ThemeRing({
  category,
  themes,
  selectedTheme,
  onThemeSelect,
  onBack,
  isLoading,
}: ThemeRingProps) {
  const themeEntries = Object.entries(themes)
  const radius = 65 // Distance from button center - close but not overlapping
  const startAngle = -90
  const totalItems = themeEntries.length
  // Better spacing: use totalItems + 1.5 to give more space (0.5 for back button, 1 for spacing)
  const angleStep = 90 / (totalItems + 1.5)
  const buttonSize = 40 // Smaller button size to prevent overlap
  const backButtonSize = 36
  const svgSize = (radius + buttonSize / 2) * 2

  return (
    <div className="absolute inset-0 animate-in fade-in zoom-in-95 duration-200">
      {/* Simple arc guide line - centered on button */}
      <svg
        className="absolute pointer-events-none opacity-20"
        width={svgSize}
        height={svgSize}
        style={{
          left: `-${svgSize / 2}px`,
          top: `-${svgSize / 2}px`,
        }}
      >
        <path
          d={`M ${svgSize / 2} ${svgSize / 2 - radius} A ${radius} ${radius} 0 0 1 ${svgSize / 2 + radius} ${svgSize / 2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="text-foreground"
        />
      </svg>

      {/* Back Button */}
      <button
        onClick={onBack}
        className={cn(
          "absolute rounded-full",
          "bg-muted border border-border shadow-md",
          "flex items-center justify-center",
          "pointer-events-auto",
          "transition-all duration-200 hover:scale-110 active:scale-95",
          "animate-in fade-in zoom-in-95"
        )}
        style={{
          width: `${backButtonSize}px`,
          height: `${backButtonSize}px`,
          left: `${getPositionOnArc(startAngle, radius).x}px`,
          top: `${getPositionOnArc(startAngle, radius).y}px`,
          transform: `translate(-50%, -50%)`,
        }}
        aria-label="Back"
        title="Back"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </button>

      {/* Theme Option Buttons */}
      {themeEntries.map(([themeId, theme], index) => {
        const itemIndex = index + 1 // +1 to skip back button
        const angle = startAngle + angleStep * (itemIndex + 0.25) // Offset for better spacing
        const pos = getPositionOnArc(angle, radius)
        const isSelected = selectedTheme === themeId

        return (
          <button
            key={themeId}
            onClick={() => !isLoading && onThemeSelect(themeId)}
            disabled={isLoading}
            className={cn(
              "absolute rounded-full",
              "bg-background border-2 shadow-lg",
              "flex items-center justify-center text-base",
              "pointer-events-auto",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "animate-in fade-in zoom-in-95",
              isSelected
                ? "border-primary bg-primary text-primary-foreground scale-110"
                : "border-border hover:border-primary/50 hover:scale-110"
            )}
            style={{
              width: `${buttonSize}px`,
              height: `${buttonSize}px`,
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: `translate(-50%, -50%)`,
              animationDelay: `${index * 50}ms`,
            }}
            aria-label={theme.name}
            title={theme.name}
          >
            {theme.icon}
          </button>
        )
      })}

      {/* Loading Indicator */}
      {isLoading && (
        <div
          className="absolute w-12 h-12 rounded-full bg-primary/20 border-2 border-primary animate-pulse pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  )
}
