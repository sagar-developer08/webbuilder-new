import { useEffect, useRef, useState } from 'react'

interface UseLazyLoadOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

/**
 * Hook for lazy loading elements using Intersection Observer
 * 
 * @example
 * const { ref, isVisible } = useLazyLoad()
 * 
 * return <img ref={ref} src={isVisible ? imageUrl : placeholder} />
 */
export function useLazyLoad(options: UseLazyLoadOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.disconnect()
        }
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || '50px',
        threshold: options.threshold || 0.1,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options.root, options.rootMargin, options.threshold])

  return { ref, isVisible, hasLoaded }
}

