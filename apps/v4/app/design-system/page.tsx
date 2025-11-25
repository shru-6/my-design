"use client"

import { useState } from "react"
import { getComponentsByCategory, getCategories } from "@/src/design-system/components/showcaseUtils"
import { getComponentShowcase } from "@/src/design-system/components/showcases"
import { ThemeToggle } from "@/src/design-system/themes/ui/ThemeToggle"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/src/design-system/components/molecules/Collapsible"
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
} from "@/src/design-system/components/layout/Sidebar"
import {
  HomeIcon,
  SettingsIcon,
  ZapIcon,
  FileTextIcon,
  LayoutIcon,
  BarChartIcon,
  NavigationIcon,
  LayersIcon,
  ComponentIcon,
  TypeIcon,
  ImageIcon,
  WrenchIcon,
  SparklesIcon,
  MessageSquareIcon,
  BoxIcon,
  PaletteIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "lucide-react"

export default function DesignSystemPage() {
  const categories = getCategories()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

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
                  
                  // Map category names to appropriate icons
                  const getCategoryIcon = (cat: string) => {
                    const lowerCat = cat.toLowerCase()
                    if (lowerCat.includes('action') || lowerCat.includes('button')) return ZapIcon
                    if (lowerCat.includes('input') || lowerCat.includes('form')) return FileTextIcon
                    if (lowerCat.includes('layout') || lowerCat.includes('structure')) return LayoutIcon
                    if (lowerCat.includes('data display') || lowerCat.includes('data')) return BarChartIcon
                    if (lowerCat.includes('navigation')) return NavigationIcon
                    if (lowerCat.includes('overlay') || lowerCat.includes('dialog')) return LayersIcon
                    if (lowerCat.includes('typography')) return TypeIcon
                    if (lowerCat.includes('media')) return ImageIcon
                    if (lowerCat.includes('utilit')) return WrenchIcon
                    if (lowerCat.includes('menu')) return SparklesIcon
                    if (lowerCat.includes('feedback') || lowerCat.includes('notification')) return MessageSquareIcon
                    if (lowerCat.includes('primitiv')) return BoxIcon
                    if (lowerCat.includes('development')) return PaletteIcon
                    if (lowerCat.includes('date') || lowerCat.includes('time') || lowerCat.includes('calendar')) return CalendarIcon
                    return ComponentIcon
                  }
                  const Icon = getCategoryIcon(category)
                  
                  const isOpen = openCategory === category
                  
                  return (
                    <Collapsible 
                      key={category} 
                      open={isOpen}
                      onOpenChange={(open) => setOpenCategory(open ? category : null)}
                      className="mb-1"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full">
                            <Icon className="size-4" />
                            <span className="flex-1 text-left text-xs">{category}</span>
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
          <div className="container mx-auto p-8 max-w-7xl">
            <div className="mb-12">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {/* <SidebarTrigger /> */}
                    <h1 className="text-4xl font-bold">Design System</h1>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Showcase of migrated components with theme support
                  </p>
                </div>
              </div>
              
              {/* Full Theme Toggle (collapsible) */}
              <details id="theme-toggle" className="mb-6">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                  Customize Theme (Color, Typography, Shape)
                </summary>
                <div className="mt-4 p-4 border rounded-lg bg-card">
                  <ThemeToggle />
                </div>
              </details>
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

// All showcase functions have been moved to their respective component files.
// The showcase page now uses getComponentShowcase() from showcases.ts to render them dynamically.
