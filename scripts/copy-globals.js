#!/usr/bin/env node

/**
 * Copy Globals CSS Script
 * Copies globals.css from the package to the user's project
 */

const fs = require('fs')
const path = require('path')

// Try to find globals.css in multiple locations
let sourceFile
const nodeModulesPath = path.join(process.cwd(), 'node_modules/@shru/theme-toggle')

// Try different possible locations
const possibleSources = [
  path.join(nodeModulesPath, 'apps/design-system/styles/globals.css'), // GitHub install
  path.join(nodeModulesPath, 'globals.css'), // If included in package files
  path.join(__dirname, '../apps/design-system/styles/globals.css'), // Development/repo root
]

for (const possibleSource of possibleSources) {
  if (fs.existsSync(possibleSource)) {
    sourceFile = possibleSource
    break
  }
}

// Default target locations to try (in order of preference)
const possibleTargets = [
  path.join(process.cwd(), 'app/globals.css'),
  path.join(process.cwd(), 'src/app/globals.css'),
  path.join(process.cwd(), 'styles/globals.css'),
  path.join(process.cwd(), 'src/styles/globals.css'),
]

function findExistingGlobals() {
  for (const target of possibleTargets) {
    if (fs.existsSync(target)) {
      return target
    }
  }
  return null
}

function findBestTarget() {
  // Check if any globals.css already exists
  const existing = findExistingGlobals()
  if (existing) {
    return existing
  }
  
  // Use the first possible target that has a parent directory
  for (const target of possibleTargets) {
    const parentDir = path.dirname(target)
    if (fs.existsSync(parentDir)) {
      return target
    }
  }
  
  // Default to app/globals.css
  return possibleTargets[0]
}

try {
  if (!sourceFile || !fs.existsSync(sourceFile)) {
    console.error('Source file not found. Tried:')
    const possibleSources = [
      path.join(nodeModulesPath, 'apps/design-system/styles/globals.css'),
      path.join(nodeModulesPath, 'globals.css'),
      path.join(__dirname, '../apps/design-system/styles/globals.css'),
    ]
    possibleSources.forEach(src => console.error(`  - ${src}`))
    console.error('\nMake sure you are running this from a project that has @shru/theme-toggle installed')
    console.error('Or run this from the repository root if developing')
    process.exit(1)
  }

  const targetFile = findBestTarget()
  const targetDir = path.dirname(targetFile)

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  // Check if file already exists
  if (fs.existsSync(targetFile)) {
    console.warn(`⚠️  File already exists: ${targetFile}`)
    console.warn('Skipping copy. If you want to overwrite, delete the file first.')
    console.log(`\nCurrent globals.css location: ${targetFile}`)
    process.exit(0)
  }

  console.log(`Copying globals.css from ${sourceFile} to ${targetFile}...`)
  fs.copyFileSync(sourceFile, targetFile)
  console.log('✅ globals.css copied successfully!')
  console.log(`\nFile location: ${targetFile}`)
  console.log('\nNext steps:')
  console.log(`  1. Import it in your root layout: import './globals.css'`)
  console.log('  2. Make sure Tailwind v4 is installed: npm install tailwindcss@next @tailwindcss/postcss@next')
  console.log('  3. Configure PostCSS with @tailwindcss/postcss plugin')
} catch (error) {
  console.error('Error copying globals.css:', error)
  process.exit(1)
}
