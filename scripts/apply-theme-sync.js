/**
 * Synchronous theme application script (optimized)
 * This script runs before React to prevent theme flash
 * Injected automatically by init script
 */

(function() {
  'use strict';
  
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // LocalStorage key for storing theme selections
  // NOTE: This is a standalone script injected into HTML, so it can't import
  // 
  // ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
  // 1. src/themes/useTheme.tsx - STORAGE_KEY constant (TypeScript source)
  // 2. src/themes/applyThemeSync.ts - STORAGE_KEY constant
  // 3. scripts/applyThemeSync.js - STORAGE_KEY constant
  const STORAGE_KEY = 'design-system-theme';
  
  // Default theme selections
  // NOTE: This is a standalone script injected into HTML, so it can't import
  // 
  // ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
  // 1. src/themes/themeUtils.ts - getDefaultThemes() function (TypeScript source)
  // 2. scripts/themeUtils.js - getDefaultThemes() function
  const DEFAULT_THEMES = {
    color: 'white',
    typography: 'sans',
    shape: 'smooth',
    density: 'comfortable',
    animation: 'gentle'
  };
  // Centralized theme category order
  // NOTE: This is a standalone script injected into HTML, so it can't import from themeConfig.js
  // Custom category is included but handled specially (optional, user-created files)
  // 
  // ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
  // 1. src/themes/themeConfig.ts - THEME_CATEGORY_ORDER (TypeScript source)
  // 2. scripts/themeConfig.js - THEME_CATEGORY_ORDER (JavaScript version)
  const THEME_CATEGORY_ORDER = ['color', 'typography', 'shape', 'density', 'animation', 'custom'];

  // Token base resolution (standalone script cannot import helpers)
  // Order: consumer override → env override → public fallback.
  function getTokenBaseCandidates() {
    var bases = [];
    if (typeof window !== 'undefined' && window.__THEME_TOKENS_BASE__) {
      bases.push(window.__THEME_TOKENS_BASE__);
    }
    if (typeof process !== 'undefined' && process.env && process.env.DESIGN_SYSTEM_TOKENS_BASE) {
      bases.push(process.env.DESIGN_SYSTEM_TOKENS_BASE);
    }
    bases.push('/tokens');
    return Array.from(new Set(bases.filter(Boolean)));
  }

  // Get theme from localStorage (optimized - single read)
  var selectedThemes = DEFAULT_THEMES;
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) selectedThemes = JSON.parse(stored);
  } catch (e) {}

  // Optimized helper functions
  function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  function deepMerge(target, source) {
    var output = {};
    for (var key in target) output[key] = target[key];
    if (isObject(target) && isObject(source)) {
      for (var key in source) {
        if (isObject(source[key])) {
          output[key] = (key in target && isObject(target[key])) 
            ? deepMerge(target[key], source[key])
            : source[key];
        } else {
          output[key] = source[key];
        }
      }
    }
    return output;
  }

  function loadJSONSync(relativePath, bases) {
    for (var i = 0; i < bases.length; i++) {
      var base = bases[i];
      try {
        var url = base.endsWith('/') ? base + relativePath : base + '/' + relativePath;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        
        // 404 means file doesn't exist - try next base
        if (xhr.status === 404) {
          continue;
        }
        
        if (xhr.status === 200 || xhr.status === 0) {
          var contentType = xhr.getResponseHeader('content-type');
          // Check if response is actually JSON (not HTML error page)
          if (contentType && contentType.includes('application/json')) {
            return JSON.parse(xhr.responseText);
          }
          // If not JSON (likely HTML error page), try next base
          continue;
        }
      } catch (e) {
        // Try next base
      }
    }
    return null;
  }

  function resolveValue(value, palette, resolved) {
    if (typeof value !== 'string') return value;
    var match = value.match(/^\{([^}]+)\}$/);
    if (!match) return value;
    var path = match[1].split('.');
    var current = { palette: palette };
    for (var key in resolved) current[key] = resolved[key];
    for (var i = 0; i < path.length; i++) {
      var key = path[i];
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return value;
      }
    }
    return typeof current === 'string' ? current : value;
  }

  function resolveReferences(tokens, palette) {
    var resolved = JSON.parse(JSON.stringify(tokens));
    function traverse(obj) {
      for (var key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        } else {
          obj[key] = resolveValue(obj[key], palette, resolved);
        }
      }
    }
    traverse(resolved);
    return resolved;
  }

  function hexToHSL(hex) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    var lPercent = Math.round(l * 100);
    return h + ' ' + s + '% ' + lPercent + '%';
  }

  function isHexColor(value) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
  }

  function flattenToCSS(tokens, prefix, result, isColorContext) {
    prefix = prefix || '';
    result = result || {};
    isColorContext = isColorContext || false;
    
    for (var key in tokens) {
      var value = tokens[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Special handling: color, typography, shape, animation, and density objects flatten without their category prefix
        var enteringColor = key === 'color' && prefix === '';
        var enteringTypography = key === 'typography' && prefix === '';
        var enteringShape = key === 'shape' && prefix === '';
        var enteringAnimation = key === 'animation' && prefix === '';
        var enteringDensity = key === 'spacing' && prefix === ''; // Density uses spacing key
        var inColorContext = isColorContext || enteringColor;
        
        if (enteringColor) {
          // When entering color object, flatten without "color-" prefix
          flattenToCSS(value, '', result, true);
        } else if (enteringTypography) {
          // When entering typography object, flatten without "typography-" prefix
          flattenToCSS(value, '', result, false);
        } else if (enteringShape) {
          // When entering shape object, flatten without "shape-" prefix
          flattenToCSS(value, '', result, false);
        } else if (enteringAnimation) {
          // When entering animation object, flatten without "animation-" prefix
          // animation.duration.fast → --duration-fast
          flattenToCSS(value, '', result, false);
        } else if (enteringDensity) {
          // When entering density/spacing object at root, we need to preserve "spacing-" prefix
          // spacing.component.md → --spacing-component-md
          flattenToCSS(value, 'spacing', result, false);
        } else if (inColorContext) {
          // Already in color context, continue with empty prefix
          flattenToCSS(value, '', result, true);
        } else {
          // For all other tokens, use simple prefix-based flattening
          // font.body → --font-body, radius.button → --radius-button, spacing.component.md → --spacing-component-md
          var newPrefix = prefix ? prefix + '-' + key : key;
          flattenToCSS(value, newPrefix, result, false);
        }
      } else {
        var cssKey;
        if (isColorContext || (prefix === '' && key === 'color')) {
          cssKey = '--' + key;
        } else if (prefix === '') {
          cssKey = '--' + key;
        } else {
          cssKey = '--' + prefix + '-' + key;
        }
        
        var finalValue = value;
        if (isColorContext && typeof value === 'string' && isHexColor(value)) {
          finalValue = hexToHSL(value);
        }
        
        result[cssKey] = finalValue;
      }
    }
    return result;
  }

  function mapToTailwindVars(cssVars) {
    // Start with all generated variables - they're all valid CSS variables
    var mapped = {};
    for (var key in cssVars) mapped[key] = cssVars[key];
    
    // Only add convenience mappings for Tailwind's expected variable names
    if (cssVars['--radius-button'] && !cssVars['--radius']) {
      mapped['--radius'] = cssVars['--radius-button'];
    }
    if (cssVars['--radius-card'] && !cssVars['--radius-lg']) {
      mapped['--radius-lg'] = cssVars['--radius-card'];
    }
    if (cssVars['--font-body'] && !cssVars['--font-sans']) {
      mapped['--font-sans'] = cssVars['--font-body'];
    }
    if (cssVars['--spacing-base'] && !cssVars['--spacing']) {
      mapped['--spacing'] = cssVars['--spacing-base'];
    } else if (cssVars['--spacing-component-md'] && !cssVars['--spacing']) {
      mapped['--spacing'] = cssVars['--spacing-component-md'];
    }
    
    return mapped;
  }

  // Apply theme synchronously (optimized)
  try {
    var tokenBases = getTokenBaseCandidates();
    var base = loadJSONSync('base.json', tokenBases);
    if (!base) return;

    var palettes = loadJSONSync('palettes.json', tokenBases);
    var palette = (palettes && palettes.palette) || {};
    var merged = deepMerge(base, { palette: palette });

    // Load theme files (includes custom category, optimized)
    for (var i = 0; i < THEME_CATEGORY_ORDER.length; i++) {
      var category = THEME_CATEGORY_ORDER[i];
      var themeId = selectedThemes[category];
      if (!themeId) continue;

      var themeData = loadJSONSync('themes/' + category + '/' + themeId + '.json', tokenBases);
      if (themeData) merged = deepMerge(merged, themeData);
      // If themeData is null, file doesn't exist - skip silently (custom themes are optional)
    }

    var resolved = resolveReferences(merged, palette);
    var cssVars = flattenToCSS(resolved);
    var mappedVars = mapToTailwindVars(cssVars);

    // Generate CSS efficiently
    var cssLines = [':root {'];
    for (var key in mappedVars) {
      cssLines.push('  ' + key + ': ' + mappedVars[key] + ';');
    }
    cssLines.push('}');
    var css = cssLines.join('\n');

    // Apply to DOM
    var styleTag = document.getElementById('dynamic-theme');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-theme';
    }
    // Always append (moves it to the end) so vars win over earlier styles
    document.head.appendChild(styleTag);
    styleTag.textContent = css;
  } catch (error) {
    // Silently fail - theme will apply via React hook
  }
})();
