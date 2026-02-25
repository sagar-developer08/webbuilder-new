/**
 * Image optimization utilities
 */

/**
 * Generate responsive image srcset
 * 
 * @param baseUrl - Base image URL
 * @param widths - Array of image widths
 * @returns srcset string
 * 
 * @example
 * const srcset = generateSrcSet('/images/hero.jpg', [400, 800, 1200])
 * // Returns: '/images/hero.jpg?w=400 400w, /images/hero.jpg?w=800 800w, /images/hero.jpg?w=1200 1200w'
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  return widths.map((width) => `${baseUrl}?w=${width} ${width}w`).join(', ')
}

/**
 * Generate image sizes attribute for responsive images
 * 
 * @param breakpoints - Array of breakpoint and size pairs
 * @returns sizes string
 * 
 * @example
 * const sizes = generateSizes([
 *   { breakpoint: 640, size: '100vw' },
 *   { breakpoint: 1024, size: '50vw' },
 *   { size: '33vw' } // default
 * ])
 */
export function generateSizes(
  breakpoints: Array<{ breakpoint?: number; size: string }>
): string {
  return breakpoints
    .map(({ breakpoint, size }) =>
      breakpoint ? `(max-width: ${breakpoint}px) ${size}` : size
    )
    .join(', ')
}

/**
 * Lazy load image URL
 * Returns a placeholder or low-quality image until the actual image loads
 */
export function getLazyImageUrl(
  imageUrl: string,
  placeholder?: string
): string {
  // In a real app, you might use a service like Cloudinary or Imgix
  // For now, return a data URI placeholder or the original URL
  return placeholder || imageUrl
}

/**
 * Preload critical images
 * 
 * @param imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls: string[]): void {
  imageUrls.forEach((url) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
  })
}

