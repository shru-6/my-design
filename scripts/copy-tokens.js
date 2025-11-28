#!/usr/bin/env node

/**
 * Copy Tokens Script
 * Copies token files from the package to the user's public folder
 */

const fs = require('fs')
const path = require('path')

const sourceDir = path.join(__dirname, '../src/tokens')
const targetDir = path.join(process.cwd(), 'public/tokens')

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      )
    })
  } else {
    // Ensure parent directory exists
    const parentDir = path.dirname(dest)
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true })
    }
    fs.copyFileSync(src, dest)
  }
}

try {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`)
    console.error('Make sure you are running this from a project that has @shru/theme-toggle installed')
    process.exit(1)
  }

  // Create target directory if it doesn't exist
  if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
    fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true })
  }

  console.log(`Copying tokens from ${sourceDir} to ${targetDir}...`)
  copyRecursive(sourceDir, targetDir)
  console.log('✅ Tokens copied successfully!')
  console.log(`\nTokens are now available at: ${targetDir}`)
  console.log('\nYou can now add custom token files to extend themes:')
  console.log('  - Add new theme files to public/tokens/themes/{category}/{name}.json')
  console.log('  - Use registerTheme() or they will be auto-discovered on next load')
} catch (error) {
  console.error('Error copying tokens:', error)
  process.exit(1)
}

