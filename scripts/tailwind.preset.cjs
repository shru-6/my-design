/**
 * Shared Tailwind preset for shru-design-system.
 * Used by: root tailwind.config.js, test/tailwind.config.js, consumer apps (via init).
 *
 * Update this file only — do not duplicate token mappings elsewhere.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        skeleton: "hsl(var(--skeleton))",
        success: {
          DEFAULT: "hsl(var(--success, 142 76% 36%))",
          foreground: "hsl(var(--success-foreground, 0 0% 100%))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning, 38 92% 50%))",
          foreground: "hsl(var(--warning-foreground, 0 0% 100%))",
        },
        info: {
          DEFAULT: "hsl(var(--info, 199 89% 48%))",
          foreground: "hsl(var(--info-foreground, 0 0% 100%))",
        },
        "surface-muted": "hsl(var(--surface-muted, var(--muted)))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "surface-1": "hsl(var(--surface-1, var(--card)))",
        "surface-2": "hsl(var(--surface-2, var(--muted)))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        "component-xs": "var(--spacing-component-xs, 0.25rem)",
        "component-sm": "var(--spacing-component-sm, 0.5rem)",
        "component-md": "var(--spacing-component-md, 1rem)",
        "component-lg": "var(--spacing-component-lg, 1.5rem)",
        "component-xl": "var(--spacing-component-xl, 2rem)",
      },
      gap: {
        "component-xs": "var(--spacing-component-xs, 0.25rem)",
        "component-sm": "var(--spacing-component-sm, 0.5rem)",
        "component-md": "var(--spacing-component-md, 1rem)",
        "component-lg": "var(--spacing-component-lg, 1.5rem)",
        "component-xl": "var(--spacing-component-xl, 2rem)",
      },
      transitionDuration: {
        fast: "var(--duration-fast, 150ms)",
        normal: "var(--duration-normal, 300ms)",
        slow: "var(--duration-slow, 500ms)",
      },
      keyframes: {
        "progress-indeterminate": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(450%)" },
        },
      },
      animation: {
        "progress-indeterminate": "progress-indeterminate 1.35s ease-in-out infinite",
      },
      zIndex: {
        sticky: "var(--z-sticky, 10)",
        dropdown: "var(--z-dropdown, 20)",
        overlay: "var(--z-overlay, 40)",
        modal: "var(--z-modal, 50)",
        toast: "var(--z-toast, 60)",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-skeleton",
    "bg-card",
    "text-card-foreground",
    "animate-progress-indeterminate",
    "z-sticky",
    "z-dropdown",
    "z-overlay",
    "z-modal",
    "z-toast",
  ],
}
