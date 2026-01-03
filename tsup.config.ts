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
    "@radix-ui/react-checkbox",
    "@radix-ui/react-label",
    "@radix-ui/react-separator",
  ],
  treeshake: true,
  tsconfig: "./tsconfig.json",
})
