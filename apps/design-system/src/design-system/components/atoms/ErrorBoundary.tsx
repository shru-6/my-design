"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

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

export function ErrorBoundaryShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Error Boundary</h4>
        <ErrorBoundary fallback={<div className="p-4 border rounded-lg bg-destructive/10 text-destructive">Error occurred</div>}>
          <div className="p-4 border rounded-lg">Normal content</div>
        </ErrorBoundary>
      </div>
    </div>
  )
}

