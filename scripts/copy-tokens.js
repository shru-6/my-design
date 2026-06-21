#!/usr/bin/env node

/**
 * Copy scripts/tokens → src/tokens and public/tokens.
 * scripts/tokens is the single source of truth for token JSON.
 */

const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const source = path.join(__dirname, "tokens")
const destinations = [
  path.join(root, "src", "tokens"),
  path.join(root, "public", "tokens"),
]

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyRecursive(from, to)
    else fs.copyFileSync(from, to)
  }
}

if (!fs.existsSync(source)) {
  console.error("copy-tokens: source missing at scripts/tokens")
  process.exit(1)
}

for (const dest of destinations) {
  copyRecursive(source, dest)
}

console.log(`copy-tokens: synced ${destinations.length} destinations from scripts/tokens`)
