"use client"

import { getComponentsByCategory, getCategories } from "@/src/design-system/components/componentUtils"
import { getComponentShowcase } from "@/src/design-system/components/componentConfig"
import { ThemeToggle } from "@/src/design-system/themes/ui"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/src/design-system/components/molecules"
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/src/design-system/components/layout"
import { useDesignSystemPage } from "./useDesignSystemPage"
import { getCategoryIcon, HomeIcon, SettingsIcon, ChevronDownIcon } from "./designSystemPageConfig"

export function DesignSystemPage() {
  const categories = getCategories()
  const { openCategory, mounted, handleCategoryToggle } = useDesignSystemPage()

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-sidebar-foreground" />
              <h2 className="text-lg font-semibold whitespace-nowrap group-data-[collapsible=icon]:hidden">Design System</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarGroupContent>
                {categories.map((category) => {
                  const categoryComponents = getComponentsByCategory(category)
                  const Icon = getCategoryIcon(category)
                  const isOpen = openCategory === category
                  
                  return (
                    <Collapsible 
                      key={category} 
                      open={isOpen}
                      onOpenChange={(open) => handleCategoryToggle(category, open)}
                      className="mb-1"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full">
                            <Icon className="size-4" />
                            <span className="flex-1 text-left text-xs whitespace-nowrap">{category}</span>
                            <span className="text-xs text-muted-foreground">
                              ({categoryComponents.length})
                            </span>
                            <ChevronDownIcon className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>
                      <CollapsibleContent>
                        <SidebarMenu className="ml-4 mt-1">
                          {categoryComponents.map((component) => (
                            <SidebarMenuItem key={component.name}>
                              <SidebarMenuButton asChild size="sm">
                                <a href={`#${category.toLowerCase().replace(/\s+/g, '-')}-${component.name.toLowerCase()}`}>
                                  <span>{component.name}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </Collapsible>
                  )
                })}
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#theme-toggle">
                      <SettingsIcon className="size-4" />
                      <span>Theme Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#top">
                    <HomeIcon className="size-4" />
                    <span>Back to Top</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <ThemeToggle position="top-right" />
          <div className="container mx-auto p-8 max-w-7xl">
            <div className="mb-12">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-4xl font-bold">Design System</h1>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Showcase of components with theme support
                  </p>
                </div>
              </div>
            </div>

            {categories.map((category) => {
              const categoryComponents = getComponentsByCategory(category)
              return (
                <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-16 scroll-mt-8">
                  <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">
                    {category}
                  </h2>
                  <div className="space-y-12">
                    {categoryComponents.map((component) => (
                      <div key={component.name} id={`${category.toLowerCase().replace(/\s+/g, '-')}-${component.name.toLowerCase()}`} className="scroll-mt-8">
                        <ComponentShowcase component={component} />
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function ComponentShowcase({ component }: { component: any }) {
  const ShowcaseComponent = getComponentShowcase(component.name)
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-1">{component.name}</h3>
        <p className="text-sm text-muted-foreground">{component.description}</p>
      </div>

      <div className="rounded-lg border p-6 bg-card">
        {ShowcaseComponent ? (
          <ShowcaseComponent />
        ) : (
          <div className="text-sm text-muted-foreground">
            Showcase not yet implemented. Add {component.name}Showcase to {component.file}
          </div>
        )}
      </div>
    </div>
  )
}

