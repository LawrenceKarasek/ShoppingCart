import React, { useState, useEffect } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (errorInfo: ErrorEvent) => {
      setHasError(true)
      console.error('Error caught:', errorInfo)
    }

    window.addEventListener('error', errorHandler)
    return () => {
      window.removeEventListener('error', errorHandler)
    }
  }, [])

  if (hasError) {
    return <h1>Something went wrong.</h1>
  }

  return <>{children}</>
}

export default ErrorBoundary
