"use client"

import React, { useState, useEffect } from "react"
import { useThemeToggle } from "./useThemeToggle"
import { categoryIcons, positionClasses } from "./themeToggleConfig"
import { getPositionOnArc } from "./themeToggleUtils"
import { getArcConfig } from "./themeToggleConfig"
import { cn } from "../../../utils"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../../../molecules/Tooltip"
import type { ThemeSelection, ThemeMetadata } from "../../useTheme"

export interface ThemeToggleProps {
  className?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

export function ThemeToggle({ 
  className,
  position = "bottom-right"
}: ThemeToggleProps) {
  const {
    selectedThemes,
    isLoading,
    getAvailableThemes,
    isOpen,
    selectedCategory,
    categories,
    menuRef,
    handleCategoryClick,
    handleThemeSelect,
    handleBack,
    toggleMenu,
  } = useThemeToggle()

  return (
    <div 
      ref={menuRef}
      id="theme-toggle"
      className={cn("fixed z-50", positionClasses[position], className)}
    >
      {/* Main Toggle Button */}
      <button
        onClick={toggleMenu}
        className={cn(
          "w-14 h-14 rounded-full bg-primary text-primary-foreground",
          "shadow-lg hover:shadow-xl",
          "flex items-center justify-center",
          "relative z-10",
          "transition-all duration-200",
          "hover:scale-110 active:scale-95",
          isOpen && "rotate-90"
        )}
        aria-label="Theme settings"
        title="Theme settings"
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
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.15l.22.38a2 2 0 0 1 0 2.73l-.22.38a2 2 0 0 0 2.15 2.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.15l-.22-.38a2 2 0 0 1 0-2.73l.22-.38a2 2 0 0 0-2.15-2.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {/* Radial Menu */}
      {isOpen && (
        <TooltipProvider delayDuration={300}>
          <div className="absolute inset-0 pointer-events-none">
            {!selectedCategory ? (
              <CategoryRing
                categories={categories}
                onCategoryClick={handleCategoryClick}
                selectedThemes={selectedThemes}
                position={position}
              />
            ) : (
              <ThemeRingAsync
                category={selectedCategory}
                getAvailableThemes={getAvailableThemes}
                selectedTheme={selectedThemes[selectedCategory as keyof ThemeSelection]}
                onThemeSelect={(themeId) => handleThemeSelect(selectedCategory as keyof ThemeSelection, themeId)}
                onBack={handleBack}
                isLoading={isLoading}
                position={position}
              />
            )}
          </div>
        </TooltipProvider>
      )}
    </div>
  )
}

// Common radial wheel component
// Handles both positioning and UI rendering
interface RadialWheelItem {
  id: string
  content: React.ReactNode
  label: string
  onClick: () => void
  isSelected?: boolean
  disabled?: boolean
  className?: string
}

interface RadialWheelProps {
  items: RadialWheelItem[]
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  radius: number
  buttonSize: number
  startOffset?: number
}

function RadialWheel({
  items,
  position,
  radius,
  buttonSize,
  startOffset = 0.75,
}: RadialWheelProps) {
  const arcConfig = getArcConfig(position)
  const totalItems = items.length
  const angleStep = Math.abs(arcConfig.sweep) / totalItems

  return (
    <div className="absolute inset-0">
      {items.map((item, index) => {
        const angle = arcConfig.startAngle + angleStep * (index + startOffset) * Math.sign(arcConfig.sweep)
        const pos = getPositionOnArc(angle, radius)

        return (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                onClick={item.onClick}
                disabled={item.disabled}
                className={cn(
                  "absolute rounded-full",
                  "bg-background border-2 shadow-lg",
                  "flex items-center justify-center text-lg",
                  "pointer-events-auto",
                  "transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  item.isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50",
                  item.className
                )}
                style={{
                  width: `${buttonSize}px`,
                  height: `${buttonSize}px`,
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                }}
                aria-label={item.label}
              >
                {item.content}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {item.label}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}

// Category Ring Component
interface CategoryRingProps {
  categories: Array<[string, { name: string; themes: Record<string, ThemeMetadata>; order?: number }]>
  onCategoryClick: (categoryKey: string) => void
  selectedThemes: ThemeSelection
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

function CategoryRing({
  categories,
  onCategoryClick,
  selectedThemes,
  position,
}: CategoryRingProps) {
  const radius = 60
  const buttonSize = 40

  // Prepare items for RadialWheel
  const items: RadialWheelItem[] = categories.map(([categoryKey, category]) => {
    const hasSelection = !!selectedThemes[categoryKey as keyof ThemeSelection]
    return {
      id: categoryKey,
      content: categoryIcons[categoryKey] || "⚙️",
      label: category.name,
      onClick: () => onCategoryClick(categoryKey),
      isSelected: hasSelection,
      className: hasSelection ? "bg-primary/10" : undefined,
    }
  })

  return (
    <RadialWheel
      items={items}
      position={position}
      radius={radius}
      buttonSize={buttonSize}
      startOffset={0.5}
    />
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
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

// Async version that loads themes dynamically
function ThemeRingAsync({
  category,
  getAvailableThemes,
  selectedTheme,
  onThemeSelect,
  onBack,
  isLoading,
  position,
}: Omit<ThemeRingProps, 'themes'> & { getAvailableThemes: (category: string) => Promise<Record<string, ThemeMetadata>> }) {
  const [themes, setThemes] = useState<Record<string, ThemeMetadata>>({})

  useEffect(() => {
    getAvailableThemes(category).then(setThemes)
  }, [category, getAvailableThemes])

  const themeEntries = Object.entries(themes)
  const radius = 65
  const buttonSize = 40
  const backButtonSize = 36

  // Back button position (at start of arc)
  const arcConfig = getArcConfig(position)
  const backButtonPos = getPositionOnArc(arcConfig.startAngle, radius)

  // Prepare items for RadialWheel
  const items: RadialWheelItem[] = themeEntries.map(([themeId, theme]) => ({
    id: themeId,
    content: theme.icon,
    label: theme.name,
    onClick: () => !isLoading && onThemeSelect(themeId),
    isSelected: selectedTheme === themeId,
    disabled: isLoading,
    className: "text-base", // Smaller text for theme icons
  }))

  return (
    <div className="absolute inset-0">
      {/* Back Button */}
      <button
        onClick={onBack}
        className={cn(
          "absolute rounded-full",
          "bg-muted border border-border shadow-md",
          "flex items-center justify-center",
          "pointer-events-auto",
          "transition-all duration-200",
          "hover:scale-110 active:scale-95"
        )}
        style={{
          width: `${backButtonSize}px`,
          height: `${backButtonSize}px`,
          left: `${backButtonPos.x}px`,
          top: `${backButtonPos.y}px`,
        }}
        aria-label="Back"
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
      <RadialWheel
        items={items}
        position={position}
        radius={radius}
        buttonSize={buttonSize}
        startOffset={1}
      />

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

