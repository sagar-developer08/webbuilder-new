import { useRef, useCallback } from 'react'

/**
 * Throttle a function to limit how often it can be called
 * 
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 * 
 * @example
 * const handleScroll = useThrottle(() => {
 *   console.log('Scrolled')
 * }, 100)
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): T {
  const lastRun = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()

      if (now - lastRun.current >= delay) {
        lastRun.current = now
        callback(...args)
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          lastRun.current = Date.now()
          callback(...args)
        }, delay - (now - lastRun.current))
      }
    }) as T,
    [callback, delay]
  )
}

