"use client"

import * as React from "react"
import { cn } from "../utils"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      return (
        <div
          data-slot="error-boundary"
          className={cn(
            "flex flex-col items-center justify-center p-8 text-center",
            this.props.className
          )}
        >
          <h2 className="text-lg font-semibold text-destructive">
            Something went wrong
          </h2>
          {this.state.error && (
            <p className="mt-2 text-sm text-muted-foreground">
              {this.state.error.message}
            </p>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
