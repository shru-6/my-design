# Token Extension Guide

This guide explains how to extend the theme system by adding custom token files that will automatically appear in the ThemeToggle UI.

## Overview

The theme system supports **dynamic token discovery**. When you add new token files to your `public/tokens/themes/` directory, they can be automatically discovered and registered in the ThemeToggle UI.

## Quick Start

1. **Copy tokens** (if not already done):
   ```bash
   npm run copy:tokens
   # or
   npx copy-tokens
   ```

2. **Add a new theme file**:
   ```bash
   # Example: Add a new color theme
   touch public/tokens/themes/color/ocean.json
   ```

3. **Create the theme JSON**:
   ```json
   {
     "name": "Ocean",
     "icon": "🌊",
     "description": "Ocean-inspired color palette",
     "color": {
       "primary": "{palette.blue.600}",
       "background": "{palette.cyan.50}",
       "foreground": "{palette.slate.900}"
     }
   }
   ```

4. **Register the theme** (choose one method):

   **Method 1: Auto-discovery** (automatic on next load)
   - The system will try to discover common theme names
   - Works for themes in existing categories

   **Method 2: Manual registration** (recommended)
   ```tsx
   import { registerThemeFromFile } from '@shru/theme-toggle/themeDiscovery'
   
   // In your app initialization
   registerThemeFromFile('color', 'ocean', 'color/ocean.json')
   ```

   **Method 3: Using registerTheme** (for programmatic registration)
   ```tsx
   import { registerTheme } from '@shru/theme-toggle'
   
   registerTheme('color', 'ocean', {
     name: 'Ocean',
     file: 'color/ocean.json',
     icon: '🌊',
     description: 'Ocean-inspired color palette'
   })
   ```

## Token File Structure

### Required Fields
- **name**: Display name for the theme
- **icon**: Emoji or character icon (optional, defaults to 🎨)
- **description**: Theme description (optional)

### Theme Data
The actual theme data follows the token structure:

```json
{
  "name": "Ocean",
  "icon": "🌊",
  "description": "Ocean color theme",
  "color": {
    "primary": "{palette.blue.600}",
    "secondary": "{palette.cyan.500}",
    "background": "{palette.cyan.50}",
    "foreground": "{palette.slate.900}"
  }
}
```

### Token References
Use `{palette.color.shade}` syntax to reference palette colors:

```json
{
  "color": {
    "primary": "{palette.blue.600}",
    "accent": "{palette.teal.500}"
  }
}
```

## Adding Themes to New Categories

You can create entirely new theme categories:

1. **Create category directory**:
   ```bash
   mkdir -p public/tokens/themes/mood
   ```

2. **Add theme file**:
   ```json
   // public/tokens/themes/mood/calm.json
   {
     "name": "Calm",
     "icon": "🧘",
     "description": "Calm and peaceful theme",
     "color": {
       "primary": "{palette.green.400}",
       "background": "{palette.green.50}"
     }
   }
   ```

3. **Register the category and theme**:
   ```tsx
   import { registerTheme } from '@shru/theme-toggle'
   
   // First theme in a category automatically creates the category
   registerTheme('mood', 'calm', {
     name: 'Calm',
     file: 'mood/calm.json',
     icon: '🧘',
     description: 'Calm and peaceful theme'
   })
   ```

## Auto-Discovery

The system attempts to auto-discover themes by:

1. **Scanning common theme names** in known categories
2. **Trying to fetch** theme files from `/tokens/themes/{category}/{name}.json`
3. **Registering** themes that are found

### Common Theme Names Scanned

- **color**: white, dark, blue, green, purple, red, orange
- **typography**: sans, serif, mono
- **shape**: smooth, sharp, rounded
- **density**: comfortable, compact, spacious
- **animation**: gentle, brisk, none
- **custom**: brand, minimal, corporate

### Triggering Discovery

Discovery happens automatically when:
- ThemeToggle component mounts
- `getThemeCategories()` is called
- `discoverTokenFiles()` is called manually

```tsx
import { discoverTokenFiles } from '@shru/theme-toggle/themeDiscovery'

// Manually trigger discovery
const discovered = await discoverTokenFiles()
console.log('Discovered themes:', discovered)
```

## Best Practices

1. **Follow naming conventions**: Use lowercase, hyphenated names (e.g., `ocean-blue.json`)
2. **Include metadata**: Always include `name`, `icon`, and `description` in your theme files
3. **Use token references**: Reference palette colors instead of hardcoding values
4. **Test theme files**: Ensure JSON is valid and theme applies correctly
5. **Document custom themes**: Add comments or documentation for complex themes

## Troubleshooting

### Theme Not Appearing

1. **Check file location**: Must be in `public/tokens/themes/{category}/{name}.json`
2. **Verify JSON syntax**: Ensure valid JSON
3. **Check registration**: Call `registerTheme()` or `registerThemeFromFile()`
4. **Refresh discovery**: Call `discoverTokenFiles()` manually

### Theme Not Applying

1. **Check token references**: Ensure palette colors exist
2. **Verify file path**: Theme file must be accessible at `/tokens/themes/...`
3. **Check console**: Look for errors loading token files
4. **Validate structure**: Ensure theme data matches expected structure

## Examples

### Example 1: New Color Theme

```json
// public/tokens/themes/color/sunset.json
{
  "name": "Sunset",
  "icon": "🌅",
  "description": "Warm sunset colors",
  "color": {
    "primary": "{palette.orange.500}",
    "secondary": "{palette.pink.500}",
    "background": "{palette.orange.50}",
    "foreground": "{palette.orange.900}"
  }
}
```

Register:
```tsx
registerThemeFromFile('color', 'sunset', 'color/sunset.json')
```

### Example 2: New Category

```json
// public/tokens/themes/season/spring.json
{
  "name": "Spring",
  "icon": "🌸",
  "description": "Fresh spring theme",
  "color": {
    "primary": "{palette.green.400}",
    "accent": "{palette.pink.300}"
  }
}
```

Register:
```tsx
registerTheme('season', 'spring', {
  name: 'Spring',
  file: 'season/spring.json',
  icon: '🌸',
  description: 'Fresh spring theme'
})
```

## API Reference

### `registerTheme(category, themeId, metadata)`
Register a theme programmatically.

**Parameters:**
- `category` (string): Theme category
- `themeId` (string): Unique theme identifier
- `metadata` (object): Theme metadata
  - `name` (string): Display name
  - `file` (string): File path relative to `themes/`
  - `icon` (string, optional): Icon emoji
  - `description` (string, optional): Description

### `registerThemeFromFile(category, themeId, filePath)`
Register a theme by loading from a file.

**Parameters:**
- `category` (string): Theme category
- `themeId` (string): Unique theme identifier
- `filePath` (string): File path relative to `themes/` or absolute path

### `discoverTokenFiles()`
Scan for and register available theme files.

**Returns:** Promise<Array> - List of discovered themes

### `scanCategory(category)`
Scan a specific category for theme files.

**Parameters:**
- `category` (string): Category to scan

**Returns:** Promise<Array> - List of discovered themes in category

