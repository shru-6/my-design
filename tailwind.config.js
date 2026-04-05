/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/shru-design-system/dist/**/*.{js,mjs}",
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
        // destructive: {
        //   DEFAULT: "hsl(var(--destructive))",
        //   foreground: "hsl(var(--destructive-foreground))",
        // },
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
        // Semantic status colors – theme can override via --success, --warning, --info
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
      // ⚠️ IF YOU UPDATE gap CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - gap config (test app)
      gap: {
        'component-xs': "var(--spacing-component-xs, 0.25rem)",
        'component-sm': "var(--spacing-component-sm, 0.5rem)",
        'component-md': "var(--spacing-component-md, 1rem)",
        'component-lg': "var(--spacing-component-lg, 1.5rem)",
        'component-xl': "var(--spacing-component-xl, 2rem)",
      },
      // ⚠️ IF YOU UPDATE transitionDuration CONFIG, ALSO UPDATE:
      // 1. test/tailwind.config.js - transitionDuration config (test app)
      transitionDuration: {
        'fast': "var(--duration-fast, 150ms)",
        'normal': "var(--duration-normal, 300ms)",
        'slow': "var(--duration-slow, 500ms)",
      },
    },
  },
  plugins: [],
  safelist: [
    // Ensure these classes are always generated (used in CVA strings)
    "bg-skeleton",
    "bg-card",
    "text-card-foreground",
  ],
}
