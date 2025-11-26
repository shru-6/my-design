'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/components/ThemeToggle.tsx

// src/components/themeConfig.js
var themeCategories = {
  color: {
    name: "Color",
    order: 1,
    themes: {
      white: {
        name: "White",
        file: "color/white.json",
        icon: "\u{1F3A8}",
        description: "Light theme with white background"
      },
      dark: {
        name: "Dark",
        file: "color/dark.json",
        icon: "\u{1F319}",
        description: "Dark theme with dark background"
      }
    }
  },
  typography: {
    name: "Typography",
    order: 2,
    themes: {
      sans: {
        name: "Sans",
        file: "typography/sans.json",
        icon: "\u{1F4DD}",
        description: "Sans-serif font family"
      },
      serif: {
        name: "Serif",
        file: "typography/serif.json",
        icon: "\u{1F4D6}",
        description: "Serif font family"
      }
    }
  },
  shape: {
    name: "Shape",
    order: 3,
    themes: {
      smooth: {
        name: "Smooth",
        file: "shape/smooth.json",
        icon: "\u{1F532}",
        description: "Smooth rounded corners"
      },
      sharp: {
        name: "Sharp",
        file: "shape/sharp.json",
        icon: "\u2B1C",
        description: "Sharp square corners"
      }
    }
  },
  density: {
    name: "Density",
    order: 4,
    themes: {
      comfortable: {
        name: "Comfortable",
        file: "density/comfortable.json",
        icon: "\u{1F4CF}",
        description: "Comfortable spacing"
      },
      compact: {
        name: "Compact",
        file: "density/compact.json",
        icon: "\u{1F4D0}",
        description: "Compact spacing"
      }
    }
  },
  animation: {
    name: "Animation",
    order: 5,
    themes: {
      gentle: {
        name: "Gentle",
        file: "animation/gentle.json",
        icon: "\u2728",
        description: "Gentle animations"
      },
      brisk: {
        name: "Brisk",
        file: "animation/brisk.json",
        icon: "\u26A1",
        description: "Fast, brisk animations"
      }
    }
  },
  custom: {
    name: "Custom",
    order: 10,
    // Highest priority
    themes: {
      brand: {
        name: "Brand",
        file: "custom/brand.json",
        icon: "\u{1F3AF}",
        description: "Brand-specific theme"
      },
      minimal: {
        name: "Minimal",
        file: "custom/minimal.json",
        icon: "\u{1F3AA}",
        description: "Minimal theme"
      }
    }
  }
};

// src/components/themeUtils.js
function getThemeName(selectedThemes) {
  const parts = [];
  if (selectedThemes.color) parts.push(selectedThemes.color);
  if (selectedThemes.typography) parts.push(selectedThemes.typography);
  if (selectedThemes.shape) parts.push(selectedThemes.shape);
  if (selectedThemes.density) parts.push(selectedThemes.density);
  if (selectedThemes.animation) parts.push(selectedThemes.animation);
  return parts.length > 0 ? parts.join("-") : "default";
}
function validateThemeSelection(selectedThemes, themeCategories2) {
  const errors = [];
  for (const [category, themeId] of Object.entries(selectedThemes)) {
    if (!themeId) continue;
    const categoryConfig = themeCategories2[category];
    if (!categoryConfig) {
      errors.push(`Unknown category: ${category}`);
      continue;
    }
    const theme = categoryConfig.themes[themeId];
    if (!theme) {
      errors.push(`Theme ${themeId} not found in category ${category}`);
    }
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
function getDefaultThemes() {
  return {
    color: "white",
    typography: "sans",
    shape: "smooth",
    density: "comfortable",
    animation: "gentle"
  };
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
var tokenCache = /* @__PURE__ */ new Map();
function getTokenBaseUrl() {
  if (typeof window !== "undefined" && window.__THEME_TOKENS_BASE__) {
    return window.__THEME_TOKENS_BASE__;
  }
  return "/tokens";
}
async function loadTokenFile(path) {
  if (tokenCache.has(path)) {
    return deepClone(tokenCache.get(path));
  }
  try {
    const baseUrl = getTokenBaseUrl();
    const fullPath = path.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
    const response = await fetch(fullPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${fullPath}: ${response.statusText}`);
    }
    const data = await response.json();
    tokenCache.set(path, data);
    return deepClone(data);
  } catch (error) {
    console.error(`Error loading token file ${path}:`, error);
    throw error;
  }
}
function resolveReferences(tokens, palette) {
  const resolved = JSON.parse(JSON.stringify(tokens));
  function resolveValue(value) {
    if (typeof value !== "string") return value;
    const match = value.match(/^\{([^}]+)\}$/);
    if (!match) return value;
    const path = match[1].split(".");
    let current = { palette, ...resolved };
    for (const key of path) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        console.warn(`Token reference not found: {${match[1]}}`);
        return value;
      }
    }
    return typeof current === "string" ? current : value;
  }
  function traverse(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        traverse(obj[key]);
      } else {
        obj[key] = resolveValue(obj[key]);
      }
    }
  }
  traverse(resolved);
  return resolved;
}
function flattenToCSS(tokens, prefix = "", result = {}, isColorContext = false) {
  for (const key in tokens) {
    const value = tokens[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const enteringColor = key === "color" && prefix === "";
      if (enteringColor) {
        flattenToCSS(value, "", result, true);
      } else if (isColorContext) {
        flattenToCSS(value, "", result, true);
      } else {
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        flattenToCSS(value, newPrefix, result, false);
      }
    } else {
      let cssKey;
      if (isColorContext || prefix === "" && key === "color") {
        cssKey = `--${key}`;
      } else if (prefix === "") {
        cssKey = `--${key}`;
      } else {
        cssKey = `--${prefix}-${key}`;
      }
      result[cssKey] = value;
    }
  }
  return result;
}
function mapToTailwindVars(cssVars) {
  const mapped = { ...cssVars };
  if (cssVars["--radius-button"]) {
    mapped["--radius"] = cssVars["--radius-button"];
  }
  if (cssVars["--radius-card"]) {
    mapped["--radius-lg"] = cssVars["--radius-card"];
  }
  if (cssVars["--font-body"]) {
    mapped["--font-sans"] = cssVars["--font-body"];
  }
  if (cssVars["--spacing-base"]) {
    mapped["--spacing"] = cssVars["--spacing-base"];
  } else if (cssVars["--spacing-component-md"]) {
    mapped["--spacing"] = cssVars["--spacing-component-md"];
  }
  return mapped;
}
function generateCSSString(cssVars) {
  const mappedVars = mapToTailwindVars(cssVars);
  const vars = Object.entries(mappedVars).map(([key, value]) => `  ${key}: ${value};`).join("\n");
  return `:root {
${vars}
}`;
}
function applyThemeCSS(css) {
  let styleTag = document.getElementById("dynamic-theme");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "dynamic-theme";
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = css;
}
async function generateAndApplyTheme(selectedThemes = {}) {
  try {
    const validation = validateThemeSelection(selectedThemes, themeCategories);
    if (!validation.valid) {
      console.error("Invalid theme selection:", validation.errors);
      throw new Error(`Invalid theme selection: ${validation.errors.join(", ")}`);
    }
    const base = await loadTokenFile("base.json");
    const palettes = await loadTokenFile("palettes.json");
    const palette = palettes.palette;
    let merged = deepMerge(base, { palette });
    const categoryOrder = Object.values(themeCategories).sort((a, b) => a.order - b.order).map((cat) => cat.name.toLowerCase());
    for (const category of categoryOrder) {
      if (category === "custom") continue;
      const themeId = selectedThemes[category];
      if (!themeId) continue;
      const themePath = `themes/${category}/${themeId}.json`;
      const themeData = await loadTokenFile(themePath);
      merged = deepMerge(merged, themeData);
    }
    if (selectedThemes.custom) {
      const customPath = `themes/custom/${selectedThemes.custom}.json`;
      const customData = await loadTokenFile(customPath);
      merged = deepMerge(merged, customData);
    }
    const resolved = resolveReferences(merged, palette);
    const cssVars = flattenToCSS(resolved);
    const css = generateCSSString(cssVars);
    if (typeof document !== "undefined") {
      applyThemeCSS(css);
    }
    return {
      success: true,
      themeName: getThemeName(selectedThemes),
      cssVars
    };
  } catch (error) {
    console.error("Error generating theme:", error);
    throw error;
  }
}

// src/components/useTheme.tsx
var STORAGE_KEY = "design-system-theme";
function useTheme() {
  const [selectedThemes, setSelectedThemes] = react.useState(getDefaultThemes());
  const [isLoading, setIsLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  const applyTheme = react.useCallback(async (themes) => {
    setIsLoading(true);
    setError(null);
    try {
      await generateAndApplyTheme(themes);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to apply theme";
      setError(errorMessage);
      console.error("Theme application error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  react.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSelectedThemes(parsed);
          applyTheme(parsed);
        } catch {
          const defaults = getDefaultThemes();
          setSelectedThemes(defaults);
          applyTheme(defaults);
        }
      } else {
        const defaults = getDefaultThemes();
        applyTheme(defaults);
      }
    }
  }, [applyTheme]);
  const updateTheme = react.useCallback(async (category, themeId) => {
    const newThemes = {
      ...selectedThemes,
      [category]: themeId || void 0
    };
    setSelectedThemes(newThemes);
    await applyTheme(newThemes);
  }, [selectedThemes, applyTheme]);
  const resetToDefaults = react.useCallback(async () => {
    const defaults = getDefaultThemes();
    setSelectedThemes(defaults);
    await applyTheme(defaults);
  }, [applyTheme]);
  const getAvailableThemes = react.useCallback((category) => {
    return themeCategories[category]?.themes || {};
  }, []);
  return {
    selectedThemes,
    updateTheme,
    resetToDefaults,
    isLoading,
    error,
    getAvailableThemes
  };
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
var categoryIcons = {
  color: "\u{1F3A8}",
  typography: "\u{1F4DD}",
  shape: "\u{1F532}",
  density: "\u{1F4CF}",
  animation: "\u2728"
};
function getPositionOnArc(angleDeg, radius) {
  const rad = angleDeg * Math.PI / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius
  };
}
function ThemeToggle({
  className,
  position = "bottom-right"
}) {
  const { selectedThemes, updateTheme, isLoading, getAvailableThemes } = useTheme();
  const [isOpen, setIsOpen] = react.useState(false);
  const [selectedCategory, setSelectedCategory] = react.useState(null);
  const menuRef = react.useRef(null);
  react.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedCategory(null);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);
  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };
  const handleThemeSelect = async (category, themeId) => {
    const currentTheme = selectedThemes[category];
    const newTheme = currentTheme === themeId ? void 0 : themeId;
    await updateTheme(category, newTheme);
  };
  const handleBack = () => {
    setSelectedCategory(null);
  };
  const categories = Object.entries(themeCategories).filter(([key]) => key !== "custom").sort(([, a], [, b]) => a.order - b.order);
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6"
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: menuRef,
      className: cn("fixed z-50", positionClasses[position], className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            onClick: () => {
              setIsOpen(!isOpen);
              if (!isOpen) {
                setSelectedCategory(null);
              }
            },
            className: cn(
              "w-14 h-14 rounded-full bg-primary text-primary-foreground",
              "shadow-lg hover:shadow-xl transition-all duration-300",
              "flex items-center justify-center",
              "hover:scale-110 active:scale-95",
              isOpen && "rotate-90"
            ),
            "aria-label": "Theme settings",
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "transition-transform duration-300",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.15l.22.38a2 2 0 0 1 0 2.73l-.22.38a2 2 0 0 0 2.15 2.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.15l-.22-.38a2 2 0 0 1 0-2.73l.22-.38a2 2 0 0 0-2.15-2.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
                  /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "3" })
                ]
              }
            )
          }
        ),
        isOpen && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 pointer-events-none", children: !selectedCategory ? /* @__PURE__ */ jsxRuntime.jsx(
          CategoryRing,
          {
            categories,
            onCategoryClick: handleCategoryClick,
            selectedThemes
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx(
          ThemeRing,
          {
            category: selectedCategory,
            themes: getAvailableThemes(selectedCategory),
            selectedTheme: selectedThemes[selectedCategory],
            onThemeSelect: (themeId) => handleThemeSelect(selectedCategory, themeId),
            onBack: handleBack,
            isLoading
          }
        ) })
      ]
    }
  );
}
function CategoryRing({
  categories,
  onCategoryClick,
  selectedThemes
}) {
  const radius = 65;
  const startAngle = -90;
  const totalItems = categories.length;
  const angleStep = 90 / (totalItems + 0.5);
  const buttonSize = 40;
  const svgSize = (radius + buttonSize / 2) * 2;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute inset-0 animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "svg",
      {
        className: "absolute pointer-events-none opacity-20",
        width: svgSize,
        height: svgSize,
        style: {
          left: `-${svgSize / 2}px`,
          top: `-${svgSize / 2}px`
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            d: `M ${svgSize / 2} ${svgSize / 2 - radius} A ${radius} ${radius} 0 0 1 ${svgSize / 2 + radius} ${svgSize / 2}`,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeDasharray: "4 4",
            className: "text-foreground"
          }
        )
      }
    ),
    categories.map(([categoryKey, category], index) => {
      const angle = startAngle + angleStep * (index + 0.75);
      const pos = getPositionOnArc(angle, radius);
      const hasSelection = selectedThemes[categoryKey];
      return /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          onClick: () => onCategoryClick(categoryKey),
          className: cn(
            "absolute rounded-full",
            "bg-background border-2 shadow-lg",
            "flex items-center justify-center text-lg",
            "pointer-events-auto",
            "transition-all duration-200",
            "animate-in fade-in zoom-in-95",
            hasSelection ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:scale-110"
          ),
          style: {
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `translate(-50%, -50%)`,
            animationDelay: `${index * 50}ms`
          },
          "aria-label": category.name,
          title: category.name,
          children: categoryIcons[categoryKey] || "\u2699\uFE0F"
        },
        categoryKey
      );
    })
  ] });
}
function ThemeRing({
  category,
  themes,
  selectedTheme,
  onThemeSelect,
  onBack,
  isLoading
}) {
  const themeEntries = Object.entries(themes);
  const radius = 65;
  const startAngle = -90;
  const totalItems = themeEntries.length;
  const angleStep = 90 / (totalItems + 1.5);
  const buttonSize = 40;
  const backButtonSize = 36;
  const svgSize = (radius + buttonSize / 2) * 2;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute inset-0 animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "svg",
      {
        className: "absolute pointer-events-none opacity-20",
        width: svgSize,
        height: svgSize,
        style: {
          left: `-${svgSize / 2}px`,
          top: `-${svgSize / 2}px`
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            d: `M ${svgSize / 2} ${svgSize / 2 - radius} A ${radius} ${radius} 0 0 1 ${svgSize / 2 + radius} ${svgSize / 2}`,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeDasharray: "4 4",
            className: "text-foreground"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        onClick: onBack,
        className: cn(
          "absolute rounded-full",
          "bg-muted border border-border shadow-md",
          "flex items-center justify-center",
          "pointer-events-auto",
          "transition-all duration-200 hover:scale-110 active:scale-95",
          "animate-in fade-in zoom-in-95"
        ),
        style: {
          width: `${backButtonSize}px`,
          height: `${backButtonSize}px`,
          left: `${getPositionOnArc(startAngle, radius).x}px`,
          top: `${getPositionOnArc(startAngle, radius).y}px`,
          transform: `translate(-50%, -50%)`
        },
        "aria-label": "Back",
        title: "Back",
        children: /* @__PURE__ */ jsxRuntime.jsxs(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m12 19-7-7 7-7" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19 12H5" })
            ]
          }
        )
      }
    ),
    themeEntries.map(([themeId, theme], index) => {
      const itemIndex = index + 1;
      const angle = startAngle + angleStep * (itemIndex + 0.25);
      const pos = getPositionOnArc(angle, radius);
      const isSelected = selectedTheme === themeId;
      return /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          onClick: () => !isLoading && onThemeSelect(themeId),
          disabled: isLoading,
          className: cn(
            "absolute rounded-full",
            "bg-background border-2 shadow-lg",
            "flex items-center justify-center text-base",
            "pointer-events-auto",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "animate-in fade-in zoom-in-95",
            isSelected ? "border-primary bg-primary text-primary-foreground scale-110" : "border-border hover:border-primary/50 hover:scale-110"
          ),
          style: {
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `translate(-50%, -50%)`,
            animationDelay: `${index * 50}ms`
          },
          "aria-label": theme.name,
          title: theme.name,
          children: theme.icon
        },
        themeId
      );
    }),
    isLoading && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "absolute w-12 h-12 rounded-full bg-primary/20 border-2 border-primary animate-pulse pointer-events-none",
        style: {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }
      }
    )
  ] });
}

exports.ThemeToggle = ThemeToggle;
exports.useTheme = useTheme;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map