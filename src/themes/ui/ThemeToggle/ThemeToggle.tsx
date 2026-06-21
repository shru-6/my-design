"use client"

import React, { useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useThemeToggle } from "./useThemeToggle"
import { ThemePanel } from "./ThemePanel"
import { computePanelStyle, positionClasses } from "./themeToggleConfig"
import { cn } from "../../../utils"
import { Tooltip } from "../../../components/overlays/Tooltip"

export interface ThemeToggleProps {
  className?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

export function ThemeToggle({ className, position = "bottom-right" }: ThemeToggleProps) {
  const {
    selectedThemes,
    isLoading,
    isOpen,
    activeCategory,
    categoryThemes,
    themesLoading,
    categories,
    menuRef,
    triggerRef,
    setActiveCategory,
    handleThemeSelect,
    handleResetAll,
    toggleMenu,
    closeMenu,
  } = useThemeToggle()

  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({ visibility: "hidden" })

  const updatePanelPosition = React.useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    setPanelStyle(computePanelStyle(trigger.getBoundingClientRect(), position))
  }, [position])

  useLayoutEffect(() => {
    if (!isOpen) return
    updatePanelPosition()
    const onReflow = () => updatePanelPosition()
    window.addEventListener("scroll", onReflow, true)
    window.addEventListener("resize", onReflow)
    return () => {
      window.removeEventListener("scroll", onReflow, true)
      window.removeEventListener("resize", onReflow)
    }
  }, [isOpen, updatePanelPosition])

  const panelOrigin =
    position === "bottom-right"
      ? "origin-bottom-right"
      : position === "bottom-left"
        ? "origin-bottom-left"
        : position === "top-right"
          ? "origin-top-right"
          : "origin-top-left"

  const panel =
    isOpen && typeof document !== "undefined" ? (
      <>
        {createPortal(
          <button
            type="button"
            aria-label="Close theme panel"
            className="fixed inset-0 z-overlay bg-background/35 backdrop-blur-[1px] transition-opacity duration-200"
            onClick={closeMenu}
          />,
          document.body
        )}
        {createPortal(
          <div
            ref={menuRef}
            style={panelStyle}
            className={cn(
              panelOrigin,
              "transition-all duration-200 ease-out",
              isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
            )}
            role="dialog"
            aria-label="Theme settings"
          >
            <ThemePanel
              categories={categories}
              selectedThemes={selectedThemes}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categoryThemes={categoryThemes}
              themesLoading={themesLoading}
              isApplying={isLoading}
              onThemeSelect={handleThemeSelect}
              onResetAll={handleResetAll}
              onClose={closeMenu}
            />
          </div>,
          document.body
        )}
      </>
    ) : null

  return (
    <div id="theme-toggle" className={cn("fixed z-modal", positionClasses[position], className)}>
      <Tooltip content="Theme settings" placement={position.endsWith("right") ? "left" : "right"}>
        <button
          ref={triggerRef}
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg",
            "transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95",
            isOpen && "rotate-90 ring-2 ring-ring ring-offset-2 ring-offset-background"
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
            aria-hidden
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.15l.22.38a2 2 0 0 1 0 2.73l-.22.38a2 2 0 0 0 2.15 2.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.15l-.22-.38a2 2 0 0 1 0-2.73l.22-.38a2 2 0 0 0-2.15-2.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </Tooltip>
      {panel}
    </div>
  )
}
