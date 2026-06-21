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

export function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}
