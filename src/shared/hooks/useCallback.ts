import { useCallback as useReactCallback } from 'react'

/**
 * Enhanced useCallback with dependency array type safety
 * 
 * @example
 * const handleClick = useCallback(() => {
 *   doSomething(a, b)
 * }, [a, b])
 */
export { useCallback as useCallback } from 'react'

/**
 * Memoize a callback function
 * Prevents unnecessary re-renders of child components
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useReactCallback(callback, deps)
}

