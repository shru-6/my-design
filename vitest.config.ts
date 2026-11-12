import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// Separate from tsup.config.ts on purpose — this only configures the test
// runner (jsdom + React Testing Library) and must never influence the
// publishable build. See docs/build/CONTRIBUTING.md for repo conventions.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-utils/setupTests.ts"],
    css: false,
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "dist", "test"],
    restoreMocks: true,
  },
})
