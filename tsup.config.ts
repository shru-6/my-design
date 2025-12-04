import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // Bundle the code but keep all dependencies external
  // This prevents dynamic requires and ensures Turbopack compatibility
  external: [
    // React core
    "react",
    "react-dom",
    "react/jsx-runtime",
    // Common utility libraries
    "clsx",
    "class-variance-authority",
    "tailwind-merge",
    // Radix UI (all packages)
    /^@radix-ui\/.*/,
    // Other common dependencies
    "lucide-react",
    "input-otp",
    "cmdk",
    "react-day-picker",
    "react-hook-form",
    "vaul",
    "embla-carousel-react",
    "next-themes",
    "sonner",
    "recharts",
    "react-resizable-panels",
    // Externalize all node_modules (fallback pattern)
    /^[^./]|^\.[^./]|^\.\.[^/]/,
  ],
  treeshake: true,
  tsconfig: "src/tsconfig.json",
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".css": "text",
    }
  },
})

