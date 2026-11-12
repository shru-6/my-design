import { createRequire } from "module"
import tsParser from "@typescript-eslint/parser"
import reactHooks from "eslint-plugin-react-hooks"

const require = createRequire(import.meta.url)
const {
  RAW_COLOR_RE,
  DARK_PREFIX_RE,
  RAW_RGBA_RE,
  RAW_RADIUS_RE,
  RAW_DURATION_RE,
  RAW_ZINDEX_RE,
} = require("./scripts/lib/rawColorPattern.cjs")

/**
 * Flags the same raw-utility patterns scripts/dev/check.js catches at build
 * time — but live, in the editor. Both read the same
 * scripts/lib/rawColorPattern.cjs, so the rule can't drift from the check.
 */
const TOKEN_CHECKS = [
  { re: RAW_COLOR_RE, message: (m) => `Raw Tailwind color "${m}" — use a semantic token from src/tokens/base.json instead.` },
  { re: DARK_PREFIX_RE, message: () => `"dark:" prefix found — theme via tokens, not Tailwind dark mode.` },
  { re: RAW_RGBA_RE, message: (m) => `Raw color function "${m}" — use a semantic token instead.` },
  { re: RAW_RADIUS_RE, message: (m) => `Raw radius "${m}" — use rounded-control-*/rounded-surface-*/rounded-pill instead.` },
  { re: RAW_DURATION_RE, message: (m) => `Raw duration "${m}" — use duration-fast/normal/slow instead.` },
  { re: RAW_ZINDEX_RE, message: (m) => `Raw z-index "${m}" — use the z-sticky/dropdown/overlay/modal/toast classes instead.` },
]

const noRawTailwindColor = {
  meta: { type: "problem" },
  create(context) {
    function check(node, value) {
      if (typeof value !== "string") return

      for (const { re, message } of TOKEN_CHECKS) {
        re.lastIndex = 0
        const match = re.exec(value)
        if (match) {
          context.report({ node, message: message(match[0]) })
        }
      }
    }

    return {
      Literal(node) {
        check(node, node.value)
      },
      TemplateElement(node) {
        check(node, node.value.raw)
      },
    }
  },
}

export default [
  {
    ignores: ["src/**/*.test.{ts,tsx}", "src/test-utils/**"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { local: { rules: { "no-raw-tailwind-color": noRawTailwindColor } } },
    rules: { "local/no-raw-tailwind-color": "error" },
  },
]
