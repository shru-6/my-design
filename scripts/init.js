#!/usr/bin/env node

/**
 * Design system init script
 * Sets up Tailwind CSS and required configuration
 * This file is part of the design system library
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get package name dynamically from package.json
function getPackageName() {
  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.name || 'shru-design-system';
  } catch (error) {
    // Fallback if package.json can't be read
    return 'shru-design-system';
  }
}

const PACKAGE_NAME = getPackageName();
const LIBRARY_NAME = `${PACKAGE_NAME} library`;

// Configuration constants
const TAILWIND_VERSION = '^3.4.0';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPackageInstalled(packageName) {
  try {
    require.resolve(packageName);
    return true;
  } catch {
    return false;
  }
}

function installPackage(packageName, isDev = true) {
  log(`Installing ${packageName}...`, 'blue');
  try {
    execSync(`npm install ${isDev ? '-D' : ''} ${packageName}`, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(`Failed to install ${packageName}`, 'red');
    return false;
  }
}

function createTailwindConfig() {
  const configPath = path.join(process.cwd(), 'tailwind.config.js');
  const presetImport = `import designPreset from '${PACKAGE_NAME}/tailwind-preset'`;

  if (fs.existsSync(configPath)) {
    const existing = fs.readFileSync(configPath, 'utf8');
    if (existing.includes('tailwind-preset') || existing.includes('tailwind.preset.cjs')) {
      log('tailwind.config.js already uses the design system preset.', 'green');
      return;
    }
    log('tailwind.config.js exists but does not use the preset. Add presets manually — see docs.', 'yellow');
    return;
  }

  const config = `/** @type {import('tailwindcss').Config} */
// Created by ${LIBRARY_NAME}
${presetImport}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/${PACKAGE_NAME}/dist/**/*.{js,mjs}",
  ],
  presets: [designPreset],
}
`;

  fs.writeFileSync(configPath, config);
  log('Created tailwind.config.js', 'green');
}

function createPostCSSConfig() {
  const configPath = path.join(process.cwd(), 'postcss.config.js');
  
  if (fs.existsSync(configPath)) {
    log('postcss.config.js already exists. Skipping...', 'yellow');
    return;
  }
  
  const config = `// This file was created by ${LIBRARY_NAME}
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

  fs.writeFileSync(configPath, config);
  log('Created postcss.config.js', 'green');
}

function createCSSFile() {
  const cssPath = path.join(process.cwd(), 'src', 'index.css');
  const cssDir = path.dirname(cssPath);
  const stylesImport = `'${PACKAGE_NAME}/styles.css'`;

  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }

  if (fs.existsSync(cssPath)) {
    const existing = fs.readFileSync(cssPath, 'utf8');
    if (existing.includes(PACKAGE_NAME) && existing.includes('styles.css')) {
      log('CSS import from design system already configured.', 'green');
      return;
    }
    log('src/index.css exists. Add this line at the top:', 'yellow');
    log(`   @import ${stylesImport};`, 'blue');
    return;
  }

  const css = `@import ${stylesImport};

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Created by ${LIBRARY_NAME} */
@layer base {
  body {
    font-family: var(--font-sans), system-ui, sans-serif;
  }
}
`;

  fs.writeFileSync(cssPath, css);
  log('Created src/index.css', 'green');
}

/**
 * Get the library's token files directory
 * When running from node_modules, this will be scripts/tokens
 */
function getLibraryTokensPath() {
  // __dirname is scripts/ when running from node_modules
  // So scripts/tokens is at __dirname/tokens
  const libraryTokensPath = path.join(__dirname, 'tokens');
  
  // Check if tokens exist in scripts/tokens (published package)
  if (fs.existsSync(libraryTokensPath)) {
    return libraryTokensPath;
  }
  
  return null;
}

/**
 * Recursively copy directory, always overwriting library files
 * Library files are ALWAYS overwritten on every install to ensure updates
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    return false;
  }
  
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  let copiedCount = 0;
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      const subCopied = copyDirectory(srcPath, destPath);
      if (subCopied) copiedCount += subCopied;
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      // All files from scripts/tokens/ are library files - ALWAYS overwrite
      // Known library files: base.json, palettes.json, and all files in themes/
      const isKnownLibraryFile = entry.name === 'base.json' || 
                                 entry.name === 'palettes.json' || 
                                 srcPath.includes(path.join('tokens', 'themes'));
      
      if (isKnownLibraryFile) {
        // ALWAYS overwrite library files (ensures library updates are applied)
        fs.copyFileSync(srcPath, destPath);
        copiedCount++;
      }
      // User's custom files (not in library) are preserved - they won't be in scripts/tokens/
    } else {
      // Non-JSON files: copy if doesn't exist
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        copiedCount++;
      }
    }
  }
  
  return copiedCount;
}

function createTokenFiles() {
  const publicDir = path.join(process.cwd(), 'public');
  const tokensDir = path.join(publicDir, 'tokens');
  const themesDir = path.join(tokensDir, 'themes');
  
  // Create directories
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(tokensDir)) {
    fs.mkdirSync(tokensDir, { recursive: true });
  }
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }
  
  // Copy ALL token files from library - ALWAYS overwrite to ensure updates
  const libraryTokensPath = getLibraryTokensPath();
  if (libraryTokensPath) {
    log(`Copying token files from library (always overwriting library files)...`, 'blue');
    const copiedCount = copyDirectory(libraryTokensPath, tokensDir);
    if (copiedCount > 0) {
      log(`Token files updated from library (${copiedCount} files)`, 'green');
    } else {
      log('All library token files are up to date.', 'green');
    }
  } else {
    log('Warning: Library token files not found. Make sure the package is properly installed.', 'yellow');
    return;
  }
  
  // If library tokens not found, we can't create files (user needs to install package properly)
  if (!libraryTokensPath) {
    log('Warning: Could not find library token files. Make sure the package is properly installed.', 'yellow');
    return;
  }
}

// Legacy HTML injection is disabled. Runtime/applyThemeSync now appends the
// dynamic style to the end of <head>, so we no longer mutate consumer HTML.
function injectThemeScript() {
  log('Skipping HTML injection; runtime theme applies dynamically.', 'yellow');
}

function checkMainFile() {
  const possiblePaths = [
    path.join(process.cwd(), 'src', 'main.tsx'),
    path.join(process.cwd(), 'src', 'main.ts'),
    path.join(process.cwd(), 'src', 'index.tsx'),
    path.join(process.cwd(), 'src', 'index.ts'),
    path.join(process.cwd(), 'src', 'App.tsx'),
  ];
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (!content.includes("index.css") && !content.includes("'./index.css'")) {
        log(`\n⚠️  Don't forget to import the CSS file in your entry point:`, 'yellow');
        log(`   import './index.css'`, 'blue');
        log(`   Add this to: ${filePath}\n`, 'yellow');
      } else {
        log('CSS import found in entry file.', 'green');
      }
      return;
    }
  }
  
  log('\n⚠️  Could not find entry file. Please manually import:', 'yellow');
  log("   import './index.css'", 'blue');
}

// Main execution
function main() {
  log(`\n🚀 Setting up ${PACKAGE_NAME}...\n`, 'blue');
  
  // Check and install Tailwind (only if missing, skip check if already installed)
  if (!checkPackageInstalled('tailwindcss')) {
    log('Tailwind CSS not found. Installing...', 'yellow');
    if (!installPackage(`tailwindcss@${TAILWIND_VERSION}`)) {
      log('Failed to install Tailwind CSS. Please install manually.', 'red');
      process.exit(1);
    }
  }
  
  // Check and install PostCSS (only if missing)
  if (!checkPackageInstalled('postcss')) {
    installPackage('postcss');
  }
  
  // Check and install Autoprefixer (only if missing)
  if (!checkPackageInstalled('autoprefixer')) {
    installPackage('autoprefixer');
  }
  
  // Create configuration files
  createTailwindConfig();
  createPostCSSConfig();
  createCSSFile();
  createTokenFiles();
  injectThemeScript();
  checkMainFile();
  
  log('\n✅ Setup complete!', 'green');
  log('\nNext steps:', 'blue');
  log('1. Import the design system CSS in your entry point:', 'yellow');
  log(`   @import '${PACKAGE_NAME}/styles.css';`, 'blue');
  log('   (or import ./index.css if init created it for you)', 'blue');
  log('2. Start using components:', 'yellow');
  log(`   import { Button, ThemeToggle } from '${PACKAGE_NAME}'`, 'blue');
  log('\n💡 Custom Token Files:', 'blue');
  log('   You can add custom theme files to public/tokens/themes/{category}/', 'yellow');
  log('   Example: public/tokens/themes/color/ocean.json', 'blue');
  log('   The ThemeToggle will automatically discover and use them.', 'blue');
  log('\n');
}

main();
