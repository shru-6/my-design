"use client"

import { cn } from "../../../utils"
import { X } from "lucide-react"
import { Button } from "../../../components/actions/Button"
import { PillGroup } from "../../../components/data-display/PillGroup"
import { Skeleton } from "../../../components/data-display/Skeleton"
import { Text } from "../../../components/data-display/Text"
import { Card } from "../../../components/layout/Card"
import { Separator } from "../../../components/layout/Separator"
import { HistoryControlButtons } from "../../../components/patterns/HistoryControlButtons"
import { PageHeader } from "../../../components/patterns/PageHeader"
import type { ThemeMetadata, ThemeSelection } from "../../useTheme"
import { categoryIcons, colorThemeSwatches } from "./themeToggleConfig"

export interface ThemePanelProps {
  categories: Array<[string, { name: string; themes: Record<string, ThemeMetadata>; order?: number }]>
  selectedThemes: ThemeSelection
  activeCategory: string
  onCategoryChange: (category: string) => void
  categoryThemes: Record<string, ThemeMetadata>
  themesLoading: boolean
  isApplying: boolean
  onThemeSelect: (category: keyof ThemeSelection, themeId: string) => void
  onResetAll: () => void
  onClose?: () => void
  /** When false, hides the header close control (inline / settings sections). Default true. */
  showClose?: boolean
  className?: string
}

function ColorSwatch({ themeId }: { themeId: string }) {
  const swatch = colorThemeSwatches[themeId]
  if (!swatch) {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs">
        🎨
      </span>
    )
  }

  return (
    <span
      className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-border"
      aria-hidden
    >
      <span className="absolute inset-0" style={{ backgroundColor: swatch.background }} />
      <span
        className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-background"
        style={{ backgroundColor: swatch.accent }}
      />
    </span>
  )
}

function buildSummaryLine(
  categories: ThemePanelProps["categories"],
  selectedThemes: ThemeSelection
): string {
  const labels = categories
    .map(([key, category]) => {
      const themeId = selectedThemes[key as keyof ThemeSelection]
      if (!themeId) return null
      return category.themes[themeId]?.name ?? themeId
    })
    .filter(Boolean) as string[]

  return labels.length > 0 ? labels.join(" · ") : "Default theme"
}

export function ThemePanel({
  categories,
  selectedThemes,
  activeCategory,
  onCategoryChange,
  categoryThemes,
  themesLoading,
  isApplying,
  onThemeSelect,
  onResetAll,
  onClose,
  showClose = true,
  className,
}: ThemePanelProps) {
  const themeEntries = Object.entries(categoryThemes)
  const activeCategoryMeta = categories.find(([key]) => key === activeCategory)?.[1]
  const summaryLine = buildSummaryLine(categories, selectedThemes)

  const categoryTabs = categories.map(([key, category]) => ({
    label: category.name,
    value: key,
    left: categoryIcons[key] ?? "⚙️",
    selected: key === activeCategory,
  }))

  return (
    <Card
      variant="surface-1"
      size="sm"
      className={cn("max-h-[min(70vh,420px)] shadow-xl", className)}
      header={
        <div className="space-y-3">
          <PageHeader
            heading="Themes"
            description={summaryLine}
            actions={
              <div className="flex shrink-0 items-center gap-1">
                <HistoryControlButtons
                  showUndo={false}
                  showRedo={false}
                  onReset={onResetAll}
                  resetButtonProps={{ disabled: isApplying }}
                />
                {showClose && onClose ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    iconOnly
                    ariaLabel="Close theme panel"
                    left={<X className="h-4 w-4" />}
                    onClick={onClose}
                  />
                ) : null}
              </div>
            }
          />
          <Separator />
          <PillGroup
            size="sm"
            variant="outline"
            wrap
            selectable
            multiple={false}
            value={[activeCategory]}
            onChange={(next) => {
              if (next[0]) onCategoryChange(next[0])
            }}
            items={categoryTabs}
          />
        </div>
      }
      footer={
        isApplying ? (
          <Text as="p" size="xs" variant="muted">
            Applying theme…
          </Text>
        ) : undefined
      }
    >
      {themesLoading ? (
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="button" className="h-10 w-full" />
          ))}
        </div>
      ) : themeEntries.length === 0 ? (
        <div className="rounded-md border border-dashed border-border bg-muted/30 px-3 py-6 text-center">
          <Text as="p" size="sm" variant="muted">
            No themes in {activeCategoryMeta?.name ?? activeCategory}
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 pb-1">
          {themeEntries.map(([themeId, theme]) => {
            const selected = selectedThemes[activeCategory as keyof ThemeSelection] === themeId
            return (
              <Button
                key={themeId}
                type="button"
                size="sm"
                variant={selected ? "primary" : "outline"}
                disabled={isApplying}
                aria-pressed={selected}
                aria-label={theme.description ? `${theme.name} — ${theme.description}` : theme.name}
                className="h-auto w-full justify-start gap-2 px-2 py-2 text-left font-normal"
                onClick={() => onThemeSelect(activeCategory as keyof ThemeSelection, themeId)}
              >
                {activeCategory === "color" ? (
                  <ColorSwatch themeId={themeId} />
                ) : (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-sm">
                    {theme.icon}
                  </span>
                )}
                <span className="min-w-0 flex-1 truncate">{theme.name}</span>
              </Button>
            )
          })}
        </div>
      )}
    </Card>
  )
}
