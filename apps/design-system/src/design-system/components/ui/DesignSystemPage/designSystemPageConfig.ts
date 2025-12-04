/**
 * DesignSystemPage Configuration
 * Icon mapping and configuration for design system page
 */

import {
  HomeIcon,
  SettingsIcon,
  ChevronDownIcon,
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
} from "lucide-react"

/**
 * Map category names to appropriate icons
 */
export function getCategoryIcon(cat: string) {
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

export { HomeIcon, SettingsIcon, ChevronDownIcon }

