import * as React from "react"
import { cn } from "../../utils"
import { Text } from "../data-display/Text"

export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className={cn("rounded-md border border-destructive/40 bg-destructive/10 p-3", this.props.className)}>
          <Text as="div" size="sm" variant="danger">
            Something went wrong.
          </Text>
        </div>
      )
    }

    return this.props.children
  }
}
