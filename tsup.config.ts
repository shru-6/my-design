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
})
