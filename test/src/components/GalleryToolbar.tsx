import { List, PageHeader, Text } from "shru-design-system"
import type { ComponentCategory } from "../utils/componentMetadata"
import { GALLERY_CATEGORIES } from "../utils/galleryUtils"

interface GalleryToolbarProps {
  query: string
  category: ComponentCategory | "all"
  total: number
  shown: number
  onQueryChange: (value: string) => void
  onCategoryChange: (category: ComponentCategory | "all") => void
}

export function GalleryToolbar({
  query,
  category,
  total,
  shown,
  onQueryChange,
  onCategoryChange,
}: GalleryToolbarProps) {
  const categoryItems = GALLERY_CATEGORIES.map((item) => ({
    label: item.label,
    value: item.id,
  }))

  return (
    <div className="sticky top-0 z-sticky border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-[1500px] px-4 py-4 md:px-8">
        <List
          listType="none"
          direction="row"
          gap="sm"
          wrap
          divider={false}
          selectable
          selectedValue={category}
          onSelect={(value) => onCategoryChange(value as ComponentCategory | "all")}
          items={categoryItems}
          header={
            <PageHeader
              heading="Component gallery"
              description="Dev preview — filter components below."
              badge={
                <Text as="span" size="xs" variant="muted">
                  {shown} of {total}
                </Text>
              }
            />
          }
          search={{
            placeholder: "Search components…",
            value: query,
            onChange: onQueryChange,
            onDebouncedChange: onQueryChange,
            filterItems: false,
            debounceMs: 0,
          }}
        />
      </div>
    </div>
  )
}
