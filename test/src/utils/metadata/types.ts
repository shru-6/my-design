export type ComponentCategory =
  | "inputs"
  | "actions"
  | "navigation"
  | "data-display"
  | "feedback"
  | "overlays"
  | "layout"
  | "utilities"
  | "data-viz"
  | "patterns"

export interface PropDefinition {
  name: string
  type:
    | "variant"
    | "size"
    | "boolean"
    | "string"
    | "number"
    | "counter"
    | "select"
    | "reactNode"
    | "array"
    | "object"
    | "callback"
    | "expression"
  options?: string[]
  defaultValue?: any
  description?: string
  /** Test app only — excluded from generated usage snippets */
  galleryOnly?: boolean
}

export interface ComponentMetadata {
  name: string
  category: ComponentCategory
  description?: string
  props: PropDefinition[]
  defaultProps?: Record<string, any>
  subComponents?: string[]
}
