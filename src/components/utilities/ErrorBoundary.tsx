import * as React from "react"
import { cn } from "../../utils"
import { Text } from "../data-display/Text"

export interface ErrorBoundaryProps {
  children: React.ReactNode
  /**
   * Replacement UI. As a function it receives `reset`, so a fallback can offer
   * a "Try again" control without the consumer having to remount via `key`.
   */
  fallback?: React.ReactNode | ((reset: () => void) => React.ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  /**
   * Values that identify the render this boundary caught. When any of them
   * changes (`Object.is`, shallow) the boundary clears its error and retries —
   * the usual case being route or entity id.
   */
  resetKeys?: readonly unknown[]
  /** Called whenever the boundary leaves its error state. */
  onReset?: () => void
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

function haveResetKeysChanged(
  prev: readonly unknown[] | undefined,
  next: readonly unknown[] | undefined
): boolean {
  if (prev === next) return false
  if (prev == null || next == null) return prev !== next
  if (prev.length !== next.length) return true
  return prev.some((value, i) => !Object.is(value, next[i]))
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static displayName = "ErrorBoundary"

  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (!this.state.hasError) return
    if (haveResetKeysChanged(prevProps.resetKeys, this.props.resetKeys)) this.reset()
  }

  /** Clears the caught error and re-renders `children`. Safe to call from a fallback. */
  reset = () => {
    if (!this.state.hasError) return
    this.setState({ hasError: false, error: undefined })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props
      if (fallback != null) {
        return typeof fallback === "function" ? fallback(this.reset) : fallback
      }
      return (
        <div
          role="alert"
          className={cn(
            "rounded-surface-md border border-destructive/40 bg-destructive/10 p-3",
            this.props.className
          )}
        >
          <Text as="div" size="sm" variant="danger">
            Something went wrong.
          </Text>
        </div>
      )
    }

    return this.props.children
  }
}
