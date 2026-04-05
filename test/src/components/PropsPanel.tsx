import { useState } from "react"
import { ComponentMetadata, PropDefinition } from '../utils/componentMetadata'

interface PropsPanelProps {
  metadata: ComponentMetadata
  props: Record<string, any>
  onPropsChange: (props: Record<string, any>) => void
}

export function PropsPanel({ metadata, props, onPropsChange }: PropsPanelProps) {
  const [arrayDrafts, setArrayDrafts] = useState<Record<string, string>>({})

  const updateProp = (name: string, value: any) => {
    onPropsChange({ ...props, [name]: value })
  }

  const parseArrayInput = (raw: string): any[] | null => {
    const trimmed = raw.trim()
    if (!trimmed) return []

    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return parsed
    } catch {
      // fall through
    }

    try {
      // Allow JS-like arrays e.g. [{ label: 'A', value: 'a' }]
      const parsed = Function(`"use strict"; return (${trimmed});`)()
      if (Array.isArray(parsed)) return parsed
    } catch {
      // fall through
    }

    return null
  }

  const renderPropControl = (prop: PropDefinition) => {
    const value = props[prop.name] ?? metadata.defaultProps?.[prop.name] ?? prop.defaultValue
    const numericValue = typeof value === 'number' ? value : Number(value ?? 0)

    const controlClassName =
      'w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground'

    switch (prop.type) {
      case 'variant':
      case 'size':
      case 'select':
        return (
          <select
            className={controlClassName}
            value={value || ''}
            onChange={(e) => updateProp(prop.name, e.target.value)}
          >
            <option value="" disabled>{`Select ${prop.name}...`}</option>
            {prop.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'boolean':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="text-foreground">
            <input type="checkbox" checked={!!value} onChange={(e) => updateProp(prop.name, e.target.checked)} />
            <label>{prop.name}</label>
          </div>
        )

      case 'string':
        return (
          <input
            className={controlClassName}
            type="text"
            value={value || ''}
            onChange={(e) => updateProp(prop.name, e.target.value)}
            placeholder={prop.description || `Enter ${prop.name}...`}
          />
        )

      case 'expression':
        return (
          <textarea
            className={controlClassName}
            rows={4}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => updateProp(prop.name, e.target.value)}
            placeholder={prop.description || `Expression for ${prop.name}={...}`}
            spellCheck={false}
          />
        )

      case 'number':
        return (
          <input
            className={controlClassName}
            type="number"
            value={value ?? ''}
            onChange={(e) => updateProp(prop.name, e.target.value ? Number(e.target.value) : undefined)}
            placeholder={prop.description || `Enter ${prop.name}...`}
          />
        )

      case 'counter':
        return (
          <div className="flex items-center gap-2">
            <button
              className="rounded-md border border-border bg-background px-3 py-1 text-foreground"
              onClick={() => updateProp(prop.name, Math.max(0, numericValue - 1))}
            >
              -
            </button>
            <input
              className={controlClassName}
              type="number"
              value={Number.isNaN(numericValue) ? 0 : numericValue}
              onChange={(e) => updateProp(prop.name, e.target.value ? Math.max(0, Number(e.target.value)) : 0)}
              placeholder={prop.description || `Enter ${prop.name}...`}
            />
            <button
              className="rounded-md border border-border bg-background px-3 py-1 text-foreground"
              onClick={() => updateProp(prop.name, Math.max(0, numericValue + 1))}
            >
              +
            </button>
          </div>
        )

      case 'reactNode':
        return (
          <input
            className={controlClassName}
            type="text"
            value={value || ''}
            onChange={(e) => updateProp(prop.name, e.target.value)}
            placeholder={prop.description || 'Keyword symbol (search, plus, check, x, star...)'}
          />
        )

      case 'array': {
        const prettyValue = JSON.stringify(Array.isArray(value) ? value : [], null, 2)
        const draftValue = arrayDrafts[prop.name] ?? prettyValue
        return (
          <textarea
            className={controlClassName}
            value={draftValue}
            onChange={(e) => {
              const nextDraft = e.target.value
              setArrayDrafts((prev) => ({ ...prev, [prop.name]: nextDraft }))
              const parsed = parseArrayInput(nextDraft)
              if (parsed) updateProp(prop.name, parsed)
            }}
            onBlur={() => {
              const parsed = parseArrayInput(arrayDrafts[prop.name] ?? prettyValue)
              if (parsed) {
                updateProp(prop.name, parsed)
                setArrayDrafts((prev) => {
                  const next = { ...prev }
                  delete next[prop.name]
                  return next
                })
              }
            }}
            placeholder={prop.description || 'Enter a JSON array'}
            rows={3}
          />
        )
      }

      case 'object': {
        const prettyValue = JSON.stringify(
          value && typeof value === "object" && !Array.isArray(value) ? value : {},
          null,
          2
        )
        return (
          <textarea
            className={controlClassName}
            value={prettyValue}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value)
                if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                  updateProp(prop.name, parsed)
                }
              } catch {
                // Ignore invalid JSON while typing.
              }
            }}
            placeholder={prop.description || 'Enter a JSON object'}
            rows={3}
          />
        )
      }

      case 'callback':
        return (
          <div className="rounded-md border border-dashed border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
            Callback prop. Configure in code usage.
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      {metadata.props.map(prop => (
        <div key={prop.name}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
            {prop.name}
            {prop.description && (
              <span style={{ fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginLeft: '0.5rem' }}>
                ({prop.description})
              </span>
            )}
          </label>
          {renderPropControl(prop)}
        </div>
      ))}
    </div>
  )
}
