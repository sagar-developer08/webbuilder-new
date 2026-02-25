import { useState, useEffect, ImgHTMLAttributes } from 'react'
import { useLazyLoad } from '@/shared/hooks/useLazyLoad'
import styles from './LazyImage.module.scss'

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  placeholder?: string
  alt: string
  fallback?: string
}

/**
 * Lazy-loaded image component with placeholder support
 * 
 * @example
 * <LazyImage
 *   src="/images/hero.jpg"
 *   placeholder="/images/hero-placeholder.jpg"
 *   alt="Hero image"
 * />
 */
export function LazyImage({
  src,
  placeholder,
  alt,
  fallback,
  className,
  ...props
}: LazyImageProps) {
  const { ref, isVisible, hasLoaded } = useLazyLoad()
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '')
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (isVisible && !hasLoaded) {
      const img = new Image()
      img.src = src
      img.onload = () => setImageSrc(src)
      img.onerror = () => {
        setHasError(true)
        if (fallback) {
          setImageSrc(fallback)
        }
      }
    }
  }, [isVisible, hasLoaded, src, fallback])

  return (
    <img
      ref={ref as React.RefObject<HTMLImageElement>}
      src={hasError && fallback ? fallback : imageSrc}
      alt={alt}
      className={`${styles.lazyImage} ${className || ''}`}
      loading="lazy"
      {...props}
    />
  )
}

