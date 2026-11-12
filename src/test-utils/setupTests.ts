import "@testing-library/jest-dom/vitest"

// jsdom doesn't implement these — several overlay/navigation/data-viz
// components (Radix Slider, popovers, ResizeContainer, charts) touch them
// during mount. Stub the minimum needed to render without crashing.

if (typeof window.matchMedia !== "function") {
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

if (typeof window.ResizeObserver === "undefined") {
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

if (typeof window.IntersectionObserver === "undefined") {
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

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {}
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {}
}

// Radix primitives (Slider) read getBoundingClientRect for geometry — jsdom
// defaults to all-zero rects, which is fine for a "does it render" smoke test.
if (!Element.prototype.getAnimations) {
  // @ts-expect-error jsdom has no Web Animations API
  Element.prototype.getAnimations = () => []
}
