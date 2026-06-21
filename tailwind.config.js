import designPreset from "./scripts/tailwind.preset.cjs"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/shru-design-system/dist/**/*.{js,mjs}",
  ],
  presets: [designPreset],
}
