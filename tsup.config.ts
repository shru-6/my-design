import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  tsconfig: "src/tsconfig.json",
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".css": "text",
    }
  },
})

