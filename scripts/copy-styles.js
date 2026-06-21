#!/usr/bin/env node

/**
 * Copies src/variables.css → dist/styles.css for consumer import.
 */

const fs = require("fs")
const path = require("path")

const src = path.join(__dirname, "..", "src", "variables.css")
const dest = path.join(__dirname, "..", "dist", "styles.css")

if (!fs.existsSync(src)) {
  console.error("copy-styles: src/variables.css not found")
  process.exit(1)
}

fs.mkdirSync(path.dirname(dest), { recursive: true })
fs.copyFileSync(src, dest)
console.log("copy-styles: dist/styles.css")
