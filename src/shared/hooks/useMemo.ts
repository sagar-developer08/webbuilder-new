import { useMemo as useReactMemo } from 'react'

/**
 * Enhanced useMemo with dependency array type safety
 * 
 * @example
 * const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
 */
export { useMemo as useMemo } from 'react'

/**
 * Memoize a value that depends on multiple dependencies
 * Useful for complex calculations
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useReactMemo(factory, deps)
}

