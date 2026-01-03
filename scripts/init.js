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
  
  // Required configs that must be present
  const requiredConfigs = {
    fontFamily: 'fontFamily',
    spacing: 'spacing',
    gap: 'gap',
    transitionDuration: 'transitionDuration'
  };
  
  if (fs.existsSync(configPath)) {
    log('tailwind.config.js already exists. Checking for required configs...', 'yellow');
    const existing = fs.readFileSync(configPath, 'utf8');
    
    // Check if all required configs are present with proper values
    const hasFontFamily = existing.includes('fontFamily') && existing.includes('--font-sans');
    const hasSpacing = existing.includes('spacing:') && existing.includes('component-xs');
    const hasGap = existing.includes('gap:') && existing.includes('component-xs');
    const hasTransitionDuration = existing.includes('transitionDuration') && existing.includes('duration-fast');
    
    if (hasFontFamily && hasSpacing && hasGap && hasTransitionDuration) {
      log(`Configuration already includes all required ${PACKAGE_NAME} setup.`, 'green');
      return;
    }
    
    // Track what's missing
    const missingConfigs = [];
    if (!hasFontFamily) missingConfigs.push('fontFamily');
    if (!hasSpacing) missingConfigs.push('spacing');
    if (!hasGap) missingConfigs.push('gap');
    if (!hasTransitionDuration) missingConfigs.push('transitionDuration');
    
    // If configs are missing, update the file
    if (missingConfigs.length > 0) {
      log(`Missing required configs: ${missingConfigs.join(', ')}. Updating...`, 'yellow');
      
      // Read the existing config
      let updated = existing;
      
      // Add fontFamily if missing
      if (!hasFontFamily) {
        const fontFamilyConfig = `      // ⚠️ IF YOU UPDATE fontFamily CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - fontFamily config (test app)
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "var(--font-sans)", "system-ui", "sans-serif"],
      },`;
        
        // Insert after borderRadius
        if (existing.includes('borderRadius')) {
          updated = updated.replace(
            /(borderRadius: \{[\s\S]*?\},)/,
            `$1\n${fontFamilyConfig}`
          );
        } else {
          // Insert after colors
          updated = updated.replace(
            /(ring: "hsl\(var\(--ring\)\)",)/,
            `$1\n      },\n${fontFamilyConfig}`
          );
        }
      }
      
      // Add spacing if missing
      if (!hasSpacing) {
        const spacingConfig = `      // ⚠️ IF YOU UPDATE spacing CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - spacing config (test app)
      spacing: {
        'component-xs': "var(--spacing-component-xs, 0.25rem)",
        'component-sm': "var(--spacing-component-sm, 0.5rem)",
        'component-md': "var(--spacing-component-md, 1rem)",
        'component-lg': "var(--spacing-component-lg, 1.5rem)",
        'component-xl': "var(--spacing-component-xl, 2rem)",
      },`;
        
        // Insert after fontFamily or borderRadius
        if (updated.includes('fontFamily')) {
          updated = updated.replace(
            /(fontFamily: \{[\s\S]*?\},)/,
            `$1\n${spacingConfig}`
          );
        } else if (updated.includes('borderRadius')) {
          updated = updated.replace(
            /(borderRadius: \{[\s\S]*?\},)/,
            `$1\n${spacingConfig}`
          );
        }
      }
      
      // Add gap if missing
      if (!hasGap) {
        const gapConfig = `      // ⚠️ IF YOU UPDATE gap CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - gap config (test app)
      gap: {
        'component-xs': "var(--spacing-component-xs, 0.25rem)",
        'component-sm': "var(--spacing-component-sm, 0.5rem)",
        'component-md': "var(--spacing-component-md, 1rem)",
        'component-lg': "var(--spacing-component-lg, 1.5rem)",
        'component-xl': "var(--spacing-component-xl, 2rem)",
      },`;
        
        // Insert after spacing
        if (updated.includes('spacing:')) {
          updated = updated.replace(
            /(spacing: \{[\s\S]*?\},)/,
            `$1\n${gapConfig}`
          );
        } else if (updated.includes('fontFamily')) {
          updated = updated.replace(
            /(fontFamily: \{[\s\S]*?\},)/,
            `$1\n${gapConfig}`
          );
        }
      }
      
      // Add transitionDuration if missing
      if (!hasTransitionDuration) {
        const transitionConfig = `      // ⚠️ IF YOU UPDATE transitionDuration CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - transitionDuration config (test app)
      transitionDuration: {
        'fast': "var(--duration-fast, 150ms)",
        'normal': "var(--duration-normal, 300ms)",
        'slow': "var(--duration-slow, 500ms)",
      },`;
        
        // Insert after gap or spacing
        if (updated.includes('gap:')) {
          updated = updated.replace(
            /(gap: \{[\s\S]*?\},)/,
            `$1\n${transitionConfig}`
          );
        } else if (updated.includes('spacing:')) {
          updated = updated.replace(
            /(spacing: \{[\s\S]*?\},)/,
            `$1\n${transitionConfig}`
          );
        } else if (updated.includes('fontFamily')) {
          updated = updated.replace(
            /(fontFamily: \{[\s\S]*?\},)/,
            `$1\n${transitionConfig}`
          );
        }
      }
      
      // Write the updated config
      fs.writeFileSync(configPath, updated);
      log('Updated tailwind.config.js with missing configs', 'green');
      return;
    }
    
    // If config exists but doesn't have our package name, warn user
    if (!existing.includes(PACKAGE_NAME) && !existing.includes('shru-design-system')) {
      log('Please manually merge the Tailwind config. See docs for details.', 'yellow');
      return;
    }
  }
  
  const config = `/** @type {import('tailwindcss').Config} */
// This file was created by ${LIBRARY_NAME}
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/${PACKAGE_NAME}/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      // ⚠️ IF YOU UPDATE borderRadius CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - borderRadius config (test app)
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // ⚠️ IF YOU UPDATE fontFamily CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - fontFamily config (test app)
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      // ⚠️ IF YOU UPDATE spacing CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - spacing config (test app)
      spacing: {
        'component-xs': "var(--spacing-component-xs, 0.25rem)",
        'component-sm': "var(--spacing-component-sm, 0.5rem)",
        'component-md': "var(--spacing-component-md, 1rem)",
        'component-lg': "var(--spacing-component-lg, 1.5rem)",
        'component-xl': "var(--spacing-component-xl, 2rem)",
      },
      gap: {
        'component-xs': "var(--spacing-component-xs, 0.25rem)",
        'component-sm': "var(--spacing-component-sm, 0.5rem)",
        'component-md': "var(--spacing-component-md, 1rem)",
        'component-lg': "var(--spacing-component-lg, 1.5rem)",
        'component-xl': "var(--spacing-component-xl, 2rem)",
      },
      transitionDuration: {
        'fast': "var(--duration-fast, 150ms)",
        'normal': "var(--duration-normal, 300ms)",
        'slow': "var(--duration-slow, 500ms)",
      },
    },
  },
  plugins: [],
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
  
  // Create src directory if it doesn't exist
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  
  if (fs.existsSync(cssPath)) {
    log('src/index.css already exists. Checking if variables are defined...', 'yellow');
    const existing = fs.readFileSync(cssPath, 'utf8');
    
    if (existing.includes('--primary')) {
      log('CSS variables already defined.', 'green');
      return;
    }
    
    // Append to existing file
    const cssVars = `

/* Design system CSS variables - Created by ${LIBRARY_NAME} */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
  
  * {
    border-color: hsl(var(--border));
  }
  
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: var(--font-sans), system-ui, sans-serif;
  }
}
`;
    fs.appendFileSync(cssPath, cssVars);
    log('Added CSS variables to existing index.css', 'green');
    return;
  }
  
  const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* This file was created by ${LIBRARY_NAME} */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
  
  * {
    border-color: hsl(var(--border));
  }
  
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
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
 * Never preserves existing library files - always overwrites or creates new
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
      // For JSON files, always overwrite if source is a library file
      try {
        const srcContent = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
        const isLibraryFile = srcContent._createdBy && srcContent._createdBy.includes(LIBRARY_NAME.split(' ')[0]);
        
        if (isLibraryFile) {
          // Always overwrite library files (never preserve)
          fs.copyFileSync(srcPath, destPath);
          copiedCount++;
        } else if (!fs.existsSync(destPath)) {
          // New library file that doesn't exist in dest
          fs.copyFileSync(srcPath, destPath);
          copiedCount++;
        }
        // If source is not a library file, don't copy (preserve user's custom files)
      } catch (e) {
        // If JSON parsing fails, check if it's a known library file path
        // Known library files: base.json, palettes.json, and all files in themes/
        const isKnownLibraryFile = entry.name === 'base.json' || 
                                   entry.name === 'palettes.json' || 
                                   srcPath.includes(path.join('tokens', 'themes'));
        
        if (isKnownLibraryFile) {
          // Always overwrite known library files
          fs.copyFileSync(srcPath, destPath);
          copiedCount++;
        } else if (!fs.existsSync(destPath)) {
          // New file that doesn't exist in dest
          fs.copyFileSync(srcPath, destPath);
          copiedCount++;
        }
      }
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

/**
 * Read a token file from the library
 */
function readLibraryTokenFile(relativePath) {
  const libraryTokensPath = getLibraryTokensPath();
  if (!libraryTokensPath) {
    return null;
  }
  
  const filePath = path.join(libraryTokensPath, relativePath);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}

/**
 * Migrate old token structure to new structure
 */
function migrateTokenStructure(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  const migrated = JSON.parse(JSON.stringify(data)); // Deep clone
  
  // Migrate typography.font → font
  if (migrated.typography && migrated.typography.font) {
    migrated.font = migrated.typography.font;
    delete migrated.typography;
  }
  
  // Migrate shape.radius → radius
  if (migrated.shape && migrated.shape.radius) {
    migrated.radius = migrated.shape.radius;
    delete migrated.shape;
  }
  
  return migrated;
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
  
  // Try to copy token files from library
  const libraryTokensPath = getLibraryTokensPath();
  if (libraryTokensPath) {
    log(`Copying token files from library...`, 'blue');
    const copiedCount = copyDirectory(libraryTokensPath, tokensDir);
    if (copiedCount > 0) {
      log(`Token files copied from library successfully! (${copiedCount} files)`, 'green');
    } else {
      log('All token files already exist. Checking for updates...', 'green');
    }
  } else {
    log('Library token files not found, creating default token files...', 'yellow');
  }
  
  // Check and migrate old token structures
  const tokenFilesToCheck = [
    'base.json',
    'palettes.json',
    'themes/color/white.json',
    'themes/color/dark.json',
    'themes/typography/sans.json',
    'themes/typography/serif.json',
    'themes/shape/smooth.json',
    'themes/shape/sharp.json',
    'themes/density/comfortable.json',
    'themes/density/compact.json',
    'themes/animation/gentle.json',
    'themes/animation/brisk.json',
    'themes/custom/brand.json',
    'themes/custom/minimal.json'
  ];
  
  tokenFilesToCheck.forEach(relativePath => {
    const destPath = path.join(tokensDir, relativePath);
    
    // Always read from library and overwrite (never preserve existing files)
    const libraryData = readLibraryTokenFile(relativePath);
    if (libraryData) {
      // Ensure directory exists
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Always overwrite with library version
      libraryData._createdBy = LIBRARY_NAME;
      fs.writeFileSync(destPath, JSON.stringify(libraryData, null, 2));
      
      if (fs.existsSync(destPath)) {
        log(`Updated ${relativePath} from library`, 'green');
      } else {
        log(`Created ${relativePath} from library`, 'green');
      }
    }
  });
  
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
  
  // Check and install Tailwind
  if (!checkPackageInstalled('tailwindcss')) {
    log('Tailwind CSS not found. Installing...', 'yellow');
    if (!installPackage(`tailwindcss@${TAILWIND_VERSION}`)) {
      log('Failed to install Tailwind CSS. Please install manually.', 'red');
      process.exit(1);
    }
  } else {
    log('Tailwind CSS already installed.', 'green');
  }
  
  // Check and install PostCSS
  if (!checkPackageInstalled('postcss')) {
    installPackage('postcss');
  }
  
  // Check and install Autoprefixer
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
  log('1. Make sure to import the CSS file in your entry point:', 'yellow');
  log("   import './index.css'", 'blue');
  log('2. Start using components:', 'yellow');
  log(`   import { Button, ThemeToggle } from '${PACKAGE_NAME}'`, 'blue');
  log('\n💡 Custom Token Files:', 'blue');
  log('   You can add custom theme files to public/tokens/themes/{category}/', 'yellow');
  log('   Example: public/tokens/themes/color/ocean.json', 'blue');
  log('   The ThemeToggle will automatically discover and use them.', 'blue');
  log('\n');
}

main();
