'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-error">Oops! Something went wrong</h2>
              <p className="py-2">We&apos;re sorry, but an unexpected error occurred.</p>
              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-primary"
                  onClick={() => this.setState({ hasError: false })}
                >
                  Try again
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.location.reload()}
                >
                  Refresh page
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}