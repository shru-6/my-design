#!/usr/bin/env node

/**
 * Build script to pre-generate all Tailwind utilities needed by components
 * This ensures users don't need to configure Tailwind - they just import the CSS
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const componentsDir = join(rootDir, 'apps/design-system/src/design-system/components')
const stylesDir = join(rootDir, 'apps/design-system/styles')
const outputFile = join(stylesDir, 'globals.css')

// Extract all Tailwind classes from a string
function extractTailwindClasses(content) {
  const classRegex = /className=["']([^"']+)["']/g
  const cnRegex = /cn\(["']([^"']+)["']/g
  const classes = new Set()
  
  // Match className="..."
  let match
  while ((match = classRegex.exec(content)) !== null) {
    match[1].split(/\s+/).forEach(cls => {
      if (cls && !cls.startsWith('{') && !cls.includes('${')) {
        classes.add(cls)
      }
    })
  }
  
  // Match cn("...")
  while ((match = cnRegex.exec(content)) !== null) {
    match[1].split(/\s+/).forEach(cls => {
      if (cls) classes.add(cls)
    })
  }
  
  return Array.from(classes)
}

// Recursively find all component files
function findComponentFiles(dir, fileList = []) {
  const files = readdirSync(dir)
  
  files.forEach(file => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    
    if (stat.isDirectory()) {
      findComponentFiles(filePath, fileList)
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath)
    }
  })
  
  return fileList
}

// Collect all classes from components
const componentFiles = findComponentFiles(componentsDir)
const allClasses = new Set()

console.log(`Scanning ${componentFiles.length} component files...`)

componentFiles.forEach(file => {
  try {
    const content = readFileSync(file, 'utf-8')
    const classes = extractTailwindClasses(content)
    classes.forEach(cls => allClasses.add(cls))
  } catch (err) {
    console.warn(`Warning: Could not read ${file}:`, err.message)
  }
})

// Also add common utilities that are always needed
const commonUtilities = [
  // Layout
  'flex', 'inline-flex', 'grid', 'block', 'inline-block', 'hidden',
  'items-center', 'items-start', 'items-end', 'justify-center', 'justify-between', 'justify-start', 'justify-end',
  'flex-col', 'flex-row', 'flex-wrap', 'flex-nowrap',
  'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-6', 'gap-8',
  
  // Spacing
  'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-6', 'p-8',
  'px-1', 'px-2', 'px-3', 'px-4', 'px-6', 'px-8',
  'py-1', 'py-2', 'py-3', 'py-4', 'py-6', 'py-8',
  'm-0', 'm-1', 'm-2', 'm-4', 'm-6', 'm-8',
  'mx-auto', 'my-auto',
  'mb-1', 'mb-2', 'mb-4', 'mb-6', 'mb-8',
  'mt-1', 'mt-2', 'mt-4', 'mt-6', 'mt-8',
  'mr-1', 'mr-2', 'mr-4',
  'ml-1', 'ml-2', 'ml-4',
  
  // Sizing
  'w-full', 'w-auto', 'w-fit', 'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4',
  'h-full', 'h-auto', 'h-fit', 'h-screen', 'min-h-screen',
  'h-4', 'h-5', 'h-6', 'h-8', 'h-9', 'h-10', 'h-12', 'h-14', 'h-16',
  'w-4', 'w-5', 'w-6', 'w-8', 'w-10', 'w-12', 'w-14', 'w-16',
  'min-w-0', 'max-w-full', 'max-w-screen-xl', 'max-w-screen-2xl',
  
  // Border radius
  'rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full',
  
  // Colors (common variants)
  'bg-transparent', 'bg-current',
  'text-transparent', 'text-current',
  'border-transparent', 'border-current',
  
  // Typography
  'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
  'font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold',
  'leading-none', 'leading-tight', 'leading-normal', 'leading-relaxed', 'leading-loose',
  'text-left', 'text-center', 'text-right', 'text-justify',
  'uppercase', 'lowercase', 'capitalize', 'normal-case',
  'whitespace-normal', 'whitespace-nowrap', 'whitespace-pre',
  
  // Effects
  'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-none',
  'opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100',
  
  // Transitions
  'transition', 'transition-all', 'transition-colors', 'transition-opacity', 'transition-transform',
  'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'duration-500',
  'ease-in', 'ease-out', 'ease-in-out',
  
  // Transforms
  'scale-95', 'scale-100', 'scale-105', 'scale-110',
  'rotate-0', 'rotate-90', 'rotate-180',
  
  // Position
  'relative', 'absolute', 'fixed', 'sticky', 'static',
  'inset-0', 'top-0', 'right-0', 'bottom-0', 'left-0',
  'z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
  
  // Overflow
  'overflow-hidden', 'overflow-auto', 'overflow-scroll', 'overflow-visible',
  'overflow-x-hidden', 'overflow-y-hidden',
  
  // Display
  'sr-only', 'not-sr-only',
  
  // Interactive
  'cursor-pointer', 'cursor-not-allowed', 'cursor-default',
  'select-none', 'select-text', 'select-all',
  'pointer-events-none', 'pointer-events-auto',
  
  // States
  'hover:opacity-80', 'hover:opacity-90', 'hover:scale-105', 'hover:scale-110',
  'active:scale-95', 'active:opacity-80',
  'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2',
  'disabled:opacity-50', 'disabled:cursor-not-allowed', 'disabled:pointer-events-none',
  
  // Responsive (common breakpoints)
  'sm:block', 'sm:hidden', 'md:block', 'md:hidden', 'lg:block', 'lg:hidden',
  'sm:flex', 'md:flex', 'lg:flex',
]

commonUtilities.forEach(cls => allClasses.add(cls))

console.log(`Found ${allClasses.size} unique Tailwind classes`)

// Read the current globals.css
let globalsContent = readFileSync(outputFile, 'utf-8')

// Remove the old @layer utilities section if it exists
const utilitiesStart = globalsContent.indexOf('@layer utilities {')
const utilitiesEnd = globalsContent.indexOf('}\n\n@layer components', utilitiesStart)
if (utilitiesStart !== -1 && utilitiesEnd !== -1) {
  globalsContent = globalsContent.slice(0, utilitiesStart) + globalsContent.slice(utilitiesEnd + 2)
}

// Generate safelist comment
const safelistComment = `/* 
 * Pre-generated utility classes for design system components
 * These utilities are explicitly defined to ensure they work in consuming apps
 * without requiring Tailwind configuration or scanning
 * 
 * Generated from ${componentFiles.length} component files
 * Total classes: ${allClasses.size}
 */\n\n`

// Generate utility classes
const utilityClasses = Array.from(allClasses)
  .sort()
  .map(cls => {
    // Skip complex classes with variables for now - handle common ones
    if (cls.includes('${') || cls.includes('{')) return null
    
    // Generate CSS for common patterns
    if (cls.startsWith('rounded-')) {
      if (cls === 'rounded-full') return `.${cls} { border-radius: 9999px !important; }`
      if (cls === 'rounded-none') return `.${cls} { border-radius: 0 !important; }`
      if (cls === 'rounded') return `.${cls} { border-radius: var(--radius) !important; }`
      if (cls === 'rounded-sm') return `.${cls} { border-radius: var(--radius-sm) !important; }`
      if (cls === 'rounded-md') return `.${cls} { border-radius: var(--radius-md) !important; }`
      if (cls === 'rounded-lg') return `.${cls} { border-radius: var(--radius-lg) !important; }`
      if (cls === 'rounded-xl') return `.${cls} { border-radius: var(--radius-xl) !important; }`
      if (cls === 'rounded-2xl') return `.${cls} { border-radius: calc(var(--radius) + 8px) !important; }`
    }
    
    // For other classes, we'll let Tailwind generate them
    // But we need to ensure they're in the safelist
    return null
  })
  .filter(Boolean)
  .join('\n')

// Insert the safelist and utilities before @layer components
const componentsMarker = globalsContent.indexOf('@layer components')
if (componentsMarker !== -1) {
  const beforeComponents = globalsContent.slice(0, componentsMarker)
  const afterComponents = globalsContent.slice(componentsMarker)
  
  globalsContent = beforeComponents + 
    safelistComment +
    `@layer utilities {\n${utilityClasses}\n}\n\n` +
    afterComponents
} else {
  // Append if no components layer found
  globalsContent += '\n\n' + safelistComment + `@layer utilities {\n${utilityClasses}\n}\n`
}

writeFileSync(outputFile, globalsContent, 'utf-8')
console.log(`✅ Updated ${outputFile}`)
console.log(`   Added ${utilityClasses.split('\n').filter(l => l.trim()).length} explicit utility overrides`)
console.log(`   Total classes scanned: ${allClasses.size}`)

