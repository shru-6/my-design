"use client"

import { useState, useEffect } from "react"

export function useDesignSystemPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering on client
  useEffect(() => {
    setMounted(true)
    // Prevent auto-scroll on mount
    if (!window.location.hash) {
      window.scrollTo(0, 0)
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    }
  }, [])

  const handleCategoryToggle = (category: string, open: boolean) => {
    setOpenCategory(open ? category : null)
  }

  return {
    openCategory,
    mounted,
    handleCategoryToggle,
  }
}

