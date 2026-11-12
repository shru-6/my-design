export type ChartDatum = Record<string, unknown>

export function readKey(row: ChartDatum, key?: string): string | number {
  if (!key) return ""
  const value = row[key]
  if (typeof value === "number" || typeof value === "string") return value
  return String(value ?? "")
}

export function readNumber(row: ChartDatum, key?: string): number {
  const value = readKey(row, key)
  return typeof value === "number" ? value : Number(value) || 0
}

export function maxOf(data: ChartDatum[], key: string): number {
  return data.reduce((max, row) => Math.max(max, readNumber(row, key)), 0)
}

export function sumOf(data: ChartDatum[], key: string): number {
  return data.reduce((sum, row) => sum + readNumber(row, key), 0)
}

export const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--info))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
]

export function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export type ChartPoint = { x: number; y: number }

export type LineCurve = "linear" | "monotone" | "step"

/**
 * Monotone cubic (Fritsch–Carlson) tangents for x-ordered points. Used so
 * `curve="monotone"` smooths the line without overshooting past a data point,
 * which is what makes an overshooting spline misleading on a value series.
 */
function monotoneTangents(points: ChartPoint[]): number[] {
  const n = points.length
  const slopes: number[] = []
  for (let i = 0; i < n - 1; i += 1) {
    const dx = points[i + 1].x - points[i].x
    slopes.push(dx === 0 ? 0 : (points[i + 1].y - points[i].y) / dx)
  }

  const m: number[] = new Array(n).fill(0)
  m[0] = slopes[0] ?? 0
  m[n - 1] = slopes[n - 2] ?? 0
  for (let i = 1; i < n - 1; i += 1) {
    m[i] = slopes[i - 1] * slopes[i] <= 0 ? 0 : (slopes[i - 1] + slopes[i]) / 2
  }

  for (let i = 0; i < n - 1; i += 1) {
    if (slopes[i] === 0) {
      m[i] = 0
      m[i + 1] = 0
      continue
    }
    const a = m[i] / slopes[i]
    const b = m[i + 1] / slopes[i]
    const s = a * a + b * b
    if (s > 9) {
      const t = 3 / Math.sqrt(s)
      m[i] = t * a * slopes[i]
      m[i + 1] = t * b * slopes[i]
    }
  }
  return m
}

/** The `d` of the series line itself (no fill, no closing segment). */
export function buildLinePath(points: ChartPoint[], curve: LineCurve = "linear"): string {
  if (points.length === 0) return ""
  const head = `M ${points[0].x} ${points[0].y}`
  if (points.length === 1) return head

  if (curve === "step") {
    return points
      .slice(1)
      .reduce((d, p) => `${d} H ${p.x} V ${p.y}`, head)
  }

  if (curve === "monotone") {
    const m = monotoneTangents(points)
    let d = head
    for (let i = 0; i < points.length - 1; i += 1) {
      const dx = (points[i + 1].x - points[i].x) / 3
      const c1x = points[i].x + dx
      const c1y = points[i].y + m[i] * dx
      const c2x = points[i + 1].x - dx
      const c2y = points[i + 1].y - m[i + 1] * dx
      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${points[i + 1].x} ${points[i + 1].y}`
    }
    return d
  }

  return points.slice(1).reduce((d, p) => `${d} L ${p.x} ${p.y}`, head)
}

/** The line path closed down to `baselineY` so it can be filled as an area. */
export function buildAreaPath(points: ChartPoint[], baselineY: number, curve: LineCurve = "linear"): string {
  if (points.length === 0) return ""
  const line = buildLinePath(points, curve)
  const last = points[points.length - 1]
  const first = points[0]
  return `${line} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`
}

export function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}
