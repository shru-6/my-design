import { useMemo, useState } from "react"
import { EmptyState, ThemeToggle, Toaster } from "shru-design-system"
import { componentMetadata, type ComponentCategory } from "../utils/componentMetadata"
import { filterGalleryMetadata, galleryCardClass } from "../utils/galleryUtils"
import { ComponentCard } from "../components/ComponentCard"
import { GalleryToolbar } from "../components/GalleryToolbar"

export function GalleryPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<ComponentCategory | "all">("all")

  const filtered = useMemo(
    () => filterGalleryMetadata(componentMetadata, query, category),
    [query, category]
  )

  return (
    <>
      <div className="h-full min-h-0 flex-1 overflow-y-auto">
      <GalleryToolbar
        query={query}
        category={category}
        total={componentMetadata.length}
        shown={filtered.length}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />

      <main className="mx-auto w-full max-w-[1500px] p-6 md:p-8">
        {filtered.length === 0 ? (
          <EmptyState title="No matches" description="Try another search or category filter." />
        ) : (
          <div className="grid auto-rows-[minmax(24rem,auto)] grid-cols-[repeat(auto-fill,minmax(360px,1fr))] items-stretch gap-4">
            {filtered.map((metadata) => (
              <div key={metadata.name} className={galleryCardClass()}>
                <ComponentCard metadata={metadata} />
              </div>
            ))}
          </div>
        )}
      </main>

      <ThemeToggle position="bottom-left" />
      </div>
    </>
  )
}
