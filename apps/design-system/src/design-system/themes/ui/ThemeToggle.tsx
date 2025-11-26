"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTheme, type ThemeSelection, type ThemeMetadata } from "../useTheme"
import { themeCategories } from "../themeConfig.js"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/src/design-system/components/molecules"

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
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) {
            setSelectedCategory(null)
          }
        }}
        className={cn(
          "w-14 h-14 rounded-full bg-primary text-primary-foreground",
          "shadow-lg hover:shadow-xl",
          "flex items-center justify-center",
          "relative z-10"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
      </motion.button>

      {/* Radial Menu */}
      <AnimatePresence>
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
                <ThemeRing
                  category={selectedCategory}
                  themes={getAvailableThemes(selectedCategory)}
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
      </AnimatePresence>
    </div>
  )
}

// Get arc configuration based on position
function getArcConfig(position: "bottom-right" | "bottom-left" | "top-right" | "top-left") {
  switch (position) {
    case "bottom-right":
      // Open towards top-left: arc from top to left
      return { startAngle: -60, endAngle: -180, sweep: -150 }
    case "bottom-left":
      // Open towards top-right: arc from top to right
      return { startAngle: -120, endAngle: 0, sweep: 150 }
    case "top-right":
      // Open towards bottom-left: arc from bottom to left
      return { startAngle: 60, endAngle: 180, sweep: 150 }
    case "top-left":
      // Open towards bottom-right: arc from bottom to right
      return { startAngle: 120, endAngle: 0, sweep: -150 }
  }
}

// Category Ring Component
interface CategoryRingProps {
  categories: Array<[string, { name: string; themes: Record<string, ThemeMetadata> }]>
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
  const radius = 40 // Distance from button center - close but not overlapping
  const arcConfig = getArcConfig(position)
  const totalItems = categories.length
  // Better spacing: use totalItems + 0.5 to give more space between items
  const angleStep = Math.abs(arcConfig.sweep) / (totalItems + 0.5) // Quarter circle divided evenly
  const buttonSize = 40 // Smaller button size to prevent overlap
  const svgSize = (radius + buttonSize / 2) * 2

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >

      {/* Category Buttons */}
      {categories.map(([categoryKey, category], index) => {
        const angle = arcConfig.startAngle + angleStep * (index + 0.75) * Math.sign(arcConfig.sweep) // Start slightly offset
        const pos = getPositionOnArc(angle, radius)
        const hasSelection = selectedThemes[categoryKey as keyof ThemeSelection]

        return (
          <Tooltip key={categoryKey}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => onCategoryClick(categoryKey)}
                className={cn(
                  "absolute rounded-full",
                  "bg-background border-2 shadow-lg",
                  "flex items-center justify-center text-lg",
                  "pointer-events-auto",
                  hasSelection
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
                style={{
                  width: `${buttonSize}px`,
                  height: `${buttonSize}px`,
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: `translate(-50%, -50%)`,
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: pos.x,
                  y: pos.y,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                aria-label={category.name}
              >
                {categoryIcons[categoryKey] || "⚙️"}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {category.name}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </motion.div>
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

function ThemeRing({
  category,
  themes,
  selectedTheme,
  onThemeSelect,
  onBack,
  isLoading,
  position,
}: ThemeRingProps) {
  const themeEntries = Object.entries(themes)
  const radius = 65 // Distance from button center - close but not overlapping
  const arcConfig = getArcConfig(position)
  const totalItems = themeEntries.length
  // Better spacing: use totalItems + 1.5 to give more space (0.5 for back button, 1 for spacing)
  const angleStep = Math.abs(arcConfig.sweep) / (totalItems + 1.5)
  const buttonSize = 40 // Smaller button size to prevent overlap
  const backButtonSize = 36
  const svgSize = (radius + buttonSize / 2) * 2

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className={cn(
          "absolute rounded-full",
          "bg-muted border border-border shadow-md",
          "flex items-center justify-center",
          "pointer-events-auto"
        )}
        style={{
          width: `${backButtonSize}px`,
          height: `${backButtonSize}px`,
          left: `${getPositionOnArc(arcConfig.startAngle, radius).x}px`,
          top: `${getPositionOnArc(arcConfig.startAngle, radius).y}px`,
          transform: `translate(-50%, -50%)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
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
      </motion.button>

      {/* Theme Option Buttons */}
      {themeEntries.map(([themeId, theme], index) => {
        const itemIndex = index + 1 // +1 to skip back button
        const angle = arcConfig.startAngle + angleStep * (itemIndex + 0.25) * Math.sign(arcConfig.sweep) // Offset for better spacing
        const pos = getPositionOnArc(angle, radius)
        const isSelected = selectedTheme === themeId

        return (
          <Tooltip key={themeId}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => !isLoading && onThemeSelect(themeId)}
                disabled={isLoading}
                className={cn(
                  "absolute rounded-full",
                  "bg-background border-2 shadow-lg",
                  "flex items-center justify-center text-base",
                  "pointer-events-auto",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50"
                )}
                style={{
                  width: `${buttonSize}px`,
                  height: `${buttonSize}px`,
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: `translate(-50%, -50%)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: isSelected ? 1.1 : 1,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                whileHover={{ scale: isLoading ? 1 : 1.15 }}
                whileTap={{ scale: 0.95 }}
                aria-label={theme.name}
              >
                {theme.icon}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {theme.name}
            </TooltipContent>
          </Tooltip>
        )
      })}

      {/* Loading Indicator */}
      {isLoading && (
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-primary/20 border-2 border-primary pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  )
}
