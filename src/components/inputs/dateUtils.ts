export type DateRangeValue = { from: Date | null; to: Date | null }

export function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function addDays(date: Date, amount: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime()
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime()
}

export function isBetweenDays(date: Date, from: Date, to: Date): boolean {
  const t = startOfDay(date).getTime()
  return t >= startOfDay(from).getTime() && t <= startOfDay(to).getTime()
}

/** Calendar-day span between two dates, inclusive of both endpoints. */
export function rangeLengthDays(from: Date, to: Date): number {
  const start = isBeforeDay(from, to) ? startOfDay(from) : startOfDay(to)
  const end = isBeforeDay(from, to) ? startOfDay(to) : startOfDay(from)
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.round((end.getTime() - start.getTime()) / msPerDay) + 1
}

export function isRangeWithinLimits(
  range: DateRangeValue,
  limits?: {
    minDate?: Date
    maxDate?: Date
    minRangeDays?: number
    maxRangeDays?: number
  }
): boolean {
  if (!range.from || !range.to) return false
  const from = startOfDay(range.from)
  const to = startOfDay(range.to)
  if (limits?.minDate && isBeforeDay(from, limits.minDate)) return false
  if (limits?.maxDate && isAfterDay(to, limits.maxDate)) return false
  if (limits?.minDate && isBeforeDay(to, limits.minDate)) return false
  if (limits?.maxDate && isAfterDay(from, limits.maxDate)) return false
  const len = rangeLengthDays(from, to)
  if (limits?.minRangeDays != null && len < limits.minRangeDays) return false
  if (limits?.maxRangeDays != null && len > limits.maxRangeDays) return false
  return true
}

export function formatDate(date: Date, format = "PP"): string {
  if (format === "PP") {
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
  }
  if (format === "P") {
    return date.toLocaleDateString()
  }
  return date.toLocaleDateString()
}

export function formatDateRange(range: DateRangeValue, format = "PP"): string {
  if (!range.from && !range.to) return ""
  if (range.from && !range.to) return formatDate(range.from, format)
  if (range.from && range.to) return `${formatDate(range.from, format)} – ${formatDate(range.to, format)}`
  return ""
}

export function parseDateInput(value: string): Date | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const parsed = new Date(trimmed)
  return Number.isNaN(parsed.getTime()) ? null : startOfDay(parsed)
}

export function formatTime(date: Date, format: "12h" | "24h" = "24h"): string {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  if (format === "24h") {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
  }
  const period = hours >= 12 ? "PM" : "AM"
  const h12 = hours % 12 || 12
  return `${h12}:${String(minutes).padStart(2, "0")} ${period}`
}

export function parseTimeInput(value: string, format: "12h" | "24h" = "24h"): Date | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const match24 = trimmed.match(/^(\d{1,2}):(\d{2})$/)
  if (match24 && format === "24h") {
    const h = Number(match24[1])
    const m = Number(match24[2])
    if (h >= 0 && h < 24 && m >= 0 && m < 60) {
      const d = new Date()
      d.setHours(h, m, 0, 0)
      return d
    }
  }
  const match12 = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (match12) {
    let h = Number(match12[1]) % 12
    const m = Number(match12[2])
    if (match12[3].toUpperCase() === "PM") h += 12
    const d = new Date()
    d.setHours(h, m, 0, 0)
    return d
  }
  return null
}

export function getCalendarDays(month: Date, weekStartsOn = 0): Date[] {
  const start = startOfMonth(month)
  const end = endOfMonth(month)
  const days: Date[] = []
  const startOffset = (start.getDay() - weekStartsOn + 7) % 7
  const gridStart = addDays(start, -startOffset)
  const endOffset = (weekStartsOn + 6 - end.getDay() + 7) % 7
  const gridEnd = addDays(end, endOffset)
  let cursor = gridStart
  while (cursor.getTime() <= gridEnd.getTime()) {
    days.push(new Date(cursor))
    cursor = addDays(cursor, 1)
  }
  return days
}

export function clampDate(date: Date, minDate?: Date, maxDate?: Date): Date {
  if (minDate && isBeforeDay(date, minDate)) return startOfDay(minDate)
  if (maxDate && isAfterDay(date, maxDate)) return startOfDay(maxDate)
  return startOfDay(date)
}
