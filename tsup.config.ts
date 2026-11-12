import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: false,
    // Both configs in this array build concurrently — cleaning here as well
    // races the other config's output. The npm `build` script clears dist/
    // once, up front, instead.
    clean: false,
    external: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "@radix-ui/react-slider",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
      "input-otp",
      "react-resizable-panels",
    ],
    treeshake: true,
    tsconfig: "./tsconfig.json",
  },
  {
    // Standalone, self-invoking bundle of applyThemeSync() — no React, no
    // externals. Meant to be inlined into a next/script `beforeInteractive`
    // tag (or any pre-hydration <script>) so it runs before first paint.
    entry: { "apply-theme-sync": "src/themes/applyThemeSync.standalone.ts" },
    format: ["iife"],
    dts: false,
    minify: true,
    splitting: false,
    sourcemap: false,
    clean: false,
    treeshake: true,
    tsconfig: "./tsconfig.json",
  },
])
