import { useEffect, useRef } from 'react'

/**
 * Hook to measure component render performance
 * 
 * @param componentName - Name of the component being measured
 * @param logToConsole - Whether to log to console (default: false in production)
 * 
 * @example
 * function MyComponent() {
 *   usePerformance('MyComponent')
 *   return <div>Content</div>
 * }
 */
export function usePerformance(
  componentName: string,
  logToConsole: boolean = import.meta.env.DEV
) {
  const renderCount = useRef(0)
  const renderStartTime = useRef<number>(0)

  useEffect(() => {
    renderCount.current += 1
    renderStartTime.current = performance.now()
  })

  useEffect(() => {
    if (logToConsole && renderStartTime.current > 0) {
      const renderTime = performance.now() - renderStartTime.current
      if (renderTime > 16) {
        // Warn if render takes longer than one frame (16ms)
        console.warn(
          `[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms (Render #${renderCount.current})`
        )
      }
    }
  })
}

/**
 * Measure async operation performance
 * 
 * @example
 * const measureApiCall = usePerformanceMeasure('API Call')
 * await measureApiCall(() => fetchData())
 */
export function usePerformanceMeasure(label: string) {
  return async <T,>(fn: () => Promise<T>): Promise<T> => {
    const start = performance.now()
    try {
      const result = await fn()
      const duration = performance.now() - start
      if (import.meta.env.DEV) {
        console.log(`[Performance] ${label} took ${duration.toFixed(2)}ms`)
      }
      return result
    } catch (error) {
      const duration = performance.now() - start
      if (import.meta.env.DEV) {
        console.error(`[Performance] ${label} failed after ${duration.toFixed(2)}ms`, error)
      }
      throw error
    }
  }
}

