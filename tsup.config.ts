import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    // Externalize all peer dependencies to avoid bundling issues
    /^@radix-ui\/.*/,
    /^react-hook-form$/,
    /^class-variance-authority$/,
    /^clsx$/,
    /^cmdk$/,
    /^embla-carousel-react$/,
    /^input-otp$/,
    /^lucide-react$/,
    /^react-day-picker$/,
    /^react-resizable-panels$/,
    /^recharts$/,
    /^sonner$/,
    /^tailwind-merge$/,
    /^vaul$/,
    /^zod$/,
  ],
  treeshake: true,
  tsconfig: "./tsconfig.json",
})
