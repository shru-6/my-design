import "@testing-library/jest-dom/vitest"

// This setup file runs for every test file, including src/ssr.test.tsx,
// which deliberately opts into the `node` environment (no window/document
// at all) to prove the SSR guards actually work. Everything below is
// jsdom-only, so skip it entirely when there's no `window` to patch.
const hasDom = typeof window !== "undefined"

// jsdom doesn't implement these — several overlay/navigation/data-viz
// components (Radix Slider, popovers, ResizeContainer, charts) touch them
// during mount. Stub the minimum needed to render without crashing.

if (hasDom && typeof window.matchMedia !== "function") {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

if (hasDom && typeof window.ResizeObserver === "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error jsdom has no ResizeObserver
  window.ResizeObserver = ResizeObserverStub
  // @ts-expect-error mirror on global for libs that read the global directly
  global.ResizeObserver = ResizeObserverStub
}

if (hasDom && typeof window.IntersectionObserver === "undefined") {
  class IntersectionObserverStub {
    root = null
    rootMargin = ""
    thresholds: number[] = []
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  // @ts-expect-error jsdom has no IntersectionObserver
  window.IntersectionObserver = IntersectionObserverStub
  // @ts-expect-error mirror on global
  global.IntersectionObserver = IntersectionObserverStub
}

if (hasDom && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

if (hasDom && !Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
}
if (hasDom && !Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {}
}
if (hasDom && !Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {}
}

// Radix primitives (Slider) read getBoundingClientRect for geometry — jsdom
// defaults to all-zero rects, which is fine for a "does it render" smoke test.
if (hasDom && !Element.prototype.getAnimations) {
  // @ts-expect-error jsdom has no Web Animations API
  Element.prototype.getAnimations = () => []
}
